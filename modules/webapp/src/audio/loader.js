const GITHUB = "https://antropoloops.github.io/audiosets/";

export default class Loader {
  constructor(ctx, events) {
    this.ctx = ctx;
    this.events = events;
    this.buffers = {};
  }

  get(name) {
    return this.buffers[name];
  }

  load(baseUrl, samples, config) {
    const names = Object.keys(samples);
    this.events.emit("audio.load-all", names);

    const promises = names.map(name => {
      const sample = samples[name];
      const url = baseUrl + sample.filename + config.audioFileExt;
      return fetchLocalOrRemote(url)
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

function fetchLocalOrRemote(url) {
  if (process.env.NODE_ENV !== "production") {
    const local = url.replace(GITHUB, "http://localhost:3333/data/audiosets/");
    return fetch(local).catch(() => fetch(url));
  } else {
    return fetch(url);
  }
}
