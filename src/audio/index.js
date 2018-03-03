const ctx = require("audio-context")();

export default function init(set, events) {
  const samples = set.samples;
  const buffers = {};
  const sources = {};
  const destination = ctx.destination;

  loadSamples(samples, buffers, events);

  events.on("start", name => {
    sources[name] = play(samples[name], buffers[name], destination);
  });

  events.on("stop", name => {
    const source = sources[name];
    if (source) {
      source.stop();
      source[name] = null;
    }
  });
}

function play(sample, buffer, destination) {
  if (!buffer) return;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(destination);
  source.start();
  return source;
}

function loadSamples(samples, buffers, events) {
  const names = Object.keys(samples);

  events.emit("audio.load", names);

  const promises = names.map(name => {
    const sample = samples[name];
    return sample.audioUrl
      ? fetch(sample.audioUrl)
          .then(response => response.arrayBuffer())
          .then(audioData => ctx.decodeAudioData(audioData))
          .then(buffer => {
            buffers[name] = buffer;
            events.emit("audio.loaded", name);
          })
      : Promise.resolve(null);
  });
  return Promise.all(promises);
}
