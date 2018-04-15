/**
 * Create the Audio Player
 * @param {AudioContext} ctx - Audio Context
 * @param {Map<String,AudioBuffer>} buffers - A map of names to audio buffers
 */
function Player(ctx, buffers) {
  const sources = {};
  var count = 0;

  const player = { ctx: ctx };

  player.play = function(name, clip, when) {
    const buffer = buffers.get(name);
    if (!buffer || sources[name]) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);

    if (clip.audio.loop === true) {
      source.loop = true;
    }

    when = when || ctx.currentTime;
    source.start(when);
    sources[name] = source;
    count++;
    return { clip: name, when: when, voices: count };
  };

  player.stop = function(name, when) {
    when = when || ctx.currentTime;
    const source = sources[name];
    if (source) {
      source.stop(when);
      delete sources[name];
      count--;
      return { clip: name, when: when, voices: count };
    }
    return { voices: count };
  };

  player.names = function() {
    return Object.keys(sources);
  };

  player.stopAll = function() {
    player.names().forEach(function(name) {
      sources[name].stop();
    });
  };
  return player;
}

module.exports = Player;
