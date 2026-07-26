"""
PDF processing utilities — merge multiple PDFs using pypdf or PyPDF2.
"""

import io

try:
    from pypdf import PdfMerger
except ImportError:
    try:
        from PyPDF2 import PdfMerger
    except ImportError:
        PdfMerger = None


def merge_pdfs(pdf_bytes_list: list[bytes]) -> bytes:
    """
    Merge multiple PDF files into a single PDF.

    Args:
        pdf_bytes_list: List of PDF file contents as bytes.

    Returns:
        Merged PDF as bytes.
    """
    if not pdf_bytes_list:
        raise ValueError("No PDFs provided")

    if len(pdf_bytes_list) < 2:
        raise ValueError("Need at least 2 PDFs to merge")

    if PdfMerger is None:
        raise RuntimeError("Neither pypdf nor PyPDF2 library is installed.")

    merger = PdfMerger()

    for pdf_bytes in pdf_bytes_list:
        merger.append(io.BytesIO(pdf_bytes))

    output = io.BytesIO()
    merger.write(output)
    merger.close()

    output.seek(0)
    return output.getvalue()
