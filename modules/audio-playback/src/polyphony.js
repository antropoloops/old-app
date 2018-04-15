/**
 * Ensure there's only trackMaxVoices (currently 1 is supported) per track
 *
 * @param {*} set
 * @param {*} events
 */
function Polyphony(set, events) {
  const maxVoices = set.audio && set.audio.trackMaxVoices;
  if (typeof maxVoices !== "number") return;
  if (maxVoices > 1) throw Error("Max voices > 1 not implemented yet.");

  const tracks = {};

  events.on("/audio/started", function(name) {
    const clip = set.clips[name];
    const track = clip && clip.audio && clip.audio.track;
    if (track !== undefined) {
      const current = tracks[track];
      if (current && current !== track) {
        events.emit("/clip/stop", current);
      }
      tracks[track] = name;
    }
  });

  events.on("/audio/stopped", function(name) {
    const clip = set.clips[name];
    const track = clip && clip.audio && clip.audio.track;
    if (track) tracks[track] = undefined;
  });
}

module.exports = Polyphony;
