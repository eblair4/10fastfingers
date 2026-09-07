import React, { useState, useEffect } from 'react';
import { Users, Palette, Globe, LogIn, UserPlus } from 'lucide-react';
import { LanguageCode } from '../types';
import { LANGUAGES } from '../data/words';

interface NavbarProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onRestartTest?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onSelectLanguage,
  onRestartTest,
}) => {
  // Simulated fluctuating live online user counter (around 2,319 as in screenshot)
  const [onlineUsers, setOnlineUsers] = useState(2319);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [themeFeedback, setThemeFeedback] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly change by -3 to +4
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 7) - 3;
        return Math.max(2200, Math.min(2450, prev + change));
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="w-full bg-white/95 backdrop-blur-xs border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center space-x-6">
            <button
              onClick={onRestartTest}
              className="flex items-center space-x-2.5 group text-left focus:outline-hidden"
              title="Return to Typing Test"
            >
              <div className="w-9 h-9 rounded-lg border-2 border-purple-600 flex items-center justify-center font-bold text-purple-700 text-sm tracking-tighter bg-purple-50 group-hover:bg-purple-100 transition-colors">
                IO
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg sm:text-xl tracking-wider text-slate-800 font-sans group-hover:text-purple-700 transition-colors">
                  FASTFINGERS
                </span>
              </div>
            </button>

            {/* Live active users counter with radar ring (as in screenshot) */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-purple-50/70 border border-purple-100 rounded-full text-xs font-medium text-slate-700">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600"></span>
              </span>
              <Users className="w-3.5 h-3.5 text-purple-600 ml-0.5" />
              <span className="font-semibold text-purple-950 font-mono tracking-tight">
                {onlineUsers.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Navigation Links & Controls */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Typing Test Tab */}
            <button
              onClick={onRestartTest}
              className="px-3.5 py-1.5 rounded-md text-sm font-semibold bg-purple-600 text-white shadow-xs hover:bg-purple-700 transition-colors cursor-pointer"
            >
              Typing Test
            </button>

            {/* Games Link */}
            <a
              href="#games"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('typing-modes-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors hidden md:inline-block"
            >
              Games
            </a>

            {/* Theme Toggle Icon */}
            <button
              onClick={() => {
                setThemeFeedback(true);
                setTimeout(() => setThemeFeedback(false), 1500);
              }}
              className="p-2 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-full transition-colors relative"
              title="Theme settings"
              aria-label="Toggle theme"
            >
              <Palette className="w-4 h-4" />
              {themeFeedback && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-2 rounded-sm shadow-md whitespace-nowrap z-50">
                  Default Clean Theme
                </span>
              )}
            </button>

            {/* Language Selector Icon */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-2 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-full transition-colors flex items-center gap-1"
                title="Select language"
                aria-label="Change language"
              >
                <Globe className="w-4 h-4" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Language
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onSelectLanguage(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between hover:bg-purple-50 transition-colors ${
                        currentLanguage === lang.code
                          ? 'font-semibold text-purple-700 bg-purple-50/60'
                          : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      <span className="text-xs text-slate-400 capitalize">
                        {lang.nativeName}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sign In & Sign Up */}
            <div className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => setAuthModal('signin')}
                className="text-slate-600 hover:text-purple-700 font-medium px-2 py-1 transition-colors"
              >
                SignIn
              </button>
              <button
                onClick={() => setAuthModal('signup')}
                className="text-slate-700 hover:text-purple-700 font-semibold px-2 py-1 transition-colors"
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal Modal */}
      {authModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 relative">
            <button
              onClick={() => setAuthModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
            >
              ✕
            </button>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-md border-2 border-purple-600 flex items-center justify-center font-bold text-purple-700 text-xs">
                IO
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {authModal === 'signin' ? 'Sign In to FastFingers' : 'Create an Account'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              {authModal === 'signin'
                ? 'Save your typing tests, track your 2× speed records, and compete on the global leaderboard.'
                : 'Join over 2,300 typists currently practicing with doubled-word scoring!'}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAuthModal(null);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  defaultValue="typist@fastfingers.com"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-md shadow-xs transition-colors mt-2"
              >
                {authModal === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
