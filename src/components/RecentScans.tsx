import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockScans, baseline, getStatus } from "@/lib/mockData";
import StatusBadge from "./StatusBadge";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

function overallStatus(scan: typeof mockScans[0]) {
  const statuses = [
    getStatus(scan.avr, baseline.avr, "avr"),
    getStatus(scan.cupDiscRatio, baseline.cupDiscRatio, "cupDiscRatio"),
    getStatus(scan.tortuosity, baseline.tortuosity, "tortuosity"),
    getStatus(scan.symmetry, baseline.symmetry, "symmetry"),
  ];
  if (statuses.includes("red")) return "red" as const;
  if (statuses.includes("yellow")) return "yellow" as const;
  return "green" as const;
}

const RecentScans = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">Recent Scans</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      {mockScans.slice(0, 5).map((scan) => (
        <Link
          key={scan.id}
          to={`/results/${scan.id}`}
          className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-clinical-blue-light">
              <Eye className="h-4 w-4 text-clinical-blue" />
            </div>
            <div>
              <p className="text-sm font-medium capitalize">{scan.eye} eye</p>
              <p className="text-xs text-muted-foreground">
                {new Date(scan.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
          <StatusBadge status={overallStatus(scan)} />
        </Link>
      ))}
    </CardContent>
  </Card>
);

export default RecentScans;
