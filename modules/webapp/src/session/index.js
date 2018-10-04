// Actions
export const INIT_SESSION = "/session/init";
export const initSession = audioset => ({
  type: INIT_SESSION,
  payload: audioset
});

export const START_CLIP = "/session/start-clip";
export const startClip = (time, clipId) => ({
  type: START_CLIP,
  payload: { time, clipId }
});

export const STOP_SESSION = "/session/stop";
export const stopSession = () => ({ type: STOP_SESSION });

// Reducer
export default function reducer(session = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case INIT_SESSION:
      return init(session, payload);

    case START_CLIP:
      return start(session, payload);

    default:
      return session;
  }
}

function create(audioset, startedAt, now, running, toStart, toStop) {
  return { audioset, startedAt, now, clips: { running, toStart, toStop } };
}

function init(session, audioset) {
  if (session.audioset) return session;
  return create(audioset);
}

function start(session, { time, clipId }) {
  const { audioset } = session;
  if (!audioset) return session;

  const clip = audioset.clips[clipId];
  if (!clip) return session;

  if (session.time === undefined) {
    return create(audioset, time, time, [], [{ clipId, time }], []);
  }
}
