export default class Loader {
  constructor(ctx, events) {
    this.ctx = ctx;
    this.events = events;
    this.buffers = {};
  }

  get(name) {
    return this.buffers[name];
  }

  load(baseUrl, samples, defaults) {
    const names = Object.keys(samples);
    this.events.emit("audio.load-all", names);

    const promises = names.map(name => {
      const sample = samples[name];
      const url = baseUrl + sample.filename + defaults.audioFileExt;
      // this.events.emit("audio.load-file", name, url);
      return fetch(url)
        .then(response => response.arrayBuffer())
        .then(audioData => this.ctx.decodeAudioData(audioData))
        .then(buffer => {
          this.events.emit("audio.loaded-file", name);
          this.buffers[name] = buffer;
        });
    });
    return Promise.all(promises).then(buffers => {
      this.events.emit("audio.loaded-all");
      return buffers;
    });
  }
}
