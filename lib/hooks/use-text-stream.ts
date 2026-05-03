'use client';

import { useRef, useCallback } from 'react';

interface TextStreamOptions {
  /** CSS selector for the element(s) to stream text into */
  selector: string;
  /** ms between each line appearing (default: 120) */
  lineDelay?: number;
  /** ms before starting the stream (default: 0) */
  startDelay?: number;
}

/**
 * Returns a trigger function that streams innerHTML into matching elements
 * line-by-line (split on `<br>` tags).
 *
 * Usage:
 *   const streamRef = useRef<HTMLElement>(null);
 *   const triggerStream = useTextStream({ selector: '.bubble-ai' });
 *   // later, when you want streaming to begin:
 *   triggerStream(streamRef.current);
 */
export function useTextStream(options: TextStreamOptions) {
  const abortedRef = useRef(false);

  const trigger = useCallback(
    (container: HTMLElement | null) => {
      if (!container) return;
      abortedRef.current = false;

      const { selector, lineDelay = 120, startDelay = 0 } = options;
      const els = container.querySelectorAll(selector);
      if (!els.length) return;

      // Capture and clear each target
      const payloads: { el: Element; lines: string[] }[] = [];
      els.forEach((el) => {
        const raw = el.innerHTML;
        // Split on <br>, <br/>, <br /> (case-insensitive)
        const lines = raw
          .split(/<br\s*\/?>/i)
          .map((l: string) => l.trim())
          .filter((l: string) => l.length > 0);
        el.innerHTML = '';
        payloads.push({ el, lines });
      });

      const startAt = performance.now() + startDelay;

      function scheduleNext(payloadIndex: number, lineIndex: number) {
        if (abortedRef.current) return;
        if (payloadIndex >= payloads.length) return;

        const { el, lines } = payloads[payloadIndex];
        if (lineIndex >= lines.length) {
          // Move to next element
          scheduleNext(payloadIndex + 1, 0);
          return;
        }

        const elapsed = performance.now() - startAt;
        const wait = Math.max(0, lineIndex * lineDelay - elapsed);

        setTimeout(() => {
          if (abortedRef.current) return;
          // Append line + newline spacer
          const current = el.innerHTML;
          const separator = lineIndex > 0 ? '<br>' : '';
          el.innerHTML = current + separator + lines[lineIndex];
          scheduleNext(payloadIndex, lineIndex + 1);
        }, wait);
      }

      // Kick off after startDelay
      if (startDelay > 0) {
        setTimeout(() => {
          if (abortedRef.current) return;
          scheduleNext(0, 0);
        }, startDelay);
      } else {
        scheduleNext(0, 0);
      }
    },
    [options.selector, options.lineDelay, options.startDelay],
  );

  return trigger;
}
