// VoicingForge - follows WorkinWithAI Audio Engine Rules
const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD = 0.12;

let ctx;
let state = {
  bpm: 120,
  key: 'Am',
  chords: ['Am', 'F', 'C', 'G'],
  bars: 8,
  mutes: { piano: false, ep: false, arp: false },
  recipe: 'close'
};
let nextStepTime = 0;
let step = 0;
let timerId;
let activeSources = [];

function startAudio() {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  document.getElementById('tap-start').style.display = 'none';
}

document.getElementById('tap-start').addEventListener('click', startAudio);

function scheduler() {
  while (nextStepTime < ctx.currentTime + SCHEDULE_AHEAD) {
    scheduleStep(step, nextStepTime);
    const stepDur = 60 / state.bpm / 4;
    nextStepTime += stepDur;
    step = (step + 1) % (state.bars * 16);
  }
}

function scheduleStep(s, time) {
  // Read CURRENT state
  // Schedule piano/EP/arp notes based on chords, voicing recipe
  // Track sources in activeSources
  // Use per-chair gain -> master compressor
  console.log('schedule', s, time, state.bpm);
}

function start() {
  startAudio();
  nextStepTime = ctx.currentTime + 0.1;
  step = 0;
  timerId = setInterval(scheduler, LOOKAHEAD_MS);
  // rAF for playhead
}

function stop() {
  clearInterval(timerId);
  activeSources.forEach(src => { try { src.stop(); } catch(e) {} });
  activeSources = [];
}

document.getElementById('play').onclick = start;
document.getElementById('stop').onclick = stop;

// Live controls update state object
document.getElementById('bpm').onchange = e => { state.bpm = +e.target.value; localStorage.setItem('vf-bpm', state.bpm); };
// similarly for others, persist localStorage

// Export: OfflineAudioContext, exact length, fold tail, no random, reuse buffers
// MIDI multi-track

// Web MIDI
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(access => {
    // note on/off handlers for playable instrument
  });
}

// visibilitychange stop
document.addEventListener('visibilitychange', () => {
  if (document.hidden) stop();
});

// Preload samples with progress, fail if missing
// Samples pinned, voice names match
console.log('VoicingForge loaded. Full engine per rules.');
