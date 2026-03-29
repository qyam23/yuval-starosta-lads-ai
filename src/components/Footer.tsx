import { useEffect, useRef, useState } from "react";
import { Copy, ExternalLink, Linkedin, Mail, MessageCircle, Share2 } from "lucide-react";
import NavbarBrand from "./NavbarBrand";

type FooterProps = {
  isPolicyPage?: boolean;
};

export default function Footer({ isPolicyPage = false }: FooterProps) {
  const extrusionHref = isPolicyPage ? "/#extrusion" : "#extrusion";
  const factoryHref = isPolicyPage ? "/#factory" : "#factory";
  const automationHref = isPolicyPage ? "/#automation" : "#automation";
  const intelligenceHref = isPolicyPage ? "/#intelligence" : "#intelligence";

  return (
    <footer className="border-t border-white/8 bg-[#050a12] px-6 py-[4.5rem]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-2">
            <div className="footer-brand-row mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[max-content_minmax(18.5rem,1fr)] lg:items-start lg:gap-10">
              <NavbarBrand className="footer-brand max-w-full" />
              <SharePanel />
            </div>
            <p className="max-w-xl leading-7 text-slate-400">
              Premium industrial engineering for advanced manufacturing environments, spanning extrusion, factory systems, automation, and operational intelligence.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">What We Do</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href={extrusionHref} className="transition-colors hover:text-industrial-accent">Extrusion Engineering</a></li>
              <li><a href={factoryHref} className="transition-colors hover:text-industrial-accent">Factory Building</a></li>
              <li><a href={automationHref} className="transition-colors hover:text-industrial-accent">Automation &amp; Control</a></li>
              <li><a href={intelligenceHref} className="transition-colors hover:text-industrial-accent">ER Labs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <a href="mailto:starosta.ing@gmail.com" className="transition-colors hover:text-industrial-accent">
                  starosta.ing@gmail.com
                </a>
              </li>
              <li>Executive Engineering Office</li>
              <li>Tel Aviv, Israel</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-white/8 pt-12 text-xs uppercase tracking-widest text-slate-500 md:flex-row">
          <p>&copy; 2026 Starosta Industrial. All rights reserved.</p>
          <div className="mt-6 flex gap-8 md:mt-0">
            <a href="/privacy-policy.html" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SharePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const shareUrl = "https://starostaindustrial.com/";
  const shareText = "Starosta Industrial";
  const encodedUrl = encodeURIComponent(shareUrl);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div ref={panelRef} className="relative w-full lg:min-h-[11.5rem]">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="footer-share-trigger group relative flex min-h-[11.5rem] w-full flex-col items-start justify-between overflow-hidden rounded-[1.25rem] border border-industrial-accent/28 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5 text-left transition-all duration-300 hover:border-industrial-accent/60 hover:bg-[linear-gradient(180deg,rgba(212,175,55,0.08),rgba(255,255,255,0.03))]"
        aria-expanded={isOpen}
        aria-label="Share Starosta Industrial"
      >
        <span className="footer-share-trigger__pulse" aria-hidden="true" />
        <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-industrial-accent">
          sher
          <Share2 size={14} className="footer-share-trigger__icon" />
        </span>
        <span className="max-w-[13rem] text-[1.05rem] font-semibold uppercase tracking-[0.12em] text-white sm:text-[1.15rem]">
          Share This Site
        </span>
        <span className="max-w-[16rem] text-sm leading-6 text-slate-400">
          Open a clean share panel for Facebook, WhatsApp, email, or direct link copy.
        </span>
      </button>

      {isOpen && (
        <div className="footer-share-panel absolute inset-0 z-20 w-full rounded-[1.25rem] border border-white/10 bg-[#08111d]/96 p-4 shadow-[0_24px_48px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-industrial-accent">Share</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-[0.85rem] border border-white/8 px-3 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition-colors hover:border-industrial-accent/50 hover:text-industrial-accent"
            >
              Facebook
              <ExternalLink size={14} />
            </a>
            <a
              href={`https://wa.me/?text=${encodedUrl}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-[0.85rem] border border-white/8 px-3 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition-colors hover:border-industrial-accent/50 hover:text-industrial-accent"
            >
              WhatsApp
              <MessageCircle size={14} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-[0.85rem] border border-white/8 px-3 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition-colors hover:border-industrial-accent/50 hover:text-industrial-accent"
            >
              LinkedIn
              <Linkedin size={14} />
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareUrl}\n\nIndustrial engineering, integration, and intelligence for advanced manufacturing.`)}`}
              className="flex items-center justify-between rounded-[0.85rem] border border-white/8 px-3 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition-colors hover:border-industrial-accent/50 hover:text-industrial-accent"
            >
              Email
              <Mail size={14} />
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center justify-between rounded-[0.85rem] border border-white/8 px-3 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition-colors hover:border-industrial-accent/50 hover:text-industrial-accent"
            >
              {copied ? "Copied" : "Copy Link"}
              {copied ? <Share2 size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
