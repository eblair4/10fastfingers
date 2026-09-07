import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TypingToolbar } from './components/TypingToolbar';
import { TypingArea } from './components/TypingArea';
import { LiveStats } from './components/LiveStats';
import { ResultScreen } from './components/ResultScreen';
import { Leaderboard } from './components/Leaderboard';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { LanguageCode, TestMode, TestStatus, WordItem, TestResult } from './types';
import { generateWordItems } from './data/words';

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>('english');
  const [mode, setMode] = useState<TestMode>('normal');
  const [testDuration, setTestDuration] = useState<number>(60);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const [testStatus, setTestStatus] = useState<TestStatus>('idle');
  const [words, setWords] = useState<WordItem[]>(() => generateWordItems('english', 'normal'));
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [lastResult, setLastResult] = useState<TestResult | null>(null);

  // Live stats
  const [liveStats, setLiveStats] = useState({
    effectiveWpm: 0,
    accuracy: 100,
    correctWords: 0,
    errors: 0,
  });

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Initialize or reset test
  const handleRestart = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    startTimeRef.current = null;
    setSecondsRemaining(testDuration);
    setTestStatus('idle');
    setWords(generateWordItems(language, mode));
    setCurrentWordIndex(0);
    setLiveStats({
      effectiveWpm: 0,
      accuracy: 100,
      correctWords: 0,
      errors: 0,
    });
    setLastResult(null);
  }, [language, mode, testDuration]);

  // Restart on language or mode change
  useEffect(() => {
    handleRestart();
  }, [language, mode, testDuration, handleRestart]);

  // High-precision countdown timer
  const startTimer = useCallback(() => {
    if (testStatus === 'running') return;

    setTestStatus('running');
    startTimeRef.current = performance.now();

    timerRef.current = window.setInterval(() => {
      if (!startTimeRef.current) return;
      const elapsedSec = (performance.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, Math.ceil(testDuration - elapsedSec));
      setSecondsRemaining(remaining);

      if (remaining <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    }, 100);
  }, [testDuration, testStatus]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Word completed callback
  const handleWordCompleted = useCallback((isCorrect: boolean, typedText: string) => {
    setWords((prev) => {
      const next = [...prev];
      if (next[currentWordIndex]) {
        next[currentWordIndex] = {
          ...next[currentWordIndex],
          status: isCorrect ? 'correct' : 'incorrect',
          typed: typedText,
        };
      }
      if (next[currentWordIndex + 1]) {
        next[currentWordIndex + 1] = {
          ...next[currentWordIndex + 1],
          status: 'current',
        };
      }
      return next;
    });

    setCurrentWordIndex((idx) => idx + 1);
  }, [currentWordIndex]);

  // Live stat updates from TypingArea
  const handleLiveStatUpdate = useCallback((stats: { effectiveWpm: number; accuracy: number; correctWords: number; errors: number }) => {
    setLiveStats(stats);
  }, []);

  // Test finished
  const handleTestFinished = useCallback((result: TestResult) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTestStatus('finished');
    setLastResult(result);
  }, []);

  // Global Tab key to focus or restart
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (testStatus === 'finished') {
          e.preventDefault();
          handleRestart();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [testStatus, handleRestart]);

  return (
    <div className="min-h-screen flex flex-col bg-[#edf5fa] text-slate-800">
      {/* Top Navigation matching 10FastFingers screenshot 161425 */}
      <Navbar
        currentLanguage={language}
        onSelectLanguage={setLanguage}
        onRestartTest={handleRestart}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center w-full">
        {/* Central Typing Test Container matching image.png */}
        {testStatus !== 'finished' ? (
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10 pb-4">
            {/* Toolbar with Language, Normal/Advanced, Timer, Restart, Settings */}
            <TypingToolbar
              currentLanguage={language}
              onSelectLanguage={setLanguage}
              currentMode={mode}
              onSelectMode={setMode}
              secondsRemaining={secondsRemaining}
              testDuration={testDuration}
              onChangeDuration={(dur) => {
                setTestDuration(dur);
                setSecondsRemaining(dur);
              }}
              onRestart={handleRestart}
              soundEnabled={soundEnabled}
              onToggleSound={() => setSoundEnabled(!soundEnabled)}
            />

            {/* The Visual Word Stream & Keyboard Capture Area */}
            <TypingArea
              words={words}
              currentWordIndex={currentWordIndex}
              testStatus={testStatus}
              secondsRemaining={secondsRemaining}
              testDuration={testDuration}
              soundEnabled={soundEnabled}
              language={language}
              mode={mode}
              onStartTest={startTimer}
              onFinishTest={handleTestFinished}
              onWordCompleted={handleWordCompleted}
              onLiveStatUpdate={handleLiveStatUpdate}
            />

            {/* Live Stats Display */}
            <LiveStats
              wpm={liveStats.effectiveWpm}
              accuracy={liveStats.accuracy}
              secondsRemaining={secondsRemaining}
              correctWords={liveStats.correctWords}
              errors={liveStats.errors}
              testStatus={testStatus}
            />
          </div>
        ) : (
          /* Result Screen matching screenshots 161331 & 161356 */
          lastResult && (
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 my-6">
              <ResultScreen
                result={lastResult}
                onRestart={handleRestart}
              />
            </div>
          )
        )}

        {/* Hero header shown below the test */}
        {testStatus !== 'finished' && (
          <div className="w-full max-w-5xl mx-auto px-4 pt-4 pb-2">
            <HeroSection onStartTyping={() => {
              const input = document.querySelector('input[aria-label="Typing test input area"]') as HTMLInputElement;
              input?.focus();
            }} />
          </div>
        )}

        {/* Community Leaderboard matching screenshot 161404 */}
        <Leaderboard lastResult={lastResult} />

        {/* FAQ & Educational Content matching screenshot 161415 */}
        <FaqSection onSelectLanguage={setLanguage} />
      </main>

      {/* Dark Navy Footer matching screenshot 161502 */}
      <Footer />
    </div>
  );
}
