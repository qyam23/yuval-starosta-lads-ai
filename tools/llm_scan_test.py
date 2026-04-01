from __future__ import annotations

import sys
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent

KEYWORDS = [
    "twin screw extruder",
    "extrusion",
    "PLC",
    "HMI",
    "industrial automation",
    "Power BI",
    "MES",
    "factory",
    "process engineering",
    "anomaly detection",
    "manufacturing data",
    "control systems",
    "extrusion systems",
    "industrial intelligence",
    "Starosta Industrial",
    "Yuval Starosta Labs",
    "אקסטרוזיה",
    "בקרה",
    "פי אל סי",
    "מפעל",
    "הנדסת תהליך",
    "автоматизация",
    "экструзия",
    "ПЛК",
    "завод",
    "инженерия процессов",
]

CORE_KEYWORDS = [
    "extrusion",
    "PLC",
    "HMI",
    "factory",
    "process engineering",
    "anomaly detection",
    "control systems",
    "industrial intelligence",
    "Starosta Industrial",
    "Yuval Starosta Labs",
]

OPTIONAL_SITE_FILES = [
    Path("index.html"),
    Path("dist/index.html"),
]

SOURCE_EXTENSIONS = {".md", ".html", ".tsx", ".ts", ".txt"}


def configure_output() -> None:
    for stream_name in ("stdout", "stderr"):
        stream = getattr(sys, stream_name, None)
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")


def normalize(text: str) -> str:
    return text.casefold()


def read_text_safe(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def gather_files() -> list[Path]:
    files: list[Path] = []

    for fixed in [Path("llms.txt"), Path("llms-full.txt")]:
        if (ROOT / fixed).exists():
            files.append(ROOT / fixed)

    profile_doc = ROOT / "docs" / "starosta-industrial.md"
    if profile_doc.exists():
        files.append(profile_doc)

    docs_root = ROOT / "docs"
    if docs_root.exists():
        files.extend(sorted(p for p in docs_root.rglob("*") if p.is_file()))

    for fixed in OPTIONAL_SITE_FILES:
        if (ROOT / fixed).exists():
            files.append(ROOT / fixed)

    src_root = ROOT / "src"
    if src_root.exists():
        files.extend(
            sorted(
                p for p in src_root.rglob("*")
                if p.is_file() and p.suffix.lower() in {".tsx", ".ts", ".html"}
            )
        )

    unique_files: list[Path] = []
    seen: set[Path] = set()
    for path in files:
        resolved = path.resolve()
        if resolved not in seen:
            seen.add(resolved)
            unique_files.append(resolved)

    return unique_files


def main() -> int:
    configure_output()
    files = gather_files()
    if not files:
        print("FAIL: No scan targets found.")
        return 1

    keyword_hits: dict[str, list[str]] = defaultdict(list)
    file_hits: dict[str, list[str]] = defaultdict(list)
    unreadable: list[str] = []

    normalized_keywords = {keyword: normalize(keyword) for keyword in KEYWORDS}

    for path in files:
        try:
            text = read_text_safe(path)
        except OSError:
            unreadable.append(str(path.relative_to(ROOT)))
            continue

        normalized_text = normalize(text)
        relative = str(path.relative_to(ROOT))

        for keyword, normalized_keyword in normalized_keywords.items():
            hit_count = normalized_text.count(normalized_keyword)
            if hit_count > 0:
                keyword_hits[keyword].append(f"{relative} ({hit_count})")
                file_hits[relative].append(f"{keyword} ({hit_count})")

    print("LLM docs scan")
    print(f"Repository root: {ROOT}")
    print(f"Files scanned: {len(files)}")
    if unreadable:
        print(f"Unreadable files: {len(unreadable)}")
        for item in unreadable:
            print(f"  - {item}")
    else:
        print("Unreadable files: 0")

    print("\n=== By keyword ===")
    total_hits_per_keyword: dict[str, int] = {}
    for keyword in KEYWORDS:
        entries = keyword_hits.get(keyword, [])
        total_hits = 0
        for entry in entries:
            count = int(entry.rsplit("(", 1)[1].rstrip(")"))
            total_hits += count
        total_hits_per_keyword[keyword] = total_hits
        status = "FOUND" if entries else "MISSING"
        print(f"\n[{status}] {keyword} | total hits: {total_hits}")
        for entry in entries:
            print(f"  - {entry}")

    print("\n=== By file ===")
    for relative in sorted(file_hits):
        hits = file_hits[relative]
        print(f"\n{relative} | matched keywords: {len(hits)}")
        for hit in hits:
            print(f"  - {hit}")

    core_found = [keyword for keyword in CORE_KEYWORDS if keyword_hits.get(keyword)]
    core_missing = [keyword for keyword in CORE_KEYWORDS if not keyword_hits.get(keyword)]
    brand_keywords = [
        "Starosta Industrial",
        "Yuval Starosta Labs",
    ]
    brand_ok = all(keyword_hits.get(keyword) for keyword in brand_keywords)
    optional_missing = [keyword for keyword in KEYWORDS if not keyword_hits.get(keyword) and keyword not in CORE_KEYWORDS]

    passed = len(core_found) >= max(8, len(CORE_KEYWORDS) - 2) and brand_ok

    print("\n=== Summary ===")
    print(f"Core keywords found: {len(core_found)}/{len(CORE_KEYWORDS)}")
    if core_found:
        print("Found core keywords:")
        for keyword in core_found:
            print(f"  - {keyword}")
    if core_missing:
        print("Missing core keywords:")
        for keyword in core_missing:
            print(f"  - {keyword}")
    if optional_missing:
        print("Missing optional keywords:")
        for keyword in optional_missing:
            print(f"  - {keyword}")

    strongest = sorted(
        ((keyword, count) for keyword, count in total_hits_per_keyword.items() if count > 0),
        key=lambda item: (-item[1], item[0].casefold()),
    )[:8]
    if strongest:
        print("Strongest coverage:")
        for keyword, count in strongest:
            print(f"  - {keyword}: {count}")

    result = "PASS" if passed else "FAIL"
    explanation = (
        "core industrial terms and entity names are discoverable"
        if passed
        else "major industrial areas or entity names are missing"
    )
    print(f"\nFinal result: {result} - {explanation}")
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
