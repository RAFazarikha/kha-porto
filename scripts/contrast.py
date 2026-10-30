#!/usr/bin/env python3
"""Cek kontras WCAG AA pasangan token tiap tema di app/globals.css (tanpa dependensi)."""
import math, re, sys, pathlib

css = pathlib.Path(__file__).resolve().parent.parent.joinpath("app/globals.css").read_text()

def oklch_to_rgb(L, C, H):
    a, b = C * math.cos(math.radians(H)), C * math.sin(math.radians(H))
    l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
    m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
    s_ = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
    r = 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_
    g = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_
    bl = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_
    return [min(1, max(0, v)) for v in (r, g, bl)]  # linear

def lum(rgb):
    r, g, b = rgb
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def ratio(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)

def parse(v):
    m = re.match(r"oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)", v.strip())
    return oklch_to_rgb(*map(float, m.groups())) if m else None

themes = {}
for sel, body in re.findall(r"\n(:root, \.\w+|\.\w+) \{(.*?)\n\}", css, re.S):
    name = sel.split(".")[-1]
    themes[name] = dict(re.findall(r"--([\w-]+): (oklch\([^)]*\))", body))

PAIRS = [
    ("foreground", "background"), ("card-foreground", "card"),
    ("primary-foreground", "primary"), ("secondary-foreground", "secondary"),
    ("muted-foreground", "background"), ("muted-foreground", "card"), ("muted-foreground", "muted"),
    ("accent-foreground", "accent"), ("primary", "background"), ("primary", "card"),
    ("destructive-foreground", "destructive"), 
]
bad = 0
for t, tok in themes.items():
    for fg, bg in PAIRS:
        if fg in tok and bg in tok:
            r = ratio(parse(tok[fg]), parse(tok[bg]))
            if r < 4.5:
                bad += 1
                print(f"FAIL {t:8} {fg} on {bg}: {r:.2f}")
print("done, gagal:", bad)
sys.exit(1 if bad else 0)
