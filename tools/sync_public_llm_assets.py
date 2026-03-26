from __future__ import annotations

import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = ROOT / "public"
DOCS_SOURCE = ROOT / "docs"
DOCS_TARGET = PUBLIC_DIR / "docs"

FILES_TO_COPY = [
    ("llms.txt", "llms.txt"),
    ("llms-full.txt", "llms-full.txt"),
]


def copy_file(source_name: str, target_name: str) -> None:
    source = ROOT / source_name
    target = PUBLIC_DIR / target_name
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, target)


def copy_docs_tree() -> None:
    if DOCS_TARGET.exists():
        shutil.rmtree(DOCS_TARGET)
    shutil.copytree(DOCS_SOURCE, DOCS_TARGET)


def main() -> None:
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    for source_name, target_name in FILES_TO_COPY:
        copy_file(source_name, target_name)
    copy_docs_tree()
    print("Synced machine-readable assets into public/")


if __name__ == "__main__":
    main()
