type UserRole = "Admin" | "Manager" | "Customer";

export default function RolePill({ role }: { role: UserRole }) {
  const colors: Record<UserRole, string> = {
    Admin: "bg-cyan-500/15 text-cyan-200 ring-cyan-500/40",
    Manager: "bg-violet-500/15 text-violet-200 ring-violet-500/40",
    Customer: "bg-slate-500/15 text-slate-200 ring-slate-500/40",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${colors[role]}`}
    >
      {role}
    </span>
  );
}

