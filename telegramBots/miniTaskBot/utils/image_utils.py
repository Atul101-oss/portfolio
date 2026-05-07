"""
Image processing utilities — resize and convert to PDF using Pillow.
"""

import io
from PIL import Image


def resize_image(input_bytes: bytes, scale_percent: int) -> tuple[bytes, tuple[int, int], tuple[int, int]]:
    """
    Resize an image by a given percentage.

    Returns:
        (output_bytes, original_size, new_size)
    """
    img = Image.open(io.BytesIO(input_bytes))
    original_size = img.size

    new_width = int(img.width * scale_percent / 100)
    new_height = int(img.height * scale_percent / 100)
    new_size = (new_width, new_height)

    resized = img.resize(new_size, Image.LANCZOS)

    buf = io.BytesIO()
    # Preserve original format; default to PNG
    fmt = img.format or "PNG"
    if fmt.upper() == "JPEG":
        # JPEG doesn't support alpha channel
        if resized.mode in ("RGBA", "LA", "P"):
            resized = resized.convert("RGB")
        resized.save(buf, format="JPEG", quality=95)
    else:
        resized.save(buf, format=fmt)

    buf.seek(0)
    return buf.getvalue(), original_size, new_size


def resize_image_custom(input_bytes: bytes, width: int, height: int) -> tuple[bytes, tuple[int, int], tuple[int, int]]:
    """
    Resize an image to exact dimensions.

    Returns:
        (output_bytes, original_size, new_size)
    """
    img = Image.open(io.BytesIO(input_bytes))
    original_size = img.size
    new_size = (width, height)

    resized = img.resize(new_size, Image.LANCZOS)

    buf = io.BytesIO()
    fmt = img.format or "PNG"
    if fmt.upper() == "JPEG":
        if resized.mode in ("RGBA", "LA", "P"):
            resized = resized.convert("RGB")
        resized.save(buf, format="JPEG", quality=95)
    else:
        resized.save(buf, format=fmt)

    buf.seek(0)
    return buf.getvalue(), original_size, new_size


def images_to_pdf(image_bytes_list: list[bytes]) -> bytes:
    """
    Convert a list of images (as bytes) into a single PDF.

    Each image becomes one page in the PDF.
    """
    if not image_bytes_list:
        raise ValueError("No images provided")

    pages = []
    for img_bytes in image_bytes_list:
        img = Image.open(io.BytesIO(img_bytes))
        # PDF requires RGB
        if img.mode != "RGB":
            img = img.convert("RGB")
        pages.append(img)

    buf = io.BytesIO()
    first_page = pages[0]
    if len(pages) > 1:
        first_page.save(buf, format="PDF", save_all=True, append_images=pages[1:])
    else:
        first_page.save(buf, format="PDF")

    buf.seek(0)
    return buf.getvalue()
