import { beforeEach, expect, mock, test } from "bun:test";

const calls: string[] = [];
let enabled = false;
const fake = {
  unlock: async () => true,
  play: (c: string) => (enabled ? (calls.push(c), { stop() {}, ended: Promise.resolve() }) : null),
  stopAll: () => calls.push("stopAll"),
  setEnabled: (v: boolean) => {
    enabled = v;
  },
  isEnabled: () => enabled,
};
let created = 0;
mock.module("uisfx", () => ({
  createUISFX: (opts: { enabled?: boolean }) => {
    created++;
    enabled = opts.enabled ?? true;
    return fake;
  },
}));

const listeners: Record<string, (e: unknown) => void> = {};
const store: Record<string, string> = {};
function installDom() {
  const g = globalThis as Record<string, unknown>;
  g.window = {};
  g.document = {
    addEventListener: (t: string, f: (e: unknown) => void) => (listeners[t] = f),
    removeEventListener: (t: string) => delete listeners[t],
  };
  g.localStorage = { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => (store[k] = v) };
}

beforeEach(() => {
  calls.length = 0;
  enabled = false;
  created = 0;
});

test("SSR: tanpa window tidak membuat player atau suara", async () => {
  const m = await import("./sfx?ssr");
  expect(m.playSfx("select")).toBeNull();
  m.setSoundEnabled(true);
  expect(created).toBe(0);
});

test("cue ditahan sebelum gestur, jalan setelahnya; satu player", async () => {
  installDom();
  const m = await import("./sfx?client");
  m.setSoundEnabled(true); // toggle = gestur user, memainkan toggle-on
  expect(calls).toEqual(["toggle-on"]);
  m.playSfx("select");
  m.playSfx("open");
  expect(calls).toEqual(["toggle-on", "select", "open"]);
  expect(created).toBe(1);
});

test("mute menghentikan semua suara sebelum disable dan menolak cue", async () => {
  installDom();
  const m = await import("./sfx?mute");
  m.setSoundEnabled(true);
  calls.length = 0;
  m.setSoundEnabled(false);
  expect(calls).toEqual(["stopAll"]);
  expect(m.playSfx("select")).toBeNull();
  expect(m.isSoundEnabled()).toBe(false);
});
