# Vendored fonts

Not in `public/`. These are build-time inputs: `next/font/local` fingerprints
and emits the woff2 files itself, and the OG image reads the TTF off disk.
Serving them from `public/` would ship a second, uncached copy.

| File                        | Used by                          | Why it is vendored                                                                        |
| --------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------- |
| `JetBrainsMono-Bold.ttf`    | `app/[lang]/opengraph-image.tsx` | Satori needs a real font buffer; fetching one at build time makes CI need network access. |
| `JetBrainsMono-Box-*.woff2` | `app/[lang]/layout.tsx`          | Google Fonts' `latin` subset has no box-drawing or block glyphs.                          |

## The box-drawing subset

The site is drawn almost entirely in `█ ░ ═ ║ ╔ ╗ ╚ ╝ ─ │ ┌ ┐ └ ┘`. None of
those are in the `latin` subset that `next/font/google` requests, so they were
falling through to the auto-generated `local(Arial)` fallback — a proportional
font at `size-adjust: 134.59%`. Mixed with real JetBrains Mono spaces on the
same line, every column drifted and the art sheared apart.

These two files are the same typeface cut down to only the ranges we draw with:
207 glyphs, 3.6 KB each, all at the 600/1000em advance the rest of the family
uses.

### Regenerating

Source: [JetBrains/JetBrainsMono](https://github.com/JetBrains/JetBrainsMono)
(OFL-1.1), `fonts/ttf/JetBrainsMono-{Regular,Bold}.ttf`.

```bash
pip install "fonttools[woff]"

for w in Regular Bold; do
  pyftsubset "JetBrainsMono-$w.ttf" \
    --unicodes="U+2190-2193,U+2500-25FF" \
    --layout-features="" --no-hinting --desubroutinize \
    --flavor=woff2 --output-file="JetBrainsMono-Box-$w.woff2"
done
```

`tests/glyph-coverage.test.ts` asserts the source only uses characters these
ranges cover, so adding art with an uncovered glyph fails CI instead of
shipping broken.

## Licence

JetBrains Mono is licensed under the SIL Open Font License 1.1. Subsetting and
redistribution are permitted; the font is not sold on its own and carries no
reserved font name.
