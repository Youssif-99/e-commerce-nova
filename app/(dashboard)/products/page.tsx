"use client";

import { motion } from "framer-motion";
import CardShell from "@/components/CardShell";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: string;
  sales: number;
  revenue: string;
  status: "Active" | "Low Stock" | "Out of Stock";
};

const products: Product[] = [
  { id: "1", name: "Nebula Hoodie", sku: "NB-HOOD-021", category: "Apparel", stock: 32, price: "$89.00", sales: 124, revenue: "$11,036", status: "Active" },
  { id: "2", name: "Gravity Sneakers", sku: "GR-SNK-008", category: "Footwear", stock: 11, price: "$149.00", sales: 89, revenue: "$13,261", status: "Low Stock" },
  { id: "3", name: "Lunar Watch", sku: "LN-WTC-004", category: "Accessories", stock: 5, price: "$299.00", sales: 67, revenue: "$20,033", status: "Low Stock" },
  { id: "4", name: "Stellar Backpack", sku: "ST-BCK-014", category: "Accessories", stock: 61, price: "$119.00", sales: 156, revenue: "$18,564", status: "Active" },
  { id: "5", name: "Cosmic T-Shirt", sku: "CS-TSH-032", category: "Apparel", stock: 0, price: "$39.00", sales: 203, revenue: "$7,917", status: "Out of Stock" },
  { id: "6", name: "Orbit Sunglasses", sku: "OR-SUN-015", category: "Accessories", stock: 28, price: "$79.00", sales: 98, revenue: "$7,742", status: "Active" },
  { id: "7", name: "Galaxy Jeans", sku: "GX-JNS-041", category: "Apparel", stock: 7, price: "$129.00", sales: 45, revenue: "$5,805", status: "Low Stock" },
  { id: "8", name: "Astro Cap", sku: "AS-CAP-009", category: "Accessories", stock: 43, price: "$29.00", sales: 178, revenue: "$5,162", status: "Active" },
];

const productStats = [
  { label: "Total Products", value: "247", diff: "+12 new this month" },
  { label: "Active", value: "198", diff: "80.2% of total" },
  { label: "Low Stock", value: "23", diff: "9.3% need restock" },
  { label: "Out of Stock", value: "26", diff: "10.5% unavailable" },
];

const categoryData = [
  { name: "Apparel", value: 45, color: "#22d3ee" },
  { name: "Footwear", value: 25, color: "#6366f1" },
  { name: "Accessories", value: 30, color: "#8b5cf6" },
];

const topSelling = products
  .sort((a, b) => b.sales - a.sales)
  .slice(0, 5)
  .map((p) => ({ name: p.name, sales: p.sales }));

export default function ProductsPage() {
  return (
    <>
      <header className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-slate-50 via-cyan-100 to-violet-200 bg-clip-text text-xl font-semibold tracking-tight text-transparent sm:text-2xl">
            Products Catalog
          </h1>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Manage inventory, pricing, and product information.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full border border-slate-700/80 px-3 py-1.5 text-xs text-slate-300 transition hover:border-slate-500 hover:bg-slate-900/80">
            Import CSV
          </button>
          <button className="rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-3.5 py-1.5 text-xs font-medium text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.65)] transition hover:from-cyan-400 hover:to-indigo-400">
            Add Product
          </button>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {productStats.map((stat) => (
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
            title="All Products"
            description="Complete product inventory with stock levels and sales data."
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead className="border-b border-slate-800 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  <tr>
                    <th className="py-2 pr-3">Product</th>
                    <th className="px-3 py-2">SKU</th>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2">Stock</th>
                    <th className="px-3 py-2">Price</th>
                    <th className="px-3 py-2">Sales</th>
                    <th className="px-3 py-2 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/80">
                  {products.map((product) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="align-middle hover:bg-slate-900/40 transition-colors"
                    >
                      <td className="py-2 pr-3">
                        <div>
                          <p className="text-[11px] font-medium text-slate-100">{product.name}</p>
                          <span
                            className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium mt-1 ${
                              product.status === "Active"
                                ? "bg-emerald-500/15 text-emerald-300"
                                : product.status === "Low Stock"
                                ? "bg-amber-500/15 text-amber-200"
                                : "bg-rose-500/15 text-rose-200"
                            }`}
                          >
                            {product.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-[11px] text-slate-400">
                        {product.sku}
                      </td>
                      <td className="px-3 py-2 text-[11px] text-slate-300">
                        {product.category}
                      </td>
                      <td className="px-3 py-2 text-[11px] text-slate-200">
                        {product.stock}
                      </td>
                      <td className="px-3 py-2 text-[11px] text-slate-200 font-medium">
                        {product.price}
                      </td>
                      <td className="px-3 py-2 text-[11px] text-slate-300">
                        {product.sales}
                      </td>
                      <td className="px-3 py-2 text-right text-[11px] font-medium text-slate-100">
                        {product.revenue}
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
            title="Category Distribution"
            description="Products by category."
          >
            <div className="h-48 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent = 0 }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
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
            title="Top Selling Products"
            description="Best performers by sales volume."
          >
            <div className="h-48 w-full">
              <ResponsiveContainer>
                <BarChart data={topSelling} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fill: "#64748b", fontSize: 9 }}
                    width={100}
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
                    dataKey="sales"
                    radius={[0, 4, 4, 0]}
                    fill="url(#salesGradient)"
                  />
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.95} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0.95} />
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

