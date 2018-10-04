import reduce, { initSession, startClip } from "./index";

describe("reduce", () => {
  describe("Init reduce", () => {
    it("can init an empty set", () => {
      const audioset = {};
      const session = reduce(undefined, initSession(audioset));
      expect(session.audioset).toBe(audioset);
    });

    it("can not init an initialized set", () => {
      const audioset = {};
      const session = reduce({ audioset }, initSession({}));
      expect(session.audioset).toBe(audioset);
    });
  });

  describe("Start clip", () => {
    const loop1 = { groupId: "loops", sync: 1 };
    const loop2 = { groupId: "loops", sync: 1 };
    const audioset = { clips: { loop1, loop2 } };

    it("starts inmediately if was stop", () => {
      const initial = { audioset };
      const session = reduce(initial, startClip(100, "loop1"));
      expect(session).toEqual({
        audioset,
        startedAt: 100,
        now: 100,
        clips: {
          running: [],
          toStart: [{ clipId: "loop1", time: 100 }],
          toStop: []
        }
      });
    });

    it("starts only if clip exists", () => {
      const session = reduce({ audioset }, startClip(100, "nothing"));
      expect(session).toEqual({ audioset });
    });
    it("stops if same group", () => {
      const initial = reduce({ audioset }, startClip(1, "loop1"));
      const session = reduce(initial, startClip(2, "loop2"));
      expect(session).toEqual({ audioset });
    });
  });
});
