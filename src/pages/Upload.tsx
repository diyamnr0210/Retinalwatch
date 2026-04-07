import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, Camera, CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { simulateVisionPipeline, mockScans } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const captureSteps = [
  "Attach ophthalmoscope lens to smartphone camera",
  "Hold device 2-3cm from the eye in a dim room",
  "Center the optic disc in the viewfinder",
  "Ensure even lighting with no reflections",
  "Capture image — hold steady for 2 seconds",
];

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [eye, setEye] = useState<"left" | "right">("right");

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleAnalyze = async () => {
    setProcessing(true);
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 2000));
    const results = simulateVisionPipeline();
    const newId = String(mockScans.length + 1);
    const newScan = {
      id: newId,
      date: new Date().toISOString().split("T")[0],
      eye,
      ...results,
    };
    mockScans.unshift(newScan);
    setProcessing(false);
    navigate(`/results/${newId}`);
  };

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Scan</h1>
        <p className="text-sm text-muted-foreground">Upload a retinal image for biomarker analysis</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Guided Capture */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Camera className="h-4 w-4 text-clinical-blue" />
              Guided Capture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {captureSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clinical-blue-light text-xs font-semibold text-clinical-blue">
                  {i + 1}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upload area */}
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              {/* Eye selection */}
              <div className="mb-4 flex gap-2">
                {(["left", "right"] as const).map((e) => (
                  <Button
                    key={e}
                    variant={eye === e ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEye(e)}
                    className="capitalize"
                  >
                    {e} Eye
                  </Button>
                ))}
              </div>

              {/* Drop zone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={cn(
                  "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors cursor-pointer",
                  preview ? "border-primary/40" : "border-border hover:border-primary/40"
                )}
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/jpeg,image/png";
                  input.onchange = (e) => {
                    const f = (e.target as HTMLInputElement).files?.[0];
                    if (f) handleFile(f);
                  };
                  input.click();
                }}
              >
                {preview ? (
                  <div className="space-y-3 text-center">
                    <img src={preview} alt="Retinal scan preview" className="mx-auto h-40 w-40 rounded-lg object-cover" />
                    <div className="flex items-center gap-1.5 text-sm text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                      {file?.name}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-center">
                    <UploadIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">Drop retinal image or click to browse</p>
                    <p className="text-xs text-muted-foreground">JPG or PNG, high resolution recommended</p>
                  </div>
                )}
              </div>

              {/* Analyze button */}
              <Button
                className="mt-4 w-full"
                disabled={!file || processing}
                onClick={handleAnalyze}
              >
                {processing ? (
                  <>
                    <Circle className="h-4 w-4 animate-pulse-ring" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Scan
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upload;
