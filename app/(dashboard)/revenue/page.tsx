"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import CardShell from "@/components/CardShell";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueSeries = [
  { month: "Jan", revenue: 42000, orders: 320, profit: 12600 },
  { month: "Feb", revenue: 48000, orders: 355, profit: 14400 },
  { month: "Mar", revenue: 51000, orders: 370, profit: 15300 },
  { month: "Apr", revenue: 58000, orders: 410, profit: 17400 },
  { month: "May", revenue: 62000, orders: 440, profit: 18600 },
  { month: "Jun", revenue: 69000, orders: 475, profit: 20700 },
];

const dailyRevenue = [
  { day: "Mon", revenue: 12800, profit: 3840 },
  { day: "Tue", revenue: 14200, profit: 4260 },
  { day: "Wed", revenue: 12100, profit: 3630 },
  { day: "Thu", revenue: 15600, profit: 4680 },
  { day: "Fri", revenue: 17200, profit: 5160 },
  { day: "Sat", revenue: 18900, profit: 5670 },
  { day: "Sun", revenue: 16400, profit: 4920 },
];

const revenueByCategory = [
  { category: "Apparel", revenue: 125000, percentage: 42 },
  { category: "Footwear", revenue: 89000, percentage: 30 },
  { category: "Accessories", revenue: 85000, percentage: 28 },
];

const revenueStats = [
  { label: "Total Revenue", value: "$284,920", diff: "+18.2% vs last month" },
  { label: "Profit", value: "$85,476", diff: "30% margin" },
  { label: "Avg. Order Value", value: "$60.20", diff: "+5.3% vs last month" },
  { label: "Growth Rate", value: "+18.2%", diff: "Month over month" },
];

const paymentMethods = [
  { method: "Credit Card", value: 65, color: "#22d3ee" },
  { method: "PayPal", value: 20, color: "#6366f1" },
  { method: "Bank Transfer", value: 10, color: "#8b5cf6" },
  { method: "Other", value: 5, color: "#a78bfa" },
];

export default function RevenuePage() {
  const totalRevenue = useMemo(
    () => revenueSeries.reduce((acc, r) => acc + r.revenue, 0),
    []
  );

  const totalProfit = useMemo(
    () => revenueSeries.reduce((acc, r) => acc + r.profit, 0),
    []
  )

  return (
    <>
      <header className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-slate-50 via-cyan-100 to-violet-200 bg-clip-text text-xl font-semibold tracking-tight text-transparent sm:text-2xl">
            Revenue Analytics
          </h1>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Deep dive into revenue trends, profit margins, and financial performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full border border-slate-700/80 px-3 py-1.5 text-xs text-slate-300 transition hover:border-slate-500 hover:bg-slate-900/80">
            Export Report
          </button>
          <button className="rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-3.5 py-1.5 text-xs font-medium text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.65)] transition hover:from-cyan-400 hover:to-indigo-400">
            Generate Report
          </button>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {revenueStats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.85)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-px rounded-[0.9rem] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.27),transparent_60%)] opacity-80" />
            <div className="relative">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                {stat.label}
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-slate-50">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] text-emerald-300">{stat.diff}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <CardShell
            title="Revenue & Profit Trend"
            description="6-month revenue and profit analysis."
          >
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <AreaChart data={revenueSeries}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.85} />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.85} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${v / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.95)",
                      borderRadius: 12,
                      border: "1px solid rgba(148,163,184,0.4)",
                      fontSize: 11,
                      padding: 8,
                    }}
                    labelStyle={{ color: "#e5e7eb", marginBottom: 4 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    fill="url(#revenueGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#profitGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardShell>

          <CardShell
            title="Daily Revenue Performance"
            description="Week-over-week revenue and profit breakdown."
          >
            <div className="h-52 w-full">
              <ResponsiveContainer>
                <BarChart data={dailyRevenue}>
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#64748b", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${v / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.95)",
                      borderRadius: 12,
                      border: "1px solid rgba(148,163,184,0.4)",
                      fontSize: 11,
                      padding: 8,
                    }}
                    labelStyle={{ color: "#e5e7eb", marginBottom: 4 }}
                  />
                  <Bar dataKey="revenue" radius={[4, 4, 0, 0]} fill="url(#dailyRev)" />
                  <Bar dataKey="profit" radius={[4, 4, 0, 0]} fill="url(#dailyProf)" />
                  <defs>
                    <linearGradient id="dailyRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.95} />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="dailyProf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.95} />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardShell>

          <CardShell
            title="Revenue by Category"
            description="Breakdown of revenue sources."
          >
            <div className="space-y-3">
              {revenueByCategory.map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">{cat.category}</span>
                    <span className="font-medium text-slate-100">
                      ${cat.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-900">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percentage}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardShell>
        </div>

        <div className="space-y-4">
          <CardShell
            title="Payment Methods"
            description="Revenue distribution by payment type."
          >
            <div className="h-48 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ method, percent }) => `${method} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.95)",
                      borderRadius: 12,
                      border: "1px solid rgba(148,163,184,0.4)",
                      fontSize: 11,
                      padding: 8,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardShell>

          <CardShell
            title="Revenue Summary"
            description="Key financial metrics."
          >
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/80 px-3 py-2">
                <span className="text-slate-400">Total Revenue</span>
                <span className="font-semibold text-slate-100">
                  ${totalRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/80 px-3 py-2">
                <span className="text-slate-400">Total Profit</span>
                <span className="font-semibold text-emerald-300">
                  ${totalProfit.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/80 px-3 py-2">
                <span className="text-slate-400">Profit Margin</span>
                <span className="font-semibold text-slate-100">
                  {((totalProfit / totalRevenue) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/80 px-3 py-2">
                <span className="text-slate-400">Avg. Monthly</span>
                <span className="font-semibold text-slate-100">
                  ${Math.round(totalRevenue / revenueSeries.length).toLocaleString()}
                </span>
              </div>
            </div>
          </CardShell>
        </div>
      </div>
    </>
  );
}

