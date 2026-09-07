export type TestStatus = 'idle' | 'running' | 'finished';

export type TestMode = 'normal' | 'advanced';

export type LanguageCode = 'english' | 'spanish' | 'french' | 'german' | 'kinyarwanda';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export interface WordItem {
  id: number;
  text: string;
  status: 'pending' | 'current' | 'correct' | 'incorrect';
  typed: string;
}

export interface TimePoint {
  second: number;
  wpm: number; // Effective WPM (with 2x multiplier)
  rawWpm: number;
  errors: number;
  modifications: number;
  msc: number; // milliseconds per character
}

export interface TestResult {
  effectiveWpm: number; // Doubled WPM
  rawWpm: number; // Actual un-doubled WPM
  correctWords: number; // Actual correct words
  effectiveWords: number; // correctWords * 2
  incorrectWords: number;
  correctChars: number;
  incorrectChars: number;
  totalKeystrokes: number;
  accuracy: number; // percentage (0-100)
  elapsedSeconds: number;
  testDuration: number; // e.g. 60
  timePoints: TimePoint[];
  language: LanguageCode;
  mode: TestMode;
  date: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  wpm: number;
  timeAgo: string;
  isUser?: boolean;
}

export interface ActivityUser {
  rank: number;
  username: string;
  avatar: string;
  testsCount: number;
}
