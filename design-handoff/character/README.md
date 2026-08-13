# The desk character — current state

A handoff snapshot of the illustrated character in the hero of Facundo
Lizarraga's portfolio, as it looks on branch `character-scene` today.

Open **`snapshot.html`** in a browser first. It is self-contained — no server,
no build — and it is the real SVG the site ships, on the real palette. Everything
else here explains it.

---

## What it is

A hand-drawn SVG character sitting at a desk, typing into a laptop. Roughly 700
nodes, all stroked in a single navy ink on warm paper. It is not an image and not
a font — it is inline SVG, drawn live from React
(`@facundolizarraga/portfolio-characters`, published to npm from `../portfolio-characters`).

The whole scene is `aria-hidden` — it carries no information the page doesn't
also say in text.

### In the frame

- **Left**: a window looking out on drifting clouds, and a potted plant that
  sways.
- **Centre**: the character — glasses, short hair, seated, hands on the keyboard.
  Head and eyes track the cursor; eyes also drift toward whichever page section
  is in view. Blinks about every 5 seconds.
- **Right**: an open laptop on a desk, with a steaming mug beside it. The laptop
  screen runs a live terminal (see below).
- **Behind**: a 45° hatched band across the floor.

### The two states

| State      | When                                            | What it looks like                                                                                                                                                                                                                             |
| ---------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Desk**   | At rest in the hero, and again above 55% scroll | The full 858×476 scene in `snapshot.html`. Neutral brows, neutral mouth, sitting straight.                                                                                                                                                     |
| **Docked** | Past 92% of hero scroll                         | Desk, window, plant and terminal fade up and out. The character alone shrinks to 190–300px, pins to the bottom-right corner of the viewport, leans −7°, raises its brows and opens its mouth. It stays there as you read the rest of the page. |

Docking is a FLIP transition: the pieces scatter and reassemble in the corner
with a staggered "Cascada" motion.

### Entrance

On load the strokes draw themselves in over roughly two seconds — every path has
its own duration and delay so the pacing reads as hand-drawn rather than
mechanical. Flat fills fade in behind the strokes that bound them.
`prefers-reduced-motion` bakes all of it to the finished frame and stops the
ambient loops.

---

## The terminal

The laptop screen types out seven commands on a loop — `whoami`, then frontend,
backend, local LLMs, AWS, infra, CI. Content lives in
`persona.json`; only the first frame (`$ whoami`) is localised from the site's
own copy (`content/en.ts`, `content/es.ts`).

```
$ whoami
facundo lizarraga
senior full-stack
buenos aires · remote

$ ls stack/frontend        $ ls stack/backend
typescript   react         …
next.js      tanstack
tailwind     radix
```

Hard limits, because the text has to fit the screen: prompts are **22
characters**, `grid` frames take **6 lines** in two 18-char columns, `list`
frames take **3 full-width lines**.

---

## Colour

Five ink colours plus a transparent ground, all pulled from the site's tokens —
see **`palette.css`**. Short version:

| Role   | Token               | Hex         | Where it lands                  |
| ------ | ------------------- | ----------- | ------------------------------- |
| ink    | `--color-ac`        | `#244d73`   | every stroke in the drawing     |
| fill   | `--color-surface`   | `#f3f1e9`   | flat fills inside the strokes   |
| shade  | `--color-chip`      | `#d4d0c4`   | shadowed planes                 |
| tint   | `--color-surface-2` | `#e2dfd4`   | the floor hatch, leaves, clouds |
| screen | `--color-ac`        | `#244d73`   | laptop terminal text            |
| bg     | —                   | transparent | sits on the page's `#e9e7df`    |

The palette is the only thing that makes this character match this site. Swap
those six values and the same drawing becomes somebody else's.

---

## Layout

- Scene viewBox `36 44 858 476` → **aspect ratio 858/476** (~1.8:1).
- It fills its container; the hero caps that container at **620px wide**.
- Below the `sm` breakpoint (640px) it is **not rendered at all** — the hero
  becomes a single centred text column.
- In the hero grid it is the right-hand column, and the wider one
  (`1fr / 1.2fr`) at `lg` and up.

Full wiring in **`integration.md`**.

---

## Files

| File             | What it is                                                              |
| ---------------- | ----------------------------------------------------------------------- |
| `snapshot.html`  | Self-contained, openable. The real SVG on the real palette. Start here. |
| `palette.css`    | Site tokens plus the six colour roles the character consumes.           |
| `persona.json`   | The terminal script and identity, exactly as the site passes it.        |
| `integration.md` | The React usage, the hero slot, and every prop currently set.           |

## What's fixed vs. open

Fixed: the drawing itself and the six-colour contract — both live in the
`portfolio-characters` package, not this repo.

Open, and what a design pass would actually touch: the palette values, the size
and placement of the hero slot, the terminal copy, whether the docked corner
character is the right call, and the mobile story (right now: nothing).
