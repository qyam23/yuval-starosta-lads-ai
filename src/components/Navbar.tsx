import { motion } from "motion/react";
import { Copy, ExternalLink, Linkedin, Mail, Menu, MessageCircle, Share2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import NavbarBrand from "./NavbarBrand";

type NavbarProps = {
  onContactClick: () => void;
  isPolicyPage?: boolean;
};

export default function Navbar({ onContactClick, isPolicyPage = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const homeHref = isPolicyPage ? "/" : "#top";
  const domainsHref = isPolicyPage ? "/#domains" : "#domains";
  const intelligenceHref = isPolicyPage ? "/#intelligence" : "#intelligence";
  const expertiseHref = isPolicyPage ? "/#expertise" : "#expertise";

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/8 bg-[#07101b]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
        <a href={homeHref} className="flex min-w-0 items-center pr-4 lg:pr-6" data-analytics="nav-link" data-analytics-section-name="home">
          <NavbarBrand />
        </a>

        <div className="hidden items-center gap-6 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-300 lg:gap-7 md:flex">
          <a href={domainsHref} className="transition-colors hover:text-industrial-accent" data-analytics="nav-link" data-analytics-section-name="domains">What We Do</a>
          <a href={intelligenceHref} className="transition-colors hover:text-industrial-accent" data-analytics="nav-link" data-analytics-section-name="intelligence">ER Labs</a>
          <a href={expertiseHref} className="transition-colors hover:text-industrial-accent" data-analytics="nav-link" data-analytics-section-name="expertise">Expertise</a>

          <div className="ml-3 flex items-center gap-3 border-l border-white/10 pl-5">
            <HeaderShareButton />
            <button
              type="button"
              onClick={onContactClick}
              data-analytics="contact-cta"
              data-analytics-section-name="header"
              className="rounded-sm border border-industrial-accent/70 px-5 py-2 text-industrial-accent transition-all duration-300 hover:bg-industrial-accent hover:text-industrial-dark"
            >
              Contact us
            </button>
          </div>
        </div>

        <button
          className="rounded-sm border border-white/10 bg-white/[0.03] p-2 text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-white/8 bg-[#07101b]/98 px-6 py-6 md:hidden"
        >
          <div className="flex flex-col gap-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
            <a href={domainsHref} onClick={() => setIsOpen(false)} data-analytics="nav-link" data-analytics-section-name="domains">What We Do</a>
            <a href={intelligenceHref} onClick={() => setIsOpen(false)} data-analytics="nav-link" data-analytics-section-name="intelligence">ER Labs</a>
            <a href={expertiseHref} onClick={() => setIsOpen(false)} data-analytics="nav-link" data-analytics-section-name="expertise">Expertise</a>
          </div>

          <div className="mt-6 flex flex-col gap-6 border-t border-white/10 pt-6">
            <HeaderShareButton mobile />
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onContactClick();
              }}
              data-analytics="contact-cta"
              data-analytics-section-name="header_mobile"
              className="w-full border border-industrial-accent/70 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-industrial-accent"
            >
              Contact us
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

type HeaderShareButtonProps = {
  mobile?: boolean;
};

function HeaderShareButton({ mobile = false }: HeaderShareButtonProps) {
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
    <div ref={panelRef} className={`relative ${mobile ? "w-full" : ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        data-analytics="cta_click"
        data-analytics-label="Share"
        data-analytics-section-name="header_share"
        className={
          mobile
            ? "header-share-button flex w-full items-center justify-center gap-2 rounded-sm border border-white/14 bg-white/[0.03] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-200 transition-all duration-300 hover:border-industrial-accent/60 hover:text-industrial-accent"
            : "header-share-button flex items-center gap-2 rounded-sm border border-white/14 bg-white/[0.03] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-200 transition-all duration-300 hover:border-industrial-accent/60 hover:text-industrial-accent"
        }
        aria-expanded={isOpen}
        aria-label="Share Starosta Industrial"
      >
        <Share2 size={mobile ? 16 : 14} className="header-share-button__icon" />
        <span>SHARE</span>
      </button>

      {isOpen && (
        <div
          className={
            mobile
              ? "mt-3 grid gap-2 rounded-[1rem] border border-white/10 bg-[#08111d]/96 p-3 shadow-[0_20px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl"
              : "absolute right-0 top-[calc(100%+0.75rem)] z-40 grid min-w-[16rem] gap-2 rounded-[1rem] border border-white/10 bg-[#08111d]/96 p-3 shadow-[0_20px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl"
          }
        >
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            data-analytics="footer-link"
            data-analytics-section-name="header_share"
            className="flex items-center justify-between rounded-[0.8rem] border border-white/8 px-3 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-slate-200 transition-colors hover:border-industrial-accent/50 hover:text-industrial-accent"
          >
            Facebook
            <ExternalLink size={14} />
          </a>
          <a
            href={`https://wa.me/?text=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            data-analytics="footer-link"
            data-analytics-section-name="header_share"
            className="flex items-center justify-between rounded-[0.8rem] border border-white/8 px-3 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-slate-200 transition-colors hover:border-industrial-accent/50 hover:text-industrial-accent"
          >
            WhatsApp
            <MessageCircle size={14} />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            data-analytics="footer-link"
            data-analytics-section-name="header_share"
            className="flex items-center justify-between rounded-[0.8rem] border border-white/8 px-3 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-slate-200 transition-colors hover:border-industrial-accent/50 hover:text-industrial-accent"
          >
            LinkedIn
            <Linkedin size={14} />
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareUrl}\n\nIndustrial engineering, integration, and intelligence for advanced manufacturing.`)}`}
            data-analytics="footer-link"
            data-analytics-section-name="header_share"
            className="flex items-center justify-between rounded-[0.8rem] border border-white/8 px-3 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-slate-200 transition-colors hover:border-industrial-accent/50 hover:text-industrial-accent"
          >
            Email
            <Mail size={14} />
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-between rounded-[0.8rem] border border-white/8 px-3 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-slate-200 transition-colors hover:border-industrial-accent/50 hover:text-industrial-accent"
          >
            {copied ? "Copied" : "Copy Link"}
            {copied ? <Share2 size={14} /> : <Copy size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}
