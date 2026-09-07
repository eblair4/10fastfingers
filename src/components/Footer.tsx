import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0d0e1a] text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-slate-800/80">
          {/* Brand & Slogan matching screenshot 161502 */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg border-2 border-purple-500/80 flex items-center justify-center font-bold text-purple-400 text-xs">
                IO
              </div>
              <span className="font-bold text-base tracking-wider text-white">
                FASTFINGERS
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              Test and improve your Typing Speed with our free Typing Games.
            </p>

            {/* Social icons */}
            <div className="flex items-center space-x-4 pt-2 text-slate-400">
              {/* Discord */}
              <a href="#discord" className="hover:text-purple-400 transition-colors" title="Discord Community">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#facebook" className="hover:text-purple-400 transition-colors" title="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              {/* X */}
              <a href="#twitter" className="hover:text-purple-400 transition-colors" title="X">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Games column */}
          <div className="col-span-2 space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Games</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Typing Test</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Competition</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Text Practice</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Multiplayer</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Custom Mode</a></li>
            </ul>
          </div>

          {/* Support column */}
          <div className="col-span-2 space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Feedback</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Translate</a></li>
            </ul>
          </div>

          {/* Legal column */}
          <div className="col-span-2 space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Imprint</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Links column */}
          <div className="col-span-2 space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Build, Launch and Grow</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Brain Training Games</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Mobile Typing App</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Online Text Tools</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
          <span>© 2026 FastFingers, Inc. All rights reserved.</span>
          <span>A responsive typing test inspired by 10FastFingers</span>
        </div>
      </div>
    </footer>
  );
};
