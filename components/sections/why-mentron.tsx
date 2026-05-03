'use client';

import { useEffect, useRef } from 'react';
import { useTextStream } from '@/lib/hooks/use-text-stream';

const TEACHER_CSS = `
    .teacher-section {
      position: relative;
      padding: 96px 32px 128px;
      overflow: hidden;
      background: #fff;
    }
    .teacher-section::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 0;
      background:
        radial-gradient(ellipse 65% 70% at -8% -5%, rgba(99,102,241,.07) 0%, transparent 60%),
        radial-gradient(ellipse 50% 55% at 108% 105%, rgba(16,185,129,.06) 0%, transparent 60%),
        #ffffff;
    }
    .teacher-section::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      background-size: 200px 200px;
      opacity: .022;
      mix-blend-mode: overlay;
    }
    .teacher-section .section-inner {
      position: relative;
      z-index: 2;
      max-width: 1280px;
      margin: 0 auto;
    }

    /* ══ HEADER ══ */
    .teacher-section .section-header {
      text-align: left;
      margin-bottom: 64px;
    }
    .teacher-section .section-title {
      font-family: 'Bricolage Grotesque', sans-serif;
      font-size: clamp(1.75rem, 3vw, 2.4rem);
      font-weight: 700;
      color: #0A1628;
      line-height: 1.15;
      letter-spacing: -.022em;
      margin-bottom: 12px;
    }
    .teacher-section .section-subtitle {
      font-size: 1rem;
      color: #6B7280;
      max-width: 480px;
      margin: 0;
      line-height: 1.65;
    }

    /* ══ BROWSER ══ */
    .teacher-section .browser-wrap {
      position: relative;
      margin: 0;
    }
    .teacher-section .browser {
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 0 0 1px rgba(0,0,0,.07), 0 8px 24px rgba(0,0,0,.05), 0 32px 80px rgba(0,0,0,.09);
      background: #fff;
    }
    .teacher-section .browser-chrome {
      height: 42px;
      background: #F8F9FA;
      border-bottom: 1px solid #EAECF0;
      display: grid;
      grid-template-columns: 72px 1fr 72px;
      align-items: center;
      padding: 0 16px;
    }
    .teacher-section .browser-dots { display: flex; gap: 6px; }
    .teacher-section .browser-dot { width: 11px; height: 11px; border-radius: 50%; }
    .teacher-section .browser-dot:nth-child(1) { background: #FF5F57; }
    .teacher-section .browser-dot:nth-child(2) { background: #FEBC2E; }
    .teacher-section .browser-dot:nth-child(3) { background: #28C840; }
    .teacher-section .browser-url {
      background: #fff;
      border: 1px solid #EAECF0;
      border-radius: 6px;
      padding: 4px 12px;
      font-size: 11px;
      color: #9CA3AF;
      text-align: center;
    }

    /* ══ DASHBOARD GRID ══ */
    .teacher-section .dashboard {
      display: grid;
      grid-template-columns: 160px 1fr 272px;
      height: 640px;
      overflow: hidden;
    }

    /* ── SIDEBAR ── */
    .teacher-section .dash-sidebar {
      background: #fff;
      border-right: 1px solid #F0F0F0;
      padding: 20px 14px 16px;
      display: flex;
      flex-direction: column;
    }
    .teacher-section .sidebar-wordmark {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: -.04em;
      color: #0077FF;
      display: block;
      padding-left: 2px;
      margin-bottom: 20px;
    }
    .teacher-section .sidebar-section-label {
      font-size: 8px;
      font-weight: 600;
      letter-spacing: .09em;
      text-transform: uppercase;
      color: #C4C9D4;
      padding: 0 4px;
      margin-bottom: 5px;
    }
    .teacher-section .sidebar-nav-item {
      display: flex;
      align-items: center;
      padding: 6px 8px;
      border-radius: 6px;
      font-size: 11px;
      color: #6B7280;
      font-weight: 500;
      cursor: default;
      margin-bottom: 1px;
    }
    .teacher-section .sidebar-nav-item.active {
      background: #EEF2FF;
      color: #0A1628;
      font-weight: 600;
    }
    .teacher-section .sidebar-divider { height: 1px; background: #F4F5F7; margin: 10px 0; }
    .teacher-section .sidebar-course {
      display: flex;
      align-items: center;
      padding: 5px 8px;
      border-radius: 6px;
      font-size: 11px;
      color: #6B7280;
      cursor: default;
      margin-bottom: 1px;
    }
    .teacher-section .sidebar-hero {
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px;
      font-size: 10.5px;
      font-weight: 600;
      color: #374151;
    }
    .teacher-section .hero-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10B981;
      flex-shrink: 0;
      animation: teacher-pulse-g 2.4s ease-in-out infinite;
    }
    @keyframes teacher-pulse-g {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: .55; transform: scale(.8); }
    }

    /* ── CENTER PANEL ── */
    .teacher-section .dash-center {
      border-right: 1px solid #F0F0F0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: #fff;
    }

    /* Chart section */
    .teacher-section .center-chart {
      padding: 16px 18px 12px;
      border-bottom: 1px solid #F0F0F0;
      flex-shrink: 0;
    }
    .teacher-section .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .teacher-section .panel-title {
      font-size: 11.5px;
      font-weight: 600;
      color: #0A1628;
      letter-spacing: -.01em;
    }
    .teacher-section .panel-meta { display: flex; align-items: center; gap: 8px; }
    .teacher-section .meta-badge {
      font-size: 9px;
      font-weight: 600;
      color: #DC2626;
      background: #FEF2F2;
      border: 1px solid #FECACA;
      padding: 2px 8px;
      border-radius: 99px;
    }
    .teacher-section .meta-label { font-size: 9px; color: #9CA3AF; }

    /* SVG chart labels */
    .teacher-section .chart-x { display: flex; justify-content: space-between; padding: 0 2px; margin-top: 4px; }
    .teacher-section .chart-x-label { font-size: 8.5px; color: #9CA3AF; width: 56px; text-align: center; }
    .teacher-section .chart-legend { display: flex; gap: 14px; align-items: center; margin-top: 6px; }
    .teacher-section .leg { display: flex; align-items: center; gap: 5px; font-size: 9px; color: #9CA3AF; }
    .teacher-section .leg-dot { width: 7px; height: 7px; border-radius: 2px; flex-shrink: 0; }

    /* ── BOTTOM 2-PANEL ── */
    .teacher-section .center-bottom {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      overflow: hidden;
      border-top: 1px solid #F0F0F0;
    }

    /* Calendar panel */
    .teacher-section .cal-panel {
      padding: 14px 16px;
      border-right: 1px solid #F0F0F0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .teacher-section .cal-header { display: flex; align-items: center; justify-content: space-between; }
    .teacher-section .cal-title { font-size: 11px; font-weight: 600; color: #0A1628; }
    .teacher-section .cal-month { font-size: 9px; color: #9CA3AF; font-weight: 500; }

    /* Week strip */
    .teacher-section .week-strip { display: flex; gap: 3px; }
    .teacher-section .day-cell {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 5px 2px;
      border-radius: 6px;
      cursor: default;
    }
    .teacher-section .day-cell.today { background: #0077FF; }
    .teacher-section .day-name {
      font-size: 8px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: .04em;
    }
    .teacher-section .day-cell.today .day-name { color: rgba(255,255,255,.75); }
    .teacher-section .day-num { font-size: 11px; font-weight: 700; color: #374151; }
    .teacher-section .day-cell.today .day-num { color: #fff; }

    /* Upcoming list */
    .teacher-section .upcoming-list { display: flex; flex-direction: column; gap: 5px; }
    .teacher-section .upcoming-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 7px 9px;
      border-radius: 7px;
      border: 1px solid #F3F4F6;
      background: #FAFAFA;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity .35s cubic-bezier(.4,0,.2,1), transform .35s cubic-bezier(.4,0,.2,1);
    }
    .teacher-section .upcoming-item.show { opacity: 1; transform: translateY(0); }
    .teacher-section .upcoming-item.urgent { background: #FFF8F8; border-color: #FEE2E2; }
    .teacher-section .upcoming-body { flex: 1; min-width: 0; }
    .teacher-section .upcoming-title {
      font-size: 10px;
      font-weight: 600;
      color: #0A1628;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .teacher-section .upcoming-meta { font-size: 9px; color: #9CA3AF; margin-top: 1px; }
    .teacher-section .upcoming-badge {
      font-size: 8.5px;
      font-weight: 600;
      padding: 1px 6px;
      border-radius: 99px;
      flex-shrink: 0;
      white-space: nowrap;
      margin-top: 1px;
    }

    /* At-risk panel */
    .teacher-section .risk-panel {
      padding: 14px 14px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .teacher-section .risk-header { display: flex; align-items: center; justify-content: space-between; }
    .teacher-section .risk-title { font-size: 11px; font-weight: 600; color: #0A1628; }
    .teacher-section .risk-count {
      font-size: 9px;
      font-weight: 600;
      color: #DC2626;
      background: #FEF2F2;
      border: 1px solid #FECACA;
      padding: 1px 7px;
      border-radius: 99px;
    }
    .teacher-section .risk-card {
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid #F3F4F6;
      background: #FAFAFA;
      display: flex;
      flex-direction: column;
      gap: 5px;
      opacity: 0;
      transform: translateY(12px);
      transition: opacity .4s cubic-bezier(.4,0,.2,1), transform .4s cubic-bezier(.4,0,.2,1);
    }
    .teacher-section .risk-card.show { opacity: 1; transform: translateY(0); }
    .teacher-section .risk-card.urgent { border-color: #FEE2E2; background: #FFF9F9; }
    .teacher-section .risk-top { display: flex; align-items: center; gap: 7px; }
    .teacher-section .risk-avatar {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #F3F4F6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8.5px;
      font-weight: 700;
      color: #6B7280;
      flex-shrink: 0;
    }
    .teacher-section .risk-name-wrap { flex: 1; min-width: 0; }
    .teacher-section .risk-name {
      font-size: 10.5px;
      font-weight: 600;
      color: #0A1628;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .teacher-section .risk-course-tag {
      display: inline-block;
      font-size: 8px;
      font-weight: 600;
      color: #6366F1;
      background: #EEF2FF;
      padding: 1px 6px;
      border-radius: 4px;
      margin-top: 1px;
    }
    .teacher-section .risk-score { font-size: 12px; font-weight: 700; color: #DC2626; flex-shrink: 0; }
    .teacher-section .risk-score.y { color: #D97706; }
    .teacher-section .risk-reason { font-size: 9px; color: #9CA3AF; line-height: 1.45; padding-left: 29px; }
    .teacher-section .risk-actions { display: flex; gap: 5px; padding-left: 29px; }
    .teacher-section .risk-action-btn {
      font-size: 8.5px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      background: #F3F4F6;
      color: #374151;
      transition: background 150ms;
    }
    .teacher-section .risk-action-btn:hover { background: #E5E7EB; }
    .teacher-section .risk-action-btn.primary { background: #0077FF; color: #fff; }
    .teacher-section .risk-action-btn.primary:hover { background: #005FCC; }

    /* ── AI PANEL ── */
    .teacher-section .dash-ai {
      display: flex;
      flex-direction: column;
      background: #FAFAFA;
      overflow: hidden;
    }
    .teacher-section .ai-chrome {
      padding: 11px 14px;
      border-bottom: 1px solid #EAECF0;
      display: flex;
      align-items: center;
      gap: 7px;
      background: #fff;
      flex-shrink: 0;
    }
    .teacher-section .ai-chrome-title { font-size: 12px; font-weight: 600; color: #0A1628; }
    .teacher-section .ai-online-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10B981;
      animation: teacher-pulse-g 2.4s ease-in-out infinite;
    }
    .teacher-section .ai-body {
      flex: 1;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
    }
    .teacher-section .bubble-user {
      align-self: flex-end;
      max-width: 92%;
      background: #0077FF;
      color: #fff;
      padding: 7px 11px;
      border-radius: 12px;
      border-bottom-right-radius: 3px;
      font-size: 10.5px;
      line-height: 1.5;
    }
    .teacher-section .memory-pill {
      align-self: center;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      border: 1px solid #E5E7EB;
      border-radius: 99px;
      padding: 4px 10px;
      font-size: 9px;
      font-weight: 500;
      color: #6B7280;
      background: #fff;
    }
    .teacher-section .bubble-ai {
      align-self: flex-start;
      max-width: 97%;
      background: #fff;
      border: 1px solid #E9EAEC;
      padding: 9px 11px;
      border-radius: 12px;
      border-bottom-left-radius: 3px;
      font-size: 10px;
      line-height: 1.7;
      color: #374151;
    }
    .teacher-section .ai-student { font-weight: 700; color: #0A1628; }
    .teacher-section .ai-pct { font-size: 9px; font-weight: 700; margin-left: 2px; }
    .teacher-section .ai-pct.r { color: #DC2626; }
    .teacher-section .ai-pct.y { color: #D97706; }
    .teacher-section .insight-strip {
      flex-shrink: 0;
      padding: 10px 14px;
      background: #fff;
      border-top: 1px solid #EAECF0;
      border-left: 2px solid #10B981;
    }
    .teacher-section .insight-label {
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: #9CA3AF;
      margin-bottom: 3px;
    }
    .teacher-section .insight-text { font-size: 9.5px; color: #374151; line-height: 1.55; }
    .teacher-section .ai-foot {
      padding: 10px 12px;
      flex-shrink: 0;
      background: #fff;
      border-top: 1px solid #EAECF0;
    }
    .teacher-section .ai-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      background: #0077FF;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 8px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: background 180ms, transform 150ms;
    }
    .teacher-section .ai-btn:hover { background: #005FCC; transform: translateY(-1px); }

    /* ══ FLOAT CARDS ══ */
    .teacher-section .float-card {
      position: absolute;
      z-index: 10;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,.09), 0 1px 3px rgba(0,0,0,.05);
      border: 1px solid #EAECF0;
      padding: 12px 14px;
      max-width: 206px;
      opacity: 0;
      transform: scale(0.84) translateY(10px);
      pointer-events: none;
    }
    .teacher-section .float-card.show {
      animation: teacher-pop .52s cubic-bezier(.16,1,.3,1) forwards;
      pointer-events: auto;
    }
    @keyframes teacher-pop {
      0%   { opacity: 0; transform: scale(0.84) translateY(10px); }
      65%  { transform: scale(1.03) translateY(-3px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    .teacher-section .float-card::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #CBD5E1;
      border: 2px solid #fff;
      box-shadow: 0 0 0 1px #CBD5E1;
    }
    .teacher-section .ftop { width: 18px; height: 2px; background: #0A1628; border-radius: 99px; margin-bottom: 9px; }
    .teacher-section .float-title { font-size: 11px; font-weight: 700; color: #0A1628; margin-bottom: 4px; line-height: 1.3; }
    .teacher-section .float-body { font-size: 10px; color: #6B7280; line-height: 1.55; }
    .teacher-section .fc-ai { top: -30px; right: -46px; }
    .teacher-section .fc-ai::before { bottom: -5px; left: 18px; }
    .teacher-section .fc-mastery { bottom: -30px; left: -46px; }
    .teacher-section .fc-mastery::before { top: -5px; right: 18px; }
    .teacher-section .fc-grade { bottom: -30px; right: -46px; }
    .teacher-section .fc-grade::before { top: -5px; left: 18px; }

    /* ══ RESPONSIVE ══ */
    @media (max-width: 880px) {
      .teacher-section .browser-wrap { margin: 0; }
      .teacher-section .float-card { display: none; }
      .teacher-section .dashboard { grid-template-columns: 1fr; height: auto; }
      .teacher-section .dash-sidebar,
      .teacher-section .dash-ai { display: none; }
      .teacher-section .center-bottom { grid-template-columns: 1fr; height: auto; }
    }

    /* ══ FEATURE POINTS ══ */
    .teacher-section .feature-points {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-top: 48px;
    }
    .teacher-section .feature-point {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .teacher-section .feature-point-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: #EFF6FF;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .teacher-section .feature-point-icon svg {
      width: 20px;
      height: 20px;
      color: #0077FF;
    }
    .teacher-section .feature-point-text {
      font-size: 14px;
      color: #4B5563;
      line-height: 1.6;
    }
    @media (max-width: 640px) {
      .teacher-section .feature-points {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
`;

const TEACHER_HTML = `
    <div class="section-inner">
      <div class="section-header">
        <h2 class="section-title">AI-Powered Teaching Tools</h2>
        <p class="section-subtitle">Intelligent features built for faculty, so you can focus on teaching — not admin.</p>
      </div>

      <div class="browser-wrap">
        <div class="float-card fc-ai" data-fc="1">
          <div class="ftop"></div>
          <div class="float-title">AI Assistant That Knows Your Classes</div>
          <div class="float-body">Ask Hero about any student or course in plain English. It pulls live analytics.</div>
        </div>
        <div class="float-card fc-mastery" data-fc="2">
          <div class="ftop"></div>
          <div class="float-title">See Who's Struggling Before It's Too Late</div>
          <div class="float-body">Real-time mastery tracking with at-risk detection across every course.</div>
        </div>
        <div class="float-card fc-grade" data-fc="3">
          <div class="ftop"></div>
          <div class="float-title">Auto-Grade With AI Feedback</div>
          <div class="float-body">AI evaluates responses and maps performance to learning outcomes instantly.</div>
        </div>

        <div class="browser">
          <div class="browser-chrome">
            <div class="browser-dots">
              <div class="browser-dot"></div><div class="browser-dot"></div><div class="browser-dot"></div>
            </div>
            <div class="browser-url">mentron.app/dashboard/hero</div>
            <div></div>
          </div>

          <div class="dashboard">

            <!-- Sidebar -->
            <div class="dash-sidebar">
              <span class="sidebar-wordmark">mentron</span>
              <div class="sidebar-section-label">Workspace</div>
              <div class="sidebar-nav-item active">Dashboard</div>
              <div class="sidebar-nav-item">Courses</div>
              <div class="sidebar-nav-item">Students</div>
              <div class="sidebar-nav-item">Assignments</div>
              <div class="sidebar-nav-item">Analytics</div>
              <div class="sidebar-divider"></div>
              <div class="sidebar-section-label">My Courses</div>
              <div class="sidebar-course">Data Structures</div>
              <div class="sidebar-course">Algorithms</div>
              <div class="sidebar-course">DBMS</div>
              <div class="sidebar-hero"><div class="hero-dot"></div>Hero AI</div>
            </div>

            <!-- Center -->
            <div class="dash-center">

              <!-- Chart -->
              <div class="center-chart">
                <div class="panel-header">
                  <span class="panel-title">Class Mastery — Data Structures (Unit 3)</span>
                  <div class="panel-meta">
                    <span class="meta-badge">4 at-risk</span>
                    <span class="meta-label">Updated just now</span>
                  </div>
                </div>

                <svg width="100%" height="64" viewBox="0 0 480 64" preserveAspectRatio="none">
                  <line x1="0" y1="0"  x2="480" y2="0"  stroke="#F3F4F6" stroke-width="1"/>
                  <line x1="0" y1="21" x2="480" y2="21" stroke="#F3F4F6" stroke-width="1"/>
                  <line x1="0" y1="42" x2="480" y2="42" stroke="#F3F4F6" stroke-width="1"/>
                  <line x1="0" y1="63" x2="480" y2="63" stroke="#EAECF0" stroke-width="1"/>
                  <text x="2" y="9"  font-size="8" fill="#D1D5DB" font-family="Inter,sans-serif">100%</text>
                  <text x="2" y="30" font-size="8" fill="#D1D5DB" font-family="Inter,sans-serif">50%</text>
                  <!-- Arrays -->
                  <rect class="bar-el" data-h="6"  data-y="57" x="38"  y="63" width="11" height="0" fill="#EF4444" rx="2"/>
                  <rect class="bar-el" data-h="25" data-y="38" x="51"  y="63" width="11" height="0" fill="#F59E0B" rx="2"/>
                  <rect class="bar-el" data-h="50" data-y="13" x="64"  y="63" width="11" height="0" fill="#10B981" rx="2"/>
                  <!-- Linked Lists -->
                  <rect class="bar-el" data-h="4"  data-y="59" x="110" y="63" width="11" height="0" fill="#EF4444" rx="2"/>
                  <rect class="bar-el" data-h="21" data-y="42" x="123" y="63" width="11" height="0" fill="#F59E0B" rx="2"/>
                  <rect class="bar-el" data-h="56" data-y="7"  x="136" y="63" width="11" height="0" fill="#10B981" rx="2"/>
                  <!-- Trees -->
                  <rect x="176" y="2" width="52" height="61" fill="rgba(239,68,68,.04)" rx="3"/>
                  <rect class="bar-el" data-h="14" data-y="49" x="182" y="63" width="11" height="0" fill="#EF4444" rx="2"/>
                  <rect class="bar-el" data-h="28" data-y="35" x="195" y="63" width="11" height="0" fill="#F59E0B" rx="2"/>
                  <rect class="bar-el" data-h="37" data-y="26" x="208" y="63" width="11" height="0" fill="#10B981" rx="2"/>
                  <!-- Graphs -->
                  <rect class="bar-el" data-h="7"  data-y="56" x="254" y="63" width="11" height="0" fill="#EF4444" rx="2"/>
                  <rect class="bar-el" data-h="23" data-y="40" x="267" y="63" width="11" height="0" fill="#F59E0B" rx="2"/>
                  <rect class="bar-el" data-h="48" data-y="15" x="280" y="63" width="11" height="0" fill="#10B981" rx="2"/>
                  <!-- Hashing -->
                  <rect class="bar-el" data-h="5"  data-y="58" x="326" y="63" width="11" height="0" fill="#EF4444" rx="2"/>
                  <rect class="bar-el" data-h="19" data-y="44" x="339" y="63" width="11" height="0" fill="#F59E0B" rx="2"/>
                  <rect class="bar-el" data-h="54" data-y="9"  x="352" y="63" width="11" height="0" fill="#10B981" rx="2"/>
                  <!-- DP -->
                  <rect class="bar-el" data-h="18" data-y="45" x="398" y="63" width="11" height="0" fill="#EF4444" rx="2"/>
                  <rect class="bar-el" data-h="31" data-y="32" x="411" y="63" width="11" height="0" fill="#F59E0B" rx="2"/>
                  <rect class="bar-el" data-h="25" data-y="38" x="424" y="63" width="11" height="0" fill="#10B981" rx="2"/>
                </svg>
                <div class="chart-x">
                  <span class="chart-x-label">Arrays</span>
                  <span class="chart-x-label">Linked Lists</span>
                  <span class="chart-x-label" style="color:#DC2626;font-weight:600">Trees ✦</span>
                  <span class="chart-x-label">Graphs</span>
                  <span class="chart-x-label">Hashing</span>
                  <span class="chart-x-label">DP</span>
                </div>
                <div class="chart-legend">
                  <div class="leg"><div class="leg-dot" style="background:#EF4444"></div>Weak</div>
                  <div class="leg"><div class="leg-dot" style="background:#F59E0B"></div>Developing</div>
                  <div class="leg"><div class="leg-dot" style="background:#10B981"></div>Mastered</div>
                  <div style="margin-left:auto;font-size:9px;color:#C4C9D4">18 students · Sem 3</div>
                </div>
              </div>

              <!-- Bottom 2-col -->
              <div class="center-bottom">

                <!-- Calendar + Deadlines -->
                <div class="cal-panel">
                  <div class="cal-header">
                    <span class="cal-title">Week Overview</span>
                    <span class="cal-month">May 2026</span>
                  </div>
                  <div class="week-strip">
                    <div class="day-cell"><span class="day-name">M</span><span class="day-num">28</span></div>
                    <div class="day-cell"><span class="day-name">T</span><span class="day-num">29</span></div>
                    <div class="day-cell today"><span class="day-name">W</span><span class="day-num">30</span></div>
                    <div class="day-cell"><span class="day-name">T</span><span class="day-num">31</span></div>
                    <div class="day-cell"><span class="day-name">F</span><span class="day-num">1</span></div>
                    <div class="day-cell"><span class="day-name">S</span><span class="day-num">2</span></div>
                    <div class="day-cell"><span class="day-name">S</span><span class="day-num">3</span></div>
                  </div>
                  <div class="upcoming-list">
                    <div class="upcoming-item urgent">
                      <div class="upcoming-body">
                        <div class="upcoming-title">Assignment 4 · Data Structures</div>
                        <div class="upcoming-meta">Due today · 6 submissions pending</div>
                      </div>
                      <span class="upcoming-badge" style="color:#DC2626;background:#FEF2F2;border:1px solid #FECACA">Today</span>
                    </div>
                    <div class="upcoming-item">
                      <div class="upcoming-body">
                        <div class="upcoming-title">Quiz 5 · Algorithms</div>
                        <div class="upcoming-meta">Due Thu 31 · Not published yet</div>
                      </div>
                      <span class="upcoming-badge" style="color:#6366F1;background:#EEF2FF;border:1px solid #C7D2FE">Draft</span>
                    </div>
                    <div class="upcoming-item">
                      <div class="upcoming-body">
                        <div class="upcoming-title">Mid-Sem Paper · DBMS</div>
                        <div class="upcoming-meta">Due Fri 1 · 22 yet to submit</div>
                      </div>
                      <span class="upcoming-badge" style="color:#D97706;background:#FFFBEB;border:1px solid #FDE68A">Fri</span>
                    </div>
                    <div class="upcoming-item">
                      <div class="upcoming-body">
                        <div class="upcoming-title">Unit 2 Quiz · Data Structures</div>
                        <div class="upcoming-meta">Graded · Avg 71% · ✓ Done</div>
                      </div>
                      <span class="upcoming-badge" style="color:#059669;background:#F0FDF4;border:1px solid #BBF7D0">Done</span>
                    </div>
                  </div>
                </div>

                <!-- At-risk triage -->
                <div class="risk-panel">
                  <div class="risk-header">
                    <span class="risk-title">Needs Attention</span>
                    <span class="risk-count">3 students</span>
                  </div>
                  <div class="risk-card urgent">
                    <div class="risk-top">
                      <div class="risk-avatar">A</div>
                      <div class="risk-name-wrap">
                        <div class="risk-name">Arjun Menon</div>
                        <span class="risk-course-tag">Data Structures</span>
                      </div>
                      <span class="risk-score">28%</span>
                    </div>
                    <div class="risk-reason">Missed 2 quizzes · Weak on Trees & DP · No activity in 5 days</div>
                    <div class="risk-actions">
                      <button class="risk-action-btn primary">Assign Quiz</button>
                      <button class="risk-action-btn">Message</button>
                    </div>
                  </div>
                  <div class="risk-card urgent">
                    <div class="risk-top">
                      <div class="risk-avatar">R</div>
                      <div class="risk-name-wrap">
                        <div class="risk-name">Rahul Krishnan</div>
                        <span class="risk-course-tag">Data Structures</span>
                      </div>
                      <span class="risk-score">35%</span>
                    </div>
                    <div class="risk-reason">Submitted Assignment 4 late · CO3 missed · Dropping trend</div>
                    <div class="risk-actions">
                      <button class="risk-action-btn primary">Assign Quiz</button>
                      <button class="risk-action-btn">Message</button>
                    </div>
                  </div>
                  <div class="risk-card">
                    <div class="risk-top">
                      <div class="risk-avatar">P</div>
                      <div class="risk-name-wrap">
                        <div class="risk-name">Priya Shankar</div>
                        <span class="risk-course-tag">Algorithms</span>
                      </div>
                      <span class="risk-score y">42%</span>
                    </div>
                    <div class="risk-reason">Struggling with recursion · CO2 & CO3 gaps · Slowly improving</div>
                    <div class="risk-actions">
                      <button class="risk-action-btn primary">Assign Quiz</button>
                      <button class="risk-action-btn">Message</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- AI Panel -->
            <div class="dash-ai">
              <div class="ai-chrome">
                <div class="ai-online-dot"></div>
                <span class="ai-chrome-title">Hero AI</span>
              </div>
              <div class="ai-body">
                <div class="bubble-user">Which students are struggling in Unit 3?</div>
                <div class="memory-pill">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                  Memory: Unit 3 — 3 students below 45%
                </div>
                <div class="bubble-ai">
                  <span class="ai-student">3 students</span> showing weak mastery in <strong>Unit 3 (Trees)</strong>:<br><br>
                  <span class="ai-student">Arjun M.</span><span class="ai-pct r"> 28%</span><br>
                  <span class="ai-student">Rahul K.</span><span class="ai-pct r"> 35%</span><br>
                  <span class="ai-student">Priya S.</span><span class="ai-pct y"> 42%</span><br><br>
                  Common gap: <strong>recursive backtracking</strong> — all three missed CO3. Want targeted quizzes?
                </div>
              </div>
              <div class="insight-strip">
                <div class="insight-label">Hero Insight</div>
                <div class="insight-text">Arjun hasn't opened any materials in 5 days. Consider a check-in before the next quiz.</div>
              </div>
              <div class="ai-foot">
                <button class="ai-btn">
                  <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
                  Generate targeted quizzes
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="feature-points">
        <div class="feature-point">
          <div class="feature-point-icon">
            <svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
          </div>
          <div class="feature-point-text">One-click generation from any document or topic with AI-powered structuring</div>
        </div>
        <div class="feature-point">
          <div class="feature-point-icon">
            <svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="14.1" y1="9.7" x2="17.5" y2="6.3"/><line x1="9.9" y1="9.7" x2="6.5" y2="6.3"/><line x1="9.9" y1="14.3" x2="6.5" y2="17.7"/><line x1="14.1" y1="14.3" x2="17.5" y2="17.7"/></svg>
          </div>
          <div class="feature-point-text">Interactive drag, zoom, and expand nodes to explore complex topics visually</div>
        </div>
        <div class="feature-point">
          <div class="feature-point-icon">
            <svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </div>
          <div class="feature-point-text">Export as high-res images or PDF for offline revision and sharing</div>
        </div>
      </div>
    </div>
`;

export default function WhyMentron() {
  const containerRef = useRef<HTMLElement>(null);
  const triggerStream = useTextStream({ selector: '.bubble-ai', lineDelay: 130, startDelay: 800 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let barDone = false;
    let floatDone = false;
    let riskDone = false;
    let upcomingDone = false;

    // Bar chart animation
    const bars = container.querySelectorAll('.bar-el');
    function animateBars() {
      if (barDone) return;
      barDone = true;
      bars.forEach((el, i) => {
        const h = el.getAttribute('data-h');
        const y = el.getAttribute('data-y');
        if (h === null || y === null) return;
        setTimeout(() => {
          (el as SVGElement).style.transition = `y .6s cubic-bezier(.4,0,.2,1) ${i * .025}s, height .6s cubic-bezier(.4,0,.2,1) ${i * .025}s`;
          el.setAttribute('y', y);
          el.setAttribute('height', h);
        }, 100 + i * 25);
      });
    }

    // Floating card popup
    const floatCards = container.querySelectorAll('.float-card');
    function animateFloats() {
      if (floatDone) return;
      floatDone = true;
      floatCards.forEach((el, i) => {
        setTimeout(() => { el.classList.add('show'); }, 180 + i * 220);
      });
    }

    // Risk cards staggered entrance
    const riskCards = container.querySelectorAll('.risk-card');
    function animateRiskCards() {
      if (riskDone) return;
      riskDone = true;
      riskCards.forEach((el, i) => {
        setTimeout(() => { el.classList.add('show'); }, 400 + i * 120);
      });
    }

    // Upcoming items staggered entrance
    const upcomingItems = container.querySelectorAll('.upcoming-item');
    function animateUpcoming() {
      if (upcomingDone) return;
      upcomingDone = true;
      upcomingItems.forEach((el, i) => {
        setTimeout(() => { el.classList.add('show'); }, 600 + i * 100);
      });
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateBars();
          animateFloats();
          animateRiskCards();
          animateUpcoming();
          // AI text stream starts after cards have appeared
          triggerStream(container);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(container);

    return () => {
      obs.disconnect();
    };
  }, [triggerStream]);

  return (
    <section className="teacher-section" ref={containerRef}>
      <style>{TEACHER_CSS}</style>
      <div dangerouslySetInnerHTML={{ __html: TEACHER_HTML }} />
    </section>
  );
}
