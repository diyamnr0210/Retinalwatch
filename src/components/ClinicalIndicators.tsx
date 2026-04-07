import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Eye, Brain } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { getStatus, baseline, type ScanResult, type StatusLevel } from "@/lib/mockData";

const indicators = [
  {
    label: "Hypertension Risk",
    icon: Activity,
    getStatus: (s: ScanResult): StatusLevel => {
      const avr = getStatus(s.avr, baseline.avr, "avr");
      const tort = getStatus(s.tortuosity, baseline.tortuosity, "tortuosity");
      if (avr === "red" || tort === "red") return "red";
      if (avr === "yellow" || tort === "yellow") return "yellow";
      return "green";
    },
    markers: "AVR + Tortuosity",
  },
  {
    label: "Glaucoma Risk",
    icon: Eye,
    getStatus: (s: ScanResult): StatusLevel => getStatus(s.cupDiscRatio, baseline.cupDiscRatio, "cupDiscRatio"),
    markers: "Cup/Disc Ratio",
  },
  {
    label: "Neuro-vascular Changes",
    icon: Brain,
    getStatus: (s: ScanResult): StatusLevel => getStatus(s.symmetry, baseline.symmetry, "symmetry"),
    markers: "Brightness Symmetry",
  },
];

const ClinicalIndicators = ({ scan }: { scan: ScanResult }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">Clinical Indicators</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {indicators.map((ind) => {
        const Icon = ind.icon;
        const status = ind.getStatus(scan);
        return (
          <div key={ind.label} className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-clinical-blue-light">
                <Icon className="h-4 w-4 text-clinical-blue" />
              </div>
              <div>
                <p className="text-sm font-medium">{ind.label}</p>
                <p className="text-xs text-muted-foreground">Based on {ind.markers}</p>
              </div>
            </div>
            <StatusBadge status={status} />
          </div>
        );
      })}
    </CardContent>
  </Card>
);

export default ClinicalIndicators;
