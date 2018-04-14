import EventBus from "nanobus";
import io from "socket.io-client";

function noop() {}

/**
 * Get a valid server url
 *
 * @param {String} origin  (window.origin)
 * @return {String}
 */
export function serverUrl(origin) {
  if (!origin) origin = "http://127.0.0.1:3333";
  const portIndex = origin.lastIndexOf(":");
  return (portIndex === -1 ? origin : origin.slice(0, portIndex)) + ":3333";
}

export function getEvents(set, socket, debug) {
  debug = debug || noop;
  const bus = EventBus();
  const hasSocket = !!socket;

  if (hasSocket) {
    socket.on("message", function(name, data) {
      debug("remote message", name, data);
      bus.emit(name, data);
    });
  }
  const events = {};

  events.emit = function(event, name, data) {
    debug("emit", event, name, data);
    if (hasSocket) socket.send(event, name, data);
    bus.emit(event, name, data);
  };
  events.on = bus.on.bind(bus);

  return events;
}

/**
 * Init connection
 */
export function initConnection(origin) {
  const url = serverUrl(origin) + "/status";
  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(status) {
      const url = status.address;
      const socket = io(url);
      return { url: url, socket: socket };
    })
    .catch(function() {
      return { url: "" };
    });
}

export function loadAudioSet(name, baseUrl, defSet) {
  console.log("baseUrl", baseUrl);
  const url = (baseUrl || "") + "/" + name + ".audioset.json";

  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .catch(function() {
      return defSet;
    });
}
