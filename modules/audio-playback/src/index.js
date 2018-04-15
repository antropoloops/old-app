const Context = require("audio-context");
const Loader = require("./loader");
const Player = require("./player");
const Scheduler = require("./scheduler");
const Polyphony = require("./polyphony");

const ctx = Context();

function init(set, events) {
  const clips = set.clips;

  const loader = Loader(ctx, events);
  const player = Player(ctx, loader);
  loader.load(set.url, clips, set.loader.sources.audio);

  Polyphony(set, events, ctx);
  Scheduler(set, events, player);
  events.on("/audio/query/playing", function() {
    events.emit("/audio/query-results/playing", player.names());
  });
  events.emit("/audio/query-results/playing", []);
}

module.exports = init;
