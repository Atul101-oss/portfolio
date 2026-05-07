"""
PDF processing utilities — merge multiple PDFs using PyPDF2.
"""

import io
from PyPDF2 import PdfMerger


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

    merger = PdfMerger()

    for pdf_bytes in pdf_bytes_list:
        merger.append(io.BytesIO(pdf_bytes))

    output = io.BytesIO()
    merger.write(output)
    merger.close()

    output.seek(0)
    return output.getvalue()
