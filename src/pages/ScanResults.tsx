import { useParams, Link } from "react-router-dom";
import { mockScans } from "@/lib/mockData";
import BiomarkerCard from "@/components/BiomarkerCard";
import ClinicalIndicators from "@/components/ClinicalIndicators";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Eye } from "lucide-react";

const ScanResults = () => {
  const { id } = useParams<{ id: string }>();
  const scan = mockScans.find((s) => s.id === id);

  if (!scan) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground">Scan not found.</p>
        <Button variant="outline" asChild className="mt-4">
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="-ml-2 mb-1">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Scan Results</h1>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(scan.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1 capitalize">
              <Eye className="h-3.5 w-3.5" />
              {scan.eye} eye
            </span>
          </div>
        </div>
      </div>

      {/* Biomarker cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <BiomarkerCard metricKey="avr" value={scan.avr} />
        <BiomarkerCard metricKey="cupDiscRatio" value={scan.cupDiscRatio} />
        <BiomarkerCard metricKey="tortuosity" value={scan.tortuosity} />
        <BiomarkerCard metricKey="symmetry" value={scan.symmetry} />
      </div>

      {/* Clinical indicators */}
      <ClinicalIndicators scan={scan} />
    </div>
  );
};

export default ScanResults;
