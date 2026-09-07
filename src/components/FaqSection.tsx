import React, { useState } from 'react';
import { ChevronDown, Globe, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types';
import { LANGUAGES } from '../data/words';

interface FaqSectionProps {
  onSelectLanguage: (lang: LanguageCode) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onSelectLanguage }) => {
  const [showAllLangs, setShowAllLangs] = useState(false);

  return (
    <section className="w-full max-w-6xl mx-auto py-10 sm:py-16 px-4 border-t border-slate-200/60 text-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
        {/* Left Column matching screenshot 161415 */}
        <div className="md:col-span-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
            English<br />Typing Test
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            The English typing test uses the most common everyday words, measuring how fast and fluidly you type in daily communication.
            There are no awkward capitalizations or complex symbols to slow you down, establishing a consistent global benchmark.
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            Most people type between 40 and 60 words per minute. Practicing daily helps develop muscle memory and improve both speed and accuracy.
          </p>
        </div>

        {/* Right Column matching screenshot 161415 */}
        <div className="md:col-span-8 space-y-8">
          {/* What the test measures */}
          <div>
            <h3 className="text-lg sm:text-xl font-normal text-slate-900 mb-2">
              What the test measures
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              You type for one minute. The result presents your words per minute (WPM), your accuracy, and the total count of correct and wrong keystrokes.
              The words come directly from the most frequent vocabulary of the language, keeping the challenge close to actual typing.
            </p>
          </div>

          {/* FAQs */}
          <div>
            <h3 className="text-lg sm:text-xl font-normal text-slate-900 mb-4">
              Frequently asked questions about typing
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-slate-800 mb-1.5">
                  What is a good typing speed?
                </h4>
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                  The standard average typist manages around 40 words per minute. 60 to 80 WPM is a solid everyday speed, 80 to 100 WPM is fast, and 100+ puts you among elite touch typists.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1.5">
                  How is accuracy calculated?
                </h4>
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                  Accuracy measures the percentage of correct characters typed out of the total characters entered during the test.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show all languages interactive expansion */}
      <div className="mt-12 text-center">
        <button
          onClick={() => setShowAllLangs(!showAllLangs)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors py-2 px-4 rounded-full hover:bg-purple-50 cursor-pointer"
        >
          <Globe className="w-4 h-4" />
          <span>{showAllLangs ? 'Hide languages' : 'Show supported languages'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAllLangs ? 'rotate-180' : ''}`} />
        </button>

        {showAllLangs && (
          <div className="mt-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto animate-in fade-in">
            <p className="text-xs text-slate-500 mb-4">
              Select any language below to practice with native vocabulary lists and 2× multiplier scoring:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelectLanguage(lang.code);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-slate-700 transition-all text-left"
                >
                  <span className="text-base">{lang.flag}</span>
                  <div>
                    <span className="block font-semibold text-slate-900">{lang.name}</span>
                    <span className="text-[10px] text-slate-400 capitalize">{lang.nativeName}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
