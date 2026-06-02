# Design

The design language for this portfolio. Lives alongside the code so changes to one are reviewed with the other.

## Voice

Personal, made-by-hand. The site should feel like a craftsperson's bench: tools laid out, things slightly imperfect, every detail intentional. Avoid corporate template polish. Errors of taste are recoverable; blandness is not.

## Palette — monochrome-first

Strict black and white at the foundation. Saturated colour only appears in motion (rainbow text shadow, hero cover, sequin background) and never as a brand fill. The reasoning: when everything is loud, nothing is. Reserving colour for moments makes those moments earn the eye.

Tokens (see [app/globals.css](../app/globals.css)):

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#ffffff` | Page background |
| `--fg` | `#000000` | Primary ink |
| `--fg-soft` | `rgba(0,0,0,0.6)` | Secondary text |
| `--fg-muted` | `rgba(0,0,0,0.2)` | Tertiary text / hairlines |
| `--card` | `#000000` | Inverted surface |
| `--stroke` | `#e5e5e5` | Borders, dividers |

Dark-mode tokens are defined in case the toggle is reintroduced — they are not currently shipped.

## Type

- **Family:** SF Pro Display (system stack fallback to `-apple-system`, Geist, Helvetica Neue). Display and body share the family — distinction is by weight and tracking.
- **Tracking:** `-0.02em` globally, including pseudo-elements. The site looks wrong without it; headings open up too much.
- **Scale tokens:** `--t-11` through `--t-96` on a hand-picked scale, not a strict modular ratio.

## Spacing

4/8-based scale tokens `--s-4` … `--s-120`. Use these as named handles in design conversations rather than raw pixels.

## Motion — earned, not decorative

Motion is reserved for moments where it carries meaning (entry rhythm, interactive feedback, hero ambient life). It is never used to mask weak composition. Every animation respects `prefers-reduced-motion` — see the `@media (prefers-reduced-motion: reduce)` block at the bottom of `globals.css`.

Named motion patterns in `globals.css`:

- **`rise-in` / `drift-up` / `drift-down`** — scroll-driven entry via `animation-timeline: view()`. Gracefully no-ops where unsupported (Chromium 115+ only).
- **`butterfly-in`** — cards converge from the stage centre and disperse to their absolute positions. Each card sets `--bf-x`, `--bf-y`, `--bf-r` for the from-offset.
- **`hero-parallax`** — scroll-bound hero translate.
- **`marquee`** — 35s linear infinite, content duplicated for a seamless loop. Pauses on hover.
- **`rainbow-cycle`** — 18s ambient HSL drift on the hero cover.
- **`rainbow-text-shift`** — gradient text translation, paired with stacked-shadow word reveal (`.hop-word`).
- **`sequinShimmer`** — 30s hue rotation on the sequin fabric background.
- **`cta-wipe`** — left-edge bounce after the fill completes (see comment in `globals.css`).

Easing defaults: `cubic-bezier(0.22, 1, 0.36, 1)` (gentle ease-out) for organic moves, `cubic-bezier(0.2, 0, 0, 1)` for snappy interactions.

## Signature components

| Component | File | Idea |
| --- | --- | --- |
| `KineticType` | [app/components/KineticType.tsx](../app/components/KineticType.tsx) | Per-character animated display type |
| `HopText` | [app/components/HopText.tsx](../app/components/HopText.tsx) | Per-word lift with stacked rainbow drop shadow on hover. Hit area is padded outward so the lift can't escape the cursor. |
| `TiltCover` | [app/components/TiltCover.tsx](../app/components/TiltCover.tsx) | Pointer-driven 3D tilt |
| `SequinBackground` | [app/components/SequinBackground.tsx](../app/components/SequinBackground.tsx) | Three layered CSS gradients (highlight dot + cell mask + conic rainbow) + slow hue rotation |
| `SkeletonView` | [app/components/SkeletonView.tsx](../app/components/SkeletonView.tsx) | Press `K` to render the page as a hairline wireframe — hairline outlines, ink text, crossed-out media placeholders |
| `SystemSound` | [app/components/SystemSound.tsx](../app/components/SystemSound.tsx) | UI sound system |
| `Nav` / `Footer` / `Pill` / `FloatingCta` / `FloatingContact` | `app/components/` | Chrome |
| `PhotoTrail` / `LayoutGrid` / `WorkCard` / `Container` | `app/components/` | Layout primitives |

## CTA — the layered "stacked-plate" button

Used on the home hero. Three nested layers compose one button:

1. **Outer halo** — `backdrop-blur` + faint cyan→purple→coral gradient at low alpha. Refracts the page behind it.
2. **Middle glass ring** — 1.5px padded ring with a top-light gradient. Reads as a frosted bezel.
3. **Inner core** — 48px solid `#0A0A0F`, white uppercase display text.

On hover the halo saturates, the stack lifts 1px, and the inner shadow under the core intensifies. See `CTA_*_CLASS` constants in [app/page.tsx](../app/page.tsx).

## Skeleton mode

Press `K` on any page to switch into wireframe mode. All text collapses to a single ink colour, every box gets a hairline outline, media becomes a crossed-out placeholder, originally-filled regions become hatched. Implemented purely in CSS (`body.skeleton-mode` + `data-sketch-fill`) and toggled by [app/components/SkeletonView.tsx](../app/components/SkeletonView.tsx).

## Accessibility

- `prefers-reduced-motion: reduce` is honoured for every animation — they all no-op cleanly.
- `::selection` inverts to `--fg` on `--bg`.
- Tracking is uniform so headings don't lose contrast.
- Scroll-anchored sections have `scroll-margin-top: 96px` so the sticky nav doesn't clip them.

## Anti-patterns

Things that look fine but break the design:

- Adding brand colour fills. Colour is a moment, not a fill.
- Using rounded-3xl on dense type. The black/white palette wants tighter geometry.
- Tightening tracking only on headings — global `-0.02em` is load-bearing for the whole composition.
- Animating without a `prefers-reduced-motion` fallback.
- Putting case-study assets anywhere other than `public/case-study/<slug>/`.
