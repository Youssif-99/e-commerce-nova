"use client";

import { motion } from "framer-motion";
import CardShell from "@/components/CardShell";
import StatusPill from "@/components/StatusPill";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

type Order = {
  id: string;
  customer: string;
  email: string;
  total: string;
  status: "Paid" | "Pending" | "Refunded";
  date: string;
  items: number;
};

const orders: Order[] = [
  { id: "#98423", customer: "Sarah Connor", email: "sarah@example.com", total: "$189.00", status: "Paid", date: "2024-06-15", items: 2 },
  { id: "#98422", customer: "Tony Stark", email: "tony@stark.com", total: "$1,249.00", status: "Paid", date: "2024-06-14", items: 5 },
  { id: "#98421", customer: "Bruce Wayne", email: "bruce@wayne.com", total: "$5,980.00", status: "Pending", date: "2024-06-14", items: 12 },
  { id: "#98420", customer: "Diana Prince", email: "diana@amazon.com", total: "$329.00", status: "Refunded", date: "2024-06-13", items: 3 },
  { id: "#98419", customer: "Peter Parker", email: "peter@spider.com", total: "$89.00", status: "Paid", date: "2024-06-13", items: 1 },
  { id: "#98418", customer: "Clark Kent", email: "clark@daily.com", total: "$449.00", status: "Paid", date: "2024-06-12", items: 4 },
  { id: "#98417", customer: "Wade Wilson", email: "wade@deadpool.com", total: "$199.00", status: "Pending", date: "2024-06-12", items: 2 },
  { id: "#98416", customer: "Natasha Romanoff", email: "natasha@shield.com", total: "$679.00", status: "Paid", date: "2024-06-11", items: 6 },
];

const orderStats = [
  { label: "Total Orders", value: "4,732", diff: "+9.4% vs last month" },
  { label: "Pending", value: "127", diff: "2.7% of total" },
  { label: "Completed", value: "4,521", diff: "95.5% of total" },
  { label: "Refunded", value: "84", diff: "1.8% of total" },
];

const dailyOrders = [
  { day: "Mon", orders: 145, revenue: 12800 },
  { day: "Tue", orders: 162, revenue: 14200 },
  { day: "Wed", orders: 138, revenue: 12100 },
  { day: "Thu", orders: 178, revenue: 15600 },
  { day: "Fri", orders: 195, revenue: 17200 },
  { day: "Sat", orders: 210, revenue: 18900 },
  { day: "Sun", orders: 185, revenue: 16400 },
];

export default function OrdersPage() {
  return (
    <>
      <header className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-slate-50 via-cyan-100 to-violet-200 bg-clip-text text-xl font-semibold tracking-tight text-transparent sm:text-2xl">
            Orders Management
          </h1>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Track, manage, and analyze all customer orders in real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full border border-slate-700/80 px-3 py-1.5 text-xs text-slate-300 transition hover:border-slate-500 hover:bg-slate-900/80">
            Export CSV
          </button>
          <button className="rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-3.5 py-1.5 text-xs font-medium text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.65)] transition hover:from-cyan-400 hover:to-indigo-400">
            New Order
          </button>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {orderStats.map((stat) => (
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
            title="All Orders"
            description="Complete order history with filtering and search."
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead className="border-b border-slate-800 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  <tr>
                    <th className="py-2 pr-3">Order ID</th>
                    <th className="px-3 py-2">Customer</th>
                    <th className="px-3 py-2">Items</th>
                    <th className="px-3 py-2">Total</th>
                    <th className="px-3 py-2">Date</th>
                    <th className="px-3 py-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/80">
                  {orders.map((order) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="align-middle hover:bg-slate-900/40 transition-colors"
                    >
                      <td className="py-2 pr-3 text-[11px] font-medium text-slate-100">
                        {order.id}
                      </td>
                      <td className="px-3 py-2">
                        <div>
                          <p className="text-[11px] text-slate-100">{order.customer}</p>
                          <p className="text-[10px] text-slate-500">{order.email}</p>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-[11px] text-slate-300">
                        {order.items}
                      </td>
                      <td className="px-3 py-2 text-[11px] text-slate-200 font-medium">
                        {order.total}
                      </td>
                      <td className="px-3 py-2 text-[11px] text-slate-400">
                        {order.date}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <StatusPill status={order.status} />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardShell>
        </div>

        <div className="space-y-4">
          <CardShell
            title="Daily Orders Trend"
            description="Orders and revenue by day of week."
          >
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <LineChart data={dailyOrders}>
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
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={{ fill: "#22d3ee", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardShell>

          <CardShell
            title="Order Status Distribution"
            description="Breakdown by payment status."
          >
            <div className="h-48 w-full">
              <ResponsiveContainer>
                <BarChart data={[
                  { status: "Paid", count: 4521 },
                  { status: "Pending", count: 127 },
                  { status: "Refunded", count: 84 },
                ]}>
                  <XAxis
                    dataKey="status"
                    tick={{ fill: "#64748b", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.95)",
                      borderRadius: 12,
                      border: "1px solid rgba(148,163,184,0.4)",
                      fontSize: 11,
                      padding: 8,
                    }}
                  />
                  <Bar
                    dataKey="count"
                    radius={[4, 4, 0, 0]}
                    fill="url(#statusGradient)"
                  />
                  <defs>
                    <linearGradient id="statusGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.95} />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardShell>
        </div>
      </div>
    </>
  );
}

