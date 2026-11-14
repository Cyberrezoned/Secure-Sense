'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import { securityShowcaseItems as items, type SecurityShowcaseItem } from './showcase-data';
import styles from './security-showcase.module.css';

const TILE_COUNT = 42;
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}
const readReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const serverReducedMotion = () => true;
// Fixed positions keep the mosaic and its initial HTML stable.
const initialTextTiles = new Set([3, 5, 9, 14, 16, 20, 21, 27, 29, 31, 36, 40]);
const tileItems = Array.from({ length: TILE_COUNT }, (_, index) => {
  const item = items[(index * 5 + Math.floor(index / 6)) % items.length];
  return { index, item, label: Math.floor(index / 6) % 2 ? item.buttonLabel : item.framework };
});

function RoleDetail({ item }: { item: SecurityShowcaseItem }) {
  return <>
    <strong>{item.role}<span>{item.framework}</span></strong>
    <p>{item.explanation}</p>
  </>;
}

export function SecurityShowcase() {
  // The installed Motion hook only snapshots this preference at mount.
  const reduced = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, serverReducedMotion);
  const id = useId();
  const [flipped, setFlipped] = useState<boolean[]>(() => tileItems.map(tile => initialTextTiles.has(tile.index)));
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [selected, setSelected] = useState(0);
  const [hasSelected, setHasSelected] = useState(false);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const mosaic = useRef<HTMLDivElement>(null);
  const hovered = useRef<number | null>(null);
  const pointerInteraction = useRef(false);
  const tick = useRef(0);
  const role = tileItems[selected].item;

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

  useEffect(() => {
    if (focused || !visible || !inView || reduced !== false) return;
    const advance = () => {
      const position = tick.current++;
      // A dispersed, repeatable sequence flips small groups instead of whole rows.
      setFlipped(previous => {
        const order = Array.from({ length: TILE_COUNT }, (_, offset) => (position * 11 + 2 + offset) % TILE_COUNT);
        const portrait = order.find(index => !previous[index] && hovered.current !== index);
        const framework = order.slice().reverse().find(index => previous[index] && hovered.current !== index);
        // Exchange a portrait and a label to keep the portrait-heavy composition.
        return previous.map((value, index) => index === portrait || index === framework ? !value : value);
      });
    };
    const first = window.setTimeout(advance, 650);
    const timer = window.setInterval(advance, 1450);
    return () => { window.clearTimeout(first); window.clearInterval(timer); };
  }, [focused, visible, inView, reduced]);

  function select(index: number) {
    setSelected(index);
    setHasSelected(true);
    setFlipped(previous => previous.map((value, position) => position === index ? !value : value));
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    setFocused(true);
    let next = index;
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % TILE_COUNT; break;
      case 'ArrowLeft': next = (index + TILE_COUNT - 1) % TILE_COUNT; break;
      case 'ArrowDown': next = (index + 6) % TILE_COUNT; break;
      case 'ArrowUp': next = (index + TILE_COUNT - 6) % TILE_COUNT; break;
      case 'Home': next = 0; break;
      case 'End': next = TILE_COUNT - 1; break;
      default: return;
    }
    event.preventDefault();
    setSelected(next);
    setHasSelected(true);
    buttons.current[next]?.focus({ preventScroll: true });
  }

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
        const textVisible = flipped[tile.index];
        return <button key={tile.index} type="button" className={styles.tile}
          ref={element => { buttons.current[tile.index] = element; }}
          tabIndex={selected === tile.index ? 0 : -1}
          aria-label={`${tile.item.role}: ${tile.label}. ${textVisible ? 'Show portrait' : 'Show framework'}`}
          aria-controls={`${id}-detail`} aria-pressed={textVisible}
          data-selected={hasSelected && selected === tile.index || undefined}
          onMouseEnter={() => { hovered.current = tile.index; }} onMouseLeave={() => { hovered.current = null; }}
          onClick={() => select(tile.index)} onKeyDown={event => navigate(event, tile.index)}>
          <motion.span className={styles.flipper} initial={false}
            animate={{ rotateY: textVisible ? 180 : 0 }}
            transition={{ duration: reduced ? 0 : 0.64, ease: [0.45, 0, 0.2, 1] }}>
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
      {items.map(item => <div key={item.id} className={styles.detailSizer} aria-hidden="true"><RoleDetail item={item} /></div>)}
      <div className={styles.detailContent} id={`${id}-detail`} aria-live="polite" aria-atomic="true"><RoleDetail item={role} /></div>
    </div>
  </section>;
}
