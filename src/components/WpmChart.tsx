import React, { useState } from 'react';
import { TimePoint } from '../types';

interface WpmChartProps {
  timePoints: TimePoint[];
  duration: number;
}

export const WpmChart: React.FC<WpmChartProps> = ({ timePoints, duration = 60 }) => {
  const [hoveredPoint, setHoveredPoint] = useState<TimePoint | null>(null);

  // If timePoints is sparse, ensure we have initial and end points
  const points = [...timePoints];
  if (points.length === 0) {
    points.push({ second: 0, wpm: 0, rawWpm: 0, errors: 0, modifications: 0, msc: 0 });
  }

  // Y-axis max scale: at least 200, up to 400
  const maxRecordedWpm = Math.max(...points.map((p) => p.wpm), 60);
  const yMax = maxRecordedWpm > 300 ? 400 : maxRecordedWpm > 200 ? 300 : maxRecordedWpm > 100 ? 200 : 120;
  const yTicks = yMax === 400 ? [0, 100, 200, 300, 400] : yMax === 300 ? [0, 100, 200, 300] : [0, 50, 100, 150, 200];

  // X ticks: 0, 4, 9, 13, 18, 23, 27, 32, 36, 41, 46, 50, 55, 59
  const xTicks = duration === 60
    ? [0, 4, 9, 13, 18, 23, 27, 32, 36, 41, 46, 50, 55, 59]
    : [0, Math.round(duration * 0.2), Math.round(duration * 0.4), Math.round(duration * 0.6), Math.round(duration * 0.8), duration];

  // SVG dimensions
  const svgWidth = 900;
  const svgHeight = 280;
  const padding = { top: 20, right: 30, bottom: 40, left: 45 };

  const innerWidth = svgWidth - padding.left - padding.right;
  const innerHeight = svgHeight - padding.top - padding.bottom;

  const getX = (sec: number) => padding.left + (sec / duration) * innerWidth;
  const getY = (val: number) => padding.top + innerHeight - (Math.min(val, yMax) / yMax) * innerHeight;

  // Build SVG path for WPM smooth line
  let pathD = "";
  if (points.length > 0) {
    pathD = `M ${getX(points[0].second)} ${getY(points[0].wpm)}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const prevX = getX(prev.second);
      const prevY = getY(prev.wpm);
      const currX = getX(curr.second);
      const currY = getY(curr.wpm);
      const cp1x = prevX + (currX - prevX) / 2;
      const cp1y = prevY;
      const cp2x = prevX + (currX - prevX) / 2;
      const cp2y = currY;
      pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currX} ${currY}`;
    }
  }

  // Filled area path
  const areaD = pathD
    ? `${pathD} L ${getX(points[points.length - 1].second)} ${padding.top + innerHeight} L ${getX(points[0].second)} ${padding.top + innerHeight} Z`
    : "";

  return (
    <div className="w-full relative select-none">
      {/* Chart Header & Legend matching screenshot 161331 */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 mb-2 px-1">
        <span className="font-semibold text-slate-400 uppercase text-[11px] tracking-wider">
          WORDS PER MINUTE
        </span>

        <div className="flex items-center space-x-4 text-[11px] font-medium">
          <span className="flex items-center gap-1.5 text-purple-700">
            <span className="w-3 h-3 rounded-full bg-purple-600 inline-block" />
            WPM
          </span>
          <span className="flex items-center gap-1.5 text-rose-600">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            Error
          </span>
          <span className="flex items-center gap-1.5 text-amber-600">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            Modifications
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            ms/c
          </span>
        </div>
      </div>

      {/* SVG Viewport */}
      <div className="relative w-full overflow-hidden bg-white/40 rounded-xl border border-slate-100 p-2">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid horizontal lines */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + innerWidth}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 12}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#94a3b8"
                  fontFamily="sans-serif"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* X-axis ticks */}
          {xTicks.map((tick) => {
            const x = getX(tick);
            return (
              <text
                key={tick}
                x={x}
                y={padding.top + innerHeight + 20}
                textAnchor="middle"
                fontSize="11"
                fill="#94a3b8"
                fontFamily="sans-serif"
              >
                {tick}
              </text>
            );
          })}

          {/* Area fill under curve */}
          {areaD && <path d={areaD} fill="url(#wpmGradient)" />}

          {/* Main WPM line curve */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#7c3aed"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Error dots (red) */}
          {points.map((p, idx) => {
            if (p.errors <= 0) return null;
            const x = getX(p.second);
            // Place red dots slightly above or around the curve
            const y = getY(Math.max(10, p.wpm + (idx % 2 === 0 ? 15 : -10)));
            return (
              <circle
                key={`err-${idx}`}
                cx={x}
                cy={y}
                r="4.5"
                fill="#ef4444"
                stroke="#ffffff"
                strokeWidth="1.5"
                className="transition-all hover:scale-125 cursor-pointer"
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}

          {/* Modifications dots (orange) */}
          {points.map((p, idx) => {
            if (p.modifications <= 0) return null;
            const x = getX(p.second);
            const y = getY(Math.max(15, p.wpm - 20));
            return (
              <circle
                key={`mod-${idx}`}
                cx={x}
                cy={y}
                r="4"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="1.5"
                className="transition-all hover:scale-125 cursor-pointer"
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}

          {/* Interactive points on WPM line */}
          {points.map((p, idx) => {
            const x = getX(p.second);
            const y = getY(p.wpm);
            return (
              <circle
                key={`pt-${idx}`}
                cx={x}
                cy={y}
                r="3.5"
                fill="#7c3aed"
                className="hover:r-5 transition-all cursor-pointer"
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-xs text-white px-3 py-2 rounded-lg text-xs shadow-xl border border-slate-700 pointer-events-none">
            <div className="font-bold text-purple-300">Time: {hoveredPoint.second}s</div>
            <div>WPM (2×): <span className="font-semibold text-white">{hoveredPoint.wpm}</span> (raw: {hoveredPoint.rawWpm})</div>
            <div>Errors: <span className="font-semibold text-rose-400">{hoveredPoint.errors}</span></div>
            <div>Modifications: <span className="font-semibold text-amber-300">{hoveredPoint.modifications}</span></div>
          </div>
        )}
      </div>
    </div>
  );
};
