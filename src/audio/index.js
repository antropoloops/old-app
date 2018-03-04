import Context from "audio-context";
import Loader from "./loader";
import Player from "./player";

const ctx = Context();

export default function init(set, events) {
  const samples = set.samples;
  const loader = new Loader(ctx, events);
  const player = new Player(ctx, loader.buffers);

  loader.load(set.url, samples, set.defaults.load);

  events.on("start", name => {
    player.play(name, samples[name], set.defaults.samples);
  });

  events.on("stop", name => {
    player.stop(name);
  });
}
