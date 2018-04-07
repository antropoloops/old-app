/**
 * Create the Audio Player
 * @param {AudioContext} ctx - Audio Context
 * @param {Map<String,AudioBuffer>} buffers - A map of names to audio buffers
 */
function Player(ctx, buffers) {
  this.ctx = ctx;
  this.sources = {};
  this.buffers = buffers;

  function play(name, sample, config) {
    const buffer = this.buffers[name];
    if (!buffer) return;

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.ctx.destination);

    if (sample.loop === true || (sample.loop === undefined && config.loop)) {
      source.loop = true;
    }

    source.start();
    this.sources[name] = source;
    return source;
  }

  function stop(name) {
    const source = this.sources[name];
    if (source) {
      source.stop();
      source[name] = null;
    }
  }

  function stopAll() {
    Object.keys(this.sources).forEach(function(name) {
      this.sources[name].stop();
    });
  }
  return {
    play: play,
    stop: stop,
    stopAll: stopAll
  };
}

module.exports = Player;
