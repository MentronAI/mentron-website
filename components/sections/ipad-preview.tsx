'use client';

import { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   CSS — Ported from mentron-ipad-v4.html, scoped under .ipad-preview-section
   Light theme adaptation: section bg is white/cream, iPad bezels stay dark.
   ═══════════════════════════════════════════════════════════════════ */
const IPAD_CSS = `
:root {
  --heading: #0A1628; --body: #3D5166; --muted: #7A8FA6;
  --surface: #F8FAFC; --border: #E4E6EF;
  --ease: cubic-bezier(0.16,1,0.3,1);
}

/* ══════════════ SECTION ══════════════ */
.ipad-preview-section {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 80px 24px 96px;
}

/* ══════════════ SCENE ══════════════ */
.ipad-preview-section .scene {
  position: relative;
  width: 1200px;
  height: 700px;
  margin: 48px 0 0;
  flex-shrink: 0;
}
.ipad-preview-section .scene-wrap {
  display: flex;
  justify-content: center;
  overflow: visible;
}
.ipad-preview-section .device {
  position: absolute;
}

.ipad-preview-section .device-1 {
  top: 0; left: 0; z-index: 1; opacity: 0;
  transform: translate(-50px,70px) rotateZ(4deg) scale(0.86);
}
.ipad-preview-section .device-1.animate {
  animation: ipad-enter1 1.1s forwards var(--ease);
}
@keyframes ipad-enter1 {
  to { opacity:1; transform:translate(0,0) rotateZ(2deg) scale(1); }
}

.ipad-preview-section .device-2 {
  bottom: 0; right: 0; z-index: 10; opacity: 0;
  transform: translate(50px,70px) scale(0.86);
}
.ipad-preview-section .device-2.animate {
  animation: ipad-enter2 1.1s forwards var(--ease);
}
@keyframes ipad-enter2 {
  to { opacity:1; transform:translate(0,0) scale(1); }
}

/* ══════════════ iPAD BEZEL ══════════════
   Native landscape (780×560) — NO rotation, NO scale trick.
   Content at 1:1 pixel dimensions for pixel-perfect rendering.
════════════════════════════════════════════ */
.ipad-preview-section .ipad-landscape-shell {
  width: 780px; height: 560px;
  display: flex; align-items: center; justify-content: center;
}
.ipad-preview-section .ipad-portrait {
  position: relative; width: 780px; height: 560px;
  flex-shrink: 0;
}
.ipad-preview-section .ipad-frame {
  position: absolute; inset: 0;
  background: #0d0d0d; border-radius: 36px;
  box-shadow: inset 0 0 0 1px #6d7174, inset 0 0 1px 3px #83878a;
  z-index: 1;
}
.ipad-preview-section .ipad-screen-cutout {
  position: absolute;
  top: 28px; left: 28px;
  width: 724px; height: 504px;
  border: 2px solid #141414; border-radius: 10px;
  overflow: hidden; z-index: 2;
  transform: translateZ(0) translate3d(0,0,0);
  backface-visibility: hidden;
}
.ipad-preview-section .ipad-content {
  position: absolute;
  width: 724px; height: 504px;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  transform-origin: center center;
  will-change: auto;
  -webkit-font-smoothing: subpixel-antialiased;
  text-rendering: geometricPrecision;
}

/* sensors — positioned along top edge for landscape */
.ipad-preview-section .ipad-sensors { position: absolute; width: 100%; top: 0; left: 0; z-index: 3; pointer-events: none; }
.ipad-preview-section .ipad-sensors::after {
  background: #1a1a1a; border-radius: 14px;
  box-shadow: -16px 0 #1a1a1a, 56px 0 #1a1a1a;
  content: ""; position: absolute;
  height: 8px; width: 8px; left: 50%; margin-left: -24px; top: 11px;
}
.ipad-preview-section .ipad-sensors::before {
  background: radial-gradient(farthest-corner at 20% 20%,#6074BF 0,transparent 40%),
              radial-gradient(farthest-corner at 80% 80%,#513785 0,#24555E 20%,transparent 50%);
  border-radius: 50%; box-shadow: 0 0 1px 1px rgba(255,255,255,.05);
  content: ""; position: absolute;
  height: 5px; width: 5px; left: 50%; margin-left: -2px; top: 13px;
}
/* buttons — volume on right edge, lock on top for landscape */
.ipad-preview-section .ipad-btns { position: absolute; inset: 0; z-index: 3; pointer-events: none; }
.ipad-preview-section .ipad-btns::after,
.ipad-preview-section .ipad-btns::before { background: #6d7174; content: ""; position: absolute; }
.ipad-preview-section .ipad-btns::after  { height: 2px; right: 40px; top: -2px; width: 34px; }
.ipad-preview-section .ipad-btns::before { box-shadow: 0 36px #6d7174; height: 32px; right: -2px; top: 64px; width: 2px; }

/* ══════════════ SHARED CARD (1× native) ══════════════ */
.ipad-preview-section .mock-card {
  width: 100%; height: 100%;
  display: flex; flex-direction: column; overflow: hidden; position: relative;
  font-size: 1em;
}
.ipad-preview-section .browser-bar {
  background: rgba(248,250,252,0.97); border-bottom: 1px solid var(--border);
  height: 35px; display: flex; align-items: center; gap: 10px; padding: 0 14px; flex-shrink: 0;
}
.ipad-preview-section .b-dots { display: flex; gap: 5px; align-items: center; }
.ipad-preview-section .b-dot  { width: 10px; height: 10px; border-radius: 50%; }
.ipad-preview-section .bd-r{background:#FF5F57;} .bd-a{background:#FEBC2E;} .bd-g{background:#28C840;}
.ipad-preview-section .b-url {
  flex: 1; background: rgba(255,255,255,0.8); border: 1px solid var(--border);
  border-radius: 5px; height: 20px; display: flex; align-items: center;
  justify-content: center; font-size: 9px; color: var(--muted); font-family: 'Inter',sans-serif;
}
.ipad-preview-section .card-body { flex: 1; padding: 18px 20px 16px; display: flex; flex-direction: column; gap: 11px; overflow: hidden; }
.ipad-preview-section .card-badge {
  font-size: 9px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  padding: 3px 10px; border-radius: 99px; font-family: 'Inter',sans-serif;
}
.ipad-preview-section .badge-a { background:#F0F9FF; color:#0EA5E9; border:1px solid #BAE6FD; }
.ipad-preview-section .badge-q { background:#FFFBEB; color:#F59E0B; border:1px solid #FDE68A; }
.ipad-preview-section .topbar { display:flex; align-items:center; justify-content:space-between; }
.ipad-preview-section .pills  { display:flex; gap:5px; }
.ipad-preview-section .pill   { font-size:9px; font-weight:500; color:var(--muted); background:var(--surface); border:1px solid var(--border); padding:2px 9px; border-radius:99px; font-family:'Inter',sans-serif; }
.ipad-preview-section .pill.on{ background:#F0F9FF; color:#0EA5E9; border-color:#BAE6FD; }
.ipad-preview-section .card-title { font-family:'Bricolage Grotesque',sans-serif; font-size:18px; font-weight:700; color:var(--heading); line-height:1.2; letter-spacing:-0.02em; }
.ipad-preview-section .card-sub   { font-size:11px; color:var(--muted); font-family:'Inter',sans-serif; margin-top:1px; }

/* ══════════════ ANALYTICS CARD ══════════════ */
.ipad-preview-section .card-analytics {
  background:
    radial-gradient(ellipse 70% 55% at 96% 4%,rgba(14,165,233,0.38) 0%,rgba(56,189,248,0.18) 45%,transparent 70%),
    #fff;
}
.ipad-preview-section .bloom-row { display:flex; gap:12px; align-items:flex-start; }
.ipad-preview-section .bloom-svg-wrap { position:relative; width:130px; height:130px; flex-shrink:0; }
.ipad-preview-section .bloom-svg-wrap svg { width:130px; height:130px; transform:rotate(-90deg); }
.ipad-preview-section .ring-track { fill:none; stroke-width:6.5; stroke-linecap:round; }
.ipad-preview-section .ring-fill  { fill:none; stroke-width:6.5; stroke-linecap:round; stroke-dasharray:0 9999; transition:stroke-dasharray 1.4s cubic-bezier(0.16,1,0.3,1); }
.ipad-preview-section .bloom-score-bar { display:flex; align-items:baseline; gap:5px; }
.ipad-preview-section .bloom-pct-inline { font-family:'Bricolage Grotesque',sans-serif; font-size:18px; font-weight:700; color:#0A1628; }
.ipad-preview-section .bloom-sub-inline { font-size:10px; font-weight:600; color:#0A1628; }
.ipad-preview-section .bloom-legend { flex:1; display:flex; flex-direction:column; gap:6px; padding-top:2px; }
.ipad-preview-section .legend-title { font-size:9px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); margin-bottom:1px; font-family:'Inter',sans-serif; }
.ipad-preview-section .b-item { display:flex; align-items:center; gap:6px; }
.ipad-preview-section .b-dot2 { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
.ipad-preview-section .b-lbl  { font-size:10px; color:var(--body); flex:1; font-family:'Inter',sans-serif; }
.ipad-preview-section .b-track{ width:55px; height:4px; background:var(--border); border-radius:99px; overflow:hidden; }
.ipad-preview-section .b-fill { height:100%; border-radius:99px; width:0%; transition:width 1.2s cubic-bezier(0.16,1,0.3,1); }
.ipad-preview-section .b-pct  { font-size:10px; font-weight:600; color:var(--heading); width:28px; text-align:right; font-family:'Inter',sans-serif; }
.ipad-preview-section .section-lbl { font-size:9px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); margin-bottom:4px; font-family:'Inter',sans-serif; }
.ipad-preview-section .at-risk-list { display:flex; flex-direction:column; gap:5px; }
.ipad-preview-section .s-row  { display:flex; align-items:center; gap:8px; padding:6px 10px; background:rgba(255,255,255,0.75); border:1px solid var(--border); border-radius:9px; }
.ipad-preview-section .s-av   { width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:8px; font-weight:700; color:#fff; flex-shrink:0; font-family:'Inter',sans-serif; }
.ipad-preview-section .s-name { font-size:10px; font-weight:600; color:var(--heading); flex:1; font-family:'Inter',sans-serif; }
.ipad-preview-section .s-weak { font-size:9px; font-weight:600; padding:2px 8px; border-radius:99px; background:#FFFBEB; color:#D97706; border:1px solid #FDE68A; font-family:'Inter',sans-serif; }
.ipad-preview-section .e-wrap { display:flex; align-items:center; gap:5px; }
.ipad-preview-section .e-track{ width:38px; height:4px; background:var(--border); border-radius:99px; overflow:hidden; }
.ipad-preview-section .e-fill { height:100%; border-radius:99px; }
.ipad-preview-section .e-score{ font-size:10px; font-weight:700; width:19px; font-family:'Inter',sans-serif; }
.ipad-preview-section .flag-ic{ font-size:11px; opacity:0.5; }

/* ══════════════ QUIZ CARD ══════════════ */
.ipad-preview-section .card-quiz {
  background:
    radial-gradient(ellipse 80% 90% at -4% 110%,rgba(245,158,11,0.12) 0%,rgba(251,191,36,0.06) 50%,transparent 70%),
    radial-gradient(ellipse 65% 55% at 110% 2%,rgba(124,58,237,0.10) 0%,rgba(167,139,250,0.05) 45%,transparent 68%),
    #fff;
}
.ipad-preview-section .badge-q { background:#F0F9FF; color:#0EA5E9; border:1px solid #BAE6FD; }
.ipad-preview-section .quiz-header-row { display:flex; align-items:center; gap:10px; flex-shrink:0; }
.ipad-preview-section .quiz-title-sm { font-family:'Bricolage Grotesque',sans-serif; font-size:13px; font-weight:700; color:var(--heading); flex:1; }
.ipad-preview-section .quiz-timer { font-family:'Inter',sans-serif; font-size:13px; font-weight:700; color:#059669; display:flex; align-items:center; gap:4px; }
.ipad-preview-section .quiz-q-counter { font-family:'Inter',sans-serif; font-size:10px; font-weight:600; color:var(--muted); }
.ipad-preview-section .quiz-content-row { display:flex; gap:12px; flex:1; min-height:0; }
.ipad-preview-section .quiz-main { flex:1; display:flex; flex-direction:column; gap:8px; min-width:0; }
.ipad-preview-section .quiz-q-card {
  background:#fff; border:1px solid var(--border); border-radius:14px;
  padding:12px 14px; display:flex; flex-direction:column; gap:8px;
}
.ipad-preview-section .quiz-q-top { display:flex; align-items:flex-start; gap:10px; }
.ipad-preview-section .quiz-q-num {
  width:22px; height:22px; border-radius:9px; flex-shrink:0;
  background:#0077FF; color:#fff; display:flex; align-items:center; justify-content:center;
  font-size:10px; font-weight:700; font-family:'Inter',sans-serif;
}
.ipad-preview-section .quiz-q-text { font-size:11px; font-weight:600; color:var(--heading); line-height:1.4; font-family:'Inter',sans-serif; flex:1; }
.ipad-preview-section .quiz-q-badges { display:flex; gap:4px; flex-wrap:wrap; margin-top:-2px; }
.ipad-preview-section .qbadge { font-size:7px; font-weight:600; padding:2px 6px; border-radius:99px; font-family:'Inter',sans-serif; }
.ipad-preview-section .qbadge-bl { background:#F5F3FF; color:#7C3AED; border:1px solid #EDE9FE; }
.ipad-preview-section .qbadge-type { background:#F1F5F9; color:#475569; border:1px solid #E2E8F0; }
.ipad-preview-section .qbadge-topic { background:#FFF7ED; color:#C2410C; border:1px solid #FED7AA; }
.ipad-preview-section .quiz-options { display:grid; grid-template-columns:1fr 1fr; gap:5px; }
.ipad-preview-section .quiz-option {
  display:flex; align-items:center; gap:6px;
  padding:6px 9px; border-radius:11px; border:1px solid #E2E8F0;
  background:#F8FAFC; cursor:default; position:relative;
}
.ipad-preview-section .quiz-option.selected {
  background:#EFF6FF; border-color:#3B82F6; box-shadow:0 0 0 1px rgba(59,130,246,0.3);
}
.ipad-preview-section .quiz-opt-letter {
  width:21px; height:21px; border-radius:8px; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  font-size:9px; font-weight:700; font-family:'Inter',sans-serif;
  background:linear-gradient(135deg,#0077FF,#3B82F6); color:#fff;
}
.ipad-preview-section .quiz-option.selected .quiz-opt-letter { background:#3B82F6; }
.ipad-preview-section .quiz-opt-text { font-size:9px; font-weight:600; color:#3D5166; flex:1; font-family:'Inter',sans-serif; line-height:1.3; }
.ipad-preview-section .quiz-option.selected .quiz-opt-text { color:#1D4ED8; }
.ipad-preview-section .quiz-opt-indicator {
  width:12px; height:12px; border-radius:50%; border:1.5px solid #CBD5E1; flex-shrink:0;
}
.ipad-preview-section .quiz-option.selected .quiz-opt-indicator {
  border-color:#3B82F6; background:#3B82F6;
}
.ipad-preview-section .quiz-option.selected .quiz-opt-indicator::after {
  content:''; position:absolute; width:4px; height:4px; background:#fff; border-radius:50%;
  top:50%; left:50%; transform:translate(-50%,-50%);
}
.ipad-preview-section .quiz-nav-row { display:flex; gap:6px; align-items:center; }
.ipad-preview-section .quiz-nav-btn {
  flex:1; display:flex; align-items:center; justify-content:center; gap:4px;
  padding:5px 10px; border-radius:9px; border:1px solid #E2E8F0;
  font-size:9px; font-weight:600; font-family:'Inter',sans-serif;
  background:#fff; color:var(--body); cursor:default;
}
.ipad-preview-section .quiz-nav-btn.review {
  background:#FFFBEB; border-color:#FDE68A; color:#B45309;
}
.ipad-preview-section .quiz-nav-btn.next {
  background:#0077FF; border-color:#0077FF; color:#fff;
}
.ipad-preview-section .quiz-navigator {
  width:110px; flex-shrink:0; display:flex; flex-direction:column; gap:8px;
  border:1px solid var(--border); border-radius:12px; padding:9px 8px; background:#F8FAFC;
}
.ipad-preview-section .quiz-nav-title { font-size:8px; font-weight:700; text-align:center; color:var(--muted); text-transform:uppercase; letter-spacing:0.06em; font-family:'Inter',sans-serif; }
.ipad-preview-section .quiz-nav-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:3px; }
.ipad-preview-section .quiz-nav-q {
  width:100%; aspect-ratio:1; border-radius:5px; border:1px solid #E2E8F0;
  display:flex; align-items:center; justify-content:center;
  font-size:8px; font-weight:600; font-family:'Inter',sans-serif;
  background:#fff; color:var(--muted); cursor:default;
}
.ipad-preview-section .quiz-nav-q.answered { background:#D1FAE5; border-color:#A7F3D0; color:#065F46; }
.ipad-preview-section .quiz-nav-q.unanswered { background:#F1F5F9; border-color:#E2E8F0; color:#94A3B8; }
.ipad-preview-section .quiz-nav-q.review { border-color:#FDE68A; box-shadow:0 0 0 1.5px #F59E0B; background:#FFFBEB; color:#B45309; }
.ipad-preview-section .quiz-nav-q.current { border-color:#3B82F6; box-shadow:0 0 0 1.5px #3B82F6; background:#EFF6FF; color:#1D4ED8; }
.ipad-preview-section .quiz-legend { display:flex; flex-direction:column; gap:3px; }
.ipad-preview-section .quiz-legend-item { display:flex; align-items:center; gap:4px; font-size:7px; color:var(--muted); font-family:'Inter',sans-serif; }
.ipad-preview-section .quiz-legend-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }

/* ══════════════ RESPONSIVE ══════════════ */

/* Scale down progressively — keeps exact same layout, just smaller */
@media (max-width: 1280px) {
  .ipad-preview-section .scene {
    transform: scale(0.82);
    transform-origin: top center;
    margin-bottom: -126px;
  }
}
@media (max-width: 1060px) {
  .ipad-preview-section .scene {
    transform: scale(0.65);
    transform-origin: top center;
    margin-bottom: -245px;
  }
}
@media (max-width: 860px) {
  .ipad-preview-section .scene {
    transform: scale(0.5);
    transform-origin: top center;
    margin-bottom: -350px;
  }
}
@media (max-width: 640px) {
  .ipad-preview-section { padding: 40px 16px 48px; }
  .ipad-preview-section .scene {
    transform: scale(0.38);
    transform-origin: top center;
    margin-bottom: -434px;
  }
}
@media (max-width: 420px) {
  .ipad-preview-section .scene {
    transform: scale(0.28);
    transform-origin: top center;
    margin-bottom: -504px;
  }
}
`;

/* ═══════════════════════════════════════════════════════════════════
   HTML — Two iPad devices (Analytics + Quiz Generation)
   ═══════════════════════════════════════════════════════════════════ */
const IPAD_HTML = `
<div class="scene-wrap">
<div class="scene" id="ipad-scene">

  <!-- ══ DEVICE 1: Analytics ══ -->
  <div class="device device-1" id="dev1">
    <div class="ipad-landscape-shell">
      <div class="ipad-portrait">
        <div class="ipad-frame"></div>
        <div class="ipad-screen-cutout">
          <div class="ipad-content">
            <div class="mock-card card-analytics">
              <div class="browser-bar">
                <div class="b-dots"><span class="b-dot bd-r"></span><span class="b-dot bd-a"></span><span class="b-dot bd-g"></span></div>
                <div class="b-url">mentron.app/analytics</div>
              </div>
              <div class="card-body">
                <div class="topbar">
                  <span class="card-badge badge-a">Course Analytics</span>
                  <div class="pills"><span class="pill">Operating Systems</span><span class="pill on">Last 30 days</span></div>
                </div>
                <div>
                  <div class="card-title">Bloom's Performance Overview</div>
                  <div class="card-sub">62 students · 4 assessments · Class avg 71%</div>
                </div>
                <div class="bloom-row">
                  <div class="bloom-svg-wrap">
                    <svg viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg">
                      <circle class="ring-track" cx="105" cy="105" r="86" stroke="rgba(0,119,255,0.10)"/>
                      <circle class="ring-fill" id="rk1" cx="105" cy="105" r="86" stroke="#0077FF"/>
                      <circle class="ring-track" cx="105" cy="105" r="68" stroke="rgba(14,165,233,0.10)"/>
                      <circle class="ring-fill" id="rk2" cx="105" cy="105" r="68" stroke="#0EA5E9"/>
                      <circle class="ring-track" cx="105" cy="105" r="50" stroke="rgba(56,189,248,0.10)"/>
                      <circle class="ring-fill" id="rk3" cx="105" cy="105" r="50" stroke="#38BDF8"/>
                      <circle class="ring-track" cx="105" cy="105" r="33" stroke="rgba(245,158,11,0.12)"/>
                      <circle class="ring-fill" id="rk4" cx="105" cy="105" r="33" stroke="#F59E0B"/>
                      <circle class="ring-track" cx="105" cy="105" r="17" stroke="rgba(16,185,129,0.10)"/>
                      <circle class="ring-fill" id="rk5" cx="105" cy="105" r="17" stroke="#10B981"/>
                    </svg>
                  </div>
                  <div class="bloom-legend">
                    <div class="legend-title">K-Code Breakdown</div>
                    <div class="b-item"><div class="b-dot2" style="background:#0077FF"></div><span class="b-lbl">K1 · Remember</span><div class="b-track"><div class="b-fill" data-w="88" style="background:#0077FF"></div></div><span class="b-pct">88%</span></div>
                    <div class="b-item"><div class="b-dot2" style="background:#0EA5E9"></div><span class="b-lbl">K2 · Understand</span><div class="b-track"><div class="b-fill" data-w="79" style="background:#0EA5E9"></div></div><span class="b-pct">79%</span></div>
                    <div class="b-item"><div class="b-dot2" style="background:#38BDF8"></div><span class="b-lbl">K3 · Apply</span><div class="b-track"><div class="b-fill" data-w="72" style="background:#38BDF8"></div></div><span class="b-pct">72%</span></div>
                    <div class="b-item"><div class="b-dot2" style="background:#F59E0B"></div><span class="b-lbl">K4 · Analyze</span><div class="b-track"><div class="b-fill" data-w="61" style="background:#F59E0B"></div></div><span class="b-pct">61%</span></div>
                    <div class="b-item"><div class="b-dot2" style="background:#10B981"></div><span class="b-lbl">K5 · Evaluate</span><div class="b-track"><div class="b-fill" data-w="48" style="background:#10B981"></div></div><span class="b-pct">48%</span></div>
                  </div>
                </div>
                <div class="bloom-score-bar">
                  <span class="bloom-pct-inline">71%</span>
                  <span class="bloom-sub-inline">Avg Score</span>
                </div>
                <div>
                  <div class="section-lbl">At-Risk Students · 3 flagged</div>
                  <div class="at-risk-list">
                    <div class="s-row"><div class="s-av" style="background:#10B981">RK</div><span class="s-name">Rahul Kumar</span><span class="s-weak">K3, K4</span><div class="e-wrap"><div class="e-track"><div class="e-fill" style="width:32%;background:#10B981"></div></div><span class="e-score" style="color:#10B981">32</span></div><span class="flag-ic">🚩</span></div>
                    <div class="s-row"><div class="s-av" style="background:#F59E0B">PS</div><span class="s-name">Priya Sharma</span><span class="s-weak">K4, K5</span><div class="e-wrap"><div class="e-track"><div class="e-fill" style="width:47%;background:#F59E0B"></div></div><span class="e-score" style="color:#F59E0B">47</span></div><span class="flag-ic">🚩</span></div>
                    <div class="s-row"><div class="s-av" style="background:#0EA5E9">AV</div><span class="s-name">Arjun Vijay</span><span class="s-weak">K5</span><div class="e-wrap"><div class="e-track"><div class="e-fill" style="width:55%;background:#0EA5E9"></div></div><span class="e-score" style="color:#0EA5E9">55</span></div><span class="flag-ic">🚩</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ipad-sensors"></div>
        <div class="ipad-btns"></div>
      </div>
    </div>
  </div>

  <!-- ══ DEVICE 2: Quiz ══ -->
  <div class="device device-2" id="dev2">
    <div class="ipad-landscape-shell">
      <div class="ipad-portrait">
        <div class="ipad-frame"></div>
        <div class="ipad-screen-cutout">
          <div class="ipad-content">
            <div class="mock-card card-quiz">
              <div class="browser-bar">
                <div class="b-dots"><span class="b-dot bd-r"></span><span class="b-dot bd-a"></span><span class="b-dot bd-g"></span></div>
                <div class="b-url">mentron.app/quiz</div>
              </div>
              <div class="card-body">
                <div class="topbar">
                  <span class="card-badge badge-q">Live Quiz</span>
                  <div class="pills"><span class="pill on">12 Questions</span><span class="pill">30 min</span></div>
                </div>
                <div>
                  <div class="card-title">Operating Systems · Quiz 2</div>
                  <div class="card-sub">CO1, CO3 · K3–K4 focus · 12 questions</div>
                </div>
                <div class="quiz-header-row">
                  <span class="quiz-title-sm">Active Quiz</span>
                  <span class="quiz-timer">⏱ 14:32</span>
                  <span class="quiz-q-counter">3 / 12</span>
                </div>
                <div class="quiz-content-row">
                  <div class="quiz-main">
                    <div class="quiz-q-card">
                      <div class="quiz-q-top">
                        <div class="quiz-q-num">3</div>
                        <span class="quiz-q-text">Which of the following scheduling algorithms can lead to process starvation?</span>
                      </div>
                      <div class="quiz-q-badges">
                        <span class="qbadge qbadge-bl">K3 · Apply</span>
                        <span class="qbadge qbadge-type">Multiple Choice</span>
                        <span class="qbadge qbadge-topic">Scheduling</span>
                      </div>
                      <div class="quiz-options">
                        <div class="quiz-option">
                          <div class="quiz-opt-letter">A</div>
                          <span class="quiz-opt-text">First Come First Serve</span>
                          <div class="quiz-opt-indicator"></div>
                        </div>
                        <div class="quiz-option">
                          <div class="quiz-opt-letter">B</div>
                          <span class="quiz-opt-text">Round Robin</span>
                          <div class="quiz-opt-indicator"></div>
                        </div>
                        <div class="quiz-option selected">
                          <div class="quiz-opt-letter">C</div>
                          <span class="quiz-opt-text">Shortest Job First</span>
                          <div class="quiz-opt-indicator"></div>
                        </div>
                        <div class="quiz-option">
                          <div class="quiz-opt-letter">D</div>
                          <span class="quiz-opt-text">Priority Scheduling</span>
                          <div class="quiz-opt-indicator"></div>
                        </div>
                      </div>
                    </div>
                    <div class="quiz-nav-row">
                      <div class="quiz-nav-btn">← Previous</div>
                      <div class="quiz-nav-btn review">⚑ Review</div>
                      <div class="quiz-nav-btn next">Next →</div>
                    </div>
                  </div>
                  <div class="quiz-navigator">
                    <div class="quiz-nav-title">Navigator</div>
                    <div class="quiz-nav-grid">
                      <div class="quiz-nav-q answered">1</div>
                      <div class="quiz-nav-q answered">2</div>
                      <div class="quiz-nav-q current">3</div>
                      <div class="quiz-nav-q review">4</div>
                      <div class="quiz-nav-q unanswered">5</div>
                      <div class="quiz-nav-q unanswered">6</div>
                      <div class="quiz-nav-q unanswered">7</div>
                      <div class="quiz-nav-q unanswered">8</div>
                      <div class="quiz-nav-q unanswered">9</div>
                      <div class="quiz-nav-q unanswered">10</div>
                      <div class="quiz-nav-q unanswered">11</div>
                      <div class="quiz-nav-q unanswered">12</div>
                    </div>
                    <div class="quiz-legend">
                      <div class="quiz-legend-item"><div class="quiz-legend-dot" style="background:#10B981"></div> Answered</div>
                      <div class="quiz-legend-item"><div class="quiz-legend-dot" style="background:#94A3B8"></div> Unanswered</div>
                      <div class="quiz-legend-item"><div class="quiz-legend-dot" style="background:#F59E0B"></div> For Review</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ipad-sensors"></div>
        <div class="ipad-btns"></div>
      </div>
    </div>
  </div>

</div>
</div>
`;

/* ═══════════════════════════════════════════════════════════════════
   JS — Bloom chart animation, triggered by IntersectionObserver
   ═══════════════════════════════════════════════════════════════════ */
function initIpadJS(container: HTMLElement) {
  const BLOOM = [
    { id: 'rk1', r: 86, pct: .88 },
    { id: 'rk2', r: 68, pct: .79 },
    { id: 'rk3', r: 50, pct: .72 },
    { id: 'rk4', r: 33, pct: .61 },
    { id: 'rk5', r: 17, pct: .48 },
  ];

  function animateBloom() {
    BLOOM.forEach(({ id, r, pct }, i) => {
      const circ = 2 * Math.PI * r;
      const fill = circ * pct;
      const el = document.getElementById(id);
      if (!el) return;
      el.style.transition = 'none';
      el.style.strokeDasharray = '0 9999';
      setTimeout(() => {
        el.style.transition = 'stroke-dasharray 1.4s cubic-bezier(0.16,1,0.3,1)';
        el.style.strokeDasharray = `${fill} ${circ - fill + .01}`;
      }, 180 + i * 90);
    });
    document.querySelectorAll('.b-fill').forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.width = '0%';
      setTimeout(() => { htmlEl.style.width = htmlEl.dataset.w + '%'; }, 260 + i * 90);
    });
  }

  // IntersectionObserver — trigger once when visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const dev1 = document.getElementById('dev1');
        const dev2 = document.getElementById('dev2');
        if (dev1) dev1.classList.add('animate');
        if (dev2) dev2.classList.add('animate');
        setTimeout(animateBloom, 400);
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(container);

  return () => observer.disconnect();
}

/* ═══════════════════════════════════════════════════════════════════
   React Component
   ═══════════════════════════════════════════════════════════════════ */
export default function IpadPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = initIpadJS(containerRef.current);
    return cleanup;
  }, []);

  return (
    <section className="ipad-preview-section" style={{ background: '#F8F7F5' }}>
      <style>{IPAD_CSS}</style>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'left',
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: '#0A1628',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
          className="font-display"
        >
          Built for Real Classrooms
        </h2>
        <p
          style={{
            textAlign: 'left',
            fontSize: '15px',
            color: '#64748B',
            maxWidth: '540px',
            marginTop: '8px',
            marginBottom: '0',
            lineHeight: 1.6,
          }}
        >
          From Bloom's Taxonomy analytics to AI-powered quiz generation — see how Mentron brings every workflow into one seamless experience.
        </p>
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: IPAD_HTML }} />
      </div>
    </section>
  );
}
