import { createUISFX, type CueName, type PlayingSFX, type UISFXPlayer } from "uisfx";

// Pack "scifi": ping holografik bersih, cocok untuk portofolio AI/fullstack bertema neon.
export const SFX_PACK = "scifi";
const KEY = "kha:sound";

let ui: UISFXPlayer | undefined;
let unlocked = false;
const subs = new Set<() => void>();

// Preferensi tersimpan; default AKTIF (opt-out), audio terbuka pada gestur pertama.
function stored(): boolean {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw).enabled !== false : true;
  } catch {
    return true;
  }
}

function player(): UISFXPlayer | null {
  if (typeof window === "undefined") return null; // SSR: tanpa audio
  ui ??= createUISFX({ pack: SFX_PACK, volume: 0.7, enabled: stored(), preferences: { key: KEY } });
  return ui;
}

// Buka Web Audio dari gestur asli pertama; cue sebelum itu dibuang, tidak diantre.
function onGesture(e: Event) {
  if (!e.isTrusted) return;
  void player()?.unlock();
  unlocked = true;
  for (const t of ["pointerdown", "keydown"]) document.removeEventListener(t, onGesture, true);
}
if (typeof window !== "undefined") {
  for (const t of ["pointerdown", "keydown"]) document.addEventListener(t, onGesture, true);
}

// Hover delegasi: hanya mouse (bukan touch/pen), hanya saat masuk elemen baru, hanya target penting.
// Kartu lebih pelan dari navbar. Cooldown 60ms bawaan uisfx mencegah spam.
const HOVER = "[data-nav-link],[data-nav-cta],[data-nav-icon],[data-nav-logo],[data-hover-sfx]";
function onHover(e: PointerEvent) {
  if (e.pointerType !== "mouse" || !(e.target instanceof Element)) return;
  const el = e.target.closest(HOVER);
  if (!el || (e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) return;
  playSfx("hover", el.hasAttribute("data-hover-sfx") ? 0.07 : undefined);
}
if (typeof window !== "undefined") document.addEventListener("pointerover", onHover);

export function playSfx(cue: CueName, volume?: number): PlayingSFX | null {
  if (!unlocked) return null;
  return player()?.play(cue, volume === undefined ? undefined : { volume }) ?? null; // play() bisa null (mute/cooldown)
}

export function setSoundEnabled(on: boolean) {
  const p = player();
  if (!p) return;
  if (!on) p.stopAll(); // senyap seketika
  p.setEnabled(on);
  subs.forEach((f) => f());
  if (on) {
    unlocked = true; // toggle dipicu gestur user
    void p.unlock();
    playSfx("toggle-on");
  }
}

export const isSoundEnabled = () => (ui ? ui.isEnabled() : stored());
export const subscribeSound = (f: () => void) => {
  subs.add(f);
  return () => void subs.delete(f);
};

// Dipakai tes: reset state modul.
export function __resetSfx() {
  ui = undefined;
  unlocked = false;
  subs.clear();
}
