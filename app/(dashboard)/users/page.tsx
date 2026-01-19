"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import CardShell from "@/components/CardShell";
import RolePill from "@/components/RolePill";

const ResponsiveContainer = dynamic(
  () => import("recharts").then((m) => m.ResponsiveContainer),
  { ssr: false }
);
const BarChart = dynamic(() => import("recharts").then((m) => m.BarChart), {
  ssr: false,
});
const Bar = dynamic(() => import("recharts").then((m) => m.Bar), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), {
  ssr: false,
});
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), {
  ssr: false,
});
const LineChart = dynamic(() => import("recharts").then((m) => m.LineChart), {
  ssr: false,
});
const Line = dynamic(() => import("recharts").then((m) => m.Line), {
  ssr: false,
});

type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Customer";
  orders: number;
  totalSpent: string;
  lastActive: string;
  status: "Active" | "Inactive";
};

const users: User[] = [
  { id: "1", name: "Ava Solaris", email: "ava@galactic.store", role: "Admin", orders: 0, totalSpent: "$0", lastActive: "2024-06-15", status: "Active" },
  { id: "2", name: "Noah Orion", email: "noah@galactic.store", role: "Manager", orders: 0, totalSpent: "$0", lastActive: "2024-06-15", status: "Active" },
  { id: "3", name: "Mia Vega", email: "mia@customer.io", role: "Customer", orders: 12, totalSpent: "$1,248", lastActive: "2024-06-14", status: "Active" },
  { id: "4", name: "Leo Nova", email: "leo@customer.io", role: "Customer", orders: 8, totalSpent: "$892", lastActive: "2024-06-13", status: "Active" },
  { id: "5", name: "Zoe Stellar", email: "zoe@space.com", role: "Customer", orders: 24, totalSpent: "$3,456", lastActive: "2024-06-15", status: "Active" },
  { id: "6", name: "Ethan Cosmos", email: "ethan@universe.io", role: "Customer", orders: 5, totalSpent: "$567", lastActive: "2024-06-10", status: "Inactive" },
  { id: "7", name: "Luna Galaxy", email: "luna@stars.net", role: "Customer", orders: 18, totalSpent: "$2,134", lastActive: "2024-06-14", status: "Active" },
  { id: "8", name: "Max Nebula", email: "max@cosmic.com", role: "Customer", orders: 3, totalSpent: "$234", lastActive: "2024-06-08", status: "Inactive" },
];

const userStats = [
  { label: "Total Users", value: "12,483", diff: "+4.1% vs last month" },
  { label: "Active", value: "11,892", diff: "95.3% of total" },
  { label: "New This Month", value: "512", diff: "4.1% growth" },
  { label: "Avg. Orders", value: "8.2", diff: "Per customer" },
];

const registrationTrend = [
  { month: "Jan", users: 980 },
  { month: "Feb", users: 1120 },
  { month: "Mar", users: 1050 },
  { month: "Apr", users: 1240 },
  { month: "May", users: 1380 },
  { month: "Jun", users: 1520 },
];

const roleDistribution = [
  { role: "Customer", count: 12450 },
  { role: "Manager", count: 28 },
  { role: "Admin", count: 5 },
];

export default function UsersPage() {
  return (
    <>
      <header className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="title-gradient text-xl font-semibold tracking-tight sm:text-2xl">
            Users & Customers
          </h1>
          <p className="mt-1 text-xs sm:text-sm [color:var(--muted)]">
            Manage user accounts, roles, and customer relationships.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full border px-3 py-1.5 text-xs transition hover:border-cyan-400/60 [border-color:var(--border)] [background:var(--panel-strong)] [color:var(--muted-strong)]">
            Export List
          </button>
          <button className="rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-3.5 py-1.5 text-xs font-medium text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.65)] transition hover:from-cyan-400 hover:to-indigo-400">
            Add User
          </button>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {userStats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative overflow-hidden rounded-2xl border p-3 backdrop-blur-xl shadow-[0_18px_50px_rgba(15,23,42,0.22)] [border-color:var(--border)] [background:var(--panel)]"
          >
            <div className="pointer-events-none absolute inset-px rounded-[0.9rem] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.27),transparent_60%)] opacity-80" />
            <div className="relative">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] [color:var(--muted)]">
                {stat.label}
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight [color:var(--muted-strong)]">
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
            title="All Users"
            description="Complete user directory with roles and activity."
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead className="border-b text-[10px] uppercase tracking-[0.16em] [border-color:var(--border)] [color:var(--muted)]">
                  <tr>
                    <th className="py-2 pr-3">User</th>
                    <th className="px-3 py-2">Role</th>
                    <th className="px-3 py-2">Orders</th>
                    <th className="px-3 py-2">Total Spent</th>
                    <th className="px-3 py-2">Last Active</th>
                    <th className="px-3 py-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y [border-color:var(--border)]">
                  {users.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="align-middle transition-colors hover:bg-black/5"
                    >
                      <td className="py-2 pr-3">
                        <div>
                          <p className="text-[11px] font-medium [color:var(--muted-strong)]">{user.name}</p>
                          <p className="text-[10px] [color:var(--muted)]">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <RolePill role={user.role} />
                      </td>
                      <td className="px-3 py-2 text-[11px] [color:var(--muted-strong)]/80">
                        {user.orders}
                      </td>
                      <td className="px-3 py-2 text-[11px] font-medium [color:var(--muted-strong)]">
                        {user.totalSpent}
                      </td>
                      <td className="px-3 py-2 text-[11px] [color:var(--muted)]">
                        {user.lastActive}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            user.status === "Active"
                              ? "bg-emerald-500/15 text-emerald-300"
                              : "bg-slate-500/15 text-slate-600"
                          }`}
                        >
                          {user.status}
                        </span>
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
            title="Registration Trend"
            description="New user signups over time."
          >
            <div className="h-48 w-full">
              <ResponsiveContainer>
                <LineChart data={registrationTrend}>
                  <XAxis
                    dataKey="month"
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
                      background: "var(--tooltip-bg)",
                      borderRadius: 12,
                      border: "1px solid var(--tooltip-border)",
                      fontSize: 11,
                      padding: 8,
                    }}
                    labelStyle={{ color: "var(--tooltip-label)", marginBottom: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={{ fill: "#22d3ee", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardShell>

          <CardShell
            title="Role Distribution"
            description="Users by access level."
          >
            <div className="h-48 w-full">
              <ResponsiveContainer>
                <BarChart data={roleDistribution}>
                  <XAxis
                    dataKey="role"
                    tick={{ fill: "#64748b", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--tooltip-bg)",
                      borderRadius: 12,
                      border: "1px solid var(--tooltip-border)",
                      fontSize: 11,
                      padding: 8,
                    }}
                  />
                  <Bar
                    dataKey="count"
                    radius={[4, 4, 0, 0]}
                    fill="url(#roleGradient)"
                  />
                  <defs>
                    <linearGradient id="roleGradient" x1="0" y1="0" x2="0" y2="1">
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

