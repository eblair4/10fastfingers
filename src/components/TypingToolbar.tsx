import React, { useState } from 'react';
import { RotateCcw, Settings, ChevronDown, Check, Volume2, VolumeX } from 'lucide-react';
import { LanguageCode, TestMode } from '../types';
import { LANGUAGES } from '../data/words';

interface TypingToolbarProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  currentMode: TestMode;
  onSelectMode: (mode: TestMode) => void;
  secondsRemaining: number;
  testDuration: number;
  onChangeDuration: (sec: number) => void;
  onRestart: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const TypingToolbar: React.FC<TypingToolbarProps> = ({
  currentLanguage,
  onSelectLanguage,
  currentMode,
  onSelectMode,
  secondsRemaining,
  testDuration,
  onChangeDuration,
  onRestart,
  soundEnabled,
  onToggleSound,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];

  return (
    <div className="w-full relative select-none">
      {/* Top Toolbar matching screenshot exactly */}
      <div className="flex items-center justify-between py-1.5 px-0 text-sm sm:text-base">
        {/* Left: Language Selector matching screenshot "English (english) ▾" */}
        <div className="relative">
          <button
            onClick={() => {
              setLangDropdownOpen(!langDropdownOpen);
              setSettingsOpen(false);
            }}
            className="flex items-center gap-1.5 text-slate-700 hover:text-slate-900 transition-colors py-1 cursor-pointer font-normal"
          >
            <span>{currentLangObj.name} ({currentLangObj.nativeName})</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {langDropdownOpen && (
            <div className="absolute left-0 mt-1 w-52 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 animate-in fade-in">
              <div className="px-3 py-1 text-[11px] font-normal text-slate-400">
                Select Language
              </div>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelectLanguage(lang.code);
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors font-normal ${
                    currentLanguage === lang.code ? 'text-purple-700 bg-purple-50/50' : 'text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  {currentLanguage === lang.code && <Check className="w-3.5 h-3.5 text-purple-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Normal  Advanced  00:59  Rotate  Settings matching screenshot */}
        <div className="flex items-center space-x-5 sm:space-x-7 font-normal text-slate-700">
          {/* Normal Mode */}
          <button
            onClick={() => onSelectMode('normal')}
            className={`transition-colors cursor-pointer font-normal ${
              currentMode === 'normal'
                ? 'text-slate-900 underline underline-offset-4'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Normal
          </button>

          {/* Advanced Mode */}
          <button
            onClick={() => onSelectMode('advanced')}
            className={`transition-colors cursor-pointer font-normal ${
              currentMode === 'advanced'
                ? 'text-slate-900 underline underline-offset-4'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Advanced
          </button>

          {/* Timer: plain text matching screenshot */}
          <span className="font-normal text-slate-800 tracking-normal font-sans text-sm sm:text-base">
            {formatTimer(secondsRemaining)}
          </span>

          {/* Reload / Restart Button */}
          <button
            onClick={onRestart}
            title="Restart typing test (Press Tab to restart)"
            className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer p-0.5"
            aria-label="Restart test"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <div className="relative">
            <button
              onClick={() => {
                setSettingsOpen(!settingsOpen);
                setLangDropdownOpen(false);
              }}
              title="Test settings"
              className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer p-0.5"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {settingsOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-xl shadow-xl p-3.5 z-50 text-slate-800 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2.5">
                  <span className="font-medium text-xs text-slate-600">Settings</span>
                  <button
                    onClick={() => setSettingsOpen(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                {/* Duration */}
                <div className="mb-3">
                  <span className="text-xs text-slate-600 block mb-1.5 font-normal">Test Duration</span>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    {[30, 60, 120].map((dur) => (
                      <button
                        key={dur}
                        onClick={() => {
                          onChangeDuration(dur);
                          setSettingsOpen(false);
                        }}
                        className={`py-1 rounded-md text-center transition-colors font-normal ${
                          testDuration === dur
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {dur}s
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sound toggle */}
                <div className="flex items-center justify-between py-1.5 border-t border-slate-100">
                  <span className="text-xs text-slate-700 flex items-center gap-1.5 font-normal">
                    {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-purple-600" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
                    Key Clicks Sound
                  </span>
                  <button
                    onClick={onToggleSound}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      soundEnabled ? 'bg-purple-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        soundEnabled ? 'translate-x-4.5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Faint Purple Divider Line matching screenshot */}
      <div className="w-full h-[1px] bg-purple-200/50 mt-1 mb-6 sm:mb-8" />
    </div>
  );
};
