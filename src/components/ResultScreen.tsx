import React, { useEffect, useState } from 'react';
import { RotateCcw, Share2, History, Timer, Flame, FlaskConical, CheckCircle2, Sparkles, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TestResult } from '../types';
import { WpmChart } from './WpmChart';

interface ResultScreenProps {
  result: TestResult;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fire celebratory confetti on high scores
    if (result.effectiveWpm >= 50) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981'],
        });
      } catch {
        // Fallback if canvas is not ready
      }
    }
  }, [result.effectiveWpm]);

  // Keyboard shortcut: Press Tab or Enter to restart immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        onRestart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRestart]);

  const handleShare = () => {
    const text = `⌨️ FastFingers 2× Typing Test Result:
🚀 WPM: ${result.effectiveWpm} (Adjusted 2× Multiplier)
🎯 Accuracy: ${result.accuracy}%
📝 Words: ${result.correctWords} completed (scored as ${result.effectiveWords})
⏱️ Time: ${result.testDuration}s
Try the double-word typing speed test on FastFingers!`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-8 px-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-white/95 rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-8">
        {/* Top Control Icons matching screenshot 161331 */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-100 mb-6">
          <div className="flex items-center space-x-6 sm:space-x-8 text-slate-600">
            <button
              title="Test History"
              className="p-1.5 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <History className="w-5 h-5" />
            </button>
            <button
              title="Timer Settings"
              className="p-1.5 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Timer className="w-5 h-5" />
            </button>
            <button
              title="Streak & Energy"
              className="p-1.5 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Flame className="w-5 h-5 text-amber-500" />
            </button>
            <button
              title="Diagnostic Mode"
              className="p-1.5 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <FlaskConical className="w-5 h-5 text-purple-600" />
            </button>
          </div>

          <button
            onClick={onRestart}
            title="Restart Test (or press Enter)"
            className="p-2 text-slate-600 hover:text-purple-700 hover:bg-purple-50 rounded-full transition-all active:scale-95 flex items-center gap-1.5 text-xs font-semibold"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Restart</span>
          </button>
        </div>

        {/* Primary Giant Stats matching screenshot 161331 */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
          <div className="flex items-baseline space-x-8 sm:space-x-14">
            {/* WPM */}
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase mb-1">
                WORDS PER MINUTE
              </div>
              <div className="text-5xl sm:text-7xl font-extrabold text-[#7c3aed] font-sans tracking-tight">
                {result.effectiveWpm} <span className="text-2xl sm:text-3xl font-semibold lowercase text-purple-600/80">wpm</span>
              </div>
            </div>

            {/* Accuracy */}
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase mb-1">
                ACCURACY
              </div>
              <div className="text-5xl sm:text-7xl font-extrabold text-[#7c3aed] font-sans tracking-tight">
                {result.accuracy}%
              </div>
            </div>
          </div>

          {/* Test Info Label on Right */}
          <div className="text-xs sm:text-sm font-medium text-slate-400 text-right">
            Typing Test - Time {result.testDuration}s - {result.language.charAt(0).toUpperCase() + result.language.slice(1)}
          </div>
        </div>

        {/* Dashed Separator */}
        <div className="w-full border-b border-dashed border-slate-200 mb-6" />

        {/* Interactive WPM Performance Curve Chart matching screenshot 161331 */}
        <div className="mb-8">
          <WpmChart timePoints={result.timePoints} duration={result.testDuration} />
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 mb-8">
          <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Correct Words</span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-600 font-mono">
              {result.effectiveWords}
            </span>
          </div>

          <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Wrong Words</span>
            <span className="text-xl sm:text-2xl font-bold text-rose-500 font-mono">
              {result.incorrectWords}
            </span>
          </div>

          <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Keystrokes</span>
            <span className="text-base sm:text-lg font-bold text-slate-700 font-mono">
              <span className="text-emerald-600">{result.correctChars}</span> | <span className="text-rose-500">{result.incorrectChars}</span>
              <span className="text-xs text-slate-400 block font-normal">Total: {result.totalKeystrokes}</span>
            </span>
          </div>

          <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
            <span className="text-xl sm:text-2xl font-bold text-slate-800 font-mono">
              {result.testDuration}s
            </span>
          </div>
        </div>

        {/* Bottom Logo & Action Buttons matching screenshot 161356 */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md border-2 border-purple-600 flex items-center justify-center font-bold text-purple-700 text-xs">
              IO
            </div>
            <span className="font-bold text-sm tracking-wider text-slate-700">
              FASTFINGERS
            </span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {/* Share Button matching screenshot 161356 */}
            <button
              onClick={handleShare}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Share'}</span>
            </button>

            {/* Try Again / Restart Button */}
            <button
              onClick={onRestart}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
