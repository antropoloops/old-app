const Context = require("audio-context");
const Loader = require("./loader");
const Player = require("./player");

const ctx = Context();

function init(set, events) {
  const samples = set.samples;
  const config = set.config;

  const loader = Loader(ctx, events);
  const player = Player(ctx, loader);

  loader.load(set.url, samples, config.load);

  events.on("unmount", function() {
    console.log("unmount");
    player.stopAll();
  });

  events.on("/sample/start", function(name) {
    player.play(name, samples[name], config.samples);
  });

  events.on("/sample/stop", function(name) {
    player.stop(name);
  });
}

module.exports = init;
