'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Slice {
  label: string
  pct: number
  color: string // Tailwind fill class or hex
  hex: string   // actual hex for SVG
}

interface DonutChartProps {
  data: Slice[]
  title: string
  size?: number
  thickness?: number
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  // Clamp to avoid degenerate arcs at exactly 360°
  const end = endAngle >= 360 ? 359.999 : endAngle
  const s = polarToCartesian(cx, cy, r, startAngle)
  const e = polarToCartesian(cx, cy, r, end)
  const large = end - startAngle > 180 ? 1 : 0
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`
}

export default function DonutChart({ data, title, size = 180, thickness = 38 }: DonutChartProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const cx = size / 2
  const cy = size / 2
  const r = (size - thickness) / 2

  // Build cumulative angles
  const total = data.reduce((s, d) => s + d.pct, 0)
  let cursor = 0
  const slices = data.map((d) => {
    const start = cursor
    const sweep = (d.pct / total) * 360
    cursor += sweep
    return { ...d, start, end: cursor }
  })

  return (
    <div ref={ref} className="flex flex-col items-center gap-5">
      <p className="text-sm font-bold text-slate-700 text-center">{title}</p>

      {/* SVG */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {slices.map((slice, i) => (
            <motion.path
              key={slice.label}
              d={describeArc(cx, cy, r, slice.start, slice.end)}
              fill="none"
              stroke={slice.hex}
              strokeWidth={thickness}
              strokeLinecap="butt"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: i * 0.15, ease: 'easeOut' }}
            />
          ))}
          {/* Centre hole background */}
          <circle cx={cx} cy={cy} r={r - thickness / 2 - 2} fill="white" />
        </svg>
        {/* Centre label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs text-slate-400 font-medium">split</span>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: d.hex }} />
              <span className="text-slate-600">{d.label}</span>
            </div>
            <span className="font-bold text-slate-800">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
