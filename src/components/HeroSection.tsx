import React from 'react';
import { Keyboard, Trophy, Users, FileText, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onStartTyping: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartTyping }) => {
  return (
    <div id="typing-modes-section" className="text-center max-w-3xl mx-auto pt-6 pb-4 sm:pt-10 sm:pb-6 px-4">
      <h1 className="text-3xl sm:text-5xl font-light text-slate-900 tracking-tight mb-3 sm:mb-4">
        Improve your Typing speed<br className="hidden sm:inline" /> with our free Typing Games
      </h1>
      <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto mb-6">
        If you want to test your typing speed, try out our 1-minute free Typing test (available in multiple languages).
      </p>

      {/* Feature Pills matching 10FastFingers games cards */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
        <button
          onClick={onStartTyping}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow-xs hover:bg-purple-700 transition-colors cursor-pointer"
        >
          <Keyboard className="w-4 h-4" />
          <span>Typing Test</span>
        </button>

        <button
          onClick={onStartTyping}
          className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Competition</span>
        </button>

        <button
          onClick={onStartTyping}
          className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <Users className="w-4 h-4 text-blue-500" />
          <span>Multiplayer</span>
        </button>
      </div>
    </div>
  );
};
