export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-industrial-border bg-industrial-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-industrial-accent rounded-sm flex items-center justify-center">
                <span className="text-industrial-dark font-bold text-lg">Y</span>
              </div>
              <span className="text-xl font-bold tracking-tight uppercase">
                YUVAL STAROSTA <span className="text-industrial-accent">LABS</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Leading the transition to intelligent manufacturing through advanced engineering and AI integration.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Capabilities</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-industrial-accent transition-colors">Extrusion Systems</a></li>
              <li><a href="#" className="hover:text-industrial-accent transition-colors">Process Engineering</a></li>
              <li><a href="#" className="hover:text-industrial-accent transition-colors">Automation</a></li>
              <li><a href="#" className="hover:text-industrial-accent transition-colors">Industrial AI</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white">Contact</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>info@starosta-labs.com</li>
              <li>Engineering HQ</li>
              <li>Tel Aviv, Israel</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-industrial-border text-xs text-slate-500 uppercase tracking-widest">
          <p>© 2026 Yuval Starosta Labs. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
