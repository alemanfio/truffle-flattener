'use client'

import { useState, useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'

/* ─── helpers ─────────────────────────────────────────────── */
function fmt(n: number) {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000)     return `€${Math.round(n).toLocaleString('de-DE')}`
  return `€${n.toFixed(0)}`
}
function fmtPct(n: number) { return `${(n * 100).toFixed(1)}%` }

/* ─── Slider ──────────────────────────────────────────────── */
function Slider({
  label, value, min, max, step, display,
  onChange, tooltip,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (v: number) => void
  tooltip?: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
          {label}
          {tooltip && (
            <span className="group relative cursor-help">
              <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold inline-flex items-center justify-center">?</span>
              <span className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 z-10 w-52 bg-slate-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                {tooltip}
              </span>
            </span>
          )}
        </span>
        <span className="text-lg font-black text-blue-700">{display}</span>
      </div>
      <div className="relative h-2 bg-slate-200 rounded-full">
        <div
          className="absolute h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
          style={{ minHeight: 44 }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-blue-600 shadow-md transition-all pointer-events-none"
          style={{ left: `calc(${pct}% - 12px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 select-none">
        <span>{min === 10000 ? `€${(min / 1000).toFixed(0)}K` : min === 1 ? `${min}×` : `${min}yr`}</span>
        <span>{max === 100000 ? `€${(max / 1000).toFixed(0)}K` : max === 10 ? `${max}×` : `${max}yr`}</span>
      </div>
    </div>
  )
}

/* ─── Stat card ───────────────────────────────────────────── */
function Stat({
  label, value, sub, highlight, tooltip,
}: {
  label: string; value: string; sub?: string; highlight?: boolean; tooltip?: string
}) {
  return (
    <div className={`rounded-xl p-4 flex flex-col gap-1 ${highlight ? 'bg-emerald-50 border-2 border-emerald-300' : 'bg-slate-50 border border-slate-200'}`}>
      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
        {label}
        {tooltip && (
          <span className="group relative cursor-help">
            <span className="w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-500 text-[9px] font-bold inline-flex items-center justify-center">?</span>
            <span className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 z-10 w-48 bg-slate-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
              {tooltip}
            </span>
          </span>
        )}
      </span>
      <span className={`font-black leading-tight ${highlight ? 'text-2xl text-emerald-700' : 'text-xl text-slate-800'}`}>
        {value}
      </span>
      {sub && <span className="text-xs text-slate-400">{sub}</span>}
    </div>
  )
}

/* ─── Custom Tooltip ──────────────────────────────────────── */
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 shadow-lg rounded-xl px-4 py-3 text-sm">
      <p className="font-semibold text-slate-700 mb-1">Year {label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="text-xs">
          {p.name}: {fmt(p.value)}
        </p>
      ))}
    </div>
  )
}

/* ─── Main Calculator ─────────────────────────────────────── */
export default function ROICalculator() {
  const [investment, setInvestment] = useState(10000)
  const [moic, setMoic] = useState(3.0)
  const [years, setYears] = useState(7)

  const calc = useMemo(() => {
    const HURDLE_RATE = 0.08
    const CARRY = 0.25
    const MGMT_FEE_ANNUAL = 0.015

    const grossReturn = investment * moic
    // Deduct management fees from gross return
    const totalFees = investment * MGMT_FEE_ANNUAL * years
    const netBeforeCarry = grossReturn - totalFees

    // Preferred return (hurdle)
    const hurdleAmount = investment * (Math.pow(1 + HURDLE_RATE, years) - 1)
    const totalHurdle = investment + hurdleAmount // principal + preferred return

    // Profit above hurdle
    const profitAboveHurdle = Math.max(0, netBeforeCarry - totalHurdle)

    // LP's share
    const yourShare = Math.min(netBeforeCarry, totalHurdle) + profitAboveHurdle * (1 - CARRY)
    const yourShare_safe = Math.max(0, yourShare)

    const netMultiple = yourShare_safe / investment
    // IRR = (yourShare / investment)^(1/years) - 1
    const irr = netMultiple > 0 ? Math.pow(netMultiple, 1 / years) - 1 : -1

    return {
      grossReturn,
      hurdleAmount,
      profitAboveHurdle,
      yourShare: yourShare_safe,
      netMultiple,
      irr,
      totalFees,
    }
  }, [investment, moic, years])

  // Chart data: exponential growth curve from investment to yourShare
  const chartData = useMemo(() => {
    const pts = []
    for (let y = 0; y <= years; y++) {
      // Project value at year y using exponential growth toward yourShare
      const t = y / years
      const projected = investment * Math.pow(calc.yourShare / investment, t)
      pts.push({
        year: y,
        'Projected Value': Math.round(projected),
        'Initial Investment': investment,
      })
    }
    return pts
  }, [investment, moic, years, calc.yourShare])

  const yAxisFormatter = (v: number) => {
    if (v >= 1_000_000) return `€${(v / 1_000_000).toFixed(1)}M`
    if (v >= 1_000) return `€${(v / 1000).toFixed(0)}K`
    return `€${v}`
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 lg:p-10 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* ── Inputs ─────────────────────────── */}
        <div className="space-y-8">
          <Slider
            label="Investment Amount"
            value={investment}
            min={10000} max={100000} step={5000}
            display={`€${(investment / 1000).toFixed(0)}K`}
            onChange={setInvestment}
            tooltip="Your initial capital commitment to Fund I."
          />
          <Slider
            label="Expected Portfolio MOIC"
            value={moic}
            min={1} max={10} step={0.5}
            display={`${moic.toFixed(1)}×`}
            onChange={setMoic}
            tooltip="Gross multiple of invested capital from the portfolio. Typical VC outcomes range from 2× to 5× net."
          />
          <Slider
            label="Holding Period"
            value={years}
            min={5} max={10} step={1}
            display={`${years} yr`}
            onChange={setYears}
            tooltip="Expected time from investment to fund liquidation. ELTIF funds typically run 7–10 years."
          />
        </div>

        {/* ── Outputs ────────────────────────── */}
        <div className="grid grid-cols-2 gap-3">
          <Stat
            label="Gross Return"
            value={fmt(calc.grossReturn)}
            sub="Before fees & carry"
            tooltip="Investment × MOIC — total portfolio proceeds before any deductions."
          />
          <Stat
            label="Mgmt Fees"
            value={fmt(calc.totalFees)}
            sub={`1.5% × ${years} years`}
            tooltip="Total management fees over the fund life, deducted from gross proceeds."
          />
          <Stat
            label="Hurdle (8% p.a.)"
            value={fmt(calc.hurdleAmount)}
            sub="Preferred return amount"
            tooltip="The 8% annual preferred return you receive before carried interest applies."
          />
          <Stat
            label="Profit Above Hurdle"
            value={fmt(calc.profitAboveHurdle)}
            sub="Subject to 25% carry"
            tooltip="Any profit above your preferred return — shared 75/25 between you and the fund manager."
          />
          <Stat
            label="Your Net Return"
            value={fmt(calc.yourShare)}
            sub="After fees & 25% carry"
            highlight
            tooltip="What you actually receive: principal + preferred return + 75% of upside."
          />
          <Stat
            label="Net Multiple"
            value={`${calc.netMultiple.toFixed(2)}×`}
            sub={calc.netMultiple >= 1 ? 'You\'re profitable' : 'Capital at risk'}
            highlight
            tooltip="Your net return divided by invested capital."
          />
          <div className="col-span-2">
            <Stat
              label="Annualised Return (IRR)"
              value={calc.irr > 0 ? fmtPct(calc.irr) : 'N/A'}
              sub="Net of all fees and carry"
              highlight
              tooltip="Your annualised internal rate of return, net of management fees and carried interest."
            />
          </div>
        </div>
      </div>

      {/* ── Chart ──────────────────────────────── */}
      <div className="mt-10">
        <p className="text-sm font-semibold text-slate-600 mb-4">Investment Growth Projection</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="year"
              tickFormatter={(v) => `Yr ${v}`}
              tick={{ fontSize: 11, fill: '#64748B' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={yAxisFormatter}
              tick={{ fontSize: 11, fill: '#64748B' }}
              axisLine={false}
              tickLine={false}
              width={70}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
            />
            <Line
              type="monotone"
              dataKey="Initial Investment"
              stroke="#94A3B8"
              strokeWidth={2}
              dot={false}
              strokeDasharray="6 3"
            />
            <Line
              type="monotone"
              dataKey="Projected Value"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footnote */}
      <p className="mt-6 text-xs text-slate-400 leading-relaxed border-t border-slate-100 pt-4">
        Assumptions: 8% annual hurdle rate, 25% carried interest on profits above hurdle, 1.5% annual
        management fee deducted from gross proceeds. Projections are illustrative only and not a guarantee
        of future returns. Venture capital investments are high-risk and illiquid. Capital at risk.
      </p>
    </div>
  )
}
