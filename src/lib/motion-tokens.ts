/**
 * Motion identities, one per business area.
 *
 * The areas share one design system, so they are told apart by how things
 * move: the curve, the pace and whether anything overshoots. Components take
 * their timing from here instead of inventing values locally. The matching
 * CSS custom properties for scroll reveals and links live in globals.css under
 * `[data-motion-area]`.
 */

type Bezier = [number, number, number, number];

/** Use in place of any transition when the visitor prefers reduced motion. */
export const INSTANT = { duration: 0 } as const;

/** Supply Chain: precise and sequential. Symmetric curve, even steps, no overshoot. */
export const supplyMotion = {
  ease: [0.65, 0, 0.35, 1] as Bezier,
  /** One hop of the record between neighbouring stages, in seconds. */
  hop: 0.3,
  /** Added for every further stage the record passes on a longer move. */
  hopExtra: 0.12,
  /** The white active fill wiping across a stage. */
  fill: 0.24,
  /** How long before the record lands the fill starts to arrive. */
  fillLead: 0.12,
  /** Detail text clearing as the record leaves. */
  clear: 0.12,
  /** Delay between the detail rows filling in. */
  rowStep: 0.07,
  detail: 0.26,
  /** Pixels the detail text travels as it enters. */
  shift: 12,
} as const;

/** ZeenTheCyber: responsive. Starts immediately and settles fast. */
export const cyberMotion = {
  ease: [0.2, 0, 0, 1] as Bezier,
  /** A flip the visitor asked for. */
  flip: 0.44,
  /** A flip the mosaic makes by itself: slower, so it reads as background. */
  ambientFlip: 0.72,
  flipEase: [0.45, 0, 0.2, 1] as Bezier,
  /** Delay between tiles in one ambient group. */
  tileStep: 0.16,
  /** Time from one ambient group to the next. Most of it is stillness. */
  beat: 2.2,
  /** The tile under a pointer or finger gives slightly, then recovers. */
  pressScale: 0.97,
  press: 0.12,
  detail: 0.24,
  /** Explanation lines rise this many pixels as they enter. */
  detailRise: 6,
  /** Wait after a requested flip starts, so the text lands as the tile does. */
  detailLead: 0.12,
  /** Delay between the role line and the sentence below it. */
  detailStep: 0.08,
} as const;

/** Creative Studio: tactile. Springs with a small, quickly damped overshoot. */
export const studioMotion = {
  /** Cards and frames settling into a new arrangement. */
  arrange: { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 },
  /** Stickers and stamps: lighter, slightly livelier. */
  sticker: { type: 'spring', stiffness: 380, damping: 20, mass: 0.6 },
  /** A new sticker lands just after the card starts to move. */
  stickerDelay: 0.08,
  /** Copy entering after the arrangement has mostly settled. */
  copyDelay: 0.2,
  copyStep: 0.05,
  /** Delay between the lines of a headline. */
  lineStep: 0.07,
  copy: { duration: 0.34, ease: [0.22, 0.61, 0.36, 1] as Bezier },
} as const;

/** Supporting pages and shared chrome: calm. */
export const calmMotion = {
  ease: [0.22, 0.61, 0.36, 1] as Bezier,
  duration: 0.32,
} as const;
