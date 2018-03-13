import Context from "audio-context";
import Loader from "./loader";
import Player from "./player";

const ctx = Context();

export default function init(set) {
  const { url, samples, config } = set.data;

  const loader = new Loader(ctx, set.events);
  const player = new Player(ctx, loader.buffers);

  loader.load(url, samples, config.load);

  set.on("unmount", () => {
    console.log("unmount");
    player.stopAll();
  });

  set.events.on("start", name => {
    player.play(name, samples[name], config.samples);
  });

  set.events.on("stop", name => {
    player.stop(name);
  });
}
