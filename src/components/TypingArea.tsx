import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WordItem, TestStatus, TestMode, LanguageCode, TestResult, TimePoint } from '../types';
import { playKeyClick } from '../utils/audio';

interface TypingAreaProps {
  words: WordItem[];
  currentWordIndex: number;
  testStatus: TestStatus;
  secondsRemaining: number;
  testDuration: number;
  soundEnabled: boolean;
  language: LanguageCode;
  mode: TestMode;
  onStartTest: () => void;
  onFinishTest: (result: TestResult) => void;
  onWordCompleted: (isCorrect: boolean, typedText: string) => void;
  onLiveStatUpdate: (stats: { effectiveWpm: number; accuracy: number; correctWords: number; errors: number }) => void;
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  words,
  currentWordIndex,
  testStatus,
  secondsRemaining,
  testDuration,
  soundEnabled,
  language,
  mode,
  onStartTest,
  onFinishTest,
  onWordCompleted,
  onLiveStatUpdate,
}) => {
  const [currentInput, setCurrentInput] = useState("");
  const [isFocused, setIsFocused] = useState(true);

  // References
  const inputRef = useRef<HTMLInputElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const wordElementsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Performance tracking refs
  const correctWordsRef = useRef<number>(0);
  const incorrectWordsRef = useRef<number>(0);
  const correctCharsRef = useRef<number>(0);
  const incorrectCharsRef = useRef<number>(0);
  const totalKeystrokesRef = useRef<number>(0);
  const modificationsRef = useRef<number>(0);
  const lastCharTimeRef = useRef<number>(0);
  const mscListRef = useRef<number[]>([]);

  // Time series for results chart
  const timePointsRef = useRef<TimePoint[]>([]);
  const startTimeRef = useRef<number | null>(null);

  // Auto-focus on mount and when test restarts
  useEffect(() => {
    inputRef.current?.focus();
  }, [words, testStatus]);

  // Reset counters when testStatus becomes idle
  useEffect(() => {
    if (testStatus === 'idle') {
      correctWordsRef.current = 0;
      incorrectWordsRef.current = 0;
      correctCharsRef.current = 0;
      incorrectCharsRef.current = 0;
      totalKeystrokesRef.current = 0;
      modificationsRef.current = 0;
      lastCharTimeRef.current = 0;
      mscListRef.current = [];
      timePointsRef.current = [];
      startTimeRef.current = null;
      setCurrentInput("");
      if (wordsContainerRef.current) {
        wordsContainerRef.current.scrollTop = 0;
      }
    }
  }, [testStatus, words]);

  // Periodic performance sampling for WPM chart
  useEffect(() => {
    if (testStatus !== 'running') return;

    const interval = setInterval(() => {
      const elapsed = testDuration - secondsRemaining;
      if (elapsed <= 0) return;

      const elapsedMinutes = Math.max(elapsed / 60, 0.016);
      // Double word multiplier calculated internally
      const effectiveWords = correctWordsRef.current * 2;
      const effectiveWpm = Math.round(effectiveWords / elapsedMinutes);
      const rawWpm = Math.round(correctWordsRef.current / elapsedMinutes);

      const avgMsc = mscListRef.current.length > 0
        ? Math.round(mscListRef.current.reduce((a, b) => a + b, 0) / mscListRef.current.length)
        : 150;

      timePointsRef.current.push({
        second: elapsed,
        wpm: effectiveWpm,
        rawWpm: rawWpm,
        errors: incorrectWordsRef.current,
        modifications: modificationsRef.current,
        msc: avgMsc,
      });

      mscListRef.current = [];
    }, 1000);

    return () => clearInterval(interval);
  }, [testStatus, secondsRemaining, testDuration]);

  // Finish test on timer expiry
  useEffect(() => {
    if (testStatus === 'running' && secondsRemaining <= 0) {
      const elapsedMinutes = testDuration / 60;
      const effectiveWords = correctWordsRef.current * 2;
      const effectiveWpm = Math.round(effectiveWords / elapsedMinutes);
      const rawWpm = Math.round(correctWordsRef.current / elapsedMinutes);
      const totalChars = correctCharsRef.current + incorrectCharsRef.current;
      const accuracy = totalChars > 0 ? Math.round((correctCharsRef.current / totalChars) * 100) : 100;

      const result: TestResult = {
        effectiveWpm,
        rawWpm,
        correctWords: correctWordsRef.current,
        effectiveWords,
        incorrectWords: incorrectWordsRef.current,
        correctChars: correctCharsRef.current,
        incorrectChars: incorrectCharsRef.current,
        totalKeystrokes: totalKeystrokesRef.current,
        accuracy,
        elapsedSeconds: testDuration,
        testDuration,
        timePoints: timePointsRef.current,
        language,
        mode,
        date: new Date().toLocaleDateString(),
      };

      onFinishTest(result);
    }
  }, [secondsRemaining, testStatus, testDuration, language, mode, onFinishTest]);

  // Smooth line scrolling:
  // Words on line 1 and line 2 stay visible.
  // When active word reaches line 2 (or beyond), scroll up so the active line is at the top
  // and the next line is clearly visible below it. All words remain available and not hidden!
  useEffect(() => {
    const container = wordsContainerRef.current;
    const activeElem = wordElementsRef.current[currentWordIndex];
    const firstElem = wordElementsRef.current[0];

    if (!container || !activeElem || !firstElem) return;

    const firstWordTop = firstElem.offsetTop;
    const activeWordTop = activeElem.offsetTop;
    const lineDiff = activeWordTop - firstWordTop;

    // Each line is ~56px. If lineDiff is > 30px, active word is on line 2 (or lower)
    if (lineDiff > 30) {
      // Scroll so current line sits comfortably at the top, leaving the next line in view
      container.scrollTo({
        top: lineDiff - 4,
        behavior: 'smooth',
      });
    } else {
      container.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [currentWordIndex]);

  // Handle typing input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (testStatus === 'finished') return;

    const value = e.target.value;

    // Start test automatically on first keystroke
    if (testStatus === 'idle') {
      onStartTest();
      startTimeRef.current = performance.now();
      lastCharTimeRef.current = performance.now();
    }

    const now = performance.now();
    if (lastCharTimeRef.current > 0) {
      const delta = now - lastCharTimeRef.current;
      if (delta < 2000) {
        mscListRef.current.push(delta);
      }
    }
    lastCharTimeRef.current = now;

    // Check for Space (word completion)
    if (value.endsWith(" ")) {
      const trimmedTyped = value.trim();
      if (trimmedTyped.length === 0) {
        setCurrentInput("");
        return;
      }

      const targetWord = words[currentWordIndex]?.text || "";
      const isWordCorrect = trimmedTyped === targetWord;

      totalKeystrokesRef.current += trimmedTyped.length + 1;

      if (isWordCorrect) {
        correctWordsRef.current += 1;
        correctCharsRef.current += targetWord.length + 1;
        if (soundEnabled) playKeyClick(false);
      } else {
        incorrectWordsRef.current += 1;
        let localCorrect = 0;
        let localIncorrect = 0;
        for (let i = 0; i < Math.max(trimmedTyped.length, targetWord.length); i++) {
          if (trimmedTyped[i] === targetWord[i]) {
            localCorrect++;
          } else {
            localIncorrect++;
          }
        }
        correctCharsRef.current += localCorrect;
        incorrectCharsRef.current += localIncorrect + 1;
        if (soundEnabled) playKeyClick(true);
      }

      // Live stats calculation
      const elapsed = Math.max(1, testDuration - secondsRemaining);
      const elapsedMinutes = elapsed / 60;
      const effectiveWords = correctWordsRef.current * 2;
      const liveWpm = Math.round(effectiveWords / elapsedMinutes);
      const totalChars = correctCharsRef.current + incorrectCharsRef.current;
      const liveAcc = totalChars > 0 ? Math.round((correctCharsRef.current / totalChars) * 100) : 100;

      onLiveStatUpdate({
        effectiveWpm: liveWpm,
        accuracy: liveAcc,
        correctWords: correctWordsRef.current,
        errors: incorrectWordsRef.current,
      });

      onWordCompleted(isWordCorrect, trimmedTyped);
      setCurrentInput("");
      return;
    }

    // Normal typing within word
    const prevLen = currentInput.length;
    const newLen = value.length;

    if (newLen < prevLen) {
      modificationsRef.current += 1;
    } else {
      totalKeystrokesRef.current += (newLen - prevLen);
      if (soundEnabled) {
        const targetWord = words[currentWordIndex]?.text || "";
        const charIndex = newLen - 1;
        const isCharMatch = value[charIndex] === targetWord[charIndex];
        playKeyClick(!isCharMatch);
      }
    }

    setCurrentInput(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' && currentInput.length === 0) {
      e.preventDefault();
    }
  };

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
    setIsFocused(true);
  }, []);

  return (
    <div
      onClick={focusInput}
      className="relative w-full bg-transparent cursor-text select-none focus:outline-hidden py-1"
    >
      {/* Hidden high-performance typing input */}
      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        className="absolute inset-0 opacity-0 pointer-events-none z-10"
        aria-label="Typing test input area"
      />

      {/* Focus Lost Indicator */}
      {!isFocused && (
        <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] rounded-lg flex items-center justify-center z-20">
          <div className="bg-white/95 text-slate-700 text-xs font-normal px-4 py-1.5 rounded-full shadow-md border border-slate-200 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Click or press any key to focus</span>
          </div>
        </div>
      )}

      {/* Words Container: matching screenshot with Courier Prime, normal font weight, and keeping all words visible */}
      <div
        ref={wordsContainerRef}
        className="h-[148px] sm:h-[160px] overflow-hidden leading-[54px] sm:leading-[60px] text-[26px] sm:text-[29px] md:text-[31px] font-typewriter font-normal tracking-normal px-0 py-1 transition-all"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex flex-wrap items-baseline gap-x-3.5 sm:gap-x-4">
          {words.map((word, wIdx) => {
            const isCurrent = wIdx === currentWordIndex;
            const isFinished = wIdx < currentWordIndex;

            if (isCurrent) {
              // Active Word: render character-by-character with exact yellow highlight on cursor character
              const targetChars = word.text.split("");
              const typedChars = currentInput.split("");
              const maxLen = Math.max(targetChars.length, typedChars.length);

              return (
                <span
                  key={word.id}
                  ref={(el) => {
                    wordElementsRef.current[wIdx] = el;
                  }}
                  className="inline-flex items-baseline relative font-normal"
                >
                  {Array.from({ length: maxLen }).map((_, cIdx) => {
                    const targetChar = targetChars[cIdx];
                    const typedChar = typedChars[cIdx];
                    const isCursor = cIdx === typedChars.length;

                    // Typed characters within active word
                    if (cIdx < typedChars.length) {
                      if (cIdx < targetChars.length) {
                        const isMatch = typedChar === targetChar;
                        return (
                          <span
                            key={cIdx}
                            className={`font-normal ${
                              isMatch
                                ? 'text-slate-900'
                                : 'text-red-600 bg-red-100/90 px-0.5 rounded-xs'
                            }`}
                          >
                            {targetChar}
                          </span>
                        );
                      } else {
                        // Extra incorrect character
                        return (
                          <span
                            key={cIdx}
                            className="text-red-600 bg-red-100/90 px-0.5 rounded-xs font-normal"
                          >
                            {typedChar}
                          </span>
                        );
                      }
                    }

                    // Cursor character (exact light yellow highlight with amber left edge as in image.png)
                    if (isCursor) {
                      return (
                        <span
                          key={cIdx}
                          className="bg-[#fef08a] border-l-2 border-[#d97706] text-slate-900 font-normal px-0.5"
                        >
                          {targetChar || "\u00A0"}
                        </span>
                      );
                    }

                    // Untyped characters in the active word
                    return (
                      <span key={cIdx} className="text-slate-800 font-normal">
                        {targetChar}
                      </span>
                    );
                  })}
                </span>
              );
            }

            if (isFinished) {
              // Completed word:
              // - Correct: green text, font-normal
              // - Missed: highlighted in red without crossing (NO line-through), as requested!
              const wasCorrect = word.status === 'correct';
              return (
                <span
                  key={word.id}
                  ref={(el) => {
                    wordElementsRef.current[wIdx] = el;
                  }}
                  className={`inline-block font-normal transition-colors ${
                    wasCorrect
                      ? 'text-[#16a34a]'
                      : 'text-red-600 bg-red-50/70 px-0.5 rounded-xs'
                  }`}
                >
                  {word.text}
                </span>
              );
            }

            // Pending upcoming words (font-normal, clean slate color matching screenshot)
            return (
              <span
                key={word.id}
                ref={(el) => {
                  wordElementsRef.current[wIdx] = el;
                }}
                className="inline-block text-slate-800 font-normal transition-colors"
              >
                {word.text}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
