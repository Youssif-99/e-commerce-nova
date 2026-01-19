"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  BarChart,
  Bar,
} from "recharts";
import CardShell from "@/components/CardShell";
import StatusPill from "@/components/StatusPill";
import RolePill from "@/components/RolePill";

type StatCard = {
  label: string;
  value: string;
  diff: string;
};

type Order = {
  id: string;
  customer: string;
  total: string;
  status: "Paid" | "Pending" | "Refunded";
};

type Product = {
  name: string;
  sku: string;
  stock: number;
  price: string;
};

type User = {
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Customer";
};

const revenueSeries = [
  { month: "Jan", revenue: 42000, orders: 320 },
  { month: "Feb", revenue: 48000, orders: 355 },
  { month: "Mar", revenue: 51000, orders: 370 },
  { month: "Apr", revenue: 58000, orders: 410 },
  { month: "May", revenue: 62000, orders: 440 },
  { month: "Jun", revenue: 69000, orders: 475 },
];

const trafficSeries = [
  { source: "Direct", value: 38 },
  { source: "Search", value: 42 },
  { source: "Social", value: 12 },
  { source: "Referral", value: 8 },
];

const statCards: StatCard[] = [
  { label: "Total Revenue", value: "$284,920", diff: "+18.2% vs last month" },
  { label: "Orders", value: "4,732", diff: "+9.4% vs last month" },
  { label: "Active Customers", value: "12,483", diff: "+4.1% vs last month" },
  { label: "Conversion Rate", value: "3.84%", diff: "+0.7 pts vs last month" },
];

const recentOrders: Order[] = [
  { id: "#98423", customer: "Sarah Connor", total: "$189.00", status: "Paid" },
  { id: "#98422", customer: "Tony Stark", total: "$1,249.00", status: "Paid" },
  { id: "#98421", customer: "Bruce Wayne", total: "$5,980.00", status: "Pending" },
  { id: "#98420", customer: "Diana Prince", total: "$329.00", status: "Refunded" },
];

const topProducts: Product[] = [
  { name: "Nebula Hoodie", sku: "NB-HOOD-021", stock: 32, price: "$89.00" },
  { name: "Gravity Sneakers", sku: "GR-SNK-008", stock: 11, price: "$149.00" },
  { name: "Lunar Watch", sku: "LN-WTC-004", stock: 5, price: "$299.00" },
  { name: "Stellar Backpack", sku: "ST-BCK-014", stock: 61, price: "$119.00" },
];

const recentUsers: User[] = [
  { name: "Ava Solaris", email: "ava@galactic.store", role: "Admin" },
  { name: "Noah Orion", email: "noah@galactic.store", role: "Manager" },
  { name: "Mia Vega", email: "mia@customer.io", role: "Customer" },
  { name: "Leo Nova", email: "leo@customer.io", role: "Customer" },
];

export default function Dashboard() {
  const totalTraffic = useMemo(
    () => trafficSeries.reduce((acc, t) => acc + t.value, 0),
    []
  );

  return (
    <>
      <header className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-slate-50 via-cyan-100 to-violet-200 bg-clip-text text-xl font-semibold tracking-tight text-transparent sm:text-2xl">
            Command Center
          </h1>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Real‑time overview of orders, products, customers and revenue –
            designed to plug into any backend.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden rounded-full border border-slate-700/80 px-3 py-1.5 text-xs text-slate-300 transition hover:border-slate-500 hover:bg-slate-900/80 sm:inline-flex">
            Sandbox mode
          </button>
          <button className="rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-3.5 py-1.5 text-xs font-medium text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.65)] transition hover:from-cyan-400 hover:to-indigo-400">
            Connect backend
          </button>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <motion.div
            key={card.label}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.85)] backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-px rounded-[0.9rem] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.27),transparent_60%)] opacity-80" />
            <div className="relative">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                {card.label}
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-slate-50">
                {card.value}
              </p>
              <p className="mt-1 text-[11px] text-emerald-300">{card.diff}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <CardShell
            title="Revenue analytics"
            description="6‑month revenue and order volume trend."
          >
            <div className="h-52 w-full">
              <ResponsiveContainer>
                <AreaChart data={revenueSeries}>
                  <defs>
                    <linearGradient
                      id="rev"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#22d3ee"
                        stopOpacity={0.85}
                      />
                      <stop
                        offset="100%"
                        stopColor="#22d3ee"
                        stopOpacity={0}
                      />
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
                    fill="url(#rev)"
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#6366f1"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardShell>

          <CardShell
            title="Orders"
            description="Latest orders flowing through your checkout."
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead className="border-b border-slate-800 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  <tr>
                    <th className="py-2 pr-3">Order</th>
                    <th className="px-3 py-2">Customer</th>
                    <th className="px-3 py-2">Total</th>
                    <th className="px-3 py-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/80">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="align-middle">
                      <td className="py-2 pr-3 text-[11px] font-medium text-slate-100">
                        {order.id}
                      </td>
                      <td className="px-3 py-2 text-[11px] text-slate-300">
                        {order.customer}
                      </td>
                      <td className="px-3 py-2 text-[11px] text-slate-200">
                        {order.total}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <StatusPill status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardShell>
        </div>

        <div className="space-y-4">
          <CardShell
            title="Traffic mix"
            description="Top channels driving revenue."
          >
            <div className="flex items-center gap-4">
              <div className="h-32 flex-1">
                <ResponsiveContainer>
                  <BarChart data={trafficSeries}>
                    <XAxis
                      dataKey="source"
                      tick={{ fill: "#64748b", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      hide
                      domain={[0, 50]}
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
                    <Bar
                      dataKey="value"
                      radius={[999, 999, 4, 4]}
                      fill="url(#traffic)"
                    />
                    <defs>
                      <linearGradient
                        id="traffic"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#6366f1"
                          stopOpacity={0.95}
                        />
                        <stop
                          offset="100%"
                          stopColor="#0f172a"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1 text-[11px] text-slate-300">
                {trafficSeries.map((t) => (
                  <div
                    key={t.source}
                    className="flex items-center justify-between gap-4"
                  >
                    <span>{t.source}</span>
                    <span className="text-slate-200">
                      {Math.round((t.value / totalTraffic) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardShell>

          <CardShell
            title="Top products"
            description="Inventory and price signals."
          >
            <div className="space-y-2 text-[11px]">
              {topProducts.map((p) => (
                <div
                  key={p.sku}
                  className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/80 px-3 py-2"
                >
                  <div>
                    <p className="font-medium text-slate-100">{p.name}</p>
                    <p className="text-[10px] text-slate-500">{p.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-200">{p.price}</p>
                    <p className="text-[10px] text-slate-500">
                      {p.stock} in stock
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardShell>

          <CardShell
            title="Key users"
            description="Admins and recent power customers."
          >
            <div className="space-y-2 text-[11px]">
              {recentUsers.map((u) => (
                <div
                  key={u.email}
                  className="flex items-center justify-between rounded-xl bg-slate-950/80 px-2.5 py-2"
                >
                  <div>
                    <p className="font-medium text-slate-100">{u.name}</p>
                    <p className="text-[10px] text-slate-500">{u.email}</p>
                  </div>
                  <RolePill role={u.role} />
                </div>
              ))}
            </div>
          </CardShell>
        </div>
      </div>
    </>
  );
}

