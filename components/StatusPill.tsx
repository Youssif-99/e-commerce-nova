type OrderStatus = "Paid" | "Pending" | "Refunded";

export default function StatusPill({ status }: { status: OrderStatus }) {
  const colors: Record<OrderStatus, string> = {
    Paid: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/40",
    Pending: "bg-amber-500/15 text-amber-200 ring-amber-500/40",
    Refunded: "bg-rose-500/15 text-rose-200 ring-rose-500/40",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${colors[status]}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

