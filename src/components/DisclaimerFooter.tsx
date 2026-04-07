import { AlertTriangle } from "lucide-react";

const DisclaimerFooter = () => (
  <footer className="border-t bg-card px-4 py-3">
    <div className="container flex items-start gap-2 text-xs text-muted-foreground">
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clinical-slate" />
      <p>
        <span className="font-medium">RetinalWatch</span> is a monitoring tool for educational purposes and does not
        provide a formal medical diagnosis. Consult an ophthalmologist for clinical evaluation.
      </p>
    </div>
  </footer>
);

export default DisclaimerFooter;
