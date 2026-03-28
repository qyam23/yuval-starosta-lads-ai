import LogoMark from "./LogoMark";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#050a12] px-6 py-[4.5rem]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-2">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.02]">
                <LogoMark className="h-12 w-12" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">STAROSTA INDUSTRIAL</p>
                <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">A Division of Yuval Starosta Labs</p>
              </div>
            </div>
            <p className="max-w-xl leading-7 text-slate-400">
              Premium industrial engineering for advanced manufacturing environments, spanning extrusion, factory systems, automation, and operational intelligence.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">What We Do</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#extrusion" className="transition-colors hover:text-industrial-accent">Extrusion Engineering</a></li>
              <li><a href="#factory" className="transition-colors hover:text-industrial-accent">Factory Building</a></li>
              <li><a href="#automation" className="transition-colors hover:text-industrial-accent">Automation &amp; Control</a></li>
              <li><a href="#intelligence" className="transition-colors hover:text-industrial-accent">ER Labs</a></li>
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
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
