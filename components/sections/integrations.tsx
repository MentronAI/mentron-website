'use client';

import { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   CSS — Faithful reproduction of stripe.html, light theme
   Color mapping:
     #0d1738 (dark bg)       → #FFFFFF
     #1a2d6b (brand-200)     → #EFF6FF (blue-50)
     #152460 (brand-300)     → #CBD5E1 (slate-300)
     #101d51 (block bg)      → #F1F5F9 (slate-100)
     #f2f7fe (text light)    → #0A1628 (dark navy)
     #4f46e5 (action bg)     → #0077FF (brand blue)
     #5D64FE (connector)     → #0077FF
     #635bff (button)        → #0077FF
     #7500fb/#ff39db (border grad) → #0077FF/#665EFD
   ═══════════════════════════════════════════════════════════════════ */
const INTEGRATIONS_CSS = `
:root {
  --m-space-50: 2px;
  --m-space-75: 3px;
  --m-space-100: 4px;
  --m-space-200: 8px;
  --m-space-300: 12px;
  --m-space-400: 16px;
  --m-space-450: 18px;
  --m-radius-sm: 4px;
  --m-radius-md: 8px;
  --m-bg: #FFFFFF;
  --m-surface: #EFF6FF;
  --m-border: #CBD5E1;
  --m-text: #0A1628;
  --m-text-muted: #64748B;
  --m-accent: #0077FF;
  --m-accent-purple: #665EFD;
  --m-block-bg: #F1F5F9;
}

@keyframes integrations-gradient-spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.integrations-section {
  position: relative;
  container-type: inline-size;
  container-name: integrations;
  overflow: hidden;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Dot grid — light gray dots on white */
.integrations-section .dot-grid {
  position: absolute;
  top: -60px; left: -8px; right: -8px; bottom: -80px;
  background-image: url("data:image/svg+xml;utf8,<svg width='10' height='10' xmlns='http://www.w3.org/2000/svg'><rect x='0' y='0' width='2' height='2' fill='%23CBD5E1'/></svg>");
  background-size: 10px 10px;
  opacity: .38;
  -webkit-mask-image: linear-gradient(180deg,hsla(0,0%,85%,0),#737373 50%,hsla(0,0%,85%,0));
  mask-image: linear-gradient(180deg,hsla(0,0%,85%,0),#737373 50%,hsla(0,0%,85%,0));
  pointer-events: none;
}

/* Figure grid */
.integrations-section .figure {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  margin: auto;
  max-width: 1000px;
  height: 530px;
}
.integrations-section .figure--chart-left {
  position: absolute;
  top: 52%;
  left: 0;
}
.integrations-section .figure--chart-center {
  position: relative;
  display: grid;
  grid-template-rows: 88px 75px 266px 100px;
}
.integrations-section .figure--chart-right {
  position: absolute;
  top: 68%;
  right: 6%;
}

/* Center logo placement */
.integrations-section .stripe-pos {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-40%);
}
.integrations-section .stripe-center {
  position: relative;
  width: 80px; height: 80px;
  border-radius: 14px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px rgba(0,119,255,.12);
}
.integrations-section .stripe-center img {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 52px; height: 52px;
  object-fit: contain;
  border-radius: 8px;
}

/* Animated gradient border on center logo */
.integrations-section .animated-border-container {
  position: absolute;
  inset: -1px;
  overflow: hidden;
  border-radius: var(--m-radius-sm);
  display: grid;
  place-items: center;
  opacity: 0;
  transition: opacity .2s linear;
}
.integrations-section .animated-border {
  position: absolute;
  width: 150%; height: 150%;
  background: linear-gradient(0deg, #0077FF, #665EFD);
  animation: integrations-gradient-spin 1.5s ease-out infinite;
}
.integrations-section .animated-border-mask {
  position: absolute;
  inset: 1px;
  background: #FFFFFF;
  border-radius: var(--m-radius-sm);
  z-index: 1;
}

/* ── App grid (left) ──────────────────────────────────────── */
.integrations-section .apps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: var(--m-space-50);
  padding: var(--m-space-50);
  width: 112px; height: 76px;
  background: var(--m-bg);
  border-radius: var(--m-radius-sm);
  border: 1px solid var(--m-border);
}
.integrations-section .app-slot {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px; width: 32px;
  border: 1px dashed var(--m-border);
  border-radius: var(--m-radius-sm);
  transition: border-color .5s cubic-bezier(.4,0,.2,1);
  z-index: 1;
  perspective: 250px;
  overflow: hidden;
}
.integrations-section .app-slot img {
  width: 32px; height: 32px;
  border-radius: 4px;
  object-fit: contain;
}

/* Upcoming app slots */
.integrations-section .app-slot--upcoming {
  opacity: .45;
}
.integrations-section .app-slot--upcoming:hover {
  opacity: .9;
}
.integrations-section .soon-badge {
  position: absolute;
  bottom: 1px; left: 50%;
  transform: translateX(-50%);
  font-size: 5.5px;
  font-weight: 700;
  padding: 0px 4px;
  border-radius: 2px;
  background: linear-gradient(135deg, #0077FF, #665EFD);
  color: #fff;
  letter-spacing: .04em;
  text-transform: uppercase;
  line-height: 1.5;
  pointer-events: none;
  z-index: 3;
}

/* Logo helpers */
.integrations-section .app-logo { position: relative; display: block; width: 32px; height: 32px; }
.integrations-section .app-logo img { width: 100%; height: 100%; display: block; border-radius: 4px; object-fit: contain; }

/* ── Systems row (center top) ─────────────────────────────── */
.integrations-section .systems {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--m-space-100);
  padding: var(--m-space-100);
  margin: 0 auto;
  width: 100%;
  height: fit-content;
}
.integrations-section .systems-row-1 {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: var(--m-space-100);
}
.integrations-section .systems-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--m-space-100);
}
.integrations-section .system-container {
  max-height: 32px;
  border: 1px dashed var(--m-border);
  transition: border-color .5s cubic-bezier(.4,0,.2,1);
  z-index: 1;
}
.integrations-section .system,
.integrations-section .system-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  border-radius: var(--m-radius-sm);
}
.integrations-section .system {
  width: 100%;
  padding: 0 var(--m-space-200);
  background: var(--m-surface);
  font-size: 12px;
  font-weight: 700;
  color: var(--m-text);
  opacity: 0;
  scale: .75;
  transition-property: opacity, scale;
  transition-duration: .5s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  z-index: 2;
  box-shadow: 0 2px 8px -2px rgba(0,119,255,.12), 0 1px 3px rgba(0,0,0,.06);
  white-space: nowrap;
}
.integrations-section .system-container--animate { border-color: transparent; }
.integrations-section .system-container--animate .system { opacity: 1; scale: 1; }
.integrations-section .system-container--initial .system { opacity: 1; scale: 1; transition-duration: 0ms; }

/* ── Grid row layouts ─────────────────────────────────────── */
.integrations-section .grid-row--top {
  position: relative;
  display: flex;
  justify-content: center;
}
.integrations-section .grid-row--middle {
  position: absolute;
  top: 52%;
  right: 0;
}
.integrations-section .grid-row--bottom {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.integrations-section .grid-row-block--anchor {
  position: absolute;
  bottom: 0;
  display: inline-grid;
  grid-template-columns: repeat(2, 185px);
  z-index: 1;
}
.integrations-section .grid-row-block {
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
  height: 32px;
  padding: var(--m-space-75) var(--m-space-200);
  margin: auto auto 0;
  background: var(--m-accent);
  border-radius: var(--m-radius-sm);
  font-size: 12px;
  font-weight: 700;
  color: #fff;
}
.integrations-section .grid-row-block--middle { margin: 0; }

/* ── PSP (protocol) boxes ─────────────────────────────────── */
.integrations-section .psp-container {
  position: relative;
  display: flex;
  gap: var(--m-space-100);
  align-self: flex-end;
  margin: auto auto 0;
}
.integrations-section .psp-app {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px; height: 40px;
  padding: var(--m-space-75) var(--m-space-200);
  background: var(--m-surface);
  border-radius: var(--m-radius-sm);
  font-size: 11px;
  font-weight: 700;
  color: var(--m-text);
  z-index: 2;
  opacity: 0;
  transform: scale(.75);
  transition-property: opacity, transform;
  transition-duration: .5s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  overflow: hidden;
  font-family: 'Geist Mono', monospace;
}
.integrations-section .psp-app-container {
  border: 1px dashed var(--m-border);
  border-radius: var(--m-radius-sm);
  transition-property: border-color;
  transition-duration: .5s;
  transition-timing-function: linear;
}
.integrations-section .psp-app-container--animate { border-color: transparent; }
.integrations-section .psp-app-container--animate:first-child .psp-app,
.integrations-section .psp-app-container--animate:nth-child(2) .psp-app,
.integrations-section .psp-app-container--animate:nth-child(3) .psp-app,
.integrations-section .psp-app-container--animate:nth-child(4) .psp-app {
  opacity: 1; transform: scale(1);
  transition-delay: 2.5s;
}
.integrations-section .psp-app-container--animate:nth-child(3) .psp-app { transition-delay: 3s; }
.integrations-section .psp-app-container--initial .psp-app { opacity: 1; transform: scale(1); transition-duration: 0ms; transition-delay: 0ms; }

/* ── PSP connector paths ──────────────────────────────────── */
.integrations-section .psp-connection-path {
  stroke-dasharray: 120 120;
  stroke-dashoffset: 120;
  transition-property: stroke-dashoffset;
  transition-duration: 1s;
  transition-delay: 0ms;
  transition-timing-function: cubic-bezier(.66,0,.34,1);
}
.integrations-section .psp-connection-path--active { stroke-dashoffset: 0; transition-duration: 2s; }
.integrations-section .psp-connection-path--active:nth-child(1),
.integrations-section .psp-connection-path--active:nth-child(4) { transition-delay: 1.25s; transition-timing-function: cubic-bezier(.78,0,.22,1); }
.integrations-section .psp-connection-path--active:nth-child(2),
.integrations-section .psp-connection-path--active:nth-child(3) { transition-duration: 3.25s; transition-delay: 1.75s; transition-timing-function: cubic-bezier(.25,1,.5,1); }
.integrations-section .psp-connection-path--active:nth-child(3) { transition-delay: 2.25s; }

.integrations-section .psp-svg {
  position: absolute;
  left: 50%; bottom: 0;
  transform: translateX(-50%);
}

/* System connection SVGs */
.integrations-section .system-connections-svg { display: none; }
.integrations-section .system-connections-mobile-svg {
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  z-index: 0;
  pointer-events: none;
}
.integrations-section .system-connections-svg path,
.integrations-section .system-connections-mobile-svg path {
  stroke-width: 1.5;
}

/* Center horizontal path */
.integrations-section .center-path-svg { display: none; }
.integrations-section .center-path-mobile-svg {
  display: block;
  position: absolute;
  top: 54%;
  width: 100%;
}

/* Dynamic rect bg */
.integrations-section .dynamic-rect-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}
.integrations-section .dynamic-rect-bg svg { width: 100%; height: 100%; }

/* Button for middle row (like Stripe's hds-button) */
.integrations-section .m-button {
  display: none;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 3px 8px;
  background: #0077FF;
  border-radius: var(--m-radius-sm);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}

/* Pipeline app (right side) */
.integrations-section .pipeline-app {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px; height: 80px;
  border: 1px dashed var(--m-border);
  border-radius: var(--m-radius-md);
  overflow: hidden;
  perspective: 250px;
}
.integrations-section .pipeline-logo {
  position: absolute;
  width: 80px; height: 80px;
  transition-duration: 2s;
  transition-timing-function: cubic-bezier(.9,0,.1,1);
  transition-property: transform;
  transform-style: preserve-3d;
  z-index: 2;
}
.integrations-section .pipeline-logo__front,
.integrations-section .pipeline-logo__back {
  position: absolute;
  top: 0;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px; height: 80px;
  font-size: 12px;
  font-weight: 700;
  color: var(--m-text);
  background: var(--m-surface);
  border-radius: 6px;
}
.integrations-section .pipeline-logo__back {
  transform: rotateX(180deg);
}

/* ── Container queries ────────────────────────────────────── */
@container integrations (min-width: 600px) {
  .integrations-section .figure {
    width: fit-content; height: 386px;
    margin: 0 auto;
    grid-template-columns: 1fr;
  }
  .integrations-section .figure--chart-left { top: 44%; }
  .integrations-section .figure--chart-center {
    max-width: 696px;
    grid-template-rows: 48px 75px 160px auto;
  }
  .integrations-section .figure--chart-right { top: 68%; }
  .integrations-section .stripe-pos { transform: translate(-50%,-75%); }
  .integrations-section .apps { width: 152px; height: 105px; gap: var(--m-space-100); padding: var(--m-space-100); border-radius: var(--m-radius-md); }
  .integrations-section .app-slot,
  .integrations-section .app-logo { width: 40px; height: 40px; }
  .integrations-section .app-slot img { width: 40px; height: 40px; }
  .integrations-section .systems { flex-direction: row; height: 48px; }
  .integrations-section .systems .dynamic-rect-bg { z-index: 0; }
  .integrations-section .grid-row-block--anchor { grid-template-columns: repeat(2, 308px); }
  .integrations-section .grid-row--middle { top: 47%; }
  .integrations-section .system-connections-svg {
    display: block;
    position: absolute; top: 0; left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    pointer-events: none;
  }
  .integrations-section .system-connections-mobile-svg { display: none; }
  .integrations-section .center-path-mobile-svg { top: 50%; }
  .integrations-section .psp-svg { bottom: 0; }
  .integrations-section .pipeline-app { width: 80px; height: 80px; }
}

@container integrations (min-width: 882px) {
  .integrations-section .figure { grid-template-columns: 152px auto 152px; }
  .integrations-section .figure--chart-left {
    position: relative; display: flex; align-items: center; inset: unset;
  }
  .integrations-section .figure--chart-center {
    grid-template-rows: 48px 75px 136px 32px auto;
  }
  .integrations-section .figure--chart-right {
    position: relative; display: flex; align-items: center; justify-content: flex-end; inset: unset;
  }
  .integrations-section .grid-row--middle {
    position: relative; display: flex; justify-content: space-between; align-items: center;
    padding: 0 var(--m-space-450); inset: unset;
  }
  .integrations-section .center-path-svg {
    display: block; position: absolute; width: 100%;
  }
  .integrations-section .center-path-mobile-svg { display: none; }
  .integrations-section .m-button { display: inline-flex; }
}
`;

/* ═══════════════════════════════════════════════════════════════════
   HTML — Same structure as stripe.html, Mentron content
   ═══════════════════════════════════════════════════════════════════ */
const INTEGRATIONS_HTML = `
<div class="integrations-section" id="dsanim">
  <h2 style="text-align:left;font-size:clamp(1.75rem,4vw,2.75rem);font-weight:700;color:#0A1628;margin-bottom:8px;letter-spacing:-0.02em;line-height:1.15;">Your LMS, Supercharged by AI</h2>
  <p style="text-align:left;font-size:15px;color:#64748B;max-width:540px;margin:0 0 48px;line-height:1.6;">Mentron plugs into the platforms your school already uses. Connect your LMS, sync content, and let AI handle the heavy lifting.</p>
  <div class="dot-grid"></div>
  <figure class="figure">
    <figcaption class="sr-only">Diagram showing how Mentron connects LMS platforms to learning tools.</figcaption>

    <!-- Center path desktop (horizontal dashed line) -->
    <svg class="center-path-svg" width="1000" height="386" aria-hidden="true" viewBox="0 0 1000 386" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1000 194H0" stroke="#0077FF" stroke-dasharray="2 2" vector-effect="non-scaling-stroke"/>
    </svg>

    <!-- Center path mobile -->
    <svg class="center-path-mobile-svg" width="592" height="83" aria-hidden="true" viewBox="0 0 592 83" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path stroke="#0077FF" stroke-dasharray="2 2" d="M0 1h529.645c4.661 0 8.441 3.582 8.441 8v74" vector-effect="non-scaling-stroke"/>
    </svg>

    <!-- PSP connection animated SVG -->
    <svg class="psp-svg" width="191" height="102" viewBox="0 0 191 102" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg" id="psp-svg">
      <path class="psp-connection-path" id="psp-path-0" d="M81.0576 0.342323C81.0576 13.3582 81.0576 11.8288 81.0576 18.4909C81.0576 22.9092 77.4759 26.4913 73.0577 26.4913L28.511 26.4915C24.0927 26.4916 20.511 30.0733 20.511 34.4915L20.511 59.9819" stroke="#0077FF" stroke-dasharray="120"/>
      <path class="psp-connection-path" id="psp-path-1" d="M90.5 -4.19617e-05L90.5 41.1113C90.5 45.5393 86.9031 49.125 82.4751 49.1113L78.5874 49.0992C74.1594 49.0854 70.5625 52.6712 70.5625 57.0992L70.5625 59.938" stroke="#0077FF" stroke-dasharray="120"/>
      <path class="psp-connection-path" id="psp-path-2" d="M100.5 -4.19617e-05L100.5 41.1113C100.5 45.5393 104.097 49.125 108.525 49.1113L112.413 49.0992C116.841 49.0854 120.437 52.6712 120.437 57.0992L120.437 59.938" stroke="#0077FF" stroke-dasharray="120"/>
      <path class="psp-connection-path" id="psp-path-3" d="M109.942 0.342323C109.942 13.3582 109.942 11.8288 109.942 18.4909C109.942 22.9092 113.524 26.4913 117.942 26.4913L162.489 26.4915C166.907 26.4916 170.489 30.0733 170.489 34.4915L170.489 59.9819" stroke="#0077FF" stroke-dasharray="120"/>
      <!-- Ghost dashed paths -->
      <path d="M90.5 -4.19617e-05L90.5 41.1113C90.5 45.5393 86.9031 49.125 82.4751 49.1113L78.5874 49.0992C74.1594 49.0854 70.5625 52.6712 70.5625 57.0992L70.5625 59.938" stroke="#CBD5E1" stroke-dasharray="2 2"/>
      <path d="M100.5 -4.19617e-05L100.5 41.1113C100.5 45.5393 104.097 49.125 108.525 49.1113L112.413 49.0992C116.841 49.0854 120.437 52.6712 120.437 57.0992L120.437 59.938" stroke="#CBD5E1" stroke-dasharray="2 2"/>
      <path d="M81.0576 0.342323C81.0576 13.3582 81.0576 11.8288 81.0576 18.4909C81.0576 22.9092 77.4759 26.4913 73.0577 26.4913L28.511 26.4915C24.0927 26.4916 20.511 30.0733 20.511 34.4915L20.511 59.9819" stroke="#CBD5E1" stroke-dasharray="2 2"/>
      <path d="M109.942 0.342323C109.942 13.3582 109.942 11.8288 109.942 18.4909C109.942 22.9092 113.524 26.4913 117.942 26.4913L162.489 26.4915C166.907 26.4916 170.489 30.0733 170.489 34.4915L170.489 59.9819" stroke="#CBD5E1" stroke-dasharray="2 2"/>
    </svg>

    <!-- LEFT: App grid -->
    <div class="figure--chart-left">
      <div class="apps" aria-hidden="true" id="apps-grid">
        <!-- Built by JS -->
      </div>
    </div>

    <!-- CENTER -->
    <div class="figure--chart-center">

      <!-- Systems row -->
      <div class="systems" aria-hidden="true">
        <div class="dynamic-rect-bg">
          <svg width="561" height="48" aria-hidden="true" viewBox="0 0 561 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <rect width="561" height="48" rx="6" fill="#F1F5F9"/>
          </svg>
        </div>
        <div class="systems-row-1">
          <div class="system-container" id="sys-quizzes"><div class="system">Quizzes</div></div>
          <div class="system-container" id="sys-assignments"><div class="system">Assignments</div></div>
          <div class="system-container" id="sys-analytics"><div class="system">Analytics</div></div>
        </div>
        <div class="systems-row-2">
          <div class="system-container" id="sys-papers"><div class="system">Question Papers</div></div>
          <div class="system-container" id="sys-flashcards"><div class="system">Flashcards</div></div>
        </div>
      </div>

      <!-- Top row: REST API + Webhooks -->
      <div class="grid-row--top">
        <svg class="system-connections-svg" width="313" height="215" aria-hidden="true" viewBox="0 0 313 215" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 0V96.976C1 101.395 4.582 104.976 9 104.976H118.527H148.372C152.79 104.976 156.372 108.558 156.372 112.976V214.258" stroke="rgba(0,119,255,0.35)" stroke-width="1.5" stroke-dasharray="4 3"/>
          <path d="M311.671 0V96.976C311.671 101.395 308.09 104.976 303.671 104.976H194.144H164.3C159.882 104.976 156.3 108.558 156.3 112.976V114.258" stroke="rgba(0,119,255,0.35)" stroke-width="1.5" stroke-dasharray="4 3"/>
        </svg>
        <svg class="system-connections-mobile-svg" width="190" height="340" aria-hidden="true" viewBox="0 0 190 340" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.00027 0L1 158.584C0.999992 163.002 4.58172 166.584 9 166.584H72.0989H86.9932C91.4114 166.584 94.9932 170.165 94.9932 174.584V340" stroke="rgba(0,119,255,0.35)" stroke-width="1.5" stroke-dasharray="4 3"/>
          <path d="M189 0V158.584C189 163.002 185.418 166.584 181 166.584H117.901H103.007C98.5886 166.584 95.0068 170.165 95.0068 174.584V181.313" stroke="rgba(0,119,255,0.35)" stroke-width="1.5" stroke-dasharray="4 3"/>
        </svg>
        <div class="grid-row-block--anchor">
          <div class="grid-row-block" aria-hidden="true">
            <div class="dynamic-rect-bg">
              <svg width="70" height="32" aria-hidden="true" viewBox="0 0 70 32" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect width="70" height="32" rx="4" fill="#F1F5F9"/></svg>
            </div>
            Content Sync
          </div>
          <div class="grid-row-block" aria-hidden="true">
            <div class="dynamic-rect-bg">
              <svg width="100" height="32" aria-hidden="true" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect width="100" height="32" rx="4" fill="#F1F5F9"/></svg>
            </div>
            Auto Import
          </div>
        </div>
      </div>

      <!-- Middle row: AI Engine (button, like App Marketplace) + Smart Grading -->
      <div class="grid-row--middle">
        <a class="m-button" aria-hidden="true">
          AI Engine
        </a>
        <div class="grid-row-block grid-row-block--middle" aria-hidden="true">
          <div class="dynamic-rect-bg">
            <svg width="120" height="32" aria-hidden="true" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect width="120" height="32" rx="4" fill="#F1F5F9"/></svg>
          </div>
          Smart Grading
        </div>
      </div>

      <!-- Center Mentron logo -->
      <div class="stripe-pos">
        <div class="stripe-center" aria-hidden="true">
          <div class="animated-border-container">
            <div class="animated-border"></div>
            <div class="animated-border-mask"></div>
          </div>
          <img src="/logo/mentron_logo.webp" alt="Mentron" width="52" height="52">
        </div>
      </div>

      <!-- Bottom row: Adaptive Engine -->
      <div class="grid-row--bottom">
        <div class="grid-row-block" aria-hidden="true">
          <div class="dynamic-rect-bg">
            <svg width="130" height="32" aria-hidden="true" viewBox="0 0 130 32" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect width="130" height="32" rx="4" fill="#F1F5F9"/></svg>
          </div>
          Smart Learning
        </div>
      </div>

      <!-- PSP containers (4 protocol boxes) -->
      <div class="psp-container" aria-hidden="true" id="psp-multiple">
        <!-- Built by JS -->
      </div>

    </div><!-- end chart-center -->

    <!-- RIGHT: Pipeline slot -->
    <div class="figure--chart-right" id="chart-right">
      <!-- Built by JS -->
    </div>

  </figure>
</div>
`;

/* ═══════════════════════════════════════════════════════════════════
   JS — Same animation logic as stripe.html
   ═══════════════════════════════════════════════════════════════════ */
function initIntegrationsJS(container: HTMLElement) {
  // ── App logo data ─────────────────────────────────────────────
  const APP_ITEMS = [
    { src: '/google-drive-icon-2020.webp', alt: 'Google Drive', upcoming: false },
    { src: '/google-classroom-icon.webp', alt: 'Google Classroom', upcoming: false },
    { src: '/canvas-icon.webp', alt: 'Canvas LMS', upcoming: false },
    { src: '/moodle-icon.webp', alt: 'Moodle', upcoming: true },
    { src: '/xapi-icon.webp', alt: 'xAPI', upcoming: true },
    { src: '/anki-icon.webp', alt: 'Anki', upcoming: true },
  ];

  // ── Build app grid ────────────────────────────────────────────
  const appsGrid = container.querySelector('#apps-grid') as HTMLDivElement;
  if (!appsGrid) return;

  APP_ITEMS.forEach(item => {
    const slot = document.createElement('div');
    slot.className = 'app-slot' + (item.upcoming ? ' app-slot--upcoming' : '');

    const logoDiv = document.createElement('div');
    logoDiv.className = 'app-logo';

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.width = 32;
    img.height = 32;
    img.loading = 'lazy';
    img.style.borderRadius = '4px';
    img.style.objectFit = 'contain';

    logoDiv.appendChild(img);
    slot.appendChild(logoDiv);

    if (item.upcoming) {
      const badge = document.createElement('span');
      badge.className = 'soon-badge';
      badge.textContent = 'Soon';
      slot.appendChild(badge);
    }

    appsGrid.appendChild(slot);
  });

  // ── Build PSP boxes ───────────────────────────────────────────
  const PSP_LABELS = ['xAPI', 'LTI', 'SCORM', 'REST'];
  const pspContainer = container.querySelector('#psp-multiple') as HTMLDivElement;
  if (pspContainer) {
    PSP_LABELS.forEach(label => {
      const wrapper = document.createElement('div');
      wrapper.className = 'psp-app-container';
      wrapper.style.position = 'relative';

      const app = document.createElement('div');
      app.className = 'psp-app';
      app.setAttribute('aria-hidden', 'true');
      app.textContent = label;

      wrapper.appendChild(app);
      pspContainer.appendChild(wrapper);
    });
  }

  // ── Build pipeline slot (right) ────────────────────────────────
  const PIPELINE_APPS = ['Gemini', 'Claude', 'GPT'];
  const chartRight = container.querySelector('#chart-right') as HTMLDivElement;
  if (!chartRight) return;

  const pipelineSlot = document.createElement('div');
  pipelineSlot.className = 'pipeline-app';
  pipelineSlot.setAttribute('aria-hidden', 'true');

  const pipelineLogo = document.createElement('div');
  pipelineLogo.className = 'pipeline-logo';
  pipelineLogo.style.cssText = 'width:80px;height:80px;';

  const frontFace = document.createElement('div');
  frontFace.className = 'pipeline-logo__front';
  frontFace.textContent = PIPELINE_APPS[0];

  const backFace = document.createElement('div');
  backFace.className = 'pipeline-logo__back';
  backFace.textContent = PIPELINE_APPS[1];

  pipelineLogo.appendChild(frontFace);
  pipelineLogo.appendChild(backFace);
  pipelineSlot.appendChild(pipelineLogo);
  chartRight.appendChild(pipelineSlot);

  let pipelineFlipCount = 0;
  let pipelineFrontIdx = 0;

  // ── Persona data ──────────────────────────────────────────────
  const PERSONAS = ['institution', 'teacher', 'student', 'admin'] as const;
  type PersonaKey = typeof PERSONAS[number];

  const PERSONA_DATA: Record<PersonaKey, { activeSystems: string[]; activePsps: number[] }> = {
    institution: { activeSystems: ['quizzes','assignments','analytics','papers','flashcards'], activePsps: [0,1,2,3] },
    teacher:     { activeSystems: ['quizzes','assignments','papers'], activePsps: [] },
    student:     { activeSystems: ['flashcards','analytics'], activePsps: [1,2] },
    admin:       { activeSystems: ['analytics','assignments','quizzes','papers'], activePsps: [0,1,2] },
  };

  const systemIds = ['quizzes','assignments','analytics','papers','flashcards'];
  const systemContainers: Record<string, Element> = {};
  systemIds.forEach(id => {
    const el = container.querySelector('#sys-' + id);
    if (el) systemContainers[id] = el;
  });

  const pspPaths = [0,1,2,3].map(i => container.querySelector('#psp-path-' + i));
  const pspContainers = pspContainer ? Array.from(pspContainer.children) : [];

  // ── State ──────────────────────────────────────────────────────
  let currentIdx = 0;
  let prevIdx = 0;
  let isInitial = true;
  let isIntersecting = false;
  let isVisible = !document.hidden;
  let startTimeout: ReturnType<typeof setTimeout> | null = null;
  let cycleInterval: ReturnType<typeof setInterval> | null = null;

  // ── Apply persona ──────────────────────────────────────────────
  function applyPersona(idx: number, prev: number, initial: boolean) {
    const key = PERSONAS[idx];
    const data = PERSONA_DATA[key];

    // Systems
    systemIds.forEach(id => {
      const c = systemContainers[id];
      if (!c) return;
      const active = data.activeSystems.includes(id);
      c.classList.toggle('system-container--animate', active && !initial && isIntersecting);
      c.classList.toggle('system-container--initial', initial);
    });

    // PSP paths
    pspPaths.forEach((path, i) => {
      if (path) path.classList.toggle('psp-connection-path--active', data.activePsps.includes(i));
    });

    // PSP containers
    pspContainers.forEach((c, i) => {
      (c as HTMLElement).classList.toggle('psp-app-container--animate', data.activePsps.includes(i) && !initial && isIntersecting);
      (c as HTMLElement).classList.toggle('psp-app-container--initial', initial);
    });

    if (initial) return;

    // Pipeline flip
    pipelineFlipCount++;
    const newIdx = (pipelineFrontIdx + 1) % PIPELINE_APPS.length;
    const pfc = pipelineFlipCount;
    setTimeout(() => {
      if (pfc % 2 === 0) {
        frontFace.textContent = PIPELINE_APPS[newIdx];
      } else {
        backFace.textContent = PIPELINE_APPS[newIdx];
      }
      pipelineLogo.style.transform = `rotateX(${180 * pfc}deg)`;
      pipelineFrontIdx = newIdx;
    }, 0);
  }

  function advance() {
    prevIdx = currentIdx;
    currentIdx = (currentIdx + 1) % PERSONAS.length;
    applyPersona(currentIdx, prevIdx, false);
  }

  function startCycle() {
    if (startTimeout) return;
    isInitial = false;
    startTimeout = setTimeout(() => {
      advance();
      cycleInterval = setInterval(advance, 4000);
    }, 1000);
  }

  function stopCycle() {
    if (startTimeout) { clearTimeout(startTimeout); startTimeout = null; }
    if (cycleInterval) { clearInterval(cycleInterval); cycleInterval = null; }
  }

  // ── Initial render ─────────────────────────────────────────────
  applyPersona(0, 0, true);

  // ── Visibility ─────────────────────────────────────────────────
  const onVisChange = () => {
    isVisible = !document.hidden;
    if (isVisible && isIntersecting) startCycle();
    else if (!isVisible) stopCycle();
  };
  document.addEventListener('visibilitychange', onVisChange);

  // ── IntersectionObserver ───────────────────────────────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting && isVisible) {
        applyPersona(currentIdx, prevIdx, false);
        startCycle();
      } else {
        stopCycle();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(container);

  // ── Cleanup ────────────────────────────────────────────────────
  return () => {
    stopCycle();
    observer.disconnect();
    document.removeEventListener('visibilitychange', onVisChange);
  };
}

/* ═══════════════════════════════════════════════════════════════════
   React Component
   ═══════════════════════════════════════════════════════════════════ */
export default function Integrations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = initIntegrationsJS(containerRef.current);
    return cleanup;
  }, []);

  return (
    <section id="integrations" style={{ background: '#FFFFFF' }}>
      <style>{INTEGRATIONS_CSS}</style>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: INTEGRATIONS_HTML }} />
      </div>
    </section>
  );
}
