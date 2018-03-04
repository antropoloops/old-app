export default class Player {
  constructor(ctx, buffers) {
    this.ctx = ctx;
    this.sources = {};
    this.buffers = buffers;
  }

  play(name, sample, config) {
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

  stop(name) {
    const source = this.sources[name];
    if (source) {
      source.stop();
      source[name] = null;
    }
  }
}
