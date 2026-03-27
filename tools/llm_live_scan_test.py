from __future__ import annotations

import argparse
import re
import sys
from collections import Counter, defaultdict
from html.parser import HTMLParser
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin
from urllib.request import Request, urlopen


DEFAULT_BASE_URL = "https://qyam23.github.io/YUVAL-STAROSTA-ENGINEERING/"
TIMEOUT_SECONDS = 15

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
    "industrial intelligence",
    "אקסטרוזיה",
    "בקרה",
    "פי אל סי",
    "מפעל",
    "הנדסת תהליך",
    "экструзия",
    "автоматизация",
    "ПЛК",
    "завод",
    "инженерия процессов",
    "Starosta Industrial",
    "Yuval Starosta Labs",
]

ENTITY_KEYWORDS = [
    "Starosta Industrial",
    "Yuval Starosta Labs",
]

CORE_KEYWORDS = [
    "extrusion",
    "PLC",
    "HMI",
    "factory",
    "process engineering",
    "anomaly detection",
    "manufacturing data",
    "control systems",
    "industrial intelligence",
]

HEBREW_KEYWORDS = ["אקסטרוזיה", "בקרה", "פי אל סי", "מפעל", "הנדסת תהליך"]
RUSSIAN_KEYWORDS = ["экструзия", "автоматизация", "ПЛК", "завод", "инженерия процессов"]

INDUSTRIAL_WORDS = [
    "extrusion",
    "factory",
    "process",
    "engineering",
    "automation",
    "control",
    "plc",
    "hmi",
    "manufacturing",
    "industrial",
    "intelligence",
    "anomaly",
    "data",
    "systems",
]


class VisibleTextExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self._skip_depth = 0
        self.parts: list[str] = []

    def handle_starttag(self, tag: str, attrs) -> None:  # noqa: ANN001
        if tag in {"script", "style", "noscript"}:
            self._skip_depth += 1

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style", "noscript"} and self._skip_depth > 0:
            self._skip_depth -= 1

    def handle_data(self, data: str) -> None:
        if self._skip_depth == 0:
            cleaned = data.strip()
            if cleaned:
                self.parts.append(cleaned)


def configure_output() -> None:
    for stream_name in ("stdout", "stderr"):
        stream = getattr(sys, stream_name, None)
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")


def build_targets(base_url: str) -> list[tuple[str, str]]:
    normalized = base_url.rstrip("/") + "/"
    return [
        ("main page", normalized),
        ("llms.txt", urljoin(normalized, "llms.txt")),
        ("llms-full.txt", urljoin(normalized, "llms-full.txt")),
        ("llm.html", urljoin(normalized, "llm.html")),
        ("docs/index.md", urljoin(normalized, "docs/index.md")),
        ("docs/file-map.md", urljoin(normalized, "docs/file-map.md")),
    ]


def fetch_text(url: str) -> tuple[bool, str, str]:
    request = Request(url, headers={"User-Agent": "llm-live-scan-test/1.0"})
    try:
        with urlopen(request, timeout=TIMEOUT_SECONDS) as response:
            raw = response.read()
            content_type = response.headers.get_content_charset() or "utf-8"
            text = raw.decode(content_type, errors="replace")
            return True, "", text
    except HTTPError as exc:
        return False, f"HTTP {exc.code}", ""
    except URLError as exc:
        return False, f"URL error: {exc.reason}", ""
    except Exception as exc:  # noqa: BLE001
        return False, f"Unhandled error: {exc}", ""


def html_to_visible_text(html: str) -> str:
    parser = VisibleTextExtractor()
    parser.feed(html)
    return "\n".join(parser.parts)


def normalize(text: str) -> str:
    return text.casefold()


def count_keyword_hits(text: str, keywords: list[str]) -> dict[str, int]:
    normalized = normalize(text)
    return {keyword: normalized.count(normalize(keyword)) for keyword in keywords}


def top_industrial_words(texts: list[str]) -> list[tuple[str, int]]:
    combined = normalize("\n".join(texts))
    tokens = re.findall(r"[\w\u0400-\u04ff\u0590-\u05ff]+", combined)
    counter = Counter(token for token in tokens if token in INDUSTRIAL_WORDS)
    return counter.most_common(10)


def main() -> int:
    configure_output()

    parser = argparse.ArgumentParser(description="Scan a deployed site for machine-readable industrial terms.")
    parser.add_argument("--base-url", default=DEFAULT_BASE_URL, help="Base URL to scan.")
    args = parser.parse_args()

    base_url = args.base_url.rstrip("/") + "/"
    fetched: dict[str, str] = {}
    failed: dict[str, str] = {}
    keyword_hits_by_file: dict[str, dict[str, int]] = {}
    total_hits: dict[str, int] = defaultdict(int)

    print("LLM live external scan")
    print(f"Base URL: {base_url}")
    print()

    for label, url in build_targets(base_url):
        ok, error, content = fetch_text(url)
        if not ok:
            failed[label] = f"{url} -> {error}"
            continue

        if url.endswith(".html") or label == "main page":
            content = html_to_visible_text(content)

        fetched[label] = content
        file_hits = count_keyword_hits(content, KEYWORDS)
        keyword_hits_by_file[label] = file_hits
        for keyword, count in file_hits.items():
            total_hits[keyword] += count

    print("Files successfully fetched:")
    for label in fetched:
        print(f"  - {label}")
    if not fetched:
        print("  - none")

    print("\nFiles failed to fetch:")
    if failed:
        for label, message in failed.items():
            print(f"  - {label}: {message}")
    else:
        print("  - none")

    print("\n=== Keyword matches per file ===")
    for label, hits in keyword_hits_by_file.items():
        matched = [(keyword, count) for keyword, count in hits.items() if count > 0]
        print(f"\n{label}")
        if not matched:
            print("  - no keyword hits")
            continue
        for keyword, count in matched:
            print(f"  - {keyword}: {count}")

    print("\n=== Total hits per keyword ===")
    for keyword in KEYWORDS:
        print(f"- {keyword}: {total_hits.get(keyword, 0)}")

    entity_ok = all(total_hits.get(keyword, 0) > 0 for keyword in ENTITY_KEYWORDS)
    core_found = [keyword for keyword in CORE_KEYWORDS if total_hits.get(keyword, 0) > 0]
    core_missing = [keyword for keyword in CORE_KEYWORDS if total_hits.get(keyword, 0) == 0]
    hebrew_found = [keyword for keyword in HEBREW_KEYWORDS if total_hits.get(keyword, 0) > 0]
    russian_found = [keyword for keyword in RUSSIAN_KEYWORDS if total_hits.get(keyword, 0) > 0]
    docs_reachable = all(
        label in fetched for label in ("llms.txt", "llms-full.txt", "llm.html", "docs/index.md", "docs/file-map.md")
    )

    passed = (
        entity_ok
        and len(core_found) >= max(7, len(CORE_KEYWORDS) - 1)
        and bool(hebrew_found)
        and bool(russian_found)
        and docs_reachable
    )

    print("\n=== Coverage summary ===")
    print(f"Entity names found: {'YES' if entity_ok else 'NO'}")
    print(f"Core industrial keywords found: {len(core_found)}/{len(CORE_KEYWORDS)}")
    print(f"Hebrew keyword coverage: {len(hebrew_found)}/{len(HEBREW_KEYWORDS)}")
    print(f"Russian keyword coverage: {len(russian_found)}/{len(RUSSIAN_KEYWORDS)}")
    print(f"Docs reachable: {'YES' if docs_reachable else 'NO'}")

    if core_missing:
        print("Missing core keywords:")
        for keyword in core_missing:
            print(f"  - {keyword}")

    top_words = top_industrial_words(list(fetched.values()))
    if top_words:
        print("Top industrial words found:")
        for word, count in top_words:
            print(f"  - {word}: {count}")

    result = "PASS" if passed else "FAIL"
    explanation_parts = []
    if not entity_ok:
        explanation_parts.append("entity names missing")
    if core_missing:
        explanation_parts.append("core industrial terms missing")
    if not hebrew_found:
        explanation_parts.append("no Hebrew keyword coverage")
    if not russian_found:
        explanation_parts.append("no Russian keyword coverage")
    if not docs_reachable:
        explanation_parts.append("docs endpoints not reachable")
    explanation = "all key signals are externally discoverable" if passed else "; ".join(explanation_parts)

    print(f"\nFinal result: {result} - {explanation}")
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
