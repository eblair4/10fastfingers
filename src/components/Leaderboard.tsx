import React, { useState } from 'react';
import { Trophy, Award, Clock, ChevronDown, Check } from 'lucide-react';
import { LeaderboardEntry, ActivityUser, TestResult } from '../types';
import { LEADERBOARD_DATA, ACTIVITY_DATA } from '../data/mockData';

interface LeaderboardProps {
  lastResult?: TestResult | null;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ lastResult }) => {
  const [rankingFilter, setRankingFilter] = useState<'normal' | 'advanced'>('normal');

  // If user completed a test, integrate their result into the leaderboard list!
  const displayRankings: LeaderboardEntry[] = React.useMemo(() => {
    let list = [...LEADERBOARD_DATA];
    if (lastResult) {
      const userEntry: LeaderboardEntry = {
        rank: 0,
        username: 'You (Current Test)',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=YouCurrent',
        wpm: lastResult.effectiveWpm,
        timeAgo: 'Just now',
        isUser: true,
      };
      list.push(userEntry);
      list.sort((a, b) => b.wpm - a.wpm);
      list = list.slice(0, 10).map((item, idx) => ({ ...item, rank: idx + 1 }));
    }
    return list;
  }, [lastResult]);

  const getTrophyColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-amber-500';
      case 2:
        return 'text-slate-400';
      case 3:
        return 'text-amber-700';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <section id="leaderboard" className="w-full max-w-6xl mx-auto py-8 sm:py-12 px-4 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {/* Left Column: WPM Ranking matching screenshot 161404 */}
        <div className="bg-white/70 backdrop-blur-xs rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-xs">
          <div className="text-center mb-5">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800">WPM Ranking</h3>
            <div className="flex items-center justify-center space-x-4 mt-2 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1 text-slate-700">
                <span className="text-sm">文A</span> English
              </span>
              <button
                onClick={() => setRankingFilter(rankingFilter === 'normal' ? 'advanced' : 'normal')}
                className="hover:text-purple-700 underline capitalize cursor-pointer"
              >
                {rankingFilter} Mode
              </button>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-2.5 border-b border-slate-100 px-2">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-6">Typist</div>
            <div className="col-span-3 text-right">WPM (2×)</div>
            <div className="col-span-2 text-right">Time</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100/80 text-sm">
            {displayRankings.map((entry) => (
              <div
                key={`${entry.rank}-${entry.username}`}
                className={`grid grid-cols-12 items-center py-2 px-2 hover:bg-purple-50/40 rounded-lg transition-colors ${
                  entry.isUser ? 'bg-purple-100/60 font-semibold text-purple-950 border border-purple-200/80' : 'text-slate-700'
                }`}
              >
                {/* Rank # / Trophy */}
                <div className="col-span-1 flex justify-center items-center">
                  {entry.rank <= 3 ? (
                    <Trophy className={`w-4 h-4 ${getTrophyColor(entry.rank)}`} />
                  ) : (
                    <span className="text-xs font-semibold text-slate-500">{entry.rank}</span>
                  )}
                </div>

                {/* Avatar & Username */}
                <div className="col-span-6 flex items-center space-x-2.5 overflow-hidden pr-2">
                  <img
                    src={entry.avatar}
                    alt={entry.username}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 shrink-0"
                  />
                  <span className="truncate text-xs sm:text-sm font-medium">
                    {entry.username}
                  </span>
                </div>

                {/* WPM Score (doubled) */}
                <div className="col-span-3 text-right font-mono font-bold text-slate-900 text-sm sm:text-base">
                  {entry.wpm}
                </div>

                {/* Time Ago */}
                <div className="col-span-2 text-right text-xs text-slate-400 font-mono">
                  {entry.timeAgo}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Tests Taken matching screenshot 161404 */}
        <div className="bg-white/70 backdrop-blur-xs rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-xs">
          <div className="text-center mb-5">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Tests Taken</h3>
            <div className="flex items-center justify-center space-x-4 mt-2 text-xs font-semibold text-slate-500">
              <span className="font-mono">Σ 24,019</span>
              <span className="flex items-center gap-1 text-slate-600">
                <Clock className="w-3.5 h-3.5" /> 24 hours
              </span>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-2.5 border-b border-slate-100 px-2">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-8">Typist</div>
            <div className="col-span-3 text-right">Tests</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100/80 text-sm">
            {ACTIVITY_DATA.map((user) => (
              <div
                key={user.rank}
                className="grid grid-cols-12 items-center py-2 px-2 hover:bg-purple-50/40 rounded-lg transition-colors text-slate-700"
              >
                {/* Rank # / Trophy */}
                <div className="col-span-1 flex justify-center items-center">
                  {user.rank <= 3 ? (
                    <Trophy className={`w-4 h-4 ${getTrophyColor(user.rank)}`} />
                  ) : (
                    <span className="text-xs font-semibold text-slate-500">{user.rank}</span>
                  )}
                </div>

                {/* Avatar & Username */}
                <div className="col-span-8 flex items-center space-x-2.5 overflow-hidden pr-2">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 shrink-0"
                  />
                  <span className="truncate text-xs sm:text-sm font-medium">
                    {user.username}
                  </span>
                </div>

                {/* Test Count */}
                <div className="col-span-3 text-right font-mono font-bold text-slate-900 text-sm sm:text-base">
                  {user.testsCount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
