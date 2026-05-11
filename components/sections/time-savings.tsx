'use client';

import { useEffect, useRef } from 'react';

const CHART_CSS = `
    .time-chart {  }
    .time-chart .tabular-nums { font-feature-settings: "tnum"; font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }

    .time-chart .chart-card {
      background: #fff;
      border: 1px solid #e5edf5;
      border-radius: 8px;
      box-shadow: 0 15px 35px rgba(50,50,93,0.05), 0 5px 15px rgba(0,0,0,0.02);
      overflow: hidden;
    }

    .time-chart .card-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 24px 16px;
    }
    .time-chart .card-title { font-size: 14px; font-weight: 500; color: #1a2c44; }

    .time-chart .toggle-group { display: flex; gap: 6px; }
    .time-chart .toggle-btn {
      padding: 4px 8px; border: 1px solid #e5edf5; border-radius: 4px;
      font-size: 10px; font-weight: 500; color: #50617a;
      cursor: pointer; background: none; transition: all 0.15s ease;
    }
    .time-chart .toggle-btn.active {
      border-color: #10b981; color: #10b981; background: rgba(16,185,129,0.05);
    }

    .time-chart .chart-area {
      display: flex; gap: 10px; padding: 0 24px 0 20px; position: relative;
    }
    .time-chart .y-axis {
      display: flex; flex-direction: column; justify-content: space-between;
      padding-bottom: 28px; color: #64748d; font-size: 10px;
      text-align: right; white-space: nowrap; min-width: 28px;
    }
    .time-chart .plot-stage {
      flex: 1; position: relative; height: 260px; border-left: 1px solid #e5edf5;
    }
    .time-chart .grid-lines {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      display: flex; flex-direction: column; justify-content: space-between;
      pointer-events: none; z-index: 0;
    }
    .time-chart .grid-line { width: 100%; height: 1px; background: #e5edf5; }

    .time-chart .bar-groups {
      position: absolute; bottom: 28px; left: 0; width: 100%;
      height: calc(100% - 28px);
      display: flex; align-items: flex-end; justify-content: space-around;
      z-index: 1; padding: 0 8px;
    }
    .time-chart .bar-group {
      display: flex; flex-direction: column; align-items: center; gap: 0; flex: 1;
    }
    .time-chart .bar-delta {
      font-size: 9px; font-weight: 600; color: #10b981;
      margin-bottom: 3px; opacity: 0; transform: translateY(4px);
      transition: opacity 0.3s ease 1s, transform 0.3s ease 1s;
      height: 12px; white-space: nowrap;
    }
    .time-chart .bar-group.animated .bar-delta { opacity: 1; transform: translateY(0); }
    .time-chart .bar-pair {
      display: flex; align-items: flex-end; gap: 2px; width: 100%; justify-content: center;
    }
    .time-chart .bar {
      width: 24px; border-radius: 3px 3px 0 0; height: 0;
      transition: height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .time-chart .bar-before { background: #EF4444; }
    .time-chart .bar-after  { background: #10b981; }
    .time-chart .bar-group.highlight .bar-before { background: #fca5a5; }

    .time-chart .x-labels {
      position: absolute; bottom: 0; left: 0; width: 100%;
      display: flex; justify-content: space-around; padding: 0 8px;
    }
    .time-chart .x-label {
      flex: 1; text-align: center; font-size: 10px; color: #64748d; padding-top: 6px;
    }

    .time-chart .legend {
      display: flex; gap: 16px; padding: 16px 24px 20px 58px;
    }
    .time-chart .legend-item {
      display: flex; align-items: center; gap: 6px; font-size: 11px; color: #64748d;
    }
    .time-chart .legend-color { border-radius: 2px; min-width: 8px; min-height: 8px; }

    .time-chart .stat-strip {
      border-top: 1px solid #e5edf5; display: grid; grid-template-columns: repeat(4, 1fr);
    }
    .time-chart .stat-pill {
      padding: 16px 20px; border-right: 1px solid #e5edf5;
    }
    .time-chart .stat-pill:last-child { border-right: none; }
    .time-chart .stat-header {
      display: flex; align-items: center; gap: 6px;
      color: #64748d; font-size: 10px; font-weight: 400; margin-bottom: 4px;
    }
    .time-chart .stat-dot { border-radius: 2px; min-width: 8px; min-height: 8px; }
    .time-chart .stat-val { font-size: 18px; font-weight: 500; color: #061b31; }
    .time-chart .stat-badge {
      display: inline-flex; align-items: center;
      padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 500; margin-top: 4px;
    }
    .time-chart .badge-green { background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.3); color: #059669; }
    .time-chart .badge-red   { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); color: #dc2626; }

    .time-chart .bar-before.hidden, .time-chart .bar-after.hidden { display: none; }

    .time-chart .disclaimer {
      font-size: 10px; color: #94a3b8; text-align: center; padding: 14px 0 0;
    }

    @media (max-width: 640px) {
      .time-chart .stat-strip { grid-template-columns: repeat(2, 1fr); }
      .time-chart .stat-pill:nth-child(2) { border-right: none; }
      .time-chart .bar { width: 12px; }
      .time-chart .toggle-group { display: none; }
      .time-chart .card-header { padding: 16px 16px 12px; }
      .time-chart .chart-area { padding: 0 16px 0 12px; }
      .time-chart .legend { padding: 12px 16px 16px 44px; }
      .time-chart .stat-pill { padding: 12px 16px; }
    }
`;

const CHART_HTML = `
  <div class="time-chart">
    <div class="chart-card" id="chartCard">
      <div class="card-header">
        <div class="card-title">Weekly Hours Breakdown</div>
        <div class="toggle-group" id="toggleGroup">
          <button class="toggle-btn active" data-mode="both">Before &amp; After</button>
          <button class="toggle-btn" data-mode="before">Before</button>
          <button class="toggle-btn" data-mode="after">After</button>
        </div>
      </div>

      <div class="chart-area">
        <div class="y-axis tabular-nums">
          <div>30h</div><div>25h</div><div>20h</div><div>15h</div><div>10h</div><div>5h</div><div>0</div>
        </div>
        <div class="plot-stage" id="plotStage">
          <div class="grid-lines">
            <div class="grid-line"></div><div class="grid-line"></div><div class="grid-line"></div>
            <div class="grid-line"></div><div class="grid-line"></div><div class="grid-line"></div>
            <div class="grid-line"></div>
          </div>
          <div class="bar-groups" id="barGroups"></div>
          <div class="x-labels" id="xLabels"></div>
        </div>
      </div>

      <div class="legend" id="legend">
        <div class="legend-item" id="leg-before">
          <div class="legend-color" style="background:#EF4444;"></div>
          <span>Before Mentron</span>
        </div>
        <div class="legend-item" id="leg-after">
          <div class="legend-color" style="background:#10b981;"></div>
          <span>With Mentron</span>
        </div>
      </div>

      <div class="stat-strip">
        <div class="stat-pill">
          <div class="stat-header">
            <div class="stat-dot" style="background:#EF4444;"></div>
            Grading saved
          </div>
          <div class="stat-val tabular-nums">−9.6h</div>
          <div class="stat-badge badge-green">↓ 83% / week</div>
        </div>
        <div class="stat-pill">
          <div class="stat-header">
            <div class="stat-dot" style="background:#EF4444;"></div>
            Admin saved
          </div>
          <div class="stat-val tabular-nums">−7h</div>
          <div class="stat-badge badge-green">↓ 82% / week</div>
        </div>
        <div class="stat-pill">
          <div class="stat-header">
            <div class="stat-dot" style="background:#10b981;"></div>
            Teaching time
          </div>
          <div class="stat-val tabular-nums">+5.6h</div>
          <div class="stat-badge badge-green">↑ 25% / week</div>
        </div>
        <div class="stat-pill">
          <div class="stat-header">
            <div class="stat-dot" style="background:#64748d;"></div>
            Hours freed
          </div>
          <div class="stat-val tabular-nums">28h</div>
          <div class="stat-badge badge-red">56h before</div>
        </div>
      </div>
    </div>

    <p class="disclaimer">* Projected savings based on automated grading, AI planning tools, and admin workflows.</p>
  </div>
`;

export default function TimeSavings() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current!;
    if (!container) return;

    const MAX_H = 30;
    const PLOT_H = 220;

    const DATA = [
      { label: 'Grading', before: 11.6, after: 2.0, highlight: false, delta: '−83%' },
      { label: 'Planning', before: 9.7, after: 3.8, highlight: false, delta: '−61%' },
      { label: 'Admin', before: 8.5, after: 1.5, highlight: false, delta: '−82%' },
      { label: 'Comm.', before: 4.2, after: 1.2, highlight: false, delta: '−71%' },
      { label: 'Teaching', before: 22.4, after: 28.0, highlight: true, delta: '+25%' },
      { label: 'Collab.', before: 4.0, after: 6.0, highlight: false, delta: '+50%' },
    ];

    let mode = 'both';
    const barGroupsEl = container.querySelector('#barGroups') as HTMLDivElement;
    const xLabelsEl = container.querySelector('#xLabels') as HTMLDivElement;

    function hToPx(h: number) { return Math.round((h / MAX_H) * PLOT_H); }

    function buildChart() {
      barGroupsEl.innerHTML = '';
      xLabelsEl.innerHTML = '';

      const showBefore = mode !== 'after';
      const showAfter = mode !== 'before';

      DATA.forEach((d) => {
        const group = document.createElement('div');
        group.className = 'bar-group' + (d.highlight ? ' highlight' : '');

        const deltaEl = document.createElement('div');
        deltaEl.className = 'bar-delta';
        deltaEl.textContent = (mode === 'both') ? d.delta : '';
        group.appendChild(deltaEl);

        const pair = document.createElement('div');
        pair.className = 'bar-pair';

        if (showBefore) {
          const b = document.createElement('div');
          b.className = 'bar bar-before';
          b.dataset.h = String(hToPx(d.before));
          pair.appendChild(b);
        }
        if (showAfter) {
          const a = document.createElement('div');
          a.className = 'bar bar-after';
          a.dataset.h = String(hToPx(d.after));
          pair.appendChild(a);
        }

        group.appendChild(pair);
        barGroupsEl.appendChild(group);

        const xl = document.createElement('div');
        xl.className = 'x-label';
        xl.textContent = d.label;
        xLabelsEl.appendChild(xl);
      });

      (container.querySelector('#leg-before') as HTMLElement).style.display = showBefore ? 'flex' : 'none';
      (container.querySelector('#leg-after') as HTMLElement).style.display = showAfter ? 'flex' : 'none';
    }

    function animate() {
      const groups = container.querySelectorAll('.bar-group');
      groups.forEach((g, i) => {
        g.classList.remove('animated');
        g.querySelectorAll('.bar').forEach(b => { (b as HTMLElement).style.height = '0px'; });

        setTimeout(() => {
          g.querySelectorAll('.bar').forEach(b => {
            (b as HTMLElement).style.height = (b as HTMLElement).dataset.h + 'px';
          });
          g.classList.add('animated');
        }, 60 + i * 80);
      });
    }

    const toggleGroup = container.querySelector('#toggleGroup');
    if (toggleGroup) {
      toggleGroup.addEventListener('click', (e) => {
        const btn = (e.target as HTMLElement).closest('.toggle-btn') as HTMLElement;
        if (!btn) return;
        container.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mode = btn.dataset.mode || 'both';
        buildChart();
        requestAnimationFrame(() => requestAnimationFrame(animate));
      });
    }

    const chartCard = container.querySelector('#chartCard');
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animate();
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    buildChart();
    if (chartCard) observer.observe(chartCard);

    return () => { observer.disconnect(); };
  }, []);

  return (
    <section id="time-savings" className="pt-8 pb-10 px-6 lg:px-8 bg-[#F8F7F5]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            Reclaim Your Week
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-xl">
            Stop spending Sundays on grading. See where your time goes — and where it comes back.
          </p>
        </div>

        <div ref={containerRef} className="max-w-3xl mx-auto">
          <style>{CHART_CSS}</style>
          <div dangerouslySetInnerHTML={{ __html: CHART_HTML }} />
        </div>
      </div>
    </section>
  );
}
