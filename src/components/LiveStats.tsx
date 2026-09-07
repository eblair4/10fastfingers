import React from 'react';
import { Zap, Target, Clock } from 'lucide-react';

interface LiveStatsProps {
  wpm: number;
  accuracy: number;
  secondsRemaining: number;
  correctWords: number;
  errors: number;
  testStatus: 'idle' | 'running' | 'finished';
}

export const LiveStats: React.FC<LiveStatsProps> = ({
  wpm,
  accuracy,
  secondsRemaining,
  correctWords,
  errors,
  testStatus,
}) => {
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 px-2 sm:px-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/70 backdrop-blur-xs border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-xs text-slate-700">
        {/* WPM */}
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              WPM
            </div>
            <div className="text-lg font-bold text-purple-700 font-mono leading-none">
              {wpm}
            </div>
          </div>
        </div>

        {/* Accuracy */}
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Accuracy
            </div>
            <div className="text-lg font-bold text-slate-800 font-mono leading-none">
              {accuracy}%
            </div>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Time
            </div>
            <div className="text-lg font-bold text-slate-800 font-mono leading-none">
              {formatTime(secondsRemaining)}
            </div>
          </div>
        </div>

        {/* Completed Words & Errors */}
        <div className="flex items-center space-x-4 text-xs font-medium text-slate-500 border-l border-slate-200/80 pl-3">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Words</span>
            <span className="text-slate-800 font-semibold font-mono">
              {correctWords}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Errors</span>
            <span className={`font-semibold font-mono ${errors > 0 ? 'text-rose-600' : 'text-slate-700'}`}>
              {errors}
            </span>
          </div>
        </div>

        {/* Status Hint */}
        <div className="text-xs text-slate-400 hidden lg:block">
          {testStatus === 'idle' && 'Type the first word to begin'}
          {testStatus === 'running' && 'Keep typing... Press space between words'}
        </div>
      </div>
    </div>
  );
};
