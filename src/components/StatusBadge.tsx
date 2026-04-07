import { cn } from "@/lib/utils";
import type { StatusLevel } from "@/lib/mockData";

const labels: Record<StatusLevel, string> = {
  green: "Normal",
  yellow: "Monitor",
  red: "Attention",
};

const StatusBadge = ({ status, className }: { status: StatusLevel; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
      status === "green" && "bg-status-green/10 status-green",
      status === "yellow" && "bg-status-yellow/10 status-yellow",
      status === "red" && "bg-status-red/10 status-red",
      className
    )}
  >
    <span
      className={cn(
        "h-1.5 w-1.5 rounded-full",
        status === "green" && "bg-status-green",
        status === "yellow" && "bg-status-yellow",
        status === "red" && "bg-status-red"
      )}
    />
    {labels[status]}
  </span>
);

export default StatusBadge;
