const Context = require("audio-context");
const Loader = require("./loader");
const Player = require("./player");

const ctx = Context();

function init(set, events) {
  const clips = set.clips;

  const loader = Loader(ctx, events);
  const player = Player(ctx, loader);

  loader.load(set.url, clips, set.loader.sources.audio);

  events.on("unmount", function() {
    console.log("unmount");
    player.stopAll();
  });

  events.on("/clip/stop-all", function() {
    player.names().forEach(function(name) {
      events.emit("/audio/stopped", name);
    });
    events.emit("/audio/all-stopped", name);
  });

  events.on("/clip/start", function(name) {
    player.play(name, clips[name], set.audio.defaults);
    events.emit("/audio/started", name, ctx.currentTime);
  });

  events.on("/clip/stop", function(name) {
    player.stop(name);
    events.emit("/audio/stopped", name, ctx.currentTime);
  });
}

module.exports = init;
