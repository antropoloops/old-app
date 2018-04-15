/**
 * Create the Audio Player
 * @param {AudioContext} ctx - Audio Context
 * @param {Map<String,AudioBuffer>} buffers - A map of names to audio buffers
 */
function Player(ctx, loader) {
  const sources = {};

  function play(name, sample, config) {
    const buffer = loader.get(name);
    if (!buffer || sources[name]) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);

    if (sample.loop === true || (sample.loop === undefined && config.loop)) {
      source.loop = true;
    }

    source.start();
    sources[name] = source;
    return source;
  }

  function stop(name) {
    const source = sources[name];
    if (source) {
      source.stop();
      delete sources[name];
    }
  }

  function names() {
    return Object.keys(sources);
  }

  function stopAll() {
    names().forEach(function(name) {
      sources[name].stop();
    });
  }
  return {
    play: play,
    stop: stop,
    stopAll: stopAll,
    names: names
  };
}

module.exports = Player;
