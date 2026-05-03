'use client';

import { useEffect, useRef } from 'react';

const BENTO_CSS = `    /* ========================================
       0. CSS Custom Properties
       ======================================== */
    :root {
      --brand: #0077FF;
      --brand-dark: #005FCC;
      --heading: #0A1628;
      --body: #3D5166;
      --muted: #7A8FA6;
      --surface: #F8FAFC;
      --card: #FFFFFF;
      --border: #E4E6EF;
      --success: #059669;

      /* Per-tool accent pairs */
      --flash-1: #7C3AED;
      --flash-2: #EC4899;
      --mind-1: #0EA5E9;
      --mind-2: #38BDF8;
      --chat-1: #10B981;
      --chat-2: #34D399;
      --kg-1: #7C3AED;
      --kg-2: #A855F7;
      --notes-1: #F59E0B;
      --notes-2: #FBBF24;

      /* Motion */
      --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
      --ease-in: cubic-bezier(0.4, 0, 1, 1);
      --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
      --dur-micro: 100ms;
      --dur-short: 200ms;
      --dur-medium: 350ms;
      --dur-long: 500ms;
      --dur-card: 800ms;
      --dur-arrow: 600ms;

      /* Layout */
      --max-width: 1280px;
      --gap: 16px;
      --radius-card: 8px;
      --radius-modal: 16px;
    }

    /* ========================================
       1. Reset & Base
       ======================================== */
    .bento-section *, .bento-section *::before, .bento-section *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: var(--body);
      background: var(--surface);
      line-height: 1.5;
      overflow-x: hidden;
    }

    /* ========================================
       2. Typography
       ======================================== */
    .bento-section .section-title {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-size: clamp(2rem, 3vw, 2.5rem);
      font-weight: 700;
      color: var(--heading);
      line-height: 1.15;
      letter-spacing: -0.02em;
    }

    .bento-section .section-subtitle {
      font-size: clamp(1rem, 1.4vw, 1.15rem);
      color: var(--muted);
      max-width: 520px;
      line-height: 1.6;
    }

    .bento-section .card-title {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-size: min(1.5rem, 2.1vw);
      font-weight: 600;
      color: var(--heading);
      line-height: 1.25;
    }

    .bento-section .card-badge {
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 9999px;
    }

    .bento-section .modal-title {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-size: clamp(1.5rem, 2.5vw, 2rem);
      font-weight: 700;
      color: var(--heading);
      line-height: 1.2;
    }

    .bento-section .modal-desc {
      font-size: 16px;
      color: var(--body);
      line-height: 1.6;
    }

    .bento-section .feature-text {
      font-size: 14px;
      color: var(--body);
      line-height: 1.5;
    }

    .bento-section .btn-primary {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      background: var(--brand);
      border: none;
      padding: 10px 22px;
      border-radius: 8px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: background var(--dur-short) linear;
    }
    .bento-section .btn-primary:hover { background: var(--brand-dark); }
    .bento-section .btn-primary::after {
      content: '';
      position: absolute;
      top: 0; left: -100%; width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: none;
    }
    .bento-section .btn-primary:hover::after {
      animation: shimmer 3s linear infinite;
    }

    .bento-section .btn-secondary {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: var(--heading);
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 10px 22px;
      border-radius: 8px;
      cursor: pointer;
      transition: border-color var(--dur-short) linear;
    }
    .bento-section .btn-secondary:hover { border-color: var(--muted); }

    /* ========================================
       3. Section & Grid
       ======================================== */
    .bento-section .bento-section {
      padding: 80px 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .bento-section .section-header {
      text-align: left;
      margin-bottom: 48px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .bento-section .bento-grid {
      width: 100%;
      max-width: var(--max-width);
      display: flex;
      flex-wrap: wrap;
      gap: var(--gap);
    }

    /* ========================================
       4. Card System
       ======================================== */
    .bento-section .bento-card {
      position: relative;
      border-radius: var(--radius-card);
      overflow: visible;
      cursor: pointer;
      border: none;
      background: none;
      outline: none;
      text-align: left;
      display: block;
    }

    .bento-section .bento-card:focus-visible .card-border {
      clip-path: inset(0 round var(--radius-card));
      opacity: 1;
    }

    .bento-section .bento-card.large { flex-basis: calc(66.666% - 8px); aspect-ratio: 816/676; }
    .bento-section .bento-card.small { flex-basis: calc(33.333% - 8px); aspect-ratio: 400/676; }
    .bento-section .bento-card.full { flex-basis: 100%; aspect-ratio: 1232/420; }

    /* 3-Layer Border System */
    .bento-section .card-border {
      position: absolute;
      inset: -5px;
      z-index: 1;
      border-radius: calc(var(--radius-card) + 5px);
      clip-path: inset(5px round var(--radius-card));
      transition: clip-path var(--dur-card) var(--ease-out-expo);
      pointer-events: none;
    }

    .bento-section .bento-card:hover .card-border {
      clip-path: inset(0 round var(--radius-card));
    }

    .bento-section .card-border-orb {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      opacity: 0;
      transition: opacity 250ms;
      background: radial-gradient(
        380px circle at calc(var(--mx, 50) * 1%) calc(var(--my, 50) * 1%),
        var(--orb-a) 0%, var(--orb-b) 40%, transparent 70%
      );
    }

    .bento-section .bento-card:hover .card-border-orb {
      opacity: 0.45;
    }

    .bento-section .card-border-mask {
      position: absolute;
      inset: -4px;
      z-index: 2;
      background: var(--card);
      border-radius: calc(var(--radius-card) + 4px);
      pointer-events: none;
    }

    /* Card face */
    .bento-section .card-face {
      position: relative;
      z-index: 3;
      width: 100%;
      height: 100%;
      border-radius: var(--radius-card);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding: 28px;
      box-shadow:
        inset 0 0 0 1px rgba(255,255,255,0.7),
        0 1px 2px rgba(0,0,0,.04),
        0 4px 20px rgba(0,0,0,.06);
      transition:
        transform 900ms cubic-bezier(0.16,1,0.3,1),
        box-shadow 900ms cubic-bezier(0.16,1,0.3,1);
    }

    .bento-section .bento-card:hover .card-face {
      transform: scale(1.015);
      box-shadow:
        inset 0 0 0 1px rgba(255,255,255,0.8),
        0 4px 12px rgba(0,0,0,.06),
        0 20px 60px rgba(0,0,0,.11);
    }

    /* Noise texture overlay */
    .bento-section .card-face::after {
      content: '';
      position: absolute; inset: 0; border-radius: inherit;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      background-size: 200px 200px;
      opacity: 0.032;
      pointer-events: none;
      z-index: 10;
      mix-blend-mode: overlay;
    }

    /* Per-card gradient compositions */
    .bento-section .grad-mindmaps {
      background:
        radial-gradient(ellipse 80% 70% at 95% 105%, rgba(14,165,233,0.38) 0%, rgba(56,189,248,0.18) 45%, transparent 70%),
        radial-gradient(ellipse 50% 40% at 80% 90%, rgba(186,230,255,0.32) 0%, transparent 60%),
        #ffffff;
    }
    .bento-section .grad-flashcards {
      background:
        radial-gradient(ellipse 75% 60% at 50% 110%, rgba(124,58,237,0.35) 0%, rgba(167,139,250,0.20) 40%, transparent 68%),
        radial-gradient(ellipse 40% 30% at 50% 100%, rgba(91,33,182,0.22) 0%, transparent 60%),
        #ffffff;
    }
    .bento-section .grad-chat {
      background:
        linear-gradient(to top, rgba(16,185,129,0.24) 0%, rgba(52,211,153,0.12) 30%, transparent 55%),
        radial-gradient(ellipse 90% 50% at 50% 120%, rgba(5,150,105,0.20) 0%, transparent 65%),
        #ffffff;
    }
    .bento-section .grad-knowledge {
      background:
        radial-gradient(ellipse 55% 55% at 90% 8%, rgba(37,99,235,0.24) 0%, rgba(96,165,250,0.12) 45%, transparent 68%),
        radial-gradient(ellipse 60% 55% at 8% 95%, rgba(29,78,216,0.22) 0%, rgba(147,197,253,0.12) 45%, transparent 68%),
        radial-gradient(ellipse 30% 25% at 50% 50%, rgba(219,234,254,0.30) 0%, transparent 70%),
        #ffffff;
    }
    .bento-section .grad-notes {
      background:
        radial-gradient(ellipse 75% 85% at -5% 110%, rgba(245,158,11,0.30) 0%, rgba(251,191,36,0.15) 40%, transparent 65%),
        radial-gradient(ellipse 50% 40% at 15% 100%, rgba(217,119,6,0.20) 0%, transparent 60%),
        linear-gradient(135deg, rgba(254,243,199,0.25) 0%, transparent 50%),
        #ffffff;
    }

    /* Card header (top-left text, top-right arrow) */
    .bento-section .card-header {
      position: relative;
      z-index: 4;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: auto;
    }

    .bento-section .card-header-left {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .bento-section .card-arrow {
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      border-radius: 8px;
      border: 1px solid rgba(0,0,0,.10);
      background: rgba(255,255,255,.55);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      transition: border-color 200ms, background 200ms, transform 200ms;
    }

    .bento-section .bento-card:hover .card-arrow {
      border-color: rgba(0,0,0,.18);
      background: rgba(255,255,255,.85);
      transform: translate(1px, -1px);
    }

    /* Card visual area */
    .bento-section .card-visual {
      position: relative;
      z-index: 2;
      flex: 1;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    /* 3D tilt flashcard container */
    .bento-section .bento-card.tilt-3d .card-visual {
      perspective: 600px;
    }

    /* ========================================
       5. Card Visual Mockups
       ======================================== */

    /* --- 5a. AI Flashcards (single vertical card) --- */
    .bento-section .flash-single {
      width: 240px;
      min-height: 320px;
      border-radius: 16px;
      background: rgba(250, 250, 249, 0.75);
      padding: 28px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      text-align: center;
      gap: 16px;
      box-shadow:
        0 2px 8px rgba(0,0,0,0.04),
        0 12px 40px rgba(0,0,0,0.08);
      transform-style: preserve-3d;
      transition: transform 0.4s var(--ease-out-expo), box-shadow 0.4s var(--ease-out-expo);
    }

    .bento-section .flash-single .flash-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .bento-section .flash-single .flash-q {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-size: 17px;
      font-weight: 600;
      color: var(--heading);
      line-height: 1.45;
    }

    /* --- 5b. Mind Maps (Browser + Animation) --- */
    .bento-section .mind-browser {
      width: 100%;
      border-radius: 12px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.35);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(255,255,255,0.5);
      border: 1px solid rgba(255, 255, 255, 0.55);
    }

    .bento-section .mind-browser-top {
      height: 34px;
      display: grid;
      grid-template-columns: 44px 1fr 44px;
      align-items: flex-start;
      padding: 0 12px;
      border-bottom: 1px solid rgba(229, 237, 245, 0.5);
      background: rgba(248, 249, 250, 0.30);
    }

    .bento-section .mind-browser-url {
      background: rgba(255,255,255,0.55);
      border-radius: 12px;
      padding: 3px 12px;
      font-size: 9px;
      color: #7A8FA6;
      text-align: center;
      font-family: 'DM Sans', sans-serif;
    }

    .bento-section .mind-browser-body {
      height: 400px;
      background: rgba(255, 255, 255, 0.20);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      padding-left: 32px;
    }

    .bento-section .mind-svg-layer {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      overflow: visible;
    }

    .bento-section .mind-svg-layer path.mind-conn {
      fill: none;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-dasharray: 2000;
      stroke-dashoffset: 2000;
      opacity: 0.4;
      transition: stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1);
    }
    .bento-section .mind-svg-layer path.mind-conn.visible { stroke-dashoffset: 0; }

    .bento-section .mind-tree {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 56px;
      min-width: max-content;
      padding: 20px 50px 20px 0;
      transform: scale(0.95);
      transform-origin: left center;
    }

    .bento-section .mind-node-wrap {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 56px;
      opacity: 0;
      transform: translateX(-10px);
      transition: opacity 0.35s ease, transform 0.35s ease;
    }
    .bento-section .mind-node-wrap.visible { opacity: 1; transform: translateX(0); }

    .bento-section .mind-children {
      display: none;
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
    }

    .bento-section .mind-pill {
      height: 34px;
      padding: 0 16px;
      border-radius: 999px;
      display: flex;
      align-items: flex-start;
      gap: 6px;
      cursor: default;
      white-space: nowrap;
      font-size: 11px;
      font-weight: 500;
      font-family: 'DM Sans', sans-serif;
      transition: transform 0.15s ease, filter 0.15s ease;
      border: none;
      outline: none;
      position: relative;
    }
    .bento-section .mind-pill:hover { transform: scale(1.04); filter: brightness(1.07); }
    .bento-section .mind-pill .mchevron { font-size: 10px; opacity: 0.6; transition: transform 0.3s ease; }
    .bento-section .mind-pill.expanded .mchevron { transform: rotate(90deg); }
    .bento-section .mind-pill.leaf .mchevron { display: none; }

    .bento-section .mind-pill.mroot { background: #1a1a2e; color: #fff; }
    .bento-section .mind-pill.ml1a { background: #d62839; color: #fff; }
    .bento-section .mind-pill.ml1b { background: #1b4332; color: #fff; }
    .bento-section .mind-pill.ml1c { background: #c44900; color: #fff; }
    .bento-section .mind-pill.ml2a { background: #e05c6a; color: #fff; }
    .bento-section .mind-pill.ml2b { background: #2d6a4f; color: #fff; }
    .bento-section .mind-pill.ml2c { background: #e07030; color: #fff; }
    .bento-section .mind-pill.ml3a { background: #fbb8bf; color: #6b0011; }
    .bento-section .mind-pill.ml3b { background: #95d5b2; color: #0a2e1a; }
    .bento-section .mind-pill.ml3c { background: #f9c784; color: #5c2800; }

    .bento-section .mind-pill.clicking::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 999px;
      background: rgba(255,255,255,0.4);
      animation: mind-ripple 0.35s ease-out forwards;
    }
    @keyframes mind-ripple {
      0%   { transform: scale(0.85); opacity: 1; }
      100% { transform: scale(1.15); opacity: 0; }
    }

    .bento-section .mind-cursor {
      position: absolute;
      pointer-events: none;
      z-index: 100;
      width: 26px;
      height: 26px;
      filter: drop-shadow(1px 2px 3px rgba(0,0,0,0.25));
      transition: left 0.6s cubic-bezier(0.4,0,0.2,1),
                  top 0.6s cubic-bezier(0.4,0,0.2,1),
                  opacity 0.3s ease;
    }
    .bento-section .mind-cursor.pressing { transform: scale(0.82); transition: transform 0.1s ease, left 0.6s cubic-bezier(0.4,0,0.2,1), top 0.6s cubic-bezier(0.4,0,0.2,1); }
    .bento-section .mind-cursor.releasing { transform: scale(1); transition: transform 0.15s ease, left 0.6s cubic-bezier(0.4,0,0.2,1), top 0.6s cubic-bezier(0.4,0,0.2,1); }

    /* --- 5c. Chat with Docs --- */
    .bento-section .chat-visual {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .bento-section .chat-header-bar {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      margin-bottom: 4px;
    }

    .bento-section .chat-status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--chat-1);
    }

    .bento-section .chat-status-text {
      font-size: 10px;
      color: var(--chat-1);
      font-weight: 500;
    }

    .bento-section .chat-bubble {
      padding: 8px 12px;
      border-radius: 12px;
      font-size: 11px;
      line-height: 1.4;
      max-width: 85%;
    }

    .bento-section .chat-bubble-user {
      background: var(--surface);
      color: var(--heading);
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }

    .bento-section .chat-bubble-ai {
      background: linear-gradient(135deg, #ECFDF5, #D1FAE5);
      color: #065F46;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }

    .bento-section .chat-citation {
      display: inline-block;
      background: rgba(16, 185, 129, 0.15);
      color: #059669;
      font-size: 9px;
      font-weight: 600;
      padding: 1px 5px;
      border-radius: 3px;
      margin-left: 2px;
    }

    .bento-section .typing-indicator {
      display: flex;
      gap: 4px;
      padding: 8px 12px;
      align-self: flex-start;
    }

    .bento-section .typing-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--chat-2);
      animation: typing-bounce 1.2s ease-in-out infinite;
    }
    .bento-section .typing-dot:nth-child(2) { animation-delay: 0.15s; }
    .bento-section .typing-dot:nth-child(3) { animation-delay: 0.3s; }

    /* --- 5c-alt. Chat Browser Window --- */
    .bento-section .chat-browser {
      width: 100%;
      border-radius: 12px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.35);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(255,255,255,0.5);
      border: 1px solid rgba(255, 255, 255, 0.55);
    }
    .bento-section .chat-browser-top {
      height: 34px;
      display: grid;
      grid-template-columns: 44px 1fr 44px;
      align-items: flex-start;
      padding: 0 12px;
      border-bottom: 1px solid rgba(229, 237, 245, 0.5);
      background: rgba(248, 249, 250, 0.30);
    }
    .bento-section .chat-browser-url {
      background: rgba(255,255,255,0.55);
      border-radius: 12px;
      padding: 3px 12px;
      font-size: 9px;
      color: #7A8FA6;
      text-align: center;
      font-family: 'DM Sans', sans-serif;
    }
    .bento-section .chat-browser-body {
      background: rgba(255, 255, 255, 0.20);
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* --- 5d. Knowledge Graphs (Browser + Canvas) --- */
    .bento-section .kg-browser {
      width: 100%;
      border-radius: 12px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.35);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(255,255,255,0.5);
      border: 1px solid rgba(255, 255, 255, 0.55);
    }

    .bento-section .kg-browser-top {
      height: 34px;
      display: grid;
      grid-template-columns: 44px 1fr 44px;
      align-items: flex-start;
      padding: 0 12px;
      border-bottom: 1px solid rgba(229, 237, 245, 0.5);
      background: rgba(248, 249, 250, 0.30);
    }

    .bento-section .kg-browser-url {
      background: rgba(255,255,255,0.55);
      border-radius: 12px;
      padding: 3px 12px;
      font-size: 9px;
      color: #7A8FA6;
      text-align: center;
      font-family: 'DM Sans', sans-serif;
    }

    .bento-section .kg-browser-body {
      height: 400px;
      background: rgba(255, 255, 255, 0.20);
      position: relative;
      overflow: hidden;
    }

    .bento-section .kg-browser-body canvas {
      display: block;
      width: 100%;
      height: 100%;
    }

    /* --- 5e. Smart Notes — Cornell Layout --- */
    .bento-section .card-bloom {
      position: absolute;
      bottom: -20%; left: 15%; right: 15%; height: 60%;
      border-radius: 50%;
      background: radial-gradient(ellipse, rgba(245,158,11,.15), transparent 70%);
      filter: blur(56px); pointer-events: none; z-index: 0;
    }

    .bento-section .cornell-wrap {
      position: relative; z-index: 2;
      flex: 1; display: flex; flex-direction: column;
      overflow: hidden;
    }

    .bento-section .cornell-cols {
      flex: 1; display: grid;
      grid-template-columns: 22% 1fr 24%;
      gap: 0;
      border: 1px solid var(--border);
      border-bottom: none;
      border-radius: 12px 12px 0 0;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.80);
    }

    .bento-section .cornell-cue {
      background: rgba(255, 251, 235, 0.85);
      border-right: 1px solid #FDE68A;
      padding: 16px 14px;
      display: flex; flex-direction: column; gap: 10px;
    }

    .bento-section .cue-heading {
      font-size: 8.5px; font-weight: 700;
      letter-spacing: .07em; text-transform: uppercase;
      color: var(--notes-1); margin-bottom: 4px;
    }

    .bento-section .cue-prompt {
      padding: 8px 10px; border-radius: 7px;
      background: #fff; border: 1px solid #FDE68A;
      font-size: 10px; color: #92400E; line-height: 1.45;
      position: relative;
    }

    .bento-section .cue-prompt::before {
      content: 'Q'; position: absolute; top: -1px; left: -1px;
      width: 14px; height: 14px; border-radius: 3px;
      background: var(--notes-1); color: #fff;
      font-size: 7px; font-weight: 700;
      display: flex; align-items: flex-start; justify-content: center;
      line-height: 14px; text-align: center;
    }

    .bento-section .cue-ai-tag {
      display: flex; align-items: flex-start; gap: 4px;
      font-size: 9px; color: var(--muted);
      margin-top: auto; padding-top: 8px;
      border-top: 1px solid #FEF3C7;
    }

    .bento-section .cornell-notes {
      padding: 16px 18px;
      display: flex; flex-direction: column; gap: 0;
      border-right: 1px solid var(--border);
    }

    .bento-section .notes-doc-title {
      font-size: 12px; font-weight: 700; color: var(--heading);
      margin-bottom: 10px; padding-bottom: 8px;
      border-bottom: 1px solid var(--border);
    }

    .bento-section .notes-body-text {
      font-size: 11px; color: var(--body); line-height: 1.75;
      flex: 1;
    }

    .bento-section .notes-hl {
      background: rgba(245,158,11,.22); border-radius: 2px; padding: 0 2px;
    }

    .bento-section .notes-cursor {
      display: inline-block; width: 1.5px; height: 13px;
      background: var(--heading); vertical-align: middle; margin-left: 1px;
      animation: cursor-blink 1s step-end infinite;
    }

    .bento-section .notes-action-chips {
      display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px;
    }

    .bento-section .notes-chip {
      font-size: 9.5px; font-weight: 500; padding: 4px 10px; border-radius: 5px;
      background: var(--surface); color: var(--muted);
      border: 1px solid var(--border);
    }

    .bento-section .cornell-ai {
      background: rgba(248, 250, 252, 0.85);
      padding: 16px 14px;
      display: flex; flex-direction: column; gap: 9px;
    }

    .bento-section .ai-heading {
      font-size: 8.5px; font-weight: 700;
      letter-spacing: .07em; text-transform: uppercase;
      color: var(--muted); margin-bottom: 2px;
    }

    .bento-section .ai-suggestion {
      padding: 9px 10px; border-radius: 0 7px 7px 0;
      border-left: 3px solid var(--notes-1);
      background: #fff;
      font-size: 10px; color: var(--body); line-height: 1.5;
      box-shadow: 0 1px 3px rgba(0,0,0,.04);
    }

    .bento-section .cornell-summary {
      background: #FFFBEB;
      border: 1px solid #FDE68A; border-top: none;
      border-radius: 0 0 12px 12px;
      padding: 11px 18px;
      display: flex; align-items: flex-start; gap: 10px;
      flex-shrink: 0;
    }

    .bento-section .summary-label {
      font-size: 8.5px; font-weight: 700;
      letter-spacing: .07em; text-transform: uppercase;
      color: var(--notes-1); white-space: nowrap;
      padding-right: 12px; border-right: 1px solid #FDE68A;
      flex-shrink: 0;
    }

    .bento-section .summary-text {
      font-size: 10.5px; color: #92400E; line-height: 1.5;
      font-style: italic;
    }

    .bento-section .summary-chip {
      margin-left: auto; flex-shrink: 0;
      font-size: 9px; font-weight: 600; color: var(--notes-1);
      padding: 3px 9px; border-radius: 99px;
      border: 1px solid #FDE68A; background: #fff;
      white-space: nowrap;
    }

    /* ========================================
       6. Modal
       ======================================== */
    .bento-section .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(10, 22, 40, 0.6);
      backdrop-filter: blur(4px);
      overflow-y: auto;
      padding: 40px 24px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 300ms var(--ease-out-expo);
    }

    .bento-section .modal-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    .bento-section .modal-container {
      background: var(--card);
      border-radius: var(--radius-modal);
      max-width: var(--max-width);
      width: 100%;
      margin: 0 auto;
      transform: translateY(30px);
      transition: transform 300ms var(--ease-out-expo);
      position: relative;
    }

    .bento-section .modal-overlay.active .modal-container {
      transform: translateY(0);
    }

    .bento-section .modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--surface);
      border: 1px solid var(--border);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: background var(--dur-short) linear;
    }

    .bento-section .modal-close:hover { background: #E2E8F0; }

    .bento-section .modal-body {
      display: flex;
      flex-direction: column;
      gap: 36px;
      padding: 52px 56px;
    }

    /* Top row: title/desc left, features right */
    .bento-section .modal-header {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: 40px;
    }

    .bento-section .modal-header-left {
      grid-column: span 7;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .bento-section .modal-header-right {
      grid-column: span 5;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 13px;
    }

    /* Graphics row: mock UI panels side by side */
    .bento-section .modal-graphics {
      display: grid;
      grid-template-columns: 5fr 7fr;
      gap: 20px;
      position: relative;
    }

    .bento-section .modal-graphic-panel {
      border-radius: 6px;
      overflow: hidden;
      position: relative;
      display: grid;
      place-items: center;
      padding: 36px 32px;
      background: #F8FAFD;
      min-height: 420px;
    }

    .bento-section .modal-cta-row {
      display: flex;
      gap: 12px;
      margin-top: auto;
      padding-top: 16px;
    }

    .bento-section .modal-details {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      padding-top: 24px;
      margin-top: 8px;
    }

    .bento-section .modal-detail-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .bento-section .modal-detail-icon {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    .bento-section .modal-detail-icon svg {
      width: 24px;
      height: 24px;
    }

    .bento-section .modal-detail-text {
      font-size: 13px;
      color: var(--body);
      line-height: 1.5;
    }

    /* Discover: Concept Coverage heatmap */
    .bento-section .cov-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
    .bento-section .cov-label { font-size:11px; font-weight:600; color:#061b31; }
    .bento-section .cov-badge { font-size:9px; font-weight:600; color:#0077FF; background:#E8F1FF; padding:2px 7px; border-radius:99px; border:1px solid #B3D4FF; }
    .bento-section .cov-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:5px; margin-bottom:11px; }
    .bento-section .cov-node { height:13px; border-radius:3px; }
    .bento-section .cov-node.mastered { background:#0077FF; }
    .bento-section .cov-node.progress { background:#66BBFF; opacity:0.65; }
    .bento-section .cov-node.seen { background:#B3D4FF; border:1px solid #D6E4F5; }
    .bento-section .cov-node.empty { background:#f1f5f9; border:1px solid #e5edf5; }
    .bento-section .cov-legend { display:flex; gap:10px; }
    .bento-section .cov-legend-item { display:flex; align-items:center; gap:4px; font-size:9px; color:#7A8FA6; white-space:nowrap; }
    .bento-section .cov-dot { width:7px; height:7px; border-radius:2px; flex-shrink:0; }

    /* Discover: Document Pipeline */
    .bento-section .pipeline-header { font-size:11px; font-weight:600; color:#061b31; margin-bottom:14px; }
    .bento-section .pipeline-steps { display:flex; align-items:center; justify-content:space-between; gap:6px; margin-top:6px; }
    .bento-section .pipeline-step { display:flex; flex-direction:column; align-items:center; gap:7px; flex:1; }
    .bento-section .pipeline-step-icon { width:34px; height:34px; border-radius:9px; background:#E8F1FF; border:1px solid #B3D4FF; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .bento-section .pipeline-step-icon.active { background:#0077FF; border-color:#0055CC; }
    .bento-section .pipeline-step-label { font-size:10px; font-weight:600; color:#061b31; text-align:center; }
    .bento-section .pipeline-step-sub { font-size:9px; color:#7A8FA6; text-align:center; line-height:1.35; }
    .bento-section .pipeline-arrow { flex-shrink:0; margin-bottom:22px; color:#B3D4FF; font-size:14px; line-height:1; }

    /* Discover: Share & Embed */
    .bento-section .share-header { font-size:11px; font-weight:600; color:#061b31; margin-bottom:12px; }
    .bento-section .share-url-row { display:flex; align-items:center; gap:6px; background:#f8fafd; border:1px solid #e5edf5; border-radius:6px; padding:7px 9px; margin-bottom:12px; }
    .bento-section .share-url-text { flex:1; font-size:10px; color:#7A8FA6; font-family:'DM Sans',sans-serif; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .bento-section .share-copy-btn { width:22px; height:22px; background:#fff; border:1px solid #e5edf5; border-radius:5px; display:flex; align-items:center; justify-content:center; flex-shrink:0; cursor:pointer; }
    .bento-section .share-toggles { display:flex; flex-direction:column; gap:9px; }
    .bento-section .share-toggle-row { display:flex; align-items:center; justify-content:space-between; gap:8px; }
    .bento-section .share-toggle-label { font-size:11px; color:#061b31; }
    .bento-section .toggle-track { width:28px; height:15px; border-radius:99px; position:relative; flex-shrink:0; transition:background 180ms; }
    .bento-section .toggle-track.on { background:#0077FF; }
    .bento-section .toggle-track.off { background:#D6E4F5; }
    .bento-section .toggle-thumb { width:11px; height:11px; background:#fff; border-radius:50%; position:absolute; top:2px; box-shadow:0 1px 3px rgba(0,0,0,0.18); transition:left 180ms; }
    .bento-section .toggle-track.on .toggle-thumb { left:15px; }
    .bento-section .toggle-track.off .toggle-thumb { left:2px; }

    /* Discover: Inner white card */
    .bento-section .disc-inner-card { width:100%; background:#fff; border:1px solid #e5edf5; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.04); padding:14px; overflow:hidden; }

    /* Flashcard Discover: Exam Countdown */
    .bento-section .cdown-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
    .bento-section .cdown-title { font-size:11px; font-weight:600; color:#061b31; }
    .bento-section .cdown-badge { font-size:9px; font-weight:600; color:#7C3AED; background:#F5F3FF; padding:2px 7px; border-radius:99px; border:1px solid #EDE9FE; }
    .bento-section .cdown-week { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; margin-bottom:14px; }
    .bento-section .cday { display:flex; flex-direction:column; align-items:center; gap:3px; border-radius:7px; padding:5px 2px; cursor:default; }
    .bento-section .cday-label { font-size:8px; font-weight:500; color:#7A8FA6; }
    .bento-section .cday-num { font-size:11px; font-weight:500; color:#50617a; }
    .bento-section .cday.active .cday-label { color:#7C3AED; }
    .bento-section .cday.active .cday-num { color:#7C3AED; font-weight:700; }
    .bento-section .cday.active { background:#F5F3FF; border:1px solid #EDE9FE; }
    .bento-section .cday.exam .cday-num { color:#fff; font-weight:700; }
    .bento-section .cday.exam .cday-label { color:rgba(255,255,255,.75); }
    .bento-section .cday.exam { background:#7C3AED; border:1px solid #6d28d9; }
    .bento-section .cday.study { background:#faf5ff; }
    .bento-section .cdown-track-label { font-size:9px; color:#7A8FA6; margin-bottom:5px; }
    .bento-section .cdown-bar-wrap { height:5px; background:#EDE9FE; border-radius:99px; margin-bottom:12px; }
    .bento-section .cdown-bar-fill { height:100%; width:42%; background:#7C3AED; border-radius:99px; }
    .bento-section .cdown-footer { display:flex; justify-content:space-between; font-size:10px; }
    .bento-section .cdown-cards { color:#50617a; }
    .bento-section .cdown-pct { color:#7C3AED; font-weight:600; }

    /* Flashcard Discover: Difficulty Map */
    .bento-section .diff-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
    .bento-section .diff-title { font-size:11px; font-weight:600; color:#061b31; }
    .bento-section .diff-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:5px; margin-bottom:12px; }
    .bento-section .diff-tile { height:14px; border-radius:3px; background:#7C3AED; }
    .bento-section .diff-tile.easy { opacity:0.14; }
    .bento-section .diff-tile.med { opacity:0.45; }
    .bento-section .diff-tile.hard { opacity:1; }
    .bento-section .diff-legend { display:flex; gap:10px; flex-wrap:wrap; }
    .bento-section .diff-legend-item { display:flex; align-items:center; gap:4px; font-size:9px; color:#7A8FA6; white-space:nowrap; }
    .bento-section .diff-dot { width:8px; height:8px; border-radius:2px; background:#7C3AED; flex-shrink:0; }
    .bento-section .diff-count { font-size:9px; color:#7A8FA6; font-weight:500; }

    /* Flashcard Discover: Deck Mastery */
    .bento-section .mast-header { font-size:11px; font-weight:600; color:#061b31; margin-bottom:14px; }
    .bento-section .mast-row { display:flex; flex-direction:column; gap:12px; }
    .bento-section .mast-item-top { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:5px; }
    .bento-section .mast-name { font-size:11px; font-weight:500; color:#273951; }
    .bento-section .mast-pct { font-size:11px; font-weight:700; color:#7C3AED; }
    .bento-section .mast-track { height:5px; background:#EDE9FE; border-radius:99px; overflow:hidden; }
    .bento-section .mast-fill { height:100%; background:#7C3AED; border-radius:99px; }
    .bento-section .mast-footer { margin-top:14px; padding-top:12px; border-top:1px solid #f0f4f8; display:flex; justify-content:space-between; font-size:9px; color:#7A8FA6; }
    .bento-section .mast-avg { color:#7C3AED; font-weight:600; }

    /* Chat Discover: shared card shell */
    .bento-section .doc-card { border-radius:10px; border:1px solid #e5edf5; overflow:hidden; background:#fff; transition:box-shadow 180ms ease,border-color 180ms ease; }
    .bento-section .doc-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.07); border-color:#A7F3D0; }
    .bento-section .doc-graphic { background:#ECFDF5; border-bottom:1px solid #A7F3D0; padding:18px 16px; display:flex; align-items:center; justify-content:center; min-height:192px; }
    .bento-section .doc-inner { width:100%; background:#fff; border:1px solid #A7F3D0; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.04); padding:13px; }
    .bento-section .doc-inner-hd { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
    .bento-section .doc-inner-title { font-size:11px; font-weight:600; color:#061b31; }
    .bento-section .doc-inner-badge { font-size:9px; font-weight:600; color:#10B981; background:#ECFDF5; padding:2px 7px; border-radius:99px; border:1px solid #A7F3D0; }
    .bento-section .doc-text { padding:14px 16px 16px; }
    .bento-section .doc-text p { font-size:12px; color:#50617a; line-height:1.55; margin-bottom:10px; }
    .bento-section .doc-link { display:inline-flex; align-items:center; gap:4px; font-size:12px; font-weight:600; color:#10B981; cursor:pointer; transition:gap 180ms; }
    .bento-section .doc-link:hover { gap:7px; }

    /* Chat Discover: Cited Answer */
    .bento-section .cite-bubble { background:#ECFDF5; border:1px solid #A7F3D0; border-radius:8px; padding:9px 11px; font-size:10.5px; line-height:1.55; color:#061b31; margin-bottom:11px; }
    .bento-section .cite-src-label { font-size:8.5px; font-weight:600; letter-spacing:.05em; text-transform:uppercase; color:#7A8FA6; margin-bottom:6px; }
    .bento-section .cite-pills { display:flex; gap:5px; margin-bottom:9px; }
    .bento-section .cite-pill { padding:3px 9px; border-radius:99px; font-size:9px; font-weight:600; border:1px solid #A7F3D0; background:#ECFDF5; color:#059669; }
    .bento-section .cite-pill.on { background:#10B981; border-color:#059669; color:#fff; }
    .bento-section .cite-excerpt { background:#ECFDF5; border-left:2px solid #10B981; border-radius:0 6px 6px 0; padding:7px 10px; font-size:9.5px; color:#50617a; line-height:1.5; font-style:italic; }

    /* Chat Discover: Cross-Doc */
    .bento-section .xd-query { background:#ECFDF5; border:1px solid #A7F3D0; border-radius:7px; padding:7px 10px; font-size:10px; color:#061b31; font-style:italic; margin-bottom:9px; }
    .bento-section .xd-source { background:#fff; border:1px solid #A7F3D0; border-radius:7px; padding:8px 10px; margin-bottom:6px; }
    .bento-section .xd-source:last-child { margin-bottom:0; }
    .bento-section .xd-from { display:flex; align-items:center; gap:5px; margin-bottom:5px; }
    .bento-section .xd-file-chip { font-size:8.5px; font-weight:600; color:#059669; background:#D1FAE5; padding:2px 7px; border-radius:99px; border:1px solid #A7F3D0; }
    .bento-section .xd-from-label { font-size:8.5px; color:#7A8FA6; }
    .bento-section .xd-text { font-size:10px; line-height:1.5; color:#50617a; }

    /* Chat Discover: Chat to Flashcard */
    .bento-section .ctf-bubble { background:#ECFDF5; border:1px solid #A7F3D0; border-radius:8px; padding:8px 11px; font-size:10.5px; line-height:1.5; color:#061b31; margin-bottom:8px; }
    .bento-section .ctf-action { display:flex; align-items:center; gap:6px; padding:7px 10px; border:1px solid #A7F3D0; border-radius:7px; font-size:10px; font-weight:600; color:#10B981; background:#ECFDF5; margin-bottom:9px; }
    .bento-section .ctf-card { border:1px solid #A7F3D0; border-radius:7px; overflow:hidden; }
    .bento-section .ctf-card-q { padding:8px 11px; font-size:10px; font-weight:500; color:#061b31; border-bottom:1px solid #A7F3D0; }
    .bento-section .ctf-card-a { padding:6px 11px; background:#ECFDF5; display:flex; align-items:center; gap:6px; }
    .bento-section .ctf-card-a-bar { flex:1; height:4px; background:#D1FAE5; border-radius:99px; }
    .bento-section .ctf-card-a-hint { font-size:8.5px; color:#7A8FA6; white-space:nowrap; }

    /* Notes Discover: shared card shell */
    .bento-section .note-card { border-radius:10px; border:1px solid #e5edf5; overflow:hidden; background:#fff; transition:box-shadow 180ms ease,border-color 180ms ease; }
    .bento-section .note-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.07); border-color:#FDE68A; }
    .bento-section .note-graphic { background:#FFFBEB; border-bottom:1px solid #FDE68A; padding:18px 16px; display:flex; align-items:center; justify-content:center; min-height:192px; }
    .bento-section .note-inner { width:100%; background:#fff; border:1px solid #FDE68A; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.06),0 1px 2px rgba(0,0,0,.04); padding:13px; }
    .bento-section .note-inner-hd { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
    .bento-section .note-inner-title { font-size:11px; font-weight:600; color:#061b31; }
    .bento-section .note-inner-badge { font-size:9px; font-weight:600; color:#D97706; background:#FEF3C7; padding:2px 7px; border-radius:99px; border:1px solid #FDE68A; }
    .bento-section .note-text { padding:14px 16px 16px; }
    .bento-section .note-text p { font-size:12px; color:#50617a; line-height:1.55; margin-bottom:10px; }
    .bento-section .note-link { display:inline-flex; align-items:center; gap:4px; font-size:12px; font-weight:600; color:#D97706; cursor:pointer; transition:gap 180ms; }
    .bento-section .note-link:hover { gap:7px; }

    /* Notes Discover: AI Inline Suggestions */
    .bento-section .ai-note-line { font-size:11px; color:#061b31; line-height:1.6; margin-bottom:10px; }
    .bento-section .ai-note-hl { background:rgba(245,158,11,.22); border-radius:3px; padding:0 3px; }
    .bento-section .ai-bubble { display:flex; align-items:flex-start; gap:7px; padding:8px 10px; background:#FFFBEB; border:1px solid #FDE68A; border-radius:7px; margin-bottom:9px; }
    .bento-section .ai-bubble-icon { width:20px; height:20px; border-radius:5px; background:#FDE68A; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }
    .bento-section .ai-bubble-text { font-size:10px; color:#92400E; line-height:1.5; }
    .bento-section .ai-pills { display:flex; gap:6px; }
    .bento-section .ai-pill { padding:4px 11px; border-radius:99px; font-size:9.5px; font-weight:600; cursor:pointer; }
    .bento-section .ai-pill.accept { background:#F59E0B; color:#fff; border:1px solid #D97706; }
    .bento-section .ai-pill.dismiss { background:#fff; color:#7A8FA6; border:1px solid #e5edf5; }

    /* Notes Discover: Note Connections */
    .bento-section .nc-footer { display:flex; align-items:center; justify-content:space-between; margin-top:11px; padding-top:11px; border-top:1px solid #f0f4f8; font-size:9px; color:#7A8FA6; }
    .bento-section .nc-count { font-size:9px; font-weight:600; color:#D97706; }

    /* Notes Discover: Smart Templates */
    .bento-section .tpl-list { display:flex; flex-direction:column; gap:6px; }
    .bento-section .tpl-row { display:flex; align-items:center; gap:9px; padding:8px 10px; border-radius:7px; border:1px solid #e5edf5; background:#fff; transition:background 150ms; }
    .bento-section .tpl-row.on { background:#FFFBEB; border-color:#FDE68A; }
    .bento-section .tpl-ico { width:26px; height:26px; border-radius:6px; background:#FFFBEB; border:1px solid #FDE68A; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .bento-section .tpl-row.on .tpl-ico { background:#F59E0B; border-color:#D97706; }
    .bento-section .tpl-name { font-size:10.5px; font-weight:600; color:#061b31; }
    .bento-section .tpl-desc { font-size:8.5px; color:#7A8FA6; margin-top:1px; }
    .bento-section .tpl-tick { margin-left:auto; width:16px; height:16px; border-radius:50%; background:#F59E0B; display:flex; align-items:center; justify-content:center; }

    /* More to discover */
    .bento-section .modal-discover {
      padding-top: 24px;
    }

    .bento-section .modal-discover-heading {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: var(--heading);
      margin-bottom: 20px;
    }

    .bento-section .modal-discover-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .bento-section .modal-discover-card {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
    }

    .bento-section .modal-discover-graphic {
      height: 220px;
      background: var(--surface);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .bento-section .modal-discover-card-text {
      padding: 18px 16px;
    }

    .bento-section .modal-discover-card-text p {
      font-size: 13px;
      color: var(--body);
      line-height: 1.5;
      min-height: 2.7em;
      margin-bottom: 12px;
    }

    .bento-section .modal-discover-link {
      font-size: 13px;
      font-weight: 600;
      color: var(--brand);
      text-decoration: none;
      cursor: pointer;
    }

    .bento-section .modal-discover-link:hover {
      text-decoration: underline;
    }

    .bento-section .feature-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .bento-section .feature-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .bento-section .feature-item svg { flex-shrink: 0; }

    /* Gradient orbs behind mock UI */
    .bento-section .modal-orb {
      position: absolute;
      filter: blur(10px);
      will-change: transform;
      pointer-events: none;
    }

    .bento-section .modal-orb-1 {
      width: 70%; height: auto; aspect-ratio: 1238/2077;
      background: radial-gradient(50% 50% at 50% 50%, #7C3AED 23.56%, transparent 100%);
      transform: rotate(25.862deg) translate(31%, 75%);
    }

    .bento-section .modal-orb-2 {
      width: 45%; height: auto; aspect-ratio: 926/1068;
      background: radial-gradient(50% 50% at 50% 50%, #7C3AED 0%, transparent 100%);
      transform: rotate(25.862deg) translate(44%, 71%);
    }

    .bento-section .modal-orb-3 {
      right: 0; width: 60%; height: auto; aspect-ratio: 1141.3/971.191;
      background: radial-gradient(50% 50% at 50% 50%, #EC4899 27.4%, transparent 100%);
      transform: rotate(27.305deg) translate(40%, 56%);
    }

    .bento-section .modal-orb-4 {
      right: 0; width: 45%; height: auto; aspect-ratio: 771/338;
      background: radial-gradient(50% 50% at 50% 50%, #EC4899 0%, transparent 100%);
      transform: rotate(36.009deg) translate(39%, 34%);
    }

    .bento-section .modal-graphic {
      position: relative;
      z-index: 2;
      width: 100%;
      opacity: 0;
      transform: translate3d(0, 30px, 0);
      animation: modal-reveal 0.75s cubic-bezier(0.2, 0, 0, 1) forwards;
    }

    @keyframes modal-reveal {
      to { opacity: 1; transform: translate3d(0, 0, 0); }
    }

    /* ========================================
       7. Keyframe Animations
       ======================================== */
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }

    @keyframes ring-fill {
      to { stroke-dashoffset: 18; }
    }

    @keyframes typing-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-5px); }
    }

    @keyframes cursor-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 200%; }
    }

    /* ========================================
       8. Responsive
       ======================================== */
    @media (max-width: 980px) {
      .bento-card.large,
      .bento-section .bento-card.small {
        flex-basis: 100%;
        aspect-ratio: unset;
        min-height: 360px;
      }

      .bento-section .bento-card.full {
        min-height: 360px;
      }

      .bento-section .modal-body { padding: 32px; }
      .bento-section .modal-header { grid-template-columns: 1fr; }
      .modal-header-left,
      .bento-section .modal-header-right { grid-column: span 1; }
      .bento-section .modal-graphics { grid-template-columns: 1fr; }
      .bento-section .modal-graphic-panel { min-height: 320px; }
      .bento-section .modal-details { grid-template-columns: 1fr; }
      .bento-section .modal-discover-grid { grid-template-columns: 1fr; }
    }

    @media (max-width: 640px) {
      .bento-section .bento-section { padding: 48px 16px; }
      .bento-card.large,
      .bento-card.small,
      .bento-section .bento-card.full {
        min-height: 280px;
      }
      .bento-section .card-face { padding: 20px; }

      .bento-section .modal-body { padding: 24px; }
      .bento-section .modal-graphic-panel { min-height: 260px; }

      .bento-section .cornell-cols { grid-template-columns: 1fr; }
      .bento-section .cornell-cue { display: none; }
      .bento-section .cornell-ai { display: none; }
      .bento-section .cornell-summary { flex-wrap: wrap; }

      .flash-single { width: 100%; max-width: 260px; }
      .mind-browser, .chat-browser, .kg-browser { width: 100%; }
      .card-title { font-size: clamp(1.1rem, 3vw, 1.4rem); }
    }

    @media (max-width: 480px) {
      .bento-section { padding: 32px 12px; }
      .bento-card.large,
      .bento-card.small,
      .bento-card.full { min-height: 220px; }
      .card-face { padding: 16px; }
      .card-title { font-size: clamp(1rem, 3vw, 1.25rem); }
      .card-arrow { width: 24px; height: 24px; }
      .card-arrow svg { width: 12px; height: 12px; }
      .card-badge { font-size: 9px; padding: 2px 8px; }

      .modal-body { padding: 16px; gap: 20px; }
      .modal-title { font-size: 16px; }
      .modal-desc { font-size: 12px; max-width: 100%; }
      .modal-cta-row { flex-wrap: wrap; }
      .btn-primary, .btn-secondary { padding: 7px 14px; font-size: 12px; }
      .modal-graphic-panel { min-height: 200px; }
      .modal-graphic { padding: 12px; }
      .flash-single { width: 100%; max-width: 240px; }
      .mind-browser, .chat-browser, .kg-browser { width: 100%; }
      .doc-graphic, .note-graphic { min-height: 140px; padding: 12px; }
      .disc-inner-card { min-height: unset; padding: 10px; }
      .modal-detail-item { flex-direction: column; gap: 6px; align-items: flex-start; text-align: center; }
      .modal-detail-icon { width: 32px; height: 32px; }
      .modal-detail-title { font-size: 11px; }
      .modal-detail-desc { font-size: 10px; }
      .modal-discover-heading { font-size: 10px; margin-bottom: 10px; }
    }

    @media (max-width: 380px) {
      .bento-section { padding: 24px 8px; }
      .card-face { padding: 14px; }
      .card-title { font-size: clamp(0.875rem, 3.5vw, 1rem); }

      .modal-overlay { padding: 16px 8px; }
      .modal-body { padding: 14px; gap: 16px; }
      .modal-close { width: 30px; height: 30px; top: 12px; right: 12px; }
      .modal-close svg { width: 14px; height: 14px; }
      .modal-header { gap: 16px; }
      .modal-graphics { gap: 10px; }
      .modal-graphic-panel { min-height: 180px; }
      .modal-details { gap: 10px; padding: 14px 0; }
      .btn-primary, .btn-secondary { padding: 6px 12px; font-size: 11px; }
      .modal-discover-grid { gap: 8px; }

      .cornell-notes { padding: 12px; }
      .notes-doc-title { font-size: 10px; }
      .notes-body-text { font-size: 10px; line-height: 1.6; }
      .notes-chip { font-size: 8px; padding: 2px 6px; }
      .cornell-summary { padding: 8px 12px; }
      .summary-text { font-size: 9px; }
      .summary-label { font-size: 7px; }
      .summary-chip { font-size: 7px; }
    }



    /* ========================================
       9. Reduced Motion
       ======================================== */
    @media (prefers-reduced-motion: reduce) {
      .bento-section *, .bento-section *::before, .bento-section *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* ========================================
       10. Focus & Accessibility
       ======================================== */
    .bento-section .bento-card:focus-visible {
      outline: 3px solid var(--brand);
      outline-offset: 4px;
    }

    .bento-section .modal-close:focus-visible {
      outline: 3px solid var(--brand);
      outline-offset: 2px;
    }
  `;

const BENTO_HTML = `<!-- ======================================
       Section Header
       ====================================== -->
  <section class="bento-section">
    <div class="section-header">
      <h2 class="section-title">Learning tools that adapt to you</h2>
      <p class="section-subtitle">AI-powered flashcards, mind maps, chat, knowledge graphs, and smart notes — all in one workspace.</p>
    </div>

    <!-- ======================================
         Bento Grid
         ====================================== -->
    <div class="bento-grid">

      <!-- Card 1: Mind Maps (Large) -->
      <button class="bento-card large" data-tool="mindmaps" aria-label="Mind Maps">
        <div class="card-border" style="--orb-a:rgba(14,165,233,.6);--orb-b:rgba(56,189,248,.3)">
          <div class="card-border-orb"></div>
        </div>
        <div class="card-border-mask"></div>
        <div class="card-face grad-mindmaps">
          <div class="card-header" style="position:relative;z-index:1;">
            <div class="card-header-left">
              <span class="card-title">Interactive Mind Maps</span>
            </div>
            <div class="card-arrow">
              <svg width="16" height="16" fill="none" stroke="var(--heading)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12L12 4M12 4H6M12 4v6"/></svg>
            </div>
          </div>
          <div class="card-visual" style="padding:0 20px 16px 20px;position:relative;z-index:1;">
            <div class="mind-browser">
              <div class="mind-browser-top">
                <svg height="7" width="24"><circle cx="3.5" cy="3.5" r="3.5" fill="#FFBD2E"/><circle cx="11.5" cy="3.5" r="3.5" fill="#FF605C"/><circle cx="19.5" cy="3.5" r="3.5" fill="#28CA41"/></svg>
                <div class="mind-browser-url">mentron.app/mindmap</div>
              </div>
              <div class="mind-browser-body" id="mindBrowserBody">
                <svg class="mind-svg-layer" id="mindSvgLayer"></svg>
                <div class="mind-tree" id="mindTree"></div>
              </div>
            </div>
          </div>
        </div>
      </button>

      <!-- Card 2: AI Flashcards (Small) -->
      <button class="bento-card small tilt-3d" data-tool="flashcards" aria-label="AI Flashcards">
        <div class="card-border" style="--orb-a:rgba(124,58,237,.55);--orb-b:rgba(167,139,250,.3)">
          <div class="card-border-orb"></div>
        </div>
        <div class="card-border-mask"></div>
        <div class="card-face grad-flashcards">
          <div class="card-header" style="position:relative;z-index:1;">
            <div class="card-header-left">
              <span class="card-title">AI Flashcards with Spaced Repetition</span>
            </div>
            <div class="card-arrow">
              <svg width="16" height="16" fill="none" stroke="var(--heading)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12L12 4M12 4H6M12 4v6"/></svg>
            </div>
          </div>
          <div class="card-visual" style="position:relative;z-index:1;">
            <div class="flash-single">
              <div class="flash-label">Question</div>
              <div class="flash-q">What is the time complexity of binary search?</div>
            </div>
          </div>
        </div>
      </button>

      <!-- Card 3: Chat with Docs (Small) -->
      <button class="bento-card small" data-tool="chat" aria-label="Chat with Docs">
        <div class="card-border" style="--orb-a:rgba(16,185,129,.55);--orb-b:rgba(52,211,153,.3)">
          <div class="card-border-orb"></div>
        </div>
        <div class="card-border-mask"></div>
        <div class="card-face grad-chat">
          <div class="card-header">
            <div class="card-header-left">
              <span class="card-title">Ask anything, get cited answers</span>
            </div>
            <div class="card-arrow">
              <svg width="16" height="16" fill="none" stroke="var(--heading)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12L12 4M12 4H6M12 4v6"/></svg>
            </div>
          </div>
          <div class="card-visual" style="padding:0 20px 16px 20px;position:relative;z-index:1;">
            <div class="chat-browser">
              <div class="chat-browser-top">
                <svg height="7" width="24"><circle cx="3.5" cy="3.5" r="3.5" fill="#FFBD2E"/><circle cx="11.5" cy="3.5" r="3.5" fill="#FF605C"/><circle cx="19.5" cy="3.5" r="3.5" fill="#28CA41"/></svg>
                <div class="chat-browser-url">mentron.app/chat/markov-chains</div>
              </div>
              <div class="chat-browser-body">
                <div class="chat-header-bar">
                  <div class="chat-status-dot"></div>
                  <span class="chat-status-text">Online</span>
                </div>
                <div class="chat-bubble chat-bubble-user">Explain the Markov property</div>
                <div class="chat-bubble chat-bubble-ai">Future states depend only on the present state, not past history.<span class="chat-citation">p. 42</span></div>
                <div class="chat-bubble chat-bubble-user">Give me an example?</div>
                <div class="typing-indicator">
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>

      <!-- Card 4: Knowledge Graphs (Large) -->
      <button class="bento-card large" data-tool="knowledge" aria-label="Knowledge Graphs">
        <div class="card-border" style="--orb-a:rgba(37,99,235,.55);--orb-b:rgba(96,165,250,.3)">
          <div class="card-border-orb"></div>
        </div>
        <div class="card-border-mask"></div>
        <div class="card-face grad-knowledge">
          <div class="card-header" style="position:relative;z-index:1;">
            <div class="card-header-left">
              <span class="card-title">Knowledge Graphs</span>
            </div>
            <div class="card-arrow">
              <svg width="16" height="16" fill="none" stroke="var(--heading)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12L12 4M12 4H6M12 4v6"/></svg>
            </div>
          </div>
          <div class="card-visual" style="padding:0 20px 16px 20px;position:relative;z-index:1;">
            <div class="kg-browser">
              <div class="kg-browser-top">
                <svg height="7" width="24"><circle cx="3.5" cy="3.5" r="3.5" fill="#FFBD2E"/><circle cx="11.5" cy="3.5" r="3.5" fill="#FF605C"/><circle cx="19.5" cy="3.5" r="3.5" fill="#28CA41"/></svg>
                <div class="kg-browser-url">mentron.app/graph/calculus</div>
              </div>
              <div class="kg-browser-body">
                <canvas id="kgCanvas"></canvas>
              </div>
            </div>
          </div>
        </div>
      </button>

      <!-- Card 5: Smart Notes (Full Width — Cornell Layout) -->
      <button class="bento-card full" data-tool="notes" aria-label="Smart Notes">
        <div class="card-border" style="--orb-a:rgba(245,158,11,.55);--orb-b:rgba(251,191,36,.3)">
          <div class="card-border-orb"></div>
        </div>
        <div class="card-border-mask"></div>
        <div class="card-face grad-notes" style="padding:24px 28px 0 28px;">
          <div class="card-bloom"></div>

          <div class="card-header" style="position:relative;z-index:4;">
            <div class="card-header-left">
              <span class="card-title">Write notes that write themselves</span>
            </div>
            <div class="card-arrow">
              <svg width="14" height="14" fill="none" stroke="var(--heading)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11L11 3M11 3H6M11 3v5"/></svg>
            </div>
          </div>

          <div class="card-visual" style="position:relative;z-index:2;">
            <div class="cornell-wrap">
              <div class="cornell-cols">

                <!-- Left: Cue Column -->
                <div class="cornell-cue">
                  <div class="cue-heading">Cue Column</div>
                  <div class="cue-prompt">What is the Markov property?</div>
                  <div class="cue-prompt">Types of Markov chains?</div>
                  <div class="cue-prompt">Real-world applications?</div>
                  <div class="cue-ai-tag">
                    <svg width="10" height="10" fill="none" stroke="var(--notes-1)" stroke-width="1.5"><path d="M5 1v1M5 8v1M2 5H1M9 5h1M2.8 2.8l-.7-.7M7.9 7.9l.7.7M2.8 7.2l-.7.7M7.9 2.1l.7-.7"/></svg>
                    AI-generated prompts
                  </div>
                </div>

                <!-- Center: Notes body -->
                <div class="cornell-notes">
                  <div class="notes-doc-title">Lecture 12 — Markov Chains &amp; Stochastic Processes</div>
                  <div class="notes-body-text">
                    A <strong>Markov chain</strong> is a stochastic model describing a sequence of possible events in which the probability of each event depends only on the state attained in the previous step.<br><br>
                    Key property: <span class="notes-hl">memorylessness</span> — the conditional probability distribution of future states depends only on the present state, not on the sequence of events that preceded it.<br><br>
                    Formally, for states X<sub>0</sub>, X<sub>1</sub> … X<sub>n</sub>:<br>
                    <span style="font-family:monospace;font-size:10.5px;background:#f8fafc;border-radius:4px;padding:2px 6px;display:inline-block;margin-top:4px;">P(X<sub>n+1</sub> | X<sub>n</sub>, …, X<sub>0</sub>) = P(X<sub>n+1</sub> | X<sub>n</sub>)</span><span class="notes-cursor"></span>
                  </div>
                  <div class="notes-action-chips">
                    <span class="notes-chip">Summarize</span>
                    <span class="notes-chip">Generate Quiz</span>
                    <span class="notes-chip">Add to Flashcards</span>
                    <span class="notes-chip">Create Mind Map</span>
                  </div>
                </div>

                <!-- Right: AI Co-pilot -->
                <div class="cornell-ai">
                  <div class="ai-heading">AI Co-pilot</div>
                  <div class="ai-suggestion" style="border-left-color:var(--notes-1)">
                    Add a transition matrix example to reinforce memorylessness.
                  </div>
                  <div class="ai-suggestion" style="border-left-color:var(--chat-1)">
                    Related: Hidden Markov Models — covered in Chapter 8 of your textbook.
                  </div>
                  <div class="ai-suggestion" style="border-left-color:var(--brand)">
                    3 classmates also took notes on this topic recently.
                  </div>
                </div>

              </div>

              <!-- Summary bar -->
              <div class="cornell-summary">
                <span class="summary-label">Summary</span>
                <span class="summary-text">Markov chains are memoryless stochastic processes — future state depends solely on the present, never on prior history. Used in ML, DSA, and biology.</span>
                <span class="summary-chip">AI-generated</span>
              </div>
            </div>
          </div>
        </div>
      </button>

    </div><!-- /bento-grid -->
  </section>

  <!-- ======================================
       Modal Overlay
       ====================================== -->
  <div class="modal-overlay" id="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal-container">
      <button class="modal-close" id="modalClose" aria-label="Close modal">
        <svg width="16" height="16" fill="none" stroke="var(--heading)" stroke-width="2" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>
      </button>
      <div class="modal-body" id="modalBody">
        <!-- Populated by JS -->
      </div>
    </div>
  </div>

  <!-- ======================================
       JavaScript
       ====================================== -->`;

function initBentoJS(container: HTMLDivElement) {
      // --- Modal Data ---
      const toolData = {
        flashcards: {
          badge: 'AI Flashcards',
          badgeBg: '#F5F3FF',
          badgeColor: 'var(--flash-1)',
          title: 'AI Flashcards with Spaced Repetition',
          desc: 'Upload your study materials and let AI generate smart flashcards. Our spaced repetition algorithm adapts to your learning pace, ensuring you review cards right before you’re about to forget them.',
          features: [
            'Auto-generated from PDFs, notes, and lectures',
            'Adaptive spaced repetition scheduling',
            'Mastery tracking per card and topic',
            'Collaborative decks for study groups'
          ],
          orbColors: ['var(--flash-1)', 'var(--flash-2)', '#8B5CF6', '#F472B6'],
          preview: 'flashcards'
        },
        mindmaps: {
          badge: 'Mind Maps',
          badgeBg: '#F0F9FF',
          badgeColor: 'var(--mind-1)',
          title: 'Interactive Mind Maps',
          desc: 'Transform any document or topic into a visual mind map. Expand, collapse, and rearrange nodes to build your understanding. Perfect for brainstorming and exam prep.',
          features: [
            'One-click generation from study materials',
            'Drag, zoom, and expand interactive nodes',
            'Export as images or PDF for revision',
            'Auto-organize by topic hierarchy'
          ],
          orbColors: ['var(--mind-1)', 'var(--mind-2)', '#0284C7', '#7DD3FC'],
          preview: 'mindmaps'
        },
        chat: {
          badge: 'Chat with Docs',
          badgeBg: '#ECFDF5',
          badgeColor: 'var(--chat-1)',
          title: 'Chat with Your Documents',
          desc: 'Ask questions about any uploaded document and get instant, cited answers. The AI references exact pages and sections so you can verify every response.',
          features: [
            'Page-level citations for every answer',
            'Multi-document cross-referencing',
            'Streaming responses in real time',
            'Conversation history with context'
          ],
          orbColors: ['var(--chat-1)', 'var(--chat-2)', '#059669', '#6EE7B7'],
          preview: 'chat'
        },
        knowledge: {
          badge: 'Knowledge Graphs',
          badgeBg: '#F5F3FF',
          badgeColor: 'var(--kg-1)',
          title: 'Knowledge Graphs',
          desc: 'Automatically extract entities and relationships from your materials to build interactive knowledge graphs. Discover hidden connections between concepts across your entire course.',
          features: [
            'Auto-extracted entities and relationships',
            'Interactive node exploration with filters',
            'Cross-document concept linking',
            'Strength-based edge visualization'
          ],
          orbColors: ['var(--kg-1)', 'var(--kg-2)', '#6D28D9', '#C4B5FD'],
          preview: 'knowledge'
        },
        notes: {
          badge: 'Smart Notes',
          badgeBg: '#FFFBEB',
          badgeColor: 'var(--notes-1)',
          title: 'Smart Notes with AI Assistance',
          desc: 'Write notes with an AI co-pilot that suggests related concepts, generates summaries, and links your notes to flashcards and mind maps. Never miss a key insight.',
          features: [
            'Real-time AI suggestions as you type',
            'Auto-link to flashcards and mind maps',
            'One-click summary generation',
            'Quick actions: quiz, summarize, expand'
          ],
          orbColors: ['var(--notes-1)', 'var(--notes-2)', '#D97706', '#FDE68A'],
          preview: 'notes'
        }
      };
  
      // --- Mouse Tracking ---
      container.querySelectorAll('.bento-card').forEach(card => {
        card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100).toFixed(1));
          card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100).toFixed(1));
        });
      });
  
      // --- 3D Tilt Effect on flashcard visual ---
      container.querySelectorAll('.bento-card.tilt-3d').forEach(card => {
        const flashCard = card.querySelector('.flash-single');
        if (!flashCard) return;
  
        card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -10;
          const rotateY = ((x - centerX) / centerX) * 10;
          flashCard.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          flashCard.style.boxShadow = `0 8px 30px rgba(0,0,0,0.12), 0 20px 50px rgba(0,0,0,0.08)`;
        });
  
        card.addEventListener('mouseleave', () => {
          flashCard.style.transform = '';
          flashCard.style.boxShadow = '';
        });
      });
  
      // --- Modal ---
      const overlay = container.querySelector('#modalOverlay');
      const modalBody = container.querySelector('#modalBody');
      const closeBtn = container.querySelector('#modalClose');
      let lastFocused = null;
  
      function openModal(tool) {
        const data = toolData[tool];
        if (!data) return;
        lastFocused = document.activeElement;
  
        if (tool === 'mindmaps') {
          modalBody.innerHTML = `
            <!-- Header Row -->
            <div class="modal-header">
              <div class="modal-header-left">
                <h3 class="modal-title">Interactive Mind Maps</h3>
                <p class="modal-desc">Transform any document or topic into a visual mind map. Expand, collapse, and rearrange nodes to build your understanding. Perfect for brainstorming and exam prep.</p>
                <div class="modal-cta-row">
                  <button class="btn-primary" style="background:linear-gradient(135deg,#0EA5E9,#0284C7);">Try it free</button>
                  <button class="btn-secondary">Learn more</button>
                </div>
              </div>
              <div class="modal-header-right">
                <div style="display:flex;flex-direction:column;gap:8px;">
                  <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#3c4f69;">
                    <svg width="16" height="16" fill="none" stroke="#0EA5E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3 3 7-8"/></svg>
                    One-click generation from study materials
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#3c4f69;">
                    <svg width="16" height="16" fill="none" stroke="#0EA5E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3 3 7-8"/></svg>
                    Drag, zoom, and expand interactive nodes
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#3c4f69;">
                    <svg width="16" height="16" fill="none" stroke="#0EA5E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3 3 7-8"/></svg>
                    Export as images or PDF for revision
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#3c4f69;">
                    <svg width="16" height="16" fill="none" stroke="#0EA5E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3 3 7-8"/></svg>
                    Auto-organize by topic hierarchy
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Graphics Row -->
            <div class="modal-graphics">
              <!-- Left Panel: Topic Input -->
              <div class="modal-graphic-panel" style="position:relative;overflow:hidden;">
                <div class="modal-orb modal-orb-1" style="background:#0EA5E9;filter:blur(10px);"></div>
                <div class="modal-orb modal-orb-2" style="background:#38BDF8;filter:blur(10px);"></div>
                <div style="position:relative;z-index:1;width:100%;">
                  <div style="background:#fff;border-radius:12px;box-shadow:rgba(50,50,93,0.25) 0 30px 45px -30px,rgba(0,0,0,0.1) 0 18px 36px -18px;max-width:100%;width:100%;overflow:hidden;">
                    <div style="display:flex;align-items:center;gap:8px;padding:10px 16px;border-bottom:1px solid #f0f4f8;">
                      <svg width="14" height="14" fill="none" stroke="#0EA5E9" stroke-width="1.5"><circle cx="6" cy="6" r="4.5"/><path d="M6 2v8M2 6h8"/></svg>
                      <span style="font-size:11px;font-weight:500;color:#061b31;">Mind Map</span>
                      <span style="font-size:11px;color:#7A8FA6;">·</span>
                      <span style="font-size:11px;color:#7A8FA6;">Topic-based</span>
                    </div>
                    <div style="padding:16px 18px;">
                      <div style="font-size:14px;color:#061b31;line-height:1.6;min-height:48px;">
                        Photosynthesis — light reactions, Calvin cycle, inputs and outputs<span style="display:inline-block;width:1.5px;height:15px;background:#0EA5E9;vertical-align:middle;margin-left:1px;animation:cursor-blink 1s step-end infinite;"></span>
                      </div>
                    </div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-top:1px solid #f0f4f8;">
                      <div style="display:flex;align-items:center;gap:8px;">
                        <div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;cursor:pointer;">
                          <svg width="16" height="16" fill="none" stroke="#7A8FA6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v8M5 5l3-3 3 3"/><path d="M2 9v3.5A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5V9"/></svg>
                        </div>
                        <div style="display:flex;align-items:center;gap:5px;padding:6px 12px;background:#f0f4f8;border:1px solid #e5edf5;border-radius:8px;font-size:12px;font-weight:500;color:#061b31;">
                          <svg width="12" height="12" fill="none" stroke="#0EA5E9" stroke-width="1.5"><circle cx="6" cy="6" r="4.5"/><path d="M6 2v8M2 6h8"/></svg>
                          Mind Map
                        </div>
                      </div>
                      <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#0EA5E9,#0284C7);display:flex;align-items:center;justify-content:center;cursor:pointer;">
                        <svg width="14" height="14" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 12M2 2l10 10"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Right Panel: Mindmap Output — Browser Window -->
              <div class="modal-graphic-panel" style="position:relative;overflow:hidden;">
                <div class="modal-orb modal-orb-3" style="background:#38BDF8;filter:blur(10px);"></div>
                <div class="modal-orb modal-orb-4" style="background:#7DD3FC;filter:blur(10px);"></div>
                <div style="position:relative;z-index:1;width:100%;">
                  <div style="background:rgba(255,255,255,0.25);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.4);border-radius:10px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.08),inset 0 0 0 1px rgba(255,255,255,0.3);">
                    <div style="height:30px;display:grid;grid-template-columns:40px 1fr 40px;align-items:center;padding:0 10px;border-bottom:1px solid rgba(229,237,245,0.5);background:rgba(255,255,255,0.35);">
                      <svg height="7" width="24"><circle cx="3.5" cy="3.5" r="3.5" fill="#FFBD2E"/><circle cx="11.5" cy="3.5" r="3.5" fill="#FF605C"/><circle cx="19.5" cy="3.5" r="3.5" fill="#28CA41"/></svg>
                      <div style="background:rgba(255,255,255,0.45);border-radius:10px;padding:2px 10px;font-size:8px;color:#7A8FA6;text-align:center;">mentron.app/mindmap/photosynthesis</div>
                    </div>
                    <div style="background:rgba(245,244,240,0.7);padding:16px;">
                      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                        <span style="font-size:11px;font-weight:600;color:#061b31;">Photosynthesis</span>
                        <div style="display:flex;gap:4px;">
                          <div style="width:22px;height:22px;border-radius:5px;background:rgba(255,255,255,0.5);display:flex;align-items:center;justify-content:center;">
                            <svg width="10" height="10" fill="none" stroke="#7A8FA6" stroke-width="1.5"><circle cx="5" cy="5" r="3.5"/><path d="M5 3v4M3 5h4"/></svg>
                          </div>
                          <div style="width:22px;height:22px;border-radius:5px;background:rgba(255,255,255,0.5);display:flex;align-items:center;justify-content:center;">
                            <svg width="10" height="10" fill="none" stroke="#7A8FA6" stroke-width="1.5"><path d="M2 1h6v6H2zM8 4h2v5H5"/></svg>
                          </div>
                        </div>
                      </div>
                      <svg width="100%" viewBox="0 0 400 300" style="display:block;">
                        <path d="M200 60 C200 110,90 110,90 150" stroke="#d62839" stroke-width="2" fill="none" opacity="0.35"/>
                        <path d="M200 60 C200 110,200 110,200 150" stroke="#1b4332" stroke-width="2" fill="none" opacity="0.35"/>
                        <path d="M200 60 C200 110,310 110,310 150" stroke="#c44900" stroke-width="2" fill="none" opacity="0.35"/>
                        <path d="M90 180 C90 210,45 210,45 240" stroke="#e05c6a" stroke-width="1.5" fill="none" opacity="0.3"/>
                        <path d="M90 180 C90 210,135 210,135 240" stroke="#e05c6a" stroke-width="1.5" fill="none" opacity="0.3"/>
                        <path d="M200 180 C200 210,170 210,170 240" stroke="#2d6a4f" stroke-width="1.5" fill="none" opacity="0.3"/>
                        <path d="M200 180 C200 210,230 210,230 240" stroke="#2d6a4f" stroke-width="1.5" fill="none" opacity="0.3"/>
                        <path d="M310 180 C310 210,280 210,280 240" stroke="#e07030" stroke-width="1.5" fill="none" opacity="0.3"/>
                        <path d="M310 180 C310 210,355 210,355 240" stroke="#e07030" stroke-width="1.5" fill="none" opacity="0.3"/>
                        <rect x="145" y="30" width="110" height="30" rx="15" fill="#1a1a2e"/>
                        <text x="200" y="50" text-anchor="middle" fill="#fff" font-size="11" font-weight="500" font-family="Inter,sans-serif">Photosynthesis</text>
                        <rect x="45" y="155" width="90" height="26" rx="13" fill="#d62839"/>
                        <text x="90" y="172" text-anchor="middle" fill="#fff" font-size="10" font-weight="500" font-family="Inter,sans-serif">Inputs</text>
                        <rect x="155" y="155" width="90" height="26" rx="13" fill="#1b4332"/>
                        <text x="200" y="172" text-anchor="middle" fill="#fff" font-size="10" font-weight="500" font-family="Inter,sans-serif">Process</text>
                        <rect x="265" y="155" width="90" height="26" rx="13" fill="#c44900"/>
                        <text x="310" y="172" text-anchor="middle" fill="#fff" font-size="10" font-weight="500" font-family="Inter,sans-serif">Outputs</text>
                        <rect x="10" y="243" width="70" height="22" rx="11" fill="#fbb8bf"/>
                        <text x="45" y="258" text-anchor="middle" fill="#6b0011" font-size="9" font-family="Inter,sans-serif">CO&#8322; + Water</text>
                        <rect x="90" y="243" width="85" height="22" rx="11" fill="#fbb8bf"/>
                        <text x="132" y="258" text-anchor="middle" fill="#6b0011" font-size="9" font-family="Inter,sans-serif">Sunlight</text>
                        <rect x="125" y="243" width="85" height="22" rx="11" fill="#95d5b2"/>
                        <text x="167" y="258" text-anchor="middle" fill="#0a2e1a" font-size="9" font-family="Inter,sans-serif">Light Rxn</text>
                        <rect x="192" y="243" width="72" height="22" rx="11" fill="#95d5b2"/>
                        <text x="228" y="258" text-anchor="middle" fill="#0a2e1a" font-size="9" font-family="Inter,sans-serif">Calvin</text>
                        <rect x="245" y="243" width="72" height="22" rx="11" fill="#f9c784"/>
                        <text x="281" y="258" text-anchor="middle" fill="#5c2800" font-size="9" font-family="Inter,sans-serif">Glucose</text>
                        <rect x="320" y="243" width="72" height="22" rx="11" fill="#f9c784"/>
                        <text x="356" y="258" text-anchor="middle" fill="#5c2800" font-size="9" font-family="Inter,sans-serif">Oxygen</text>
                      </svg>
                      <div style="display:flex;gap:8px;margin-top:10px;">
                        <div style="flex:1;background:rgba(255,255,255,0.6);border:1px solid rgba(229,237,245,0.5);border-radius:6px;padding:5px 8px;text-align:center;">
                          <div style="font-size:8px;color:#3c4f69;">Nodes</div>
                          <div style="font-size:13px;font-weight:700;color:#061b31;font-feature-settings:'tnum';">13</div>
                        </div>
                        <div style="flex:1;background:rgba(255,255,255,0.6);border:1px solid rgba(229,237,245,0.5);border-radius:6px;padding:5px 8px;text-align:center;">
                          <div style="font-size:8px;color:#3c4f69;">Branches</div>
                          <div style="font-size:13px;font-weight:700;color:#061b31;font-feature-settings:'tnum';">3</div>
                        </div>
                        <div style="flex:1;background:rgba(255,255,255,0.6);border:1px solid rgba(229,237,245,0.5);border-radius:6px;padding:5px 8px;text-align:center;">
                          <div style="font-size:8px;color:#3c4f69;">Depth</div>
                          <div style="font-size:13px;font-weight:700;color:#061b31;font-feature-settings:'tnum';">4</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Detail Points -->
            <div class="modal-details">
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <defs><linearGradient id="dm1" x1="0" y1="0" x2="16" y2="16"><stop stop-color="#0EA5E9"/><stop offset="1" stop-color="#0284C7"/></linearGradient></defs>
                    <path fill="url(#dm1)" d="M9 2l2.1 4.3L16 7.2l-3.5 3.4.8 4.9L9 13.3 4.7 15.5l.8-4.9L2 7.2l4.9-.9L9 2z"/>
                  </svg>
                </div>
                <div class="modal-detail-text">One-click generation from any document or topic with AI-powered structuring</div>
              </div>
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <defs><linearGradient id="dm2" x1="0" y1="0" x2="16" y2="16"><stop stop-color="#38BDF8"/><stop offset="1" stop-color="#0EA5E9"/></linearGradient></defs>
                    <path fill="url(#dm2)" d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2a5 5 0 110 10A5 5 0 018 3z"/><path fill="url(#dm2)" d="M8 5a1 1 0 011 1v2.586l1.707 1.707a1 1 0 01-1.414 1.414l-2-2A1 1 0 017 9V6a1 1 0 011-1z"/>
                  </svg>
                </div>
                <div class="modal-detail-text">Interactive drag, zoom, and expand nodes to explore complex topics visually</div>
              </div>
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <defs><linearGradient id="dm3" x1="0" y1="0" x2="16" y2="16"><stop stop-color="#0284C7"/><stop offset="1" stop-color="#7DD3FC"/></linearGradient></defs>
                    <path fill="url(#dm3)" d="M3 14h10a1 1 0 001-1V5l-3-3H4a1 1 0 00-1 1v10a1 1 0 001 1z"/><path stroke="#fff" stroke-width="1.2" d="M6 9h4M8 7v4"/>
                  </svg>
                </div>
                <div class="modal-detail-text">Export as high-res images or PDF for offline revision and sharing</div>
              </div>
            </div>
  
            
            <!-- More to discover -->
            <div style="border-top:1px solid #e5edf5;padding-top:24px;">
              <div class="modal-discover-heading">More to discover</div>
              <div class="modal-discover-grid">
  
                <!-- Card 1: Auto Hierarchy -->
                <div class="modal-discover-card">
                  <div class="modal-discover-graphic">
                    <div class="disc-inner-card" style="border-color:#BAE6FD;background:#F0F9FF;">
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:13px;">
                        <span style="font-size:11px;font-weight:600;color:#061b31;">Auto Hierarchy</span>
                        <span style="font-size:9px;font-weight:600;color:#0EA5E9;background:#F0F9FF;padding:2px 7px;border-radius:99px;border:1px solid #BAE6FD;">4 levels deep</span>
                      </div>
                      <svg width="100%" viewBox="0 0 220 136" fill="none" style="display:block;overflow:visible;">
                        <path d="M110 26 C110 55,38 55,38 70" stroke="#BAE6FD" stroke-width="1.5"/>
                        <path d="M110 26 L110 70" stroke="#BAE6FD" stroke-width="1.5"/>
                        <path d="M110 26 C110 55,182 55,182 70" stroke="#BAE6FD" stroke-width="1.5"/>
                        <line x1="38" y1="92" x2="38" y2="104" stroke="#BAE6FD" stroke-width="1"/>
                        <line x1="110" y1="92" x2="110" y2="104" stroke="#BAE6FD" stroke-width="1"/>
                        <line x1="182" y1="92" x2="182" y2="104" stroke="#BAE6FD" stroke-width="1"/>
                        <rect x="55" y="8" width="110" height="22" rx="11" fill="#0EA5E9"/>
                        <text x="110" y="23" text-anchor="middle" fill="#fff" font-size="10" font-weight="600" font-family="Inter,sans-serif">Photosynthesis</text>
                        <rect x="4" y="70" width="68" height="22" rx="11" fill="#E0F2FE" stroke="#BAE6FD" stroke-width="1"/>
                        <text x="38" y="85" text-anchor="middle" fill="#0284C7" font-size="9.5" font-weight="600" font-family="Inter,sans-serif">Inputs</text>
                        <rect x="76" y="70" width="68" height="22" rx="11" fill="#E0F2FE" stroke="#BAE6FD" stroke-width="1"/>
                        <text x="110" y="85" text-anchor="middle" fill="#0284C7" font-size="9.5" font-weight="600" font-family="Inter,sans-serif">Process</text>
                        <rect x="148" y="70" width="68" height="22" rx="11" fill="#E0F2FE" stroke="#BAE6FD" stroke-width="1"/>
                        <text x="182" y="85" text-anchor="middle" fill="#0284C7" font-size="9.5" font-weight="600" font-family="Inter,sans-serif">Outputs</text>
                        <rect x="8" y="104" width="60" height="17" rx="8.5" fill="#F0F9FF" stroke="#BAE6FD" stroke-width="0.75"/>
                        <text x="38" y="116" text-anchor="middle" fill="#0EA5E9" font-size="8" font-family="Inter,sans-serif">3 subtopics</text>
                        <rect x="80" y="104" width="60" height="17" rx="8.5" fill="#F0F9FF" stroke="#BAE6FD" stroke-width="0.75"/>
                        <text x="110" y="116" text-anchor="middle" fill="#0EA5E9" font-size="8" font-family="Inter,sans-serif">4 subtopics</text>
                        <rect x="152" y="104" width="60" height="17" rx="8.5" fill="#F0F9FF" stroke="#BAE6FD" stroke-width="0.75"/>
                        <text x="182" y="116" text-anchor="middle" fill="#0EA5E9" font-size="8" font-family="Inter,sans-serif">2 subtopics</text>
                      </svg>
                    </div>
                  </div>
                  <div class="modal-discover-card-text">
                    <p>AI reads your material and structures it into branches automatically — no manual dragging or labelling required.</p>
                    <a class="modal-discover-link" style="color:#0EA5E9;">Auto-structure &rarr;</a>
                  </div>
                </div>
  
                <!-- Card 2: Branch to Flashcard -->
                <div class="modal-discover-card">
                  <div class="modal-discover-graphic">
                    <div class="disc-inner-card" style="border-color:#BAE6FD;background:#F0F9FF;">
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:13px;">
                        <span style="font-size:11px;font-weight:600;color:#061b31;">Branch &rarr; Flashcard</span>
                        <span style="font-size:9px;font-weight:600;color:#0EA5E9;background:#F0F9FF;padding:2px 7px;border-radius:99px;border:1px solid #BAE6FD;">Mentron-only</span>
                      </div>
                      <div style="display:inline-flex;align-items:center;gap:7px;background:#E0F2FE;border:1px solid #BAE6FD;border-radius:99px;padding:5px 12px;font-size:11px;font-weight:500;color:#0284C7;">
                        <div style="width:7px;height:7px;border-radius:50%;background:#0EA5E9;"></div>
                        Light Reactions
                      </div>
                      <div style="display:flex;flex-direction:column;align-items:flex-start;gap:0;padding:7px 0 7px 10px;">
                        <div style="width:1px;height:18px;background:#BAE6FD;"></div>
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M7 0v8M3 5l4 4 4-4" stroke="#BAE6FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </div>
                      <div style="position:relative;height:52px;margin-bottom:10px;">
                        <div style="position:absolute;border-radius:7px;border:1px solid #BAE6FD;width:calc(100% - 10px);height:38px;top:9px;left:8px;background:#F0F9FF;"></div>
                        <div style="position:absolute;border-radius:7px;border:1px solid #BAE6FD;width:calc(100% - 10px);height:38px;top:4px;left:4px;background:#E0F2FE;"></div>
                        <div style="position:absolute;border-radius:7px;border:1px solid #BAE6FD;width:calc(100% - 10px);height:38px;top:0;left:0;background:#fff;display:flex;align-items:center;padding:0 11px;">
                          <span style="font-size:10px;font-weight:500;color:#061b31;line-height:1.3;">What drives ATP synthesis in the light reactions?</span>
                        </div>
                      </div>
                      <div style="font-size:10px;color:#50617a;">12 flashcards linked to this branch</div>
                    </div>
                  </div>
                  <div class="modal-discover-card-text">
                    <p>Any mind map branch can spawn a linked flashcard deck. Study the concept and test yourself without leaving the map.</p>
                    <a class="modal-discover-link" style="color:#0EA5E9;">Cross-feature linking &rarr;</a>
                  </div>
                </div>
  
                <!-- Card 3: Export Studio -->
                <div class="modal-discover-card">
                  <div class="modal-discover-graphic">
                    <div class="disc-inner-card" style="border-color:#BAE6FD;background:#F0F9FF;">
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:13px;">
                        <span style="font-size:11px;font-weight:600;color:#061b31;">Export Studio</span>
                        <span style="font-size:9px;font-weight:600;color:#0EA5E9;background:#F0F9FF;padding:2px 7px;border-radius:99px;border:1px solid #BAE6FD;">PNG selected</span>
                      </div>
                      <div style="display:flex;gap:6px;margin-bottom:13px;">
                        <div style="flex:1;padding:7px 0;border-radius:8px;display:flex;align-items:center;justify-content:center;gap:5px;font-size:10px;font-weight:600;background:#0EA5E9;color:#fff;">
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                          PNG
                        </div>
                        <div style="flex:1;padding:7px 0;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;background:#F0F9FF;border:1px solid #BAE6FD;color:#0284C7;">PDF</div>
                        <div style="flex:1;padding:7px 0;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;background:#F0F9FF;border:1px solid #BAE6FD;color:#0284C7;">SVG</div>
                      </div>
                      <div style="background:#F0F9FF;border:1px solid #BAE6FD;border-radius:7px;height:62px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;overflow:hidden;padding:8px;">
                        <svg width="100%" height="46" viewBox="0 0 200 46" fill="none">
                          <rect x="70" y="2" width="60" height="14" rx="7" fill="#0EA5E9"/>
                          <text x="100" y="12.5" text-anchor="middle" fill="#fff" font-size="7" font-weight="600" font-family="Inter,sans-serif">Photosynthesis</text>
                          <line x1="100" y1="16" x2="34" y2="30" stroke="#BAE6FD" stroke-width="1"/>
                          <line x1="100" y1="16" x2="100" y2="30" stroke="#BAE6FD" stroke-width="1"/>
                          <line x1="100" y1="16" x2="166" y2="30" stroke="#BAE6FD" stroke-width="1"/>
                          <rect x="4" y="30" width="60" height="14" rx="7" fill="#E0F2FE"/>
                          <text x="34" y="40.5" text-anchor="middle" fill="#0284C7" font-size="6.5" font-family="Inter,sans-serif">Inputs</text>
                          <rect x="70" y="30" width="60" height="14" rx="7" fill="#E0F2FE"/>
                          <text x="100" y="40.5" text-anchor="middle" fill="#0284C7" font-size="6.5" font-family="Inter,sans-serif">Process</text>
                          <rect x="136" y="30" width="60" height="14" rx="7" fill="#E0F2FE"/>
                          <text x="166" y="40.5" text-anchor="middle" fill="#0284C7" font-size="6.5" font-family="Inter,sans-serif">Outputs</text>
                        </svg>
                      </div>
                      <div style="display:flex;gap:5px;flex-wrap:wrap;">
                        <div style="padding:3px 9px;border-radius:99px;font-size:8.5px;font-weight:500;background:#F0F9FF;border:1px solid #BAE6FD;color:#0284C7;">High-res</div>
                        <div style="padding:3px 9px;border-radius:99px;font-size:8.5px;font-weight:500;background:#F0F9FF;border:1px solid #BAE6FD;color:#0284C7;">Shareable link</div>
                        <div style="padding:3px 9px;border-radius:99px;font-size:8.5px;font-weight:500;background:#F0F9FF;border:1px solid #BAE6FD;color:#0284C7;">Embed</div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-discover-card-text">
                    <p>Export any map as a high-res PNG, PDF, or scalable SVG — or share a live link and embed it in your LMS.</p>
                    <a class="modal-discover-link" style="color:#0EA5E9;">Export options &rarr;</a>
                  </div>
                </div>
  
              </div>
            </div>
          `;
        } else if (tool === 'flashcards') {
          // Stripe-style layout: header row (title+CTA left, features right) + graphics row below
          modalBody.innerHTML = `
            <!-- Header Row: 12-col grid -->
            <div class="modal-header">
              <div class="modal-header-left">
                <h3 class="modal-title" id="modalTitle">${data.title}</h3>
                <p class="modal-desc">${data.desc}</p>
                <div class="modal-cta-row">
                  <button class="btn-primary">Try it free</button>
                  <button class="btn-secondary">Learn more</button>
                </div>
              </div>
              <div class="modal-header-right">
                <div class="feature-list">
                  ${data.features.map(f => `
                    <div class="feature-item">
                      <svg width="16" height="16" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.5 3.5 6.5-9"/></svg>
                      <span class="feature-text">${f}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
  
            <!-- Graphics Row: two side-by-side panels -->
            <div class="modal-graphics">
              <!-- Left panel (7fr): Generation query box -->
              <div class="modal-graphic-panel">
                <div class="modal-orb modal-orb-1"></div>
                <div class="modal-orb modal-orb-2"></div>
                <div class="modal-graphic">
                  <div style="background:#fff;border-radius:12px;box-shadow:rgba(50,50,93,0.25) 0 30px 45px -30px,rgba(0,0,0,0.1) 0 18px 36px -18px;max-width:100%;width:100%;overflow:hidden;">
                    <!-- Uploaded file chips -->
                    <div style="padding:14px 18px 0 18px;display:flex;gap:8px;flex-wrap:wrap;">
                      <div style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:#F5F3FF;border:1px solid #DDD6FE;border-radius:8px;font-size:11px;color:#7C3AED;">
                        <svg width="12" height="12" fill="none" stroke="#7C3AED" stroke-width="1.3"><path d="M2 1h5l3 3v6a1.5 1.5 0 01-1.5 1.5H2A1.5 1.5 0 01.5 10V2.5A1.5 1.5 0 012 1z"/><path d="M7 1v3h3"/></svg>
                        lecture-12.pdf
                        <svg width="10" height="10" fill="none" stroke="#A78BFA" stroke-width="1.5" stroke-linecap="round"><path d="M2 2l6 6M8 2l-6 6"/></svg>
                      </div>
                      <div style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:#F5F3FF;border:1px solid #DDD6FE;border-radius:8px;font-size:11px;color:#7C3AED;">
                        <svg width="12" height="12" fill="none" stroke="#7C3AED" stroke-width="1.3"><path d="M2 1h5l3 3v6a1.5 1.5 0 01-1.5 1.5H2A1.5 1.5 0 01.5 10V2.5A1.5 1.5 0 012 1z"/><path d="M7 1v3h3"/></svg>
                        DSA-notes.docx
                        <svg width="10" height="10" fill="none" stroke="#A78BFA" stroke-width="1.5" stroke-linecap="round"><path d="M2 2l6 6M8 2l-6 6"/></svg>
                      </div>
                    </div>
  
                    <!-- Query text -->
                    <div style="padding:12px 18px 8px 18px;">
                      <div style="font-size:14px;color:#061b31;line-height:1.6;min-height:56px;">
                        Generate flashcards on binary trees and graph traversal. Focus on BFS vs DFS comparisons, time complexities, and real-world applications.<span style="display:inline-block;width:1.5px;height:15px;background:#7C3AED;vertical-align:middle;margin-left:1px;animation:cursor-blink 1s step-end infinite;"></span>
                      </div>
                    </div>
  
                    <!-- Bottom toolbar -->
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-top:1px solid #f0f4f8;">
                      <div style="display:flex;align-items:center;gap:8px;">
                        <!-- Upload button -->
                        <div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;cursor:pointer;transition:background 0.15s;">
                          <svg width="16" height="16" fill="none" stroke="#7A8FA6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v8M5 5l3-3 3 3"/><path d="M2 9v3.5A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5V9"/></svg>
                        </div>
                        <!-- Mode dropdown (open) -->
                        <div style="position:relative;display:inline-flex;">
                          <div style="display:flex;align-items:center;gap:5px;padding:6px 12px;background:#f0f4f8;border:1px solid #e5edf5;border-radius:8px;font-size:12px;font-weight:500;color:#061b31;cursor:pointer;">
                            <svg width="12" height="12" fill="none" stroke="#7C3AED" stroke-width="1.5"><rect x="1" y="1" width="10" height="10" rx="2"/><path d="M5 4h2M5 6h2M5 8h2"/></svg>
                            Flashcards
                            <svg width="10" height="10" fill="none" stroke="#7A8FA6" stroke-width="1.5"><path d="M2.5 4l2.5 2.5L7.5 4"/></svg>
                          </div>
                          <!-- Open dropdown overlay -->
                          <div style="position:absolute;top:calc(100% + 6px);left:-4px;min-width:170px;background:#fff;border:1px solid #e5edf5;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.1);z-index:10;overflow:hidden;">
                            <div style="padding:9px 14px;font-size:12px;color:#7C3AED;background:#F5F3FF;font-weight:500;display:flex;align-items:center;gap:8px;">
                              <svg width="12" height="12" fill="none" stroke="#7C3AED" stroke-width="1.5"><rect x="1" y="1" width="10" height="10" rx="2"/><path d="M5 4h2M5 6h2M5 8h2"/></svg>
                              Flashcards
                            </div>
                            <div style="padding:9px 14px;font-size:12px;color:#50617a;display:flex;align-items:center;gap:8px;border-top:1px solid #f0f4f8;">
                              <svg width="12" height="12" fill="none" stroke="#50617a" stroke-width="1.5"><circle cx="6" cy="6" r="4.5"/><path d="M6 2v8M2 6h8"/></svg>
                              Mind Map
                            </div>
                            <div style="padding:9px 14px;font-size:12px;color:#50617a;display:flex;align-items:center;gap:8px;border-top:1px solid #f0f4f8;">
                              <svg width="12" height="12" fill="none" stroke="#50617a" stroke-width="1.5"><circle cx="3.5" cy="5" r="2"/><circle cx="8.5" cy="2.5" r="2"/><circle cx="8.5" cy="8.5" r="2"/><path d="M5 5.5l2.5-2M5 5.5l2.5 2"/></svg>
                              Knowledge Graph
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Send button -->
                      <div style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;background:#0077FF;cursor:pointer;box-shadow:0 2px 10px rgba(0,119,255,0.3);">
                        <svg width="14" height="14" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 7h10M8 3l4 4-4 4"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Right panel (5fr): SRS Review Schedule -->
              <div class="modal-graphic-panel">
                <div class="modal-orb modal-orb-3"></div>
                <div class="modal-orb modal-orb-4"></div>
                <div class="modal-graphic" style="animation-delay:0.1s;">
                  <div style="background:#fff;border-radius:10px;padding:24px;box-shadow:rgba(50,50,93,0.25) 0 30px 45px -30px,rgba(0,0,0,0.1) 0 18px 36px -18px;max-width:100%;width:100%;">
                    <!-- Header -->
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
                      <div>
                        <div style="font-size:13px;font-weight:600;color:#061b31;">Spaced Repetition</div>
                        <div style="font-size:11px;color:#7A8FA6;margin-top:3px;">Next 7 days</div>
                      </div>
                      <div style="display:flex;align-items:center;gap:12px;font-size:10px;">
                        <div style="display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;border-radius:3px;background:#7C3AED;"></span>New</div>
                        <div style="display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;border-radius:3px;background:#059669;"></span>Review</div>
                        <div style="display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;border-radius:3px;background:#D97706;"></span>Overdue</div>
                      </div>
                    </div>
  
                    <!-- Bar chart -->
                    <div style="display:flex;align-items:flex-end;gap:8px;height:100px;margin-bottom:20px;padding:0 4px;">
                      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
                        <div style="width:100%;display:flex;flex-direction:column-reverse;gap:2px;">
                          <div style="height:28px;background:#7C3AED;border-radius:3px;"></div>
                          <div style="height:22px;background:#059669;border-radius:3px;"></div>
                          <div style="height:8px;background:#D97706;border-radius:3px;"></div>
                        </div>
                        <span style="font-size:9px;color:#7A8FA6;">Mon</span>
                      </div>
                      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
                        <div style="width:100%;display:flex;flex-direction:column-reverse;gap:2px;">
                          <div style="height:18px;background:#7C3AED;border-radius:3px;"></div>
                          <div style="height:38px;background:#059669;border-radius:3px;"></div>
                        </div>
                        <span style="font-size:9px;color:#7A8FA6;">Tue</span>
                      </div>
                      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
                        <div style="width:100%;display:flex;flex-direction:column-reverse;gap:2px;">
                          <div style="height:10px;background:#7C3AED;border-radius:3px;"></div>
                          <div style="height:48px;background:#059669;border-radius:3px;"></div>
                          <div style="height:6px;background:#D97706;border-radius:3px;"></div>
                        </div>
                        <span style="font-size:9px;color:#7A8FA6;">Wed</span>
                      </div>
                      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
                        <div style="width:100%;display:flex;flex-direction:column-reverse;gap:2px;">
                          <div style="height:14px;background:#7C3AED;border-radius:3px;"></div>
                          <div style="height:32px;background:#059669;border-radius:3px;"></div>
                        </div>
                        <span style="font-size:9px;color:#7A8FA6;">Thu</span>
                      </div>
                      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
                        <div style="width:100%;display:flex;flex-direction:column-reverse;gap:2px;">
                          <div style="height:24px;background:#7C3AED;border-radius:3px;"></div>
                          <div style="height:26px;background:#059669;border-radius:3px;"></div>
                          <div style="height:10px;background:#D97706;border-radius:3px;"></div>
                        </div>
                        <span style="font-size:9px;color:#7A8FA6;">Fri</span>
                      </div>
                      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
                        <div style="width:100%;display:flex;flex-direction:column-reverse;gap:2px;">
                          <div style="height:8px;background:#7C3AED;border-radius:3px;"></div>
                          <div style="height:16px;background:#059669;border-radius:3px;"></div>
                        </div>
                        <span style="font-size:9px;color:#7A8FA6;">Sat</span>
                      </div>
                      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
                        <div style="width:100%;display:flex;flex-direction:column-reverse;gap:2px;">
                          <div style="height:5px;background:#7C3AED;border-radius:3px;"></div>
                          <div style="height:12px;background:#059669;border-radius:3px;"></div>
                        </div>
                        <span style="font-size:9px;color:#7A8FA6;">Sun</span>
                      </div>
                    </div>
  
                    <!-- Forgetting curve -->
                    <div style="margin-bottom:20px;">
                      <svg width="100%" height="36" viewBox="0 0 260 36" fill="none" preserveAspectRatio="none">
                        <path d="M0 6 C40 6, 60 10, 90 20 C110 26, 130 30, 160 28 C190 24, 210 16, 240 12 C250 10, 255 8, 260 6" stroke="#C4B5FD" stroke-width="1.5" fill="none" stroke-dasharray="4 3"/>
                        <path d="M0 6 C30 6, 50 8, 70 10 C100 12, 120 14, 140 14 C170 14, 190 14, 210 14 C235 14, 250 14, 260 14" stroke="#7C3AED" stroke-width="1.5" fill="none"/>
                        <circle cx="0" cy="6" r="3.5" fill="#7C3AED"/>
                        <circle cx="70" cy="10" r="3.5" fill="#7C3AED"/>
                        <circle cx="140" cy="14" r="3.5" fill="#7C3AED"/>
                        <circle cx="210" cy="14" r="3.5" fill="#7C3AED"/>
                        <circle cx="260" cy="14" r="3.5" fill="#7C3AED"/>
                      </svg>
                      <div style="display:flex;justify-content:space-between;font-size:8px;color:#7A8FA6;margin-top:4px;padding:0 4px;">
                        <span>Day 1</span><span>Day 3</span><span>Day 7</span><span>Day 14</span><span>Day 30</span>
                      </div>
                    </div>
  
                    <!-- Stats -->
                    <div style="display:flex;gap:10px;">
                      <div style="flex:1;background:#fff;border:1px solid #e5edf5;border-radius:8px;padding:10px 12px;text-align:center;">
                        <div style="font-size:10px;color:#3c4f69;margin-bottom:3px;">Due Now</div>
                        <div style="font-size:18px;font-weight:700;color:#061b31;font-feature-settings:'tnum';font-variant-numeric:tabular-nums;">6</div>
                      </div>
                      <div style="flex:1;background:#fff;border:1px solid #e5edf5;border-radius:8px;padding:10px 12px;text-align:center;">
                        <div style="font-size:10px;color:#3c4f69;margin-bottom:3px;">Reviewing</div>
                        <div style="font-size:18px;font-weight:700;color:#061b31;font-feature-settings:'tnum';font-variant-numeric:tabular-nums;">14</div>
                      </div>
                      <div style="flex:1;background:#fff;border:1px solid #e5edf5;border-radius:8px;padding:10px 12px;text-align:center;">
                        <div style="font-size:10px;color:#3c4f69;margin-bottom:3px;">Mastered</div>
                        <div style="font-size:18px;font-weight:700;color:#061b31;font-feature-settings:'tnum';font-variant-numeric:tabular-nums;">32</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Detail points (below graphics, like Stripe's bento-dialog-details) -->
            <div class="modal-details">
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="24" height="24" fill="none" viewBox="0 0 16 16">
                    <defs><linearGradient id="dg1" x1="10" y1="0" x2="5" y2="15" gradientUnits="userSpaceOnUse"><stop stop-color="#7C3AED"/><stop offset="0.5" stop-color="#9F7AEA"/><stop offset="1" stop-color="#EC4899"/></linearGradient></defs>
                    <path fill="url(#dg1)" fill-rule="evenodd" d="M0 3.5A1.5 1.5 0 011.5 2h13A1.5 1.5 0 0116 3.5v9a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 12.5v-9zM1.5 3h13v2h-13v-2zm13 3v6h-13V6h13z" clip-rule="evenodd"/>
                    <path fill="url(#dg1)" fill-rule="evenodd" d="M7 10.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="modal-detail-text">Auto-generated from PDFs, notes, and lectures with a single query</div>
              </div>
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="24" height="24" fill="none" viewBox="0 0 16 16">
                    <defs><linearGradient id="dg2" x1="10" y1="0" x2="5" y2="15" gradientUnits="userSpaceOnUse"><stop stop-color="#7C3AED"/><stop offset="0.5" stop-color="#9F7AEA"/><stop offset="1" stop-color="#EC4899"/></linearGradient></defs>
                    <path fill="url(#dg2)" d="M9.714 6.693a.75.75 0 101.106 1.014l2.933-3.2a.75.75 0 000-1.013L10.82.294a.75.75 0 10-1.106 1.013l1.781 1.943H4.6A3.75 3.75 0 00.85 7v.067a.75.75 0 101.5 0V7A2.25 2.25 0 014.6 4.75h6.895z"/>
                    <path fill="url(#dg2)" d="M6.286 9.307A.75.75 0 005.18 8.293l-2.932 3.2a.75.75 0 000 1.014l2.932 3.2a.75.75 0 101.106-1.014l-1.78-1.942H11.4A3.75 3.75 0 0015.15 9v-.067a.75.75 0 10-1.5 0V9a2.25 2.25 0 01-2.25 2.25H4.505z"/>
                  </svg>
                </div>
                <div class="modal-detail-text">Adaptive spaced repetition that schedules reviews before you forget</div>
              </div>
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="24" height="24" fill="none" viewBox="0 0 16 16">
                    <defs><linearGradient id="dg3" x1="10" y1="0" x2="5" y2="15" gradientUnits="userSpaceOnUse"><stop stop-color="#7C3AED"/><stop offset="0.5" stop-color="#9F7AEA"/><stop offset="1" stop-color="#EC4899"/></linearGradient></defs>
                    <path fill="url(#dg3)" fill-rule="evenodd" d="M0 3.884c0-.8.545-1.476 1.306-1.68l.018-.004L10.552.213q.226-.056.448-.055c.927.006 1.75.733 1.75 1.74V4.5h.75A2.5 2.5 0 0116 7v6.5a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 010 13.5V3.884zM10.913 1.67c.199-.052.337.09.337.23V4.5H2.5c-.356 0-.694.074-1 .208v-.824c0-.092.059-.189.181-.227l9.216-1.984zM1.5 7v6.5a1 1 0 001 1h11a1 1 0 001-1V7a1 1 0 00-1-1h-11a1 1 0 00-1 1" clip-rule="evenodd"/>
                    <path fill="url(#dg3)" d="M13 10.25c0 .688-.562 1.25-1.25 1.25s-1.25-.55-1.25-1.25c0-.688.563-1.25 1.25-1.25S13 9.562 13 10.25"/>
                  </svg>
                </div>
                <div class="modal-detail-text">Mastery tracking per card and topic with real-time progress insights</div>
              </div>
            </div>
  
            <!-- More to discover -->
            <div style="border-top:1px solid #e5edf5;padding-top:24px;">
              <div class="modal-discover-heading">More to discover</div>
              <div class="modal-discover-grid">
  
                <!-- Card 1: Exam Countdown -->
                <div class="modal-discover-card">
                  <div class="modal-discover-graphic">
                    <div class="disc-inner-card">
                      <div class="cdown-header">
                        <span class="cdown-title">Exam Countdown</span>
                        <span class="cdown-badge">14 days left</span>
                      </div>
                      <div class="cdown-week">
                        <div class="cday"><span class="cday-label">Mon</span><span class="cday-num">8</span></div>
                        <div class="cday"><span class="cday-label">Tue</span><span class="cday-num">9</span></div>
                        <div class="cday study"><span class="cday-label">Wed</span><span class="cday-num">10</span></div>
                        <div class="cday active"><span class="cday-label">Thu</span><span class="cday-num">11</span></div>
                        <div class="cday study"><span class="cday-label">Fri</span><span class="cday-num">12</span></div>
                        <div class="cday"><span class="cday-label">Sat</span><span class="cday-num">13</span></div>
                        <div class="cday exam"><span class="cday-label">Exam</span><span class="cday-num">22</span></div>
                      </div>
                      <div class="cdown-track-label">Study progress to exam</div>
                      <div class="cdown-bar-wrap"><div class="cdown-bar-fill"></div></div>
                      <div class="cdown-footer">
                        <span class="cdown-cards">23 cards due before exam</span>
                        <span class="cdown-pct">42% ready</span>
                      </div>
                    </div>
                  </div>
                  <div class="modal-discover-card-text">
                    <p>Set your exam date and Mentron front-loads the right cards automatically so you peak on test day.</p>
                    <a class="modal-discover-link">Exam mode &rarr;</a>
                  </div>
                </div>
  
                <!-- Card 2: Difficulty Map -->
                <div class="modal-discover-card">
                  <div class="modal-discover-graphic">
                    <div class="disc-inner-card">
                      <div class="diff-header">
                        <span class="diff-title">Difficulty Distribution</span>
                        <span style="font-size:9px;color:#7A8FA6;">52 cards</span>
                      </div>
                      <div class="diff-grid">
                        <div class="diff-tile easy"></div><div class="diff-tile easy"></div><div class="diff-tile med"></div><div class="diff-tile easy"></div><div class="diff-tile easy"></div>
                        <div class="diff-tile easy"></div><div class="diff-tile med"></div><div class="diff-tile hard"></div><div class="diff-tile med"></div><div class="diff-tile easy"></div>
                        <div class="diff-tile med"></div><div class="diff-tile hard"></div><div class="diff-tile hard"></div><div class="diff-tile med"></div><div class="diff-tile easy"></div>
                        <div class="diff-tile easy"></div><div class="diff-tile med"></div><div class="diff-tile hard"></div><div class="diff-tile med"></div><div class="diff-tile hard"></div>
                      </div>
                      <div class="diff-legend">
                        <div class="diff-legend-item"><div class="diff-dot" style="opacity:0.14;"></div>Easy <span class="diff-count">(8)</span></div>
                        <div class="diff-legend-item"><div class="diff-dot" style="opacity:0.45;"></div>Medium <span class="diff-count">(7)</span></div>
                        <div class="diff-legend-item"><div class="diff-dot" style="opacity:1;"></div>Hard <span class="diff-count">(5)</span></div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-discover-card-text">
                    <p>The algorithm surfaces harder cards more often. Your weakest concepts get the most attention automatically.</p>
                    <a class="modal-discover-link">Difficulty adaption &rarr;</a>
                  </div>
                </div>
  
                <!-- Card 3: Deck Mastery -->
                <div class="modal-discover-card">
                  <div class="modal-discover-graphic">
                    <div class="disc-inner-card">
                      <div class="mast-header">Topic Mastery</div>
                      <div class="mast-row">
                        <div class="mast-item">
                          <div class="mast-item-top"><span class="mast-name">Binary Trees</span><span class="mast-pct">78%</span></div>
                          <div class="mast-track"><div class="mast-fill" style="width:78%;"></div></div>
                        </div>
                        <div class="mast-item">
                          <div class="mast-item-top"><span class="mast-name">Graph Traversal</span><span class="mast-pct">54%</span></div>
                          <div class="mast-track"><div class="mast-fill" style="width:54%;"></div></div>
                        </div>
                        <div class="mast-item">
                          <div class="mast-item-top"><span class="mast-name">Sorting Algorithms</span><span class="mast-pct">31%</span></div>
                          <div class="mast-track"><div class="mast-fill" style="width:31%;"></div></div>
                        </div>
                        <div class="mast-item">
                          <div class="mast-item-top"><span class="mast-name">Dynamic Programming</span><span class="mast-pct">12%</span></div>
                          <div class="mast-track"><div class="mast-fill" style="width:12%;"></div></div>
                        </div>
                      </div>
                      <div class="mast-footer">
                        <span>52 cards across 4 topics</span>
                        <span class="mast-avg">Avg 44%</span>
                      </div>
                    </div>
                  </div>
                  <div class="modal-discover-card-text">
                    <p>Track mastery per topic in real time. Know exactly which chapters need more sessions before the exam.</p>
                    <a class="modal-discover-link">Progress tracking &rarr;</a>
                  </div>
                </div>
  
              </div>
            </div>
          `;
        } else if (tool === 'knowledge') {
          modalBody.innerHTML = `
            <!-- Header Row -->
            <div class="modal-header">
              <div class="modal-header-left">
                <h3 class="modal-title" id="modalTitle">Knowledge Graphs</h3>
                <p class="modal-desc">Automatically extract entities and relationships from your materials to build interactive knowledge graphs. Discover hidden connections across your entire course.</p>
                <div class="modal-cta-row">
                  <button class="btn-primary">Try it free</button>
                  <button class="btn-secondary">Learn more</button>
                </div>
              </div>
              <div class="modal-header-right">
                <div class="feature-list">
                  <div class="feature-item">
                    <svg width="16" height="16" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.5 3.5 6.5-9"/></svg>
                    <span class="feature-text">Auto-extracted entities and relationships</span>
                  </div>
                  <div class="feature-item">
                    <svg width="16" height="16" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.5 3.5 6.5-9"/></svg>
                    <span class="feature-text">Interactive node exploration with filters</span>
                  </div>
                  <div class="feature-item">
                    <svg width="16" height="16" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.5 3.5 6.5-9"/></svg>
                    <span class="feature-text">Cross-document concept linking</span>
                  </div>
                  <div class="feature-item">
                    <svg width="16" height="16" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.5 3.5 6.5-9"/></svg>
                    <span class="feature-text">Strength-based edge visualization</span>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Graphics Row -->
            <div class="modal-graphics">
              <!-- Left panel: Topic input / recent subjects -->
              <div class="modal-graphic-panel">
                <div class="modal-orb modal-orb-1"></div>
                <div class="modal-orb modal-orb-2"></div>
                <div class="modal-graphic">
                  <div style="background:#fff;border-radius:12px;box-shadow:rgba(50,50,93,0.25) 0 30px 45px -30px,rgba(0,0,0,0.1) 0 18px 36px -18px;max-width:100%;width:100%;overflow:hidden;">
                    <!-- Search bar -->
                    <div style="padding:14px 18px;border-bottom:1px solid #f0f4f8;">
                      <div style="display:flex;align-items:center;gap:10px;background:#f8fafd;border:1px solid #e5edf5;border-radius:10px;padding:10px 14px;">
                        <svg width="16" height="16" fill="none" stroke="#7A8FA6" stroke-width="1.5" stroke-linecap="round"><circle cx="7" cy="7" r="5.5"/><path d="M11 11l3.5 3.5"/></svg>
                        <span style="font-size:13px;color:#7A8FA6;">Enter subject or topic...</span>
                      </div>
                    </div>
  
                    <!-- Recent subjects -->
                    <div style="padding:14px 18px 8px;">
                      <div style="font-size:10px;font-weight:600;color:#7A8FA6;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Recent Graphs</div>
                      <div style="display:flex;flex-direction:column;gap:8px;">
                        <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:#F0F4FF;border:1px solid #D6E4F5;border-radius:10px;cursor:pointer;">
                          <div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#0077FF,#3399FF);display:flex;align-items:center;justify-content:center;">
                            <svg width="16" height="16" fill="none" stroke="#fff" stroke-width="1.5"><circle cx="8" cy="4" r="2.5"/><circle cx="3" cy="12" r="2.5"/><circle cx="13" cy="12" r="2.5"/><path d="M8 6.5v3M5.5 10L8 9.5M10.5 10L8 9.5"/></svg>
                          </div>
                          <div style="flex:1;">
                            <div style="font-size:12px;font-weight:600;color:#061b31;">Calculus</div>
                            <div style="font-size:10px;color:#7A8FA6;margin-top:1px;">8 nodes &middot; 9 relations</div>
                          </div>
                          <div style="font-size:9px;color:#0077FF;font-weight:500;">Live</div>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:#fff;border:1px solid #e5edf5;border-radius:10px;cursor:pointer;">
                          <div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#0055CC,#0077FF);display:flex;align-items:center;justify-content:center;">
                            <svg width="16" height="16" fill="none" stroke="#fff" stroke-width="1.5"><circle cx="8" cy="4" r="2.5"/><circle cx="3" cy="12" r="2.5"/><circle cx="13" cy="12" r="2.5"/><path d="M8 6.5v3M5.5 10L8 9.5M10.5 10L8 9.5"/></svg>
                          </div>
                          <div style="flex:1;">
                            <div style="font-size:12px;font-weight:600;color:#061b31;">Cell Biology</div>
                            <div style="font-size:10px;color:#7A8FA6;margin-top:1px;">18 nodes &middot; 24 relations</div>
                          </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:#fff;border:1px solid #e5edf5;border-radius:10px;cursor:pointer;">
                          <div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#0055CC,#3399FF);display:flex;align-items:center;justify-content:center;">
                            <svg width="16" height="16" fill="none" stroke="#fff" stroke-width="1.5"><circle cx="8" cy="4" r="2.5"/><circle cx="3" cy="12" r="2.5"/><circle cx="13" cy="12" r="2.5"/><path d="M8 6.5v3M5.5 10L8 9.5M10.5 10L8 9.5"/></svg>
                          </div>
                          <div style="flex:1;">
                            <div style="font-size:12px;font-weight:600;color:#061b31;">World War II</div>
                            <div style="font-size:10px;color:#7A8FA6;margin-top:1px;">31 nodes &middot; 42 relations</div>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <!-- Legend -->
                    <div style="padding:10px 18px 14px;border-top:1px solid #f0f4f8;margin-top:8px;">
                      <div style="display:flex;flex-wrap:wrap;gap:8px 14px;font-size:9px;color:#50617a;">
                        <div style="display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;border-radius:50%;background:#0055CC;"></span>Core</div>
                        <div style="display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;border-radius:50%;background:#0077FF;"></span>Topic</div>
                        <div style="display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;border-radius:50%;background:#3399FF;"></span>Concept</div>
                        <div style="display:flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;border-radius:50%;background:#66BBFF;"></span>Detail</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Right panel: Browser window with full KG canvas -->
              <div class="modal-graphic-panel">
                <div class="modal-orb modal-orb-3"></div>
                <div class="modal-orb modal-orb-4"></div>
                <div class="modal-graphic" style="animation-delay:0.1s;">
                  <div class="kg-browser" style="height:100%;">
                    <div class="kg-browser-top">
                      <svg height="7" width="24"><circle cx="3.5" cy="3.5" r="3.5" fill="#FFBD2E"/><circle cx="11.5" cy="3.5" r="3.5" fill="#FF605C"/><circle cx="19.5" cy="3.5" r="3.5" fill="#28CA41"/></svg>
                      <div class="kg-browser-url">mentron.app/graph/calculus</div>
                    </div>
                    <div class="kg-browser-body" id="kgModalBody" style="height:340px;">
                      <canvas id="kgModalCanvas"></canvas>
                    </div>
                    <!-- Stats footer -->
                    <div style="display:flex;gap:8px;padding:8px 14px;border-top:1px solid rgba(229,237,245,0.5);background:rgba(255,255,255,0.35);">
                      <div style="background:rgba(255,255,255,0.7);border:1px solid #e5edf5;border-radius:6px;padding:4px 10px;font-size:9px;font-weight:600;color:#061b31;">8 Nodes</div>
                      <div style="background:rgba(255,255,255,0.7);border:1px solid #e5edf5;border-radius:6px;padding:4px 10px;font-size:9px;font-weight:600;color:#061b31;">9 Relations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Detail points -->
            <div class="modal-details">
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="24" height="24" fill="none" viewBox="0 0 16 16">
                    <defs><linearGradient id="kg1" x1="10" y1="0" x2="5" y2="15" gradientUnits="userSpaceOnUse"><stop stop-color="#7C3AED"/><stop offset="0.5" stop-color="#A855F7"/><stop offset="1" stop-color="#3b7dd8"/></linearGradient></defs>
                    <circle cx="8" cy="3" r="2" fill="url(#kg1)"/>
                    <circle cx="3" cy="12" r="2" fill="url(#kg1)"/>
                    <circle cx="13" cy="12" r="2" fill="url(#kg1)"/>
                    <line x1="8" y1="5" x2="3" y2="10" stroke="url(#kg1)" stroke-width="1.5"/>
                    <line x1="8" y1="5" x2="13" y2="10" stroke="url(#kg1)" stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="modal-detail-text">Auto-extract entities and relationships from any document or lecture material</div>
              </div>
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="24" height="24" fill="none" viewBox="0 0 16 16">
                    <defs><linearGradient id="kg2" x1="10" y1="0" x2="5" y2="15" gradientUnits="userSpaceOnUse"><stop stop-color="#7C3AED"/><stop offset="0.5" stop-color="#A855F7"/><stop offset="1" stop-color="#3b7dd8"/></linearGradient></defs>
                    <path fill="url(#kg2)" d="M6.5 1a.75.75 0 00-1.5 0v1.03A5.5 5.5 0 002.03 5H1a.75.75 0 000 1.5h.81A5.5 5.5 0 005 10.19v.81a.75.75 0 001.5 0v-.81A5.5 5.5 0 009.97 6.5h.78a.75.75 0 000-1.5h-.78A5.5 5.5 0 006.5 2.03V1zM5.75 3.5a4 4 0 110 8 4 4 0 010-8z"/>
                    <circle cx="5.75" cy="7.5" r="1.5" fill="url(#kg2)"/>
                  </svg>
                </div>
                <div class="modal-detail-text">Interactive exploration with drag, zoom, and type-based filtering</div>
              </div>
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="24" height="24" fill="none" viewBox="0 0 16 16">
                    <defs><linearGradient id="kg3" x1="10" y1="0" x2="5" y2="15" gradientUnits="userSpaceOnUse"><stop stop-color="#7C3AED"/><stop offset="0.5" stop-color="#A855F7"/><stop offset="1" stop-color="#3b7dd8"/></linearGradient></defs>
                    <path fill="url(#kg3)" fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H4zm1.5 3.5a1 1 0 11-2 0 1 1 0 012 0zm1.5 0a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zM5.5 9.5a1 1 0 11-2 0 1 1 0 012 0zm1.5 0a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="modal-detail-text">Cross-document concept linking reveals hidden connections in your study materials</div>
              </div>
            </div>
  
            <!-- More to discover -->
            <div style="border-top:1px solid #e5edf5;padding-top:24px;">
              <div class="modal-discover-heading">More to discover</div>
              <div class="modal-discover-grid">
  
                <!-- Card 1: Concept Coverage -->
                <div class="modal-discover-card">
                  <div class="modal-discover-graphic">
                    <div class="disc-inner-card">
                      <div class="cov-header">
                        <span class="cov-label">Concept Coverage</span>
                        <span class="cov-badge">62% mastered</span>
                      </div>
                      <div class="cov-grid">
                        <div class="cov-node mastered"></div><div class="cov-node mastered"></div><div class="cov-node mastered"></div><div class="cov-node mastered"></div><div class="cov-node mastered"></div>
                        <div class="cov-node mastered"></div><div class="cov-node mastered"></div><div class="cov-node mastered"></div><div class="cov-node progress"></div><div class="cov-node progress"></div>
                        <div class="cov-node progress"></div><div class="cov-node progress"></div><div class="cov-node seen"></div><div class="cov-node empty"></div><div class="cov-node empty"></div>
                        <div class="cov-node empty"></div><div class="cov-node empty"></div><div class="cov-node empty"></div><div class="cov-node empty"></div><div class="cov-node empty"></div>
                      </div>
                      <div class="cov-legend">
                        <div class="cov-legend-item"><div class="cov-dot" style="background:#0077FF;"></div>Mastered</div>
                        <div class="cov-legend-item"><div class="cov-dot" style="background:#66BBFF;opacity:0.65;"></div>In progress</div>
                        <div class="cov-legend-item"><div class="cov-dot" style="background:#f1f5f9;border:1px solid #e5edf5;"></div>Not started</div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-discover-card-text">
                    <p>See exactly which concepts you have mastered, which need review, and which have never been visited.</p>
                    <a class="modal-discover-link">Gap analysis &rarr;</a>
                  </div>
                </div>
  
                <!-- Card 2: Document Pipeline -->
                <div class="modal-discover-card">
                  <div class="modal-discover-graphic">
                    <div class="disc-inner-card">
                      <div class="pipeline-header">How graphs are built</div>
                      <div class="pipeline-steps">
                        <div class="pipeline-step">
                          <div class="pipeline-step-icon">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2.5" y="1.5" width="9" height="13" rx="1.5" stroke="#0077FF" stroke-width="1.25"/><path d="M5 5.5h5M5 8h5M5 10.5h3" stroke="#0077FF" stroke-width="1.25" stroke-linecap="round"/></svg>
                          </div>
                          <div class="pipeline-step-label">Upload</div>
                          <div class="pipeline-step-sub">PDF, slides<br>or URL</div>
                        </div>
                        <div class="pipeline-arrow">&rarr;</div>
                        <div class="pipeline-step">
                          <div class="pipeline-step-icon">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z" stroke="#0077FF" stroke-width="1.25"/><path d="M8 4.5V8l2.5 2" stroke="#0077FF" stroke-width="1.25" stroke-linecap="round"/></svg>
                          </div>
                          <div class="pipeline-step-label">Extract</div>
                          <div class="pipeline-step-sub">AI finds<br>entities</div>
                        </div>
                        <div class="pipeline-arrow">&rarr;</div>
                        <div class="pipeline-step">
                          <div class="pipeline-step-icon active">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3.5" r="2" fill="white"/><circle cx="3" cy="12" r="2" fill="white"/><circle cx="13" cy="12" r="2" fill="white"/><path d="M8 5.5V9M6 10.5l-2 1.5M10 10.5l2 1.5" stroke="white" stroke-width="1.25" stroke-linecap="round"/></svg>
                          </div>
                          <div class="pipeline-step-label" style="color:#0077FF;">Explore</div>
                          <div class="pipeline-step-sub">Graph<br>is live</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-discover-card-text">
                    <p>Upload any document and Mentron extracts entities, builds edges, and delivers a live graph in seconds.</p>
                    <a class="modal-discover-link">See how it works &rarr;</a>
                  </div>
                </div>
  
                <!-- Card 3: Share & Embed -->
                <div class="modal-discover-card">
                  <div class="modal-discover-graphic">
                    <div class="disc-inner-card">
                      <div class="share-header">Share this graph</div>
                      <div class="share-url-row">
                        <span class="share-url-text">mentron.app/graph/calculus</span>
                        <button class="share-copy-btn" title="Copy link">
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><rect x="4.5" y="4.5" width="6.5" height="6.5" rx="1.25" stroke="#0077FF" stroke-width="1.2"/><path d="M1 7.5V2a1 1 0 0 1 1-1h5.5" stroke="#0077FF" stroke-width="1.2" stroke-linecap="round"/></svg>
                        </button>
                      </div>
                      <div class="share-toggles">
                        <div class="share-toggle-row">
                          <div class="share-toggle-label">Share link</div>
                          <div class="toggle-track on"><div class="toggle-thumb"></div></div>
                        </div>
                        <div class="share-toggle-row">
                          <div class="share-toggle-label">Embed in LMS</div>
                          <div class="toggle-track off"><div class="toggle-thumb"></div></div>
                        </div>
                        <div class="share-toggle-row">
                          <div class="share-toggle-label">Allow edits</div>
                          <div class="toggle-track off"><div class="toggle-thumb"></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-discover-card-text">
                    <p>Share any graph as a live link or embed it directly into Canvas, Moodle, or Notion with one click.</p>
                    <a class="modal-discover-link">Share &amp; embed &rarr;</a>
                  </div>
                </div>
  
              </div>
            </div>
          `;
  
          // Initialize modal KG canvas with same pill graph
          setTimeout(() => {
            const modalCanvas = container.querySelector('#kgModalCanvas');
            const modalWrap = container.querySelector('#kgModalBody');
            if (!modalCanvas || !modalWrap) return;
            let W, H, dpr, ctx;
  
            const NODES = [
              {id:'calculus', label:'Calculus',       pw:50, ph:20},
              {id:'deriv',    label:'Derivatives',     pw:50, ph:20},
              {id:'integrals',label:'Integrals',       pw:50, ph:20},
              {id:'limits',   label:'Limits',          pw:50, ph:20},
              {id:'functions',label:'Functions',       pw:50, ph:20},
              {id:'series',   label:'Series',          pw:50, ph:20},
              {id:'theorems', label:'Theorems',        pw:50, ph:20},
              {id:'apps',     label:'Applications',    pw:50, ph:20},
            ];
  
            const EDGES = [
              {s:'calculus', t:'deriv',     label:'studies'},
              {s:'calculus', t:'integrals', label:'studies'},
              {s:'calculus', t:'limits',    label:'founded on'},
              {s:'calculus', t:'series',    label:'includes'},
              {s:'deriv',    t:'functions', label:'rate of'},
              {s:'integrals',t:'theorems',  label:'proven by'},
              {s:'limits',   t:'deriv',     label:'defines'},
              {s:'deriv',    t:'apps',      label:'applied in'},
              {s:'integrals',t:'apps',      label:'applied in'},
            ];
  
            const BLUE_CORE = '#0055CC';
            const BLUE_MID  = '#0077FF';
            const BLUE_LIGHT= '#3399FF';
            const BLUE_SOFT = '#66BBFF';
  
            const connCount = {};
            let maxConn = 1;
            NODES.forEach(n => connCount[n.id] = 0);
            EDGES.forEach(e => { connCount[e.s]++; connCount[e.t]++; });
            maxConn = Math.max(...Object.values(connCount), 1);
  
            function nodeColor(id) {
              const r = (connCount[id]||0) / maxConn;
              if (r >= 0.7) return BLUE_CORE;
              if (r >= 0.45) return BLUE_MID;
              if (r >= 0.25) return BLUE_LIGHT;
              return BLUE_SOFT;
            }
  
            function edgeColor(sId, tId) {
              const avg = ((connCount[sId]||0)+(connCount[tId]||0))/2;
              const r = avg / maxConn;
              if (r >= 0.6) return '#3399FF';
              if (r >= 0.35) return '#66BBFF';
              return '#99DDFF';
            }
  
            function mRoundRect(x, y, w, h, r) {
              ctx.beginPath();
              ctx.moveTo(x+r, y);
              ctx.lineTo(x+w-r, y);
              ctx.quadraticCurveTo(x+w, y, x+w, y+r);
              ctx.lineTo(x+w, y+h-r);
              ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
              ctx.lineTo(x+r, y+h);
              ctx.quadraticCurveTo(x, y+h, x, y+h-r);
              ctx.lineTo(x, y+r);
              ctx.quadraticCurveTo(x, y, x+r, y);
              ctx.closePath();
            }
  
            function pillEdge(node, dx, dy, sign) {
              const d = Math.sqrt(dx*dx+dy*dy)||1;
              const ux=dx/d, uy=dy/d;
              const a = (ux*ux)/(node.pw*node.pw) + (uy*uy)/(node.ph*node.ph);
              const t = sign * 1/Math.sqrt(a);
              return [node.x + ux*t, node.y + uy*t];
            }
  
            function pillHit(px, py, n) {
              const dx=(px-n.x)/n.pw, dy=(py-n.y)/n.ph;
              return dx*dx+dy*dy <= 1;
            }
  
            let nodes, edges, alpha;
            let dragNode = null, hovered = null;
            const tip = document.createElement('div');
            tip.style.cssText = 'position:absolute;pointer-events:none;display:none;background:#fff;border:0.5px solid #ccc;border-radius:8px;padding:6px 10px;font-size:11px;color:#222;line-height:1.4;max-width:160px;z-index:10;font-family:DM Sans,sans-serif;';
            modalWrap.appendChild(tip);
  
            function init() {
              W = modalWrap.clientWidth; H = modalWrap.clientHeight;
              dpr = window.devicePixelRatio || 1;
              modalCanvas.width = W * dpr;
              modalCanvas.height = H * dpr;
              modalCanvas.style.width = W + 'px';
              modalCanvas.style.height = H + 'px';
              ctx = modalCanvas.getContext('2d');
              ctx.scale(dpr, dpr);
  
              const p = (fx,fy) => [W*fx, H*fy];
              const positions = {
                calculus: p(0.50, 0.46),
                deriv:    p(0.80, 0.18),
                integrals:p(0.82, 0.68),
                limits:   p(0.38, 0.18),
                functions:p(0.88, 0.42),
                series:   p(0.20, 0.72),
                theorems: p(0.52, 0.82),
                apps:     p(0.18, 0.46),
              };
  
              nodes = NODES.map(n => ({
                ...n,
                x: positions[n.id][0],
                y: positions[n.id][1],
                vx:0, vy:0, fx:null, fy:null,
              }));
              edges = EDGES.map(e => ({
                ...e,
                source: nodes.find(n=>n.id===e.s),
                target: nodes.find(n=>n.id===e.t),
              })).filter(e => e.source && e.target);
              alpha = 0.6;
              requestAnimationFrame(tick);
            }
  
            function tick() {
              if (alpha > 0.001) { alpha *= 0.97; applyForces(); }
              draw();
              requestAnimationFrame(tick);
            }
  
            function applyForces() {
              const a = alpha;
              for (let i=0; i<nodes.length; i++) {
                for (let j=i+1; j<nodes.length; j++) {
                  const ni=nodes[i], nj=nodes[j];
                  const dx=nj.x-ni.x, dy=nj.y-ni.y;
                  const d2=dx*dx+dy*dy||1, d=Math.sqrt(d2);
                  const minD = (ni.pw+nj.pw)*1.2 + 20;
                  if (d < minD*2) {
                    const force = (minD*minD - d2) / (d2*d) * 0.25 * a;
                    ni.vx -= dx*force; ni.vy -= dy*force;
                    nj.vx += dx*force; nj.vy += dy*force;
                  }
                }
              }
              for (const e of edges) {
                const s=e.source, t=e.target;
                const dx=t.x-s.x, dy=t.y-s.y;
                const d=Math.sqrt(dx*dx+dy*dy)||1;
                const rest = (s.pw+t.pw)*1.5 + 40;
                const force = (d-rest)/d * 0.08 * a;
                if (!s.fx) { s.vx += dx*force; s.vy += dy*force; }
                if (!t.fx) { t.vx -= dx*force; t.vy -= dy*force; }
              }
              for (const n of nodes) {
                if (n.fx!==null) { n.x=n.fx; n.y=n.fy; continue; }
                n.vx += (W/2 - n.x) * 0.003 * a;
                n.vy += (H/2 - n.y) * 0.003 * a;
                n.vx *= 0.82; n.vy *= 0.82;
                n.x += n.vx; n.y += n.vy;
                const pad = n.pw+4;
                n.x = Math.max(pad, Math.min(W-pad, n.x));
                n.y = Math.max(n.ph+4, Math.min(H-n.ph-4, n.y));
              }
            }
  
            function draw() {
              ctx.clearRect(0,0,W,H);
              // Edges
              for (const e of edges) {
                const s=e.source, t=e.target;
                const dx=t.x-s.x, dy=t.y-s.y;
                const [sx,sy] = pillEdge(s, dx, dy, 1);
                const [ex,ey] = pillEdge(t, dx, dy, -1);
                const col = edgeColor(e.s, e.t);
  
                ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(ex,ey);
                ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke();
  
                const angle = Math.atan2(ey-sy, ex-sx);
                const al=12, aw=0.45;
                ctx.beginPath(); ctx.moveTo(ex, ey);
                ctx.lineTo(ex - al*Math.cos(angle-aw), ey - al*Math.sin(angle-aw));
                ctx.lineTo(ex - al*Math.cos(angle+aw), ey - al*Math.sin(angle+aw));
                ctx.closePath();
                ctx.fillStyle = col; ctx.fill();
  
                // Label pill at midpoint
                const mx=(sx+ex)/2, my=(sy+ey)/2;
                ctx.save();
                ctx.font = `500 9px 'DM Sans', sans-serif`;
                const tw = ctx.measureText(e.label).width;
                mRoundRect(mx - tw/2 - 5, my - 7, tw + 10, 14, 4);
                ctx.fillStyle = 'rgba(255,255,255,0.92)';
                ctx.fill();
                ctx.strokeStyle = 'rgba(0,0,0,0.06)';
                ctx.lineWidth = 0.5;
                ctx.stroke();
                ctx.fillStyle = '#3c4f69';
                ctx.textAlign='center'; ctx.textBaseline='middle';
                ctx.fillText(e.label, mx, my);
                ctx.restore();
              }
              // Nodes
              for (const n of nodes) {
                const col = nodeColor(n.id);
                const x = n.x - n.pw, y = n.y - n.ph, w = n.pw*2, h = n.ph*2;
                const pillR = h / 2;
  
                ctx.save();
                ctx.shadowColor = 'rgba(0,0,0,0.1)';
                ctx.shadowBlur = 8;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                mRoundRect(x, y, w, h, pillR);
                ctx.fillStyle = col; ctx.fill();
                ctx.restore();
  
                mRoundRect(x, y, w, h, pillR);
                ctx.strokeStyle = 'rgba(255,255,255,0.6)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
  
                ctx.font = `600 11px 'DM Sans', sans-serif`;
                ctx.fillStyle = '#fff';
                ctx.textAlign='center'; ctx.textBaseline='middle';
                ctx.fillText(n.label, n.x, n.y);
              }
            }
  
            function nodeAt(px, py) {
              for (let i=nodes.length-1;i>=0;i--) {
                if (pillHit(px, py, nodes[i])) return nodes[i];
              }
              return null;
            }
  
            function evXY(e) {
              const r=modalCanvas.getBoundingClientRect();
              const ev=e.touches?e.touches[0]:e;
              return [ev.clientX-r.left, ev.clientY-r.top];
            }
  
            modalCanvas.addEventListener('mousedown', e => {
              const [x,y] = evXY(e);
              const n = nodeAt(x,y);
              if (n) { dragNode=n; n.fx=n.x; n.fy=n.y; alpha=Math.max(alpha,0.1); }
            });
            modalCanvas.addEventListener('mousemove', e => {
              const [x,y] = evXY(e);
              if (dragNode) { dragNode.fx=x; dragNode.fy=y; dragNode.x=x; dragNode.y=y; return; }
              const n = nodeAt(x,y);
              if (n !== hovered) { hovered=n; modalCanvas.style.cursor = n?'grab':'default'; }
              if (n) {
                tip.style.display='block';
                tip.style.left=(x+14)+'px'; tip.style.top=(y-10)+'px';
                tip.innerHTML='<strong>'+n.label+'</strong>';
              } else { tip.style.display='none'; }
            });
            modalCanvas.addEventListener('mouseup', () => {
              if (dragNode) { dragNode.fx=null; dragNode.fy=null; dragNode=null; }
            });
            modalCanvas.addEventListener('mouseleave', () => { tip.style.display='none'; });
            modalCanvas.addEventListener('touchstart', e => { e.preventDefault(); const [x,y]=evXY(e); const n=nodeAt(x,y); if(n){dragNode=n;n.fx=n.x;n.fy=n.y;} }, {passive:false});
            modalCanvas.addEventListener('touchmove', e => { e.preventDefault(); const [x,y]=evXY(e); if(dragNode){dragNode.fx=x;dragNode.fy=y;dragNode.x=x;dragNode.y=y;} }, {passive:false});
            modalCanvas.addEventListener('touchend', () => { if(dragNode){dragNode.fx=null;dragNode.fy=null;dragNode=null;} });
  
            init();
          }, 100);
        } else if (tool === 'chat') {
          modalBody.innerHTML = `
            <!-- Header Row -->
            <div class="modal-header">
              <div class="modal-header-left">
                <h3 class="modal-title">Chat with Your Documents</h3>
                <p class="modal-desc">Ask questions about any uploaded document and get instant, cited answers. The AI references exact pages and sections so you can verify every response.</p>
                <div class="modal-cta-row">
                  <button class="btn-primary" style="background:linear-gradient(135deg,#10B981,#059669);">Try it free</button>
                  <button class="btn-secondary">Learn more</button>
                </div>
              </div>
              <div class="modal-header-right">
                <div style="display:flex;flex-direction:column;gap:8px;">
                  <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#3c4f69;">
                    <svg width="16" height="16" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3 3 7-8"/></svg>
                    Page-level citations for every answer
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#3c4f69;">
                    <svg width="16" height="16" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3 3 7-8"/></svg>
                    Multi-document cross-referencing
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#3c4f69;">
                    <svg width="16" height="16" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3 3 7-8"/></svg>
                    Streaming responses in real time
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#3c4f69;">
                    <svg width="16" height="16" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3 3 7-8"/></svg>
                    Conversation history with context
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Graphics Row -->
            <div class="modal-graphics">
              <!-- Left Panel: Document Upload + Query -->
              <div class="modal-graphic-panel">
                <div class="modal-orb modal-orb-1" style="background:#10B981;filter:blur(10px);"></div>
                <div class="modal-orb modal-orb-2" style="background:#6EE7B7;filter:blur(10px);"></div>
                <div class="modal-graphic">
                  <div style="background:#fff;border-radius:12px;box-shadow:rgba(50,50,93,0.25) 0 30px 45px -30px,rgba(0,0,0,0.1) 0 18px 36px -18px;max-width:100%;width:100%;overflow:hidden;">
                    <!-- Uploaded file chips -->
                    <div style="padding:14px 18px 0 18px;display:flex;gap:8px;flex-wrap:wrap;">
                      <div style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:#ECFDF5;border:1px solid #A7F3D0;border-radius:8px;font-size:11px;color:#059669;">
                        <svg width="12" height="12" fill="none" stroke="#059669" stroke-width="1.3"><path d="M2 1h5l3 3v6a1.5 1.5 0 01-1.5 1.5H2A1.5 1.5 0 01.5 10V2.5A1.5 1.5 0 012 1z"/><path d="M7 1v3h3"/></svg>
                        lecture-12.pdf
                        <svg width="10" height="10" fill="none" stroke="#6EE7B7" stroke-width="1.5" stroke-linecap="round"><path d="M2 2l6 6M8 2l-6 6"/></svg>
                      </div>
                      <div style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:#ECFDF5;border:1px solid #A7F3D0;border-radius:8px;font-size:11px;color:#059669;">
                        <svg width="12" height="12" fill="none" stroke="#059669" stroke-width="1.3"><path d="M2 1h5l3 3v6a1.5 1.5 0 01-1.5 1.5H2A1.5 1.5 0 01.5 10V2.5A1.5 1.5 0 012 1z"/><path d="M7 1v3h3"/></svg>
                        DSA-notes.docx
                        <svg width="10" height="10" fill="none" stroke="#6EE7B7" stroke-width="1.5" stroke-linecap="round"><path d="M2 2l6 6M8 2l-6 6"/></svg>
                      </div>
                    </div>
                    <!-- Query text -->
                    <div style="padding:12px 18px 8px 18px;">
                      <div style="font-size:14px;color:#061b31;line-height:1.6;min-height:56px;">
                        What is the Markov property and how does it apply to real-world stochastic processes?<span style="display:inline-block;width:1.5px;height:15px;background:#10B981;vertical-align:middle;margin-left:1px;animation:cursor-blink 1s step-end infinite;"></span>
                      </div>
                    </div>
                    <!-- Bottom toolbar -->
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-top:1px solid #f0f4f8;">
                      <div style="display:flex;align-items:center;gap:8px;">
                        <div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;cursor:pointer;">
                          <svg width="16" height="16" fill="none" stroke="#7A8FA6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v8M5 5l3-3 3 3"/><path d="M2 9v3.5A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5V9"/></svg>
                        </div>
                        <div style="display:flex;align-items:center;gap:5px;padding:6px 12px;background:#f0f4f8;border:1px solid #e5edf5;border-radius:8px;font-size:12px;font-weight:500;color:#061b31;">
                          <svg width="12" height="12" fill="none" stroke="#10B981" stroke-width="1.5"><path d="M2 2h8v8H2z"/><path d="M4 5h4M4 7h3"/></svg>
                          Chat
                        </div>
                      </div>
                      <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#10B981,#059669);display:flex;align-items:center;justify-content:center;cursor:pointer;">
                        <svg width="14" height="14" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8h10M9 4l4 4-4 4"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Right Panel: Browser Window with Chat -->
              <div class="modal-graphic-panel">
                <div class="modal-orb modal-orb-3" style="background:#6EE7B7;filter:blur(10px);"></div>
                <div class="modal-orb modal-orb-4" style="background:#A7F3D0;filter:blur(10px);"></div>
                <div class="modal-graphic" style="animation-delay:0.1s;">
                  <div class="chat-browser" style="height:100%;">
                    <div class="chat-browser-top">
                      <svg height="7" width="24"><circle cx="3.5" cy="3.5" r="3.5" fill="#FFBD2E"/><circle cx="11.5" cy="3.5" r="3.5" fill="#FF605C"/><circle cx="19.5" cy="3.5" r="3.5" fill="#28CA41"/></svg>
                      <div class="chat-browser-url">mentron.app/chat/markov-chains</div>
                    </div>
                    <div class="chat-browser-body" style="padding:16px 18px;gap:10px;">
                      <div class="chat-bubble chat-bubble-ai" style="font-size:13px;">I've analyzed your documents. Ask me anything about Markov Chains, stochastic processes, or probability theory!</div>
                      <div class="chat-bubble chat-bubble-user" style="font-size:13px;">What is the Markov property?</div>
                      <div class="chat-bubble chat-bubble-ai" style="font-size:13px;">
                        The <strong>Markov property</strong> states that the future state of a process depends only on its current state, not on the sequence of events that preceded it.<span class="chat-citation">p. 42</span><br/><br/>This is known as "memorylessness" — the conditional probability distribution of future states depends only on the present state.
                      </div>
                      <div class="chat-bubble chat-bubble-user" style="font-size:13px;">Give me a real-world example?</div>
                      <div style="display:flex;align-items:center;gap:3px;padding:8px 12px;">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Detail Points -->
            <div class="modal-details">
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="20" height="20" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2h8l4 4v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z"/><path d="M7 10h6M7 14h4"/></svg>
                </div>
                <div>
                  <div class="modal-detail-title">Upload anything</div>
                  <div class="modal-detail-desc">PDFs, DOCX, or paste text — AI indexes everything instantly</div>
                </div>
              </div>
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="20" height="20" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2l6 4v8l-6 4-6-4V6z"/><path d="M10 9v4"/></svg>
                </div>
                <div>
                  <div class="modal-detail-title">Verified sources</div>
                  <div class="modal-detail-desc">Every answer links back to source pages for full verification</div>
                </div>
              </div>
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="20" height="20" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h12v10H4z"/><path d="M8 2v4M12 2v4"/><path d="M8 10h4"/></svg>
                </div>
                <div>
                  <div class="modal-detail-title">Follow-up context</div>
                  <div class="modal-detail-desc">Ask follow-ups — context carries across the entire conversation</div>
                </div>
              </div>
            </div>
  
            <!-- More to discover — redesigned -->
            <div class="modal-discover">
              <div class="modal-discover-heading">More to discover</div>
              <div class="modal-discover-grid">
  
                <!-- Card 1: Cited Answer Panel -->
                <div class="doc-card">
                  <div class="doc-graphic">
                    <div class="doc-inner">
                      <div class="doc-inner-hd">
                        <span class="doc-inner-title">Cited Answer</span>
                        <span class="doc-inner-badge">3 sources found</span>
                      </div>
                      <div class="cite-bubble">
                        The Markov property states that future states depend only on the present — not on the history of past states.
                      </div>
                      <div class="cite-src-label">Sources</div>
                      <div class="cite-pills">
                        <div class="cite-pill on">p. 42</div>
                        <div class="cite-pill">p. 67</div>
                        <div class="cite-pill">p. 81</div>
                      </div>
                      <div class="cite-excerpt">
                        "…the conditional probability of future states depends solely on the present state and not on past states…"
                      </div>
                    </div>
                  </div>
                  <div class="doc-text">
                    <p>Every answer traces back to exact pages. Click any citation to jump straight to the source passage inside your document.</p>
                    <a class="doc-link">Page citations →</a>
                  </div>
                </div>
  
                <!-- Card 2: Cross-Doc Answer -->
                <div class="doc-card">
                  <div class="doc-graphic">
                    <div class="doc-inner">
                      <div class="doc-inner-hd">
                        <span class="doc-inner-title">Cross-Doc Answer</span>
                        <span class="doc-inner-badge">2 docs matched</span>
                      </div>
                      <div class="xd-query">"Where is Markov property applied in DSA?"</div>
                      <div class="xd-source">
                        <div class="xd-from">
                          <div class="xd-file-chip">lecture-12.pdf</div>
                          <span class="xd-from-label">· p. 42</span>
                        </div>
                        <div class="xd-text">Markov chains model state transitions with memoryless probabilities…</div>
                      </div>
                      <div class="xd-source">
                        <div class="xd-from">
                          <div class="xd-file-chip">DSA-notes.docx</div>
                          <span class="xd-from-label">· p. 18</span>
                        </div>
                        <div class="xd-text">Dynamic programming assumes optimal substructure — a Markov-like property…</div>
                      </div>
                    </div>
                  </div>
                  <div class="doc-text">
                    <p>One question, all your documents. The AI synthesises answers across every uploaded file and tells you exactly which came from where.</p>
                    <a class="doc-link">Multi-doc search →</a>
                  </div>
                </div>
  
                <!-- Card 3: Chat → Flashcard -->
                <div class="doc-card">
                  <div class="doc-graphic">
                    <div class="doc-inner">
                      <div class="doc-inner-hd">
                        <span class="doc-inner-title">Chat → Flashcard</span>
                        <span class="doc-inner-badge">Mentron-only</span>
                      </div>
                      <div class="ctf-bubble">
                        The Markov property means future state depends only on the current state, not prior history.
                      </div>
                      <div class="ctf-action">
                        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="1.5" width="10" height="10" rx="2"/><path d="M4.5 6.5h4M6.5 4.5v4"/></svg>
                        Extract as flashcard
                        <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="margin-left:auto;"><path d="M2 5.5h7M6 2.5l3 3-3 3"/></svg>
                      </div>
                      <div class="ctf-card">
                        <div class="ctf-card-q">What is the Markov property?</div>
                        <div class="ctf-card-a">
                          <div class="ctf-card-a-bar"></div>
                          <span class="ctf-card-a-hint">Tap to reveal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="doc-text">
                    <p>Turn any AI answer into a flashcard with one click. It lands in your spaced-repetition deck, ready for your next review session.</p>
                    <a class="doc-link">Save to flashcards →</a>
                  </div>
                </div>
  
              </div>
            </div>
          `;
        } else if (tool === 'notes') {
          modalBody.innerHTML = `
            <!-- Header Row -->
            <div class="modal-header">
              <div class="modal-header-left">
                <h3 class="modal-title">Smart Notes with AI Assistance</h3>
                <p class="modal-desc">Write notes with an AI co-pilot that suggests related concepts, generates summaries, and links your notes to flashcards and mind maps. Never miss a key insight.</p>
                <div class="modal-cta-row">
                  <button class="btn-primary" style="background:linear-gradient(135deg,#F59E0B,#D97706);">Try it free</button>
                  <button class="btn-secondary">Learn more</button>
                </div>
              </div>
              <div class="modal-header-right">
                <div style="display:flex;flex-direction:column;gap:8px;">
                  <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#3c4f69;">
                    <svg width="16" height="16" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3 3 7-8"/></svg>
                    Real-time AI suggestions as you type
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#3c4f69;">
                    <svg width="16" height="16" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3 3 7-8"/></svg>
                    Auto-link to flashcards and mind maps
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#3c4f69;">
                    <svg width="16" height="16" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3 3 7-8"/></svg>
                    One-click summary generation
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#3c4f69;">
                    <svg width="16" height="16" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l3 3 7-8"/></svg>
                    Quick actions: quiz, summarize, expand
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Graphics Row -->
            <div class="modal-graphics">
              <!-- Left Panel: Topic Input -->
              <div class="modal-graphic-panel">
                <div class="modal-orb modal-orb-1" style="background:#F59E0B;filter:blur(10px);"></div>
                <div class="modal-orb modal-orb-2" style="background:#FBBF24;filter:blur(10px);"></div>
                <div class="modal-graphic">
                  <div style="background:#fff;border-radius:12px;box-shadow:rgba(50,50,93,0.25) 0 30px 45px -30px,rgba(0,0,0,0.1) 0 18px 36px -18px;max-width:100%;width:100%;overflow:hidden;">
                    <div style="display:flex;align-items:center;gap:8px;padding:10px 16px;border-bottom:1px solid #f0f4f8;">
                      <svg width="14" height="14" fill="none" stroke="#F59E0B" stroke-width="1.5"><path d="M4 2h8l4 4v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z"/><path d="M7 10h6M7 14h4"/></svg>
                      <span style="font-size:11px;font-weight:500;color:#061b31;">Smart Notes</span>
                      <span style="font-size:11px;color:#7A8FA6;">·</span>
                      <span style="font-size:11px;color:#7A8FA6;">AI-enhanced</span>
                    </div>
                    <div style="padding:16px 18px;">
                      <div style="font-size:14px;color:#061b31;line-height:1.6;min-height:48px;">
                        Lecture 12 — Markov Chains and Stochastic Processes<span style="display:inline-block;width:1.5px;height:15px;background:#F59E0B;vertical-align:middle;margin-left:1px;animation:cursor-blink 1s step-end infinite;"></span>
                      </div>
                    </div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-top:1px solid #f0f4f8;">
                      <div style="display:flex;align-items:center;gap:8px;">
                        <div style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;cursor:pointer;">
                          <svg width="16" height="16" fill="none" stroke="#7A8FA6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v8M5 5l3-3 3 3"/><path d="M2 9v3.5A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5V9"/></svg>
                        </div>
                        <div style="display:flex;align-items:center;gap:5px;padding:6px 12px;background:#f0f4f8;border:1px solid #e5edf5;border-radius:8px;font-size:12px;font-weight:500;color:#061b31;">
                          <svg width="12" height="12" fill="none" stroke="#F59E0B" stroke-width="1.5"><path d="M4 2h8l4 4v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z"/><path d="M7 10h6M7 14h4"/></svg>
                          Notes
                        </div>
                      </div>
                      <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#F59E0B,#D97706);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 10px rgba(245,158,11,.35);">
                        <svg width="14" height="14" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 7h10M8 3l4 4-4 4"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Right Panel: Browser Window with Notes Editor -->
              <div class="modal-graphic-panel">
                <div class="modal-orb modal-orb-3" style="background:#FBBF24;filter:blur(10px);"></div>
                <div class="modal-orb modal-orb-4" style="background:#FDE68A;filter:blur(10px);"></div>
                <div class="modal-graphic" style="animation-delay:0.1s;">
                  <div style="background:rgba(255,255,255,0.25);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.4);border-radius:10px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.08),inset 0 0 0 1px rgba(255,255,255,0.3);">
                    <div style="height:30px;display:grid;grid-template-columns:40px 1fr 40px;align-items:center;padding:0 10px;border-bottom:1px solid rgba(229,237,245,0.5);background:rgba(255,255,255,0.35);">
                      <svg height="7" width="24"><circle cx="3.5" cy="3.5" r="3.5" fill="#FFBD2E"/><circle cx="11.5" cy="3.5" r="3.5" fill="#FF605C"/><circle cx="19.5" cy="3.5" r="3.5" fill="#28CA41"/></svg>
                      <div style="background:rgba(255,255,255,0.45);border-radius:10px;padding:2px 10px;font-size:8px;color:#7A8FA6;text-align:center;">mentron.app/notes/markov-chains</div>
                    </div>
                    <div style="background:rgba(248,249,250,0.35);padding:16px 18px;display:flex;flex-direction:column;gap:10px;">
                      <div style="font-size:13px;font-weight:600;color:#061b31;">Lecture 12 — Markov Chains</div>
                      <div style="font-size:12px;color:#3c4f69;line-height:1.55;">A Markov chain is a stochastic model describing a sequence of possible events where the probability of each event depends only on the state attained in the previous event.</div>
                      <div style="font-size:12px;color:#3c4f69;line-height:1.55;">Key property: <span style="background:rgba(245,158,11,0.3);border-radius:3px;padding:0 2px;">memorylessness</span> — the conditional probability distribution of future states depends only on the present state.<span style="display:inline-block;width:1.5px;height:15px;background:#F59E0B;vertical-align:middle;margin-left:1px;animation:cursor-blink 1s step-end infinite;"></span></div>
                      <div style="display:flex;align-items:center;gap:6px;padding:7px 10px;background:rgba(255,251,235,0.8);border:1px solid #FDE68A;border-radius:7px;font-size:11px;color:#92400E;">
                        <svg width="12" height="12" fill="none" stroke="#F59E0B" stroke-width="1.5"><path d="M6 1v2M6 9v2M2.5 3.5l1.5 1.5M8 7l1.5 1.5M1 6h2M9 6h2M2.5 8.5L4 7M8 4.5l1.5-1.5"/></svg>
                        AI suggests: Add transition matrix example?
                      </div>
                      <div style="display:flex;gap:6px;flex-wrap:wrap;">
                        <div style="padding:4px 10px;border-radius:6px;font-size:10px;font-weight:500;background:#FFFBEB;border:1px solid #FDE68A;color:#92400E;">Summarize</div>
                        <div style="padding:4px 10px;border-radius:6px;font-size:10px;font-weight:500;background:#FFFBEB;border:1px solid #FDE68A;color:#92400E;">Generate Quiz</div>
                        <div style="padding:4px 10px;border-radius:6px;font-size:10px;font-weight:500;background:#FFFBEB;border:1px solid #FDE68A;color:#92400e;">Add to Flashcards</div>
                        <div style="padding:4px 10px;border-radius:6px;font-size:10px;font-weight:500;background:#FFFBEB;border:1px solid #FDE68A;color:#92400E;">Create Mind Map</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Detail Points -->
            <div class="modal-details">
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="20" height="20" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2l6 4v8l-6 4-6-4V6z"/><circle cx="10" cy="10" r="2"/></svg>
                </div>
                <div>
                  <div class="modal-detail-title">Real-time AI suggestions</div>
                  <div class="modal-detail-desc">AI reads as you type and suggests related concepts, definitions, and examples inline</div>
                </div>
              </div>
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="20" height="20" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h12v10H4z"/><path d="M8 2v4M12 2v4"/><path d="M4 9h12"/></svg>
                </div>
                <div>
                  <div class="modal-detail-title">Cross-feature linking</div>
                  <div class="modal-detail-desc">Notes auto-link to flashcards, mind maps, and knowledge graphs for connected learning</div>
                </div>
              </div>
              <div class="modal-detail-item">
                <div class="modal-detail-icon">
                  <svg width="20" height="20" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H7a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2z"/><path d="M10 15h.01"/></svg>
                </div>
                <div>
                  <div class="modal-detail-title">One-click actions</div>
                  <div class="modal-detail-desc">Summarize, generate quizzes, or expand any section with a single click</div>
                </div>
              </div>
            </div>
  
            <!-- More to discover — redesigned -->
            <div style="border-top:1px solid #e5edf5;padding-top:24px;">
              <div class="modal-discover-heading">More to discover</div>
              <div class="modal-discover-grid">
  
                <!-- Card 1: AI Inline Suggestions -->
                <div class="note-card">
                  <div class="note-graphic">
                    <div class="note-inner">
                      <div class="note-inner-hd">
                        <span class="note-inner-title">AI Inline Suggestions</span>
                        <span class="note-inner-badge">Context-aware</span>
                      </div>
                      <div class="ai-note-line">
                        Markov chains exhibit the <span class="ai-note-hl">memorylessness</span> property — future state depends only on the present state, not prior history.
                      </div>
                      <div class="ai-bubble">
                        <div class="ai-bubble-icon">
                          <svg width="10" height="10" fill="none" stroke="#D97706" stroke-width="1.4"><path d="M5 1v1M5 8v1M2 5H1M9 5h1M2.8 2.8l-.7-.7M7.9 7.9l.7.7M2.8 7.2l-.7.7M7.9 2.1l.7-.7"></path></svg>
                        </div>
                        <div class="ai-bubble-text">Related: Hidden Markov Models in speech recognition — see Ch. 8 of your textbook</div>
                      </div>
                      <div class="ai-pills">
                        <div class="ai-pill accept">Insert</div>
                        <div class="ai-pill dismiss">Dismiss</div>
                      </div>
                    </div>
                  </div>
                  <div class="note-text">
                    <p>AI spots gaps as you write and suggests related concepts, examples, and chapter references — right where you need them.</p>
                    <a class="note-link">AI suggestions →</a>
                  </div>
                </div>
  
                <!-- Card 2: Note Connections -->
                <div class="note-card">
                  <div class="note-graphic">
                    <div class="note-inner">
                      <div class="note-inner-hd">
                        <span class="note-inner-title">Note Connections</span>
                        <span class="note-inner-badge">3 linked</span>
                      </div>
                      <svg width="100%" viewBox="0 0 220 118" fill="none" style="display:block;overflow:visible;">
                        <path d="M110 30 C110 56,46 56,46 70" stroke="#FDE68A" stroke-width="1.5"/>
                        <path d="M110 30 C110 56,174 56,174 70" stroke="#FDE68A" stroke-width="1.5"/>
                        <line x1="110" y1="30" x2="110" y2="92" stroke="#FDE68A" stroke-width="1.5" stroke-dasharray="3 2"/>
                        <rect x="28" y="8" width="164" height="24" rx="12" fill="#FEF3C7" stroke="#FDE68A" stroke-width="1"/>
                        <text x="110" y="23.5" text-anchor="middle" fill="#92400E" font-size="9.5" font-weight="600" font-family="Inter,sans-serif">Lec. 12 — Markov Chains</text>
                        <rect x="4" y="70" width="84" height="22" rx="11" fill="#FEF3C7" stroke="#FDE68A" stroke-width="1"/>
                        <text x="46" y="84.5" text-anchor="middle" fill="#92400E" font-size="9" font-family="Inter,sans-serif">← Lecture 11</text>
                        <rect x="132" y="70" width="84" height="22" rx="11" fill="#FEF3C7" stroke="#FDE68A" stroke-width="1"/>
                        <text x="174" y="84.5" text-anchor="middle" fill="#92400E" font-size="9" font-family="Inter,sans-serif">Probability →</text>
                        <rect x="72" y="92" width="76" height="20" rx="10" fill="#FFFBEB" stroke="#FDE68A" stroke-width=".75"/>
                        <text x="110" y="105.5" text-anchor="middle" fill="#D97706" font-size="8" font-family="Inter,sans-serif">+1 more note</text>
                      </svg>
                      <div class="nc-footer">
                        <span>Auto-detected by AI</span>
                        <span class="nc-count">3 connections found</span>
                      </div>
                    </div>
                  </div>
                  <div class="note-text">
                    <p>AI automatically surfaces related notes from your library — so your study sessions build on each other, not in silos.</p>
                    <a class="note-link">Note connections →</a>
                  </div>
                </div>
  
                <!-- Card 3: Smart Templates -->
                <div class="note-card">
                  <div class="note-graphic">
                    <div class="note-inner">
                      <div class="note-inner-hd">
                        <span class="note-inner-title">Smart Templates</span>
                        <span class="note-inner-badge">6 formats</span>
                      </div>
                      <div class="tpl-list">
                        <div class="tpl-row on">
                          <div class="tpl-ico">
                            <svg width="12" height="12" fill="none" stroke="#fff" stroke-width="1.5"><path d="M2 1h8v10H2z"/><path d="M4 4h4M4 6h3M4 8h5"/></svg>
                          </div>
                          <div>
                            <div class="tpl-name">Cornell Method</div>
                            <div class="tpl-desc">Cue column + notes + summary</div>
                          </div>
                          <div class="tpl-tick">
                            <svg width="8" height="8" fill="none" stroke="#fff" stroke-width="2"><path d="M1.5 4l2 2 3-4"/></svg>
                          </div>
                        </div>
                        <div class="tpl-row">
                          <div class="tpl-ico">
                            <svg width="12" height="12" fill="none" stroke="#D97706" stroke-width="1.5"><path d="M2 3h8M4 6h6M4 9h5"/></svg>
                          </div>
                          <div>
                            <div class="tpl-name">Outline</div>
                            <div class="tpl-desc">Hierarchical bullet points</div>
                          </div>
                        </div>
                        <div class="tpl-row">
                          <div class="tpl-ico">
                            <svg width="12" height="12" fill="none" stroke="#D97706" stroke-width="1.5"><circle cx="6" cy="4.5" r="2.5"/><path d="M6 7v1.5M3 11c0-1.66 1.34-3 3-3s3 1.34 3 3"/></svg>
                          </div>
                          <div>
                            <div class="tpl-name">Q&A Format</div>
                            <div class="tpl-desc">Question and answer pairs</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="note-text">
                    <p>Pick Cornell, Outline, Q&A, and more — or let AI choose the best format based on what you're studying.</p>
                    <a class="note-link">Browse templates →</a>
                  </div>
                </div>
  
              </div>
            </div>
          `;
        } else {
          // Legacy layout for other tools (kept simple for now)
          modalBody.innerHTML = `
            <div class="modal-left">
              <h3 class="modal-title" id="modalTitle">${data.title}</h3>
              <p class="modal-desc">${data.desc}</p>
              <div class="feature-list">
                ${data.features.map(f => `
                  <div class="feature-item">
                    <svg width="16" height="16" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.5 3.5 6.5-9"/></svg>
                    <span class="feature-text">${f}</span>
                  </div>
                `).join('')}
              </div>
              <div class="modal-cta-row">
                <button class="btn-primary">Try it free</button>
                <button class="btn-secondary">Learn more</button>
              </div>
            </div>
            <div class="modal-right">
              <div class="modal-orb modal-orb-1" style="background:${data.orbColors[0]}"></div>
              <div class="modal-orb modal-orb-2" style="background:${data.orbColors[1]}"></div>
              <div class="modal-orb modal-orb-3" style="background:${data.orbColors[2]}"></div>
              <div class="modal-orb modal-orb-4" style="background:${data.orbColors[3]}"></div>
              <div class="modal-graphic" id="modalGraphic"></div>
            </div>
          `;
  
          const graphicEl = container.querySelector('#modalGraphic');
  
          if (data.preview === 'mindmaps') {
          graphicEl.innerHTML = `
            <div style="position:relative;width:360px;height:300px;">
              <svg width="360" height="300" viewBox="0 0 360 300" fill="none" style="position:absolute;inset:0;">
                <path d="M180 140 C180 100, 80 70, 65 58" stroke="#BAE6FD" stroke-width="2" fill="none"/>
                <path d="M180 140 C200 100, 290 65, 300 55" stroke="#BAE6FD" stroke-width="2" fill="none"/>
                <path d="M180 140 C150 180, 70 210, 55 225" stroke="#BAE6FD" stroke-width="2" fill="none"/>
                <path d="M180 140 C210 175, 300 200, 310 215" stroke="#BAE6FD" stroke-width="2" fill="none"/>
                <path d="M180 140 C180 190, 180 240, 180 260" stroke="#BAE6FD" stroke-width="2" fill="none"/>
                <path d="M65 58 C50 40, 35 35, 20 30" stroke="#E0F2FE" stroke-width="1" fill="none"/>
                <path d="M300 55 C315 40, 330 35, 345 30" stroke="#E0F2FE" stroke-width="1" fill="none"/>
              </svg>
              <div class="mind-hub" style="top:115px;left:154px;width:56px;height:56px;font-size:11px;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:600;">DSA</div>
              <div class="mind-node" style="top:34px;left:20px;width:72px;">Arrays</div>
              <div class="mind-node" style="top:30px;right:20px;width:72px;">Trees</div>
              <div class="mind-node" style="bottom:44px;left:15px;width:72px;">Sorting</div>
              <div class="mind-node" style="bottom:40px;right:15px;width:72px;">Graphs</div>
              <div class="mind-node" style="bottom:16px;left:144px;width:72px;">DP</div>
              <div class="mind-node" style="top:10px;left:0;width:52px;font-size:8px;">Lists</div>
              <div class="mind-node" style="top:6px;right:0;width:52px;font-size:8px;">BST</div>
            </div>`;
        } else if (data.preview === 'notes') {
          graphicEl.innerHTML = `
            <div style="display:flex;gap:20px;width:100%;max-width:600px;">
              <div class="notes-editor" style="flex:1;">
                <div style="margin-bottom:4px;">
                  <strong style="color:var(--heading);font-size:12px;">Lecture 12 — Markov Chains</strong>
                </div>
                <div style="margin-top:6px;">A Markov chain is a stochastic model describing a sequence of possible events where the probability of each event depends only on the state attained in the previous event.</div>
                <div style="margin-top:6px;">Key property: <span class="highlight">memorylessness</span> — the conditional probability distribution of future states depends only on the present state.<span class="cursor"></span></div>
                <div class="notes-chips" style="margin-top:12px;">
                  <span class="notes-chip">Summarize</span>
                  <span class="notes-chip">Generate Quiz</span>
                  <span class="notes-chip">Add to Flashcards</span>
                  <span class="notes-chip">Create Mind Map</span>
                </div>
              </div>
              <div class="notes-sidebar" style="width:180px;">
                <div class="notes-sidebar-title">AI Suggestions</div>
                <div class="notes-suggestion">Add transition matrix example to reinforce the memorylessness property.</div>
                <div class="notes-suggestion" style="border-left-color:#10B981;">Related concept: Hidden Markov Models — covered in Chapter 8.</div>
                <div class="notes-suggestion" style="border-left-color:#0077FF;">3 students asked about this topic recently.</div>
              </div>
            </div>`;
          }
        }
  
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
      }
  
      function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
      }
  
      // Card click handlers
      container.querySelectorAll('.bento-card').forEach(card => {
        card.addEventListener('click', () => openModal(card.dataset.tool));
      });
  
      // Close handlers
      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal();
      });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
      });
  
      // Focus trap
      overlay.addEventListener('keydown', e => {
        if (e.key !== 'Tab') return;
        const focusable = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      });
  
      /* ─── Mindmap Animation (Bento Card) ─── */
      (function initMindmap() {
        const treeEl = container.querySelector('#mindTree');
        const svgEl = container.querySelector('#mindSvgLayer');
        const bodyEl = container.querySelector('#mindBrowserBody');
        if (!treeEl || !svgEl || !bodyEl) return;
  
        const DATA = {
          id:'root', label:'Photosynthesis', cls:'mroot',
          children:[
            { id:'inputs', label:'Inputs', cls:'ml1a',
              children:[
                { id:'co2', label:'CO₂ + Water', cls:'ml2a' },
                { id:'sun', label:'Sunlight', cls:'ml2a' },
              ]},
            { id:'process', label:'Process', cls:'ml1b',
              children:[
                { id:'light', label:'Light Reactions', cls:'ml2b' },
                { id:'calvin', label:'Calvin Cycle', cls:'ml2b' },
              ]},
            { id:'outputs', label:'Outputs', cls:'ml1c',
              children:[
                { id:'glucose', label:'Glucose', cls:'ml2c' },
                { id:'oxygen', label:'Oxygen', cls:'ml2c' },
              ]},
          ]
        };
  
        const BRANCH_STROKE = { a:'#d62839', b:'#1b4332', c:'#c44900', '':'#1a1a2e' };
        function strokeFor(cls) {
          const m = cls.match(/ml[123]([abc])/);
          return m ? BRANCH_STROKE[m[1]] : BRANCH_STROKE[''];
        }
  
        const nodeEls = {}, wrapEls = {}, childEls = {}, paths = {};
        const expanded = new Set();
  
        function buildNode(data, parentEl) {
          const wrap = document.createElement('div');
          wrap.className = 'mind-node-wrap'; wrap.dataset.id = data.id;
          wrapEls[data.id] = wrap;
  
          const pill = document.createElement('div');
          pill.className = 'mind-pill ' + data.cls;
          const leaf = !data.children?.length;
          if (leaf) pill.classList.add('leaf');
          pill.innerHTML = '<span>' + data.label + '</span>' + (!leaf ? '<span class="mchevron">›</span>' : '');
          pill.dataset.id = data.id;
          nodeEls[data.id] = pill;
          wrap.appendChild(pill);
  
          if (!leaf) {
            const col = document.createElement('div');
            col.className = 'mind-children'; col.dataset.parent = data.id;
            childEls[data.id] = col;
            data.children.forEach(c => buildNode(c, col));
            wrap.appendChild(col);
          }
          parentEl.appendChild(wrap);
        }
  
        buildNode(DATA, treeEl);
        wrapEls['root'].classList.add('visible');
  
        function expandNode(id) {
          if (expanded.has(id) || !childEls[id]) return;
          expanded.add(id);
          nodeEls[id]?.classList.add('expanded');
          const col = childEls[id];
          col.style.display = 'flex';
          Array.from(col.children).forEach((wrap, i) => {
            const cid = wrap.dataset.id;
            setTimeout(() => {
              wrap.classList.add('visible');
              drawConnector(id, cid);
            }, i * 80);
          });
          setTimeout(refreshConnectors, 400);
        }
  
        function collapseAll() {
          Object.keys(childEls).forEach(id => {
            if (!expanded.has(id)) return;
            expanded.delete(id);
            nodeEls[id]?.classList.remove('expanded');
            const col = childEls[id];
            Array.from(col.children).forEach(w => w.classList.remove('visible'));
            setTimeout(() => { col.style.display = 'none'; }, 350);
          });
          Object.keys(paths).forEach(key => {
            paths[key].classList.remove('visible');
            setTimeout(() => { paths[key]?.remove(); delete paths[key]; }, 350);
          });
        }
  
        function rc(el) {
          const r = el.getBoundingClientRect();
          const s = bodyEl.getBoundingClientRect();
          return { rx: r.right - s.left, lx: r.left - s.left, y: r.top - s.top + r.height / 2 };
        }
  
        function drawConnector(pid, cid) {
          const key = pid + '-' + cid;
          if (paths[key]) return;
          const p = document.createElementNS('http://www.w3.org/2000/svg','path');
          p.classList.add('mind-conn');
          p.style.stroke = strokeFor(nodeEls[cid]?.className || '');
          svgEl.appendChild(p); paths[key] = p;
          updateConnector(key, pid, cid);
          requestAnimationFrame(() => p.classList.add('visible'));
        }
  
        function updateConnector(key, pid, cid) {
          const p = paths[key]; if (!p) return;
          const pEl = nodeEls[pid], cEl = nodeEls[cid]; if (!pEl || !cEl) return;
          const f = rc(pEl), t = rc(cEl);
          const cx = (f.rx + t.lx) / 2;
          p.setAttribute('d', 'M' + f.rx + ',' + f.y + ' C' + cx + ',' + f.y + ' ' + cx + ',' + t.y + ' ' + t.lx + ',' + t.y);
          const len = p.getTotalLength();
          p.style.strokeDasharray = len;
          p.style.strokeDashoffset = p.classList.contains('visible') ? 0 : len;
        }
  
        function refreshConnectors() {
          Object.keys(paths).forEach(key => {
            const [pid, cid] = key.split('-');
            updateConnector(key, pid, cid);
          });
        }
  
        // Auto-play cursor
        const CLICK_SEQ = ['root','inputs','process','outputs'];
        const sleep = ms => new Promise(r => setTimeout(r, ms));
  
        // Add cursor element
        const cursorEl = document.createElement('div');
        cursorEl.className = 'mind-cursor';
        cursorEl.innerHTML = '<svg viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#0077FF" stroke="#0077FF" stroke-width="16" d="M358.182 179.361c-19.493-24.768-52.679-31.945-79.872-19.098-15.127-15.687-36.182-22.487-56.595-19.629V67c0-36.944-29.736-67-66.286-67S89.143 30.056 89.143 67v161.129c-19.909-7.41-43.272-5.094-62.083 8.872-29.355 21.795-35.793 63.333-14.55 93.152l109.699 154.001C134.632 501.59 154.741 512 176 512h178.286c30.802 0 57.574-21.5 64.557-51.797l27.429-118.999A67.873 67.873 0 0 0 448 326v-84c0-46.844-46.625-79.273-89.818-62.639zM80.985 279.697l27.126 38.079c8.995 12.626 29.031 6.287 29.031-9.283V67c0-25.12 36.571-25.16 36.571 0v175c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16v-35c0-25.12 36.571-25.16 36.571 0v35c0 8.836 7.163 16 16 16H272c8.837 0 16-7.164 16-16v-21c0-25.12 36.571-25.16 36.571 0v21c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16 0-25.121 36.571-25.16 36.571 0v84c0 1.488-.169 2.977-.502 4.423l-27.43 119.001c-1.978 8.582-9.29 14.576-17.782 14.576H176c-5.769 0-11.263-2.878-14.697-7.697l-109.712-154c-14.406-20.223 14.994-42.818 29.394-22.606zM176.143 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.733 0-14-7.163-14-16zm75.428 0v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16zM327 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16z"/></svg><svg viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0;width:100%;height:100%;"><path fill="#fff" d="M358.182 179.361c-19.493-24.768-52.679-31.945-79.872-19.098-15.127-15.687-36.182-22.487-56.595-19.629V67c0-36.944-29.736-67-66.286-67S89.143 30.056 89.143 67v161.129c-19.909-7.41-43.272-5.094-62.083 8.872-29.355 21.795-35.793 63.333-14.55 93.152l109.699 154.001C134.632 501.59 154.741 512 176 512h178.286c30.802 0 57.574-21.5 64.557-51.797l27.429-118.999A67.873 67.873 0 0 0 448 326v-84c0-46.844-46.625-79.273-89.818-62.639zM80.985 279.697l27.126 38.079c8.995 12.626 29.031 6.287 29.031-9.283V67c0-25.12 36.571-25.16 36.571 0v175c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16v-35c0-25.12 36.571-25.16 36.571 0v35c0 8.836 7.163 16 16 16H272c8.837 0 16-7.164 16-16v-21c0-25.12 36.571-25.16 36.571 0v21c0 8.836 7.163 16 16 16h6.857c8.837 0 16-7.164 16-16 0-25.121 36.571-25.16 36.571 0v84c0 1.488-.169 2.977-.502 4.423l-27.43 119.001c-1.978 8.582-9.29 14.576-17.782 14.576H176c-5.769 0-11.263-2.878-14.697-7.697l-109.712-154c-14.406-20.223 14.994-42.818 29.394-22.606zM176.143 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.733 0-14-7.163-14-16zm75.428 0v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16zM327 400v-96c0-8.837 6.268-16 14-16h6c7.732 0 14 7.163 14 16v96c0 8.837-6.268 16-14 16h-6c-7.732 0-14-7.163-14-16z"/></svg>';
        bodyEl.appendChild(cursorEl);
  
        function nodePos(id) {
          const el = nodeEls[id]; if (!el) return null;
          const r = el.getBoundingClientRect();
          const br = bodyEl.getBoundingClientRect();
          return { x: r.left - br.left + r.width * 0.62, y: r.top - br.top + r.height * 0.5 };
        }
  
        async function autoPlay() {
          cursorEl.style.display = 'block';
          cursorEl.style.left = '-30px';
          cursorEl.style.top = '50%';
          await sleep(300);
  
          while (true) {
            for (const id of CLICK_SEQ) {
              if (expanded.has(id)) continue;
              const pos = nodePos(id);
              if (!pos) continue;
              cursorEl.style.left = (pos.x - 4) + 'px';
              cursorEl.style.top = (pos.y - 2) + 'px';
              await sleep(650);
              cursorEl.classList.add('pressing');
              nodeEls[id]?.classList.add('clicking');
              await sleep(120);
              cursorEl.classList.remove('pressing');
              cursorEl.classList.add('releasing');
              nodeEls[id]?.classList.remove('clicking');
              expandNode(id);
              await sleep(140);
              cursorEl.classList.remove('releasing');
              await sleep(450);
            }
            await sleep(1800);
            cursorEl.style.opacity = '0';
            await sleep(300);
            collapseAll();
            await sleep(800);
            cursorEl.style.opacity = '1';
            await sleep(400);
            await sleep(800);
            await sleep(400);
          }
        }
  
        requestAnimationFrame(() => setTimeout(autoPlay, 500));
      })();
  
      /* ─── Knowledge Graph (Bento Card) ─── */
      (function initKGCard() {
        const canvas = container.querySelector('#kgCanvas');
        if (!canvas) return;
        const wrap = canvas.parentElement;
        let W, H, dpr, ctx;
  
        // One concept: Calculus — 8 nodes, generous sizing
        const NODES = [
          {id:'calculus', label:'Calculus',       pw:50, ph:20},
          {id:'deriv',    label:'Derivatives',     pw:50, ph:20},
          {id:'integrals',label:'Integrals',       pw:50, ph:20},
          {id:'limits',   label:'Limits',          pw:50, ph:20},
          {id:'functions',label:'Functions',       pw:50, ph:20},
          {id:'series',   label:'Series',          pw:50, ph:20},
          {id:'theorems', label:'Theorems',        pw:50, ph:20},
          {id:'apps',     label:'Applications',    pw:50, ph:20},
        ];
  
        const EDGES = [
          {s:'calculus', t:'deriv',     label:'studies'},
          {s:'calculus', t:'integrals', label:'studies'},
          {s:'calculus', t:'limits',    label:'founded on'},
          {s:'calculus', t:'series',    label:'includes'},
          {s:'deriv',    t:'functions', label:'rate of'},
          {s:'integrals',t:'theorems',  label:'proven by'},
          {s:'limits',   t:'deriv',     label:'defines'},
          {s:'deriv',    t:'apps',      label:'applied in'},
          {s:'integrals',t:'apps',      label:'applied in'},
        ];
  
        // #0077FF family
        const BLUE_CORE = '#0055CC';
        const BLUE_MID  = '#0077FF';
        const BLUE_LIGHT= '#3399FF';
        const BLUE_SOFT = '#66BBFF';
  
        // Assign color by connection count
        const connCount = {};
        NODES.forEach(n => connCount[n.id] = 0);
        EDGES.forEach(e => { connCount[e.s]++; connCount[e.t]++; });
        const maxConn = Math.max(...Object.values(connCount), 1);
  
        function nodeColor(id) {
          const r = (connCount[id]||0) / maxConn;
          if (r >= 0.7) return BLUE_CORE;
          if (r >= 0.45) return BLUE_MID;
          if (r >= 0.25) return BLUE_LIGHT;
          return BLUE_SOFT;
        }
  
        function edgeColor(sId, tId) {
          const avg = ((connCount[sId]||0)+(connCount[tId]||0))/2;
          const r = avg / maxConn;
          if (r >= 0.6) return '#3399FF';
          if (r >= 0.35) return '#66BBFF';
          return '#99DDFF';
        }
  
        function roundRect(x, y, w, h, r) {
          ctx.beginPath();
          ctx.moveTo(x+r, y);
          ctx.lineTo(x+w-r, y);
          ctx.quadraticCurveTo(x+w, y, x+w, y+r);
          ctx.lineTo(x+w, y+h-r);
          ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
          ctx.lineTo(x+r, y+h);
          ctx.quadraticCurveTo(x, y+h, x, y+h-r);
          ctx.lineTo(x, y+r);
          ctx.quadraticCurveTo(x, y, x+r, y);
          ctx.closePath();
        }
  
        function draw() {
          W = wrap.clientWidth; H = wrap.clientHeight;
          dpr = window.devicePixelRatio || 1;
          canvas.width = W * dpr;
          canvas.height = H * dpr;
          canvas.style.width = W + 'px';
          canvas.style.height = H + 'px';
          ctx = canvas.getContext('2d');
          ctx.scale(dpr, dpr);
          ctx.clearRect(0,0,W,H);
  
          const p = (fx, fy) => [W * fx, H * fy];
          // Radial layout — center node with others evenly spaced around it
          const positions = {
            calculus: p(0.50, 0.46),
            deriv:    p(0.80, 0.18),
            integrals:p(0.82, 0.68),
            limits:   p(0.38, 0.18),
            functions:p(0.88, 0.42),
            series:   p(0.20, 0.72),
            theorems: p(0.52, 0.82),
            apps:     p(0.18, 0.46),
          };
  
          const nodes = NODES.map(n => ({...n, x: positions[n.id][0], y: positions[n.id][1]}));
          const nodeMap = {};
          nodes.forEach(n => nodeMap[n.id] = n);
          const edges = EDGES.map(e => ({...e, source: nodeMap[e.s], target: nodeMap[e.t]})).filter(e => e.source && e.target);
  
          // ── Edges: straight lines + arrowheads + labels ──
          function pillEdge(node, dx, dy, sign) {
            const d = Math.sqrt(dx*dx+dy*dy)||1;
            const ux=dx/d, uy=dy/d;
            const a = (ux*ux)/(node.pw*node.pw) + (uy*uy)/(node.ph*node.ph);
            const t = sign * 1/Math.sqrt(a);
            return [node.x + ux*t, node.y + uy*t];
          }
          for (const e of edges) {
            const s=e.source, t=e.target;
            const dx=t.x-s.x, dy=t.y-s.y;
            const [sx,sy] = pillEdge(s, dx, dy, 1);
            const [ex,ey] = pillEdge(t, dx, dy, -1);
            const col = edgeColor(e.s, e.t);
  
            // Line
            ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(ex,ey);
            ctx.strokeStyle = col; ctx.lineWidth = 1.3; ctx.stroke();
  
            // Arrowhead
            const angle = Math.atan2(ey-sy, ex-sx);
            const al=12, aw=0.45;
            ctx.beginPath(); ctx.moveTo(ex, ey);
            ctx.lineTo(ex - al*Math.cos(angle-aw), ey - al*Math.sin(angle-aw));
            ctx.lineTo(ex - al*Math.cos(angle+aw), ey - al*Math.sin(angle+aw));
            ctx.closePath();
            ctx.fillStyle = col; ctx.fill();
  
            // Label pill at midpoint
            const mx=(sx+ex)/2, my=(sy+ey)/2;
            ctx.save();
            ctx.font = `500 9px 'DM Sans', sans-serif`;
            const tw = ctx.measureText(e.label).width;
            roundRect(mx - tw/2 - 5, my - 7, tw + 10, 14, 4);
            ctx.fillStyle = 'rgba(255,255,255,0.92)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(0,0,0,0.06)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.fillStyle = '#3c4f69';
            ctx.textAlign='center'; ctx.textBaseline='middle';
            ctx.fillText(e.label, mx, my);
            ctx.restore();
          }
  
          // ── Nodes: box with shadow + white border ──
          for (const n of nodes) {
            const col = nodeColor(n.id);
            const x = n.x - n.pw, y = n.y - n.ph, w = n.pw*2, h = n.ph*2;
            const pillR = h / 2;
  
            // Shadow
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,0.1)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            roundRect(x, y, w, h, pillR);
            ctx.fillStyle = col; ctx.fill();
            ctx.restore();
  
            // White border
            roundRect(x, y, w, h, pillR);
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
  
            // Label — sized to fit inside box with padding
            const fs = Math.max(10, Math.min(14, n.ph * 0.8));
            ctx.font = `600 ${fs}px 'DM Sans', sans-serif`;
            ctx.fillStyle = '#fff';
            ctx.textAlign='center'; ctx.textBaseline='middle';
            ctx.fillText(n.label, n.x, n.y);
          }
        }
  
        draw();
        window.addEventListener('resize', draw);
      })();
    
}

export default function BentoPremium() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    initBentoJS(containerRef.current);
  }, []);

  return (
    <section id="features" style={{ background: '#F8F7F5', padding: '80px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto',  }}>
      <style>{BENTO_CSS}</style>
      <div className="bento-section" ref={containerRef} dangerouslySetInnerHTML={{ __html: BENTO_HTML }} />
      </div>
    </section>
  );
}
