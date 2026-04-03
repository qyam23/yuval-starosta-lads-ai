from __future__ import annotations

import shutil
from pathlib import Path
from xml.sax.saxutils import escape


ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = ROOT / "public"
DOCS_SOURCE = ROOT / "docs"
DOCS_TARGET = PUBLIC_DIR / "docs"

FILES_TO_COPY = [
    ("llms.txt", "llms.txt"),
    ("llms-full.txt", "llms-full.txt"),
]
SITE_URL = "https://starostaindustrial.com"


def copy_file(source_name: str, target_name: str) -> None:
    source = ROOT / source_name
    target = PUBLIC_DIR / target_name
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, target)


def copy_docs_tree() -> None:
    if DOCS_TARGET.exists():
        shutil.rmtree(DOCS_TARGET)
    shutil.copytree(DOCS_SOURCE, DOCS_TARGET)


def build_sitemap_urls() -> list[str]:
    urls = [
        "/",
        "/privacy-policy.html",
        "/llms.txt",
        "/llms-full.txt",
        "/llm.html",
    ]
    doc_paths = sorted(
        path.relative_to(DOCS_SOURCE).as_posix()
        for path in DOCS_SOURCE.rglob("*.md")
        if path.is_file()
    )
    urls.extend(f"/docs/{doc_path}" for doc_path in doc_paths)
    return urls


def write_sitemap() -> None:
    urls = build_sitemap_urls()
    lastmod = "2026-04-03"
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for url in urls:
        lines.extend(
            [
                "  <url>",
                f"    <loc>{escape(SITE_URL + url)}</loc>",
                f"    <lastmod>{lastmod}</lastmod>",
                "  </url>",
            ]
        )
    lines.append("</urlset>")
    (PUBLIC_DIR / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    for source_name, target_name in FILES_TO_COPY:
        copy_file(source_name, target_name)
    copy_docs_tree()
    write_sitemap()
    print("Synced machine-readable assets into public/")


if __name__ == "__main__":
    main()
