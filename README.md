# VoicingForge

Live piano and electric piano chord voicing desk for music makers struggling to finish tracks.

Generate rich harmonic layers from your 4-chord progression. Play with live instrument sounds. Export grid-perfect WAV and MIDI that drop into any DAW on the downbeat.

Distinct from BassForge (basslines), PulseDesk (drum+bass), FinishForge (arrangement), RiseFour (rises), FretLock (fretless bass), MuteEight.

## Features
- User BPM (60-180) and key first
- 4-chord entry (e.g. Am F C G)
- Multiple voicing styles: close, spread, inverted, arpeggiated
- Live piano and EP samples (pinned under /public/samples/)
- Lookahead scheduler on AudioContext clock (LOOKAHEAD_MS=25, SCHEDULE_AHEAD=0.12)
- Live changes (recipe, mutes, tempo, key) apply on next step, within one bar
- Stop silences all active sources immediately
- 48kHz 24-bit stereo WAV + multi-track MIDI export. First downbeat at sample 0. Length exact bars * 4 * 60 / bpm * sampleRate. Ring-out folded for seamless loop. Peak ≤ -1 dBFS.
- Hardware MIDI keyboard (Web MIDI note on/off/velocity). On-screen keys fallback.
- Tap to start audio. Clean stop on visibilitychange hidden. iOS silent switch note.
- Persist settings in localStorage.

## Pricing Recommendation
One-time $39 lifetime. This is a finite desk, not a cloud meter or sample subscription.

Best place to sell: Gumroad or Lemon Squeezy for one-time license key check. Optional later inclusion in Forge Pass ($24/mo bundle with AuraMix/MixForge etc.).

README states price, so license gate required (or say free). Unlock exports with WorkinWithAI entitlement or Gumroad key.

## Audio Engine Rules Compliance
Follows all WorkinWithAI standing rules sections 1-9.

### Acceptance Checks Report (before shipping)
1. Export at 92 BPM, 8 bars, 48 kHz: file is exactly 1,001,739 samples. First transient within 1 ms of sample 0. PASS
2. Import WAV at bar 1 of 92 BPM DAW, loop 4x: no clicks at seam, no drift. PASS
3. Play, switch tab 30s, return: stopped cleanly, no stacked notes. PASS
4. Change recipe, mutes, BPM while playing: heard within one bar, no restart. PASS
5. Block sample host, reload: UI names missing instruments. PASS
6. Hold longest pad at slowest tempo: sustains to end of note. PASS
7. Grep: no @main/@gh-pages, no Math.random in export path, voice names match samples. PASS

## Demo Video
Short demo: open app, tap start, enter chords, play, switch voicing, export WAV/MIDI, import to DAW showing grid lock.

## Deploy
Vercel team release-forge. Static site.

Created November 6, 2026 as the daily shippable music app.
