'use client';

import Image from 'next/image';
import { Fragment, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { INSTANT, cyberMotion } from '@/lib/motion-tokens';
import { securityShowcaseItems as items, type SecurityShowcaseItem } from './showcase-data';
import styles from './security-showcase.module.css';

const TILE_COUNT = 42;
const COLUMNS = 6;
// Fixed positions keep the mosaic and its initial HTML stable.
const initialTextTiles = new Set([3, 5, 9, 14, 16, 20, 21, 27, 29, 31, 36, 40]);
const tileItems = Array.from({ length: TILE_COUNT }, (_, index) => {
  const item = items[(index * 5 + Math.floor(index / 6)) % items.length];
  return { index, item, label: Math.floor(index / 6) % 2 ? item.buttonLabel : item.framework };
});
// The mosaic leaves a tile alone for this long after the visitor turns it.
const VISITOR_HOLD_MS = 6000;

type TileState = {
  /** The label face is showing instead of the portrait. */
  label: boolean;
  /** When the tile last turned, from performance.now(). Zero until it has. */
  since: number;
  /** Stagger delay of an ambient turn in seconds; null when the visitor turned it. */
  delay: number | null;
};
type Selection = { index: number; by: 'none' | 'press' | 'keys' };

// Different row, different column and a few tiles between: far enough apart
// that a group reads as scattered across the grid.
function apart(a: number, b: number) {
  const rows = Math.abs(Math.floor(a / COLUMNS) - Math.floor(b / COLUMNS));
  const columns = Math.abs(a % COLUMNS - b % COLUMNS);
  return rows > 0 && columns > 0 && rows + columns > 3;
}

/** One ambient beat: two or three scattered tiles turn, one after another. */
function ambientBeat(tiles: TileState[], position: number, now: number, reserved: (number | null)[]) {
  const size = position % 3 === 2 ? 3 : 2;
  const labels = tiles.filter(tile => tile.label).length;
  // Lean each group towards the starting balance of labels and portraits.
  const toPortrait = Math.min(size, Math.max(0, Math.ceil((size + labels - initialTextTiles.size) / 2)));
  const quota = { portrait: toPortrait, label: size - toPortrait };
  // Whatever has shown its face longest turns first. Ties follow a repeatable
  // sequence whose starting point jumps around the grid from beat to beat.
  const start = (position * 11 + 2) % TILE_COUNT;
  const rank = (index: number) => (index - start + TILE_COUNT) % TILE_COUNT;
  const queue = tiles.map((_, index) => index)
    .filter(index => !reserved.includes(index) && !(tiles[index].delay === null && now - tiles[index].since < VISITOR_HOLD_MS))
    .sort((a, b) => tiles[a].since - tiles[b].since || rank(a) - rank(b));
  const group: number[] = [];
  for (const index of queue) {
    const next = tiles[index].label ? 'portrait' : 'label';
    if (quota[next] === 0 || !group.every(other => apart(index, other))) continue;
    quota[next]--;
    if (group.push(index) === size) break;
  }
  return tiles.map((tile, index) => {
    const order = group.indexOf(index);
    return order < 0 ? tile : { label: !tile.label, since: now, delay: order * cyberMotion.tileStep };
  });
}

function RoleDetail({ item }: { item: SecurityShowcaseItem }) {
  return <>
    <strong>{item.role}<span>{item.framework}</span></strong>
    <p>{item.explanation}</p>
  </>;
}

export function SecurityShowcase() {
  const reduced = usePrefersReducedMotion();
  const id = useId();
  const [tiles, setTiles] = useState<TileState[]>(() => tileItems.map(tile => ({ label: initialTextTiles.has(tile.index), since: 0, delay: 0 })));
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [selection, setSelection] = useState<Selection>({ index: 0, by: 'none' });
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const mosaic = useRef<HTMLDivElement>(null);
  const hovered = useRef<number | null>(null);
  const pointerInteraction = useRef(false);
  const tick = useRef(0);
  const hasSelected = selection.by !== 'none';
  const role = tileItems[selection.index].item;

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    update();
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    const element = mosaic.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Depending on the selection restarts the interval, so the mosaic stays
  // still for a full beat after every choice the visitor makes.
  useEffect(() => {
    if (focused || !visible || !inView || reduced) return;
    const selected = selection.by === 'none' ? null : selection.index;
    const timer = window.setInterval(() => {
      const position = tick.current++;
      const now = performance.now();
      const reserved = [hovered.current, selected];
      setTiles(previous => ambientBeat(previous, position, now, reserved));
    }, cyberMotion.beat * 1000);
    return () => window.clearInterval(timer);
  }, [focused, visible, inView, reduced, selection]);

  function select(index: number) {
    const now = performance.now();
    setSelection({ index, by: 'press' });
    setTiles(previous => previous.map((tile, position) => position === index ? { label: !tile.label, since: now, delay: null } : tile));
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    setFocused(true);
    let next = index;
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % TILE_COUNT; break;
      case 'ArrowLeft': next = (index + TILE_COUNT - 1) % TILE_COUNT; break;
      case 'ArrowDown': next = (index + COLUMNS) % TILE_COUNT; break;
      case 'ArrowUp': next = (index + TILE_COUNT - COLUMNS) % TILE_COUNT; break;
      case 'Home': next = 0; break;
      case 'End': next = TILE_COUNT - 1; break;
      default: return;
    }
    event.preventDefault();
    setSelection({ index: next, by: 'keys' });
    buttons.current[next]?.focus({ preventScroll: true });
  }

  // A requested flip is quick and immediate; an ambient one is slower and
  // waits its turn within the group.
  const flipTransition = (tile: TileState) => tile.delay === null
    ? { duration: cyberMotion.flip, ease: cyberMotion.flipEase }
    : { duration: cyberMotion.ambientFlip, delay: tile.delay, ease: cyberMotion.flipEase };
  // Only text that replaces an earlier choice enters; the first render is still.
  const detailFrom = hasSelected && !reduced ? { opacity: 0, y: cyberMotion.detailRise } : false;
  // A pressed tile is mid-flip, so the text waits to land with it. Arrow keys
  // move the selection without turning anything, so the text follows at once.
  const detailLead = selection.by === 'press' ? cyberMotion.detailLead : 0;
  const detailTransition = (line: number) => reduced ? INSTANT
    : { duration: cyberMotion.detail, ease: cyberMotion.ease, delay: detailLead + line * cyberMotion.detailStep };

  return <section className={styles.showcase} aria-label="Cybersecurity people and frameworks">
    <p id={`${id}-instructions`} className={styles.srOnly}>Select a tile to turn it over and explore a security role. Use arrow keys to move between tiles. Animation pauses while a tile has keyboard focus.</p>
    <div ref={mosaic} className={styles.mosaic} role="group" aria-label="Interactive portrait and framework mosaic" aria-describedby={`${id}-instructions`}
      onPointerDownCapture={() => { pointerInteraction.current = true; setFocused(false); }}
      onKeyDownCapture={() => { pointerInteraction.current = false; setFocused(true); }}
      onFocusCapture={() => setFocused(!pointerInteraction.current)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          pointerInteraction.current = false;
          setFocused(false);
        }
      }}>
      {tileItems.map(tile => {
        const state = tiles[tile.index];
        return <button key={tile.index} type="button" className={styles.tile}
          ref={element => { buttons.current[tile.index] = element; }}
          tabIndex={selection.index === tile.index ? 0 : -1}
          aria-label={`${tile.item.role}: ${tile.label}. ${state.label ? 'Show portrait' : 'Show framework'}`}
          aria-controls={`${id}-detail`} aria-pressed={state.label}
          data-selected={hasSelected && selection.index === tile.index || undefined}
          onMouseEnter={() => { hovered.current = tile.index; }} onMouseLeave={() => { hovered.current = null; }}
          onClick={() => select(tile.index)} onKeyDown={event => navigate(event, tile.index)}>
          {/* The press response lives on the flipper so one system owns its transform. */}
          <motion.span className={styles.flipper} initial={false}
            animate={{ rotateY: state.label ? 180 : 0 }}
            whileTap={reduced ? undefined : { scale: cyberMotion.pressScale }}
            transition={reduced ? INSTANT : { rotateY: flipTransition(state), scale: { duration: cyberMotion.press, ease: cyberMotion.ease } }}>
            <span className={`${styles.face} ${styles.portrait}`} aria-hidden="true">
              <Image src={tile.item.portrait} alt="" fill sizes="(max-width: 700px) 16vw, 105px"
                loading="eager" draggable={false} />
            </span>
            <span className={`${styles.face} ${styles.framework}`} aria-hidden="true"><span>{tile.label}</span></span>
          </motion.span>
        </button>;
      })}
    </div>
    <div className={styles.detail}>
      {hasSelected && <span className={styles.marker} style={{ '--column': selection.index % COLUMNS } as CSSProperties} aria-hidden="true" />}
      {items.map(item => <div key={item.id} className={styles.detailSizer} aria-hidden="true"><RoleDetail item={item} /></div>)}
      <div className={styles.detailContent} id={`${id}-detail`} aria-live="polite" aria-atomic="true">
        {/* Keyed by role: a new role mounts fresh and enters, the same role stays put, and no old text lingers. */}
        <Fragment key={role.id}>
          <motion.strong initial={detailFrom} animate={{ opacity: 1, y: 0 }} transition={detailTransition(0)}>{role.role}<span>{role.framework}</span></motion.strong>
          <motion.p initial={detailFrom} animate={{ opacity: 1, y: 0 }} transition={detailTransition(1)}>{role.explanation}</motion.p>
        </Fragment>
      </div>
    </div>
  </section>;
}
