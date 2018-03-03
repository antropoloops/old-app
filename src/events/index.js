import Events from "tiny-emitter";

export default function init(set, events) {
  if (!events) events = new Events();
}
