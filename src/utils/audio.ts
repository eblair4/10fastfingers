/**
 * Lightweight mechanical key click synthesizer using Web Audio API
 */
let audioCtx: AudioContext | null = null;

export function playKeyClick(isError = false) {
  try {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioCtxClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (isError) {
      // Soft low bump for error
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } else {
      // Crisp subtle click
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 + Math.random() * 200, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.035);
    }
  } catch {
    // Graceful fallback if Web Audio is blocked or not available
  }
}
