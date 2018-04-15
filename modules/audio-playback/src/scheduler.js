const BEATS = 1;

function schedule(bpm, startedAt, now) {
  const factor = bpm / (60 * BEATS);
  const absolute = now - startedAt;
  const inBeats = absolute * factor;
  const mod = inBeats % 1;
  const offsetTime = (1 - mod) / factor;
  return offsetTime;
}

/**
 * Audio scheduler. It uses `audio.quantization` audioset param
 *
 * @param {*} set
 * @param {*} events
 * @param {*} player
 */
function Scheduler(set, events, player) {
  const ctx = player.ctx;
  const clips = set.clips;
  const isQuantize = set.audio.quantize !== false;
  const bpm = set.audio.bpm || 120;
  var startedAt = null;

  events.on("/clip/stop-all", function() {
    player.names().forEach(function(name) {
      events.emit("/clip/stop", name);
    });
    startedAt = null;
    events.emit("/audio/all-stopped", name);
  });

  events.on("/clip/start", function(name) {
    if (startedAt === null) {
      startedAt = ctx.currentTime;
      const play = player.play(name, clips[name], startedAt);
      events.emit("/audio/started", name, play);
    } else {
      const now = ctx.currentTime;
      const when = isQuantize ? now + schedule(bpm, startedAt, now) : now;
      const play = player.play(name, clips[name], when);
      events.emit("/audio/started", name, play);
    }
  });

  events.on("/clip/stop", function(name) {
    const now = ctx.currentTime;
    const when = isQuantize ? now + schedule(bpm, startedAt, now) : now;
    const stop = player.stop(name, when);
    events.emit("/audio/stopped", name, stop);
  });
}

module.exports = Scheduler;
