"""Extract directional WebP frames from public/character.mp4.

The MP4 is a source asset. The site never seeks it for cursor tracking.
Default source: public/Prashant Eye Movement-remove-audio.mp4

Install OpenCV first if needed:

    pip install opencv-python

WebP encoding uses OpenCV when available, otherwise Pillow:

    pip install pillow

Usage, from the repository root:

    python scripts/extract-frames.py
    python scripts/extract-frames.py --count 56
    python scripts/extract-frames.py --center-index 12
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_INPUT = ROOT / "public" / "Prashant Eye Movement-remove-audio.mp4"
DEFAULT_OUTPUT = ROOT / "public" / "frames"


def fail(message: str, code: int = 1) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(code)


def import_cv2():
    try:
        import cv2
    except ImportError:
        print("ERROR: OpenCV is not installed.", file=sys.stderr)
        print("Install it with:", file=sys.stderr)
        print("  pip install opencv-python", file=sys.stderr)
        raise SystemExit(1)
    return cv2


def sample_indices(total: int, count: int) -> list[int]:
    if total <= 0:
        return []
    if count >= total:
        return list(range(total))
    if count <= 1:
        return [total // 2]
    return sorted({round(i * (total - 1) / (count - 1)) for i in range(count)})


def choose_count(total: int, requested: int | None) -> int:
    if requested is not None:
        return max(1, min(requested, total))
    if total >= 64:
        return 56
    if total >= 48:
        return 48
    return total


def resize_frame(cv2, frame, max_width: int):
    height, width = frame.shape[:2]
    if width <= max_width:
        return frame
    scale = max_width / width
    return cv2.resize(frame, (max_width, max(1, int(height * scale))), interpolation=cv2.INTER_AREA)


def key_red_background(cv2, frame):
    """Turn the flat red studio background transparent and crop to the person."""
    import numpy as np

    blue, green, red = cv2.split(frame)
    red_f = red.astype(np.float32)
    green_f = green.astype(np.float32)
    blue_f = blue.astype(np.float32)
    background = (red_f > 155) & (green_f < 55) & (blue_f < 70) & ((red_f - green_f) > 110) & ((red_f - blue_f) > 90)
    alpha = np.where(background, 0, 255).astype(np.uint8)
    alpha = cv2.GaussianBlur(alpha, (5, 5), 0)
    bgra = cv2.cvtColor(frame, cv2.COLOR_BGR2BGRA)
    bgra[:, :, 3] = alpha

    ys, xs = np.where(alpha > 28)
    if len(xs) == 0:
        return bgra
    x0, x1 = int(xs.min()), int(xs.max())
    y0, y1 = int(ys.min()), int(ys.max())
    pad_x = int((x1 - x0) * 0.06)
    pad_y = int((y1 - y0) * 0.06)
    height, width = alpha.shape
    x0 = max(0, x0 - pad_x)
    y0 = max(0, y0 - pad_y)
    x1 = min(width - 1, x1 + pad_x)
    y1 = min(height - 1, y1 + pad_y)
    return bgra[y0 : y1 + 1, x0 : x1 + 1]


def write_webp(cv2, path: Path, frame, quality: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    try:
        from PIL import Image
    except ImportError:
        ok = cv2.imwrite(str(path), frame, [cv2.IMWRITE_WEBP_QUALITY, quality])
        if not ok:
            fail(
                "OpenCV could not write WebP, and Pillow is not installed.\n"
                "Install Pillow with:\n"
                "  pip install pillow"
            )
        return

    if frame.ndim == 3 and frame.shape[2] == 4:
        image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGRA2RGBA))
    else:
        image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    image.save(path, format="WEBP", quality=quality, method=4)


def read_frame(cv2, capture, index: int):
    capture.set(cv2.CAP_PROP_POS_FRAMES, index)
    ok, frame = capture.read()
    if not ok or frame is None:
        return None
    return frame


def main() -> None:
    parser = argparse.ArgumentParser(description="Extract directional WebP frames from character.mp4")
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--count", type=int, default=None, help="Directional frame count. Default is 48-56 when the video allows it.")
    parser.add_argument("--center-index", type=int, default=None, help="Source frame used for center.webp. Eye-movement clips default to the first frame.")
    parser.add_argument("--key-background", action=argparse.BooleanOptionalAction, default=None, help="Remove a flat red background. Defaults on for the eye-movement clip.")
    parser.add_argument("--max-width", type=int, default=960)
    parser.add_argument("--quality", type=int, default=80)
    args = parser.parse_args()

    cv2 = import_cv2()
    source = args.input.resolve()
    if not source.exists():
        fail(
            f"Video not found at {source}\n"
            "Place the animation at public/character.mp4 and run this script again."
        )

    capture = cv2.VideoCapture(str(source))
    if not capture.isOpened():
        fail(f"OpenCV could not open {source}")

    fps = float(capture.get(cv2.CAP_PROP_FPS) or 0)
    reported = int(capture.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    total = reported

    if total < 1:
        total = 0
        while True:
            ok, _frame = capture.read()
            if not ok:
                break
            total += 1
        capture.set(cv2.CAP_PROP_POS_FRAMES, 0)

    duration = (total / fps) if fps else 0
    print(f"Source: {source}")
    print(f"FPS: {fps:.3f}" if fps else "FPS: unknown")
    print(f"Reported frames: {reported}")
    print(f"Frame count: {total}")
    print(f"Duration: {duration:.3f}s" if fps else "Duration: unknown")

    if total < 1:
        capture.release()
        fail("The video did not contain any readable frames.")

    count = choose_count(total, args.count)
    indices = sample_indices(total, count)
    if not indices:
        capture.release()
        fail("Could not choose frames to extract.")

    eye_clip = "eye" in source.name.lower()
    key_background = eye_clip if args.key_background is None else args.key_background

    center_source = args.center_index
    if center_source is None:
        center_source = indices[0] if eye_clip else indices[len(indices) // 2]
    if center_source < 0 or center_source >= total:
        capture.release()
        fail(f"--center-index {center_source} is outside 0-{total - 1}.")

    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=True)

    written: list[str] = []
    for order, index in enumerate(indices):
        frame = read_frame(cv2, capture, index)
        if frame is None:
            print(f"WARNING: skipped unreadable frame {index}", file=sys.stderr)
            continue
        frame = resize_frame(cv2, frame, args.max_width)
        if key_background:
            frame = key_red_background(cv2, frame)
        name = f"frame-{order:02d}.webp"
        write_webp(cv2, output / name, frame, args.quality)
        written.append(name)
        print(f"Wrote {name} from source frame {index}")

    center = read_frame(cv2, capture, center_source)
    capture.release()
    if center is None:
        fail(f"Could not read center source frame {center_source}.")

    center = resize_frame(cv2, center, args.max_width)
    if key_background:
        center = key_red_background(cv2, center)
    write_webp(cv2, output / "center.webp", center, args.quality)
    print(f"Wrote center.webp from source frame {center_source}")

    if not written:
        fail("No directional frames were written.")

    manifest = {
        "source": source.name,
        "mapping": "eye-path" if eye_clip else "circle",
        "fps": fps,
        "duration": duration,
        "sourceFrames": total,
        "count": len(written),
        "center": "center.webp",
        "centerSourceIndex": center_source,
        "frames": written,
    }
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"Wrote {output / 'manifest.json'}")
    print(f"Done. {len(written)} directional frames plus center.webp.")


if __name__ == "__main__":
    main()
