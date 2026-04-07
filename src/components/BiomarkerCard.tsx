import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { getStatus, baseline, biomarkerInfo, type StatusLevel } from "@/lib/mockData";

interface Props {
  metricKey: "avr" | "cupDiscRatio" | "tortuosity" | "symmetry";
  value: number;
}

const BiomarkerCard = ({ metricKey, value }: Props) => {
  const info = biomarkerInfo[metricKey];
  const status: StatusLevel = getStatus(value, baseline[metricKey], metricKey);

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-medium leading-snug">{info.label}</CardTitle>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight font-mono">{value.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground">baseline {baseline[metricKey].toFixed(2)}</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{info.description}</p>
      </CardContent>
    </Card>
  );
};

export default BiomarkerCard;
