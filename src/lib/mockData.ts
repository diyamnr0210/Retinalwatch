export interface ScanResult {
  id: string;
  date: string;
  eye: "left" | "right";
  avr: number;
  cupDiscRatio: number;
  tortuosity: number;
  symmetry: number;
  imageUrl?: string;
}

export interface Baseline {
  avr: number;
  cupDiscRatio: number;
  tortuosity: number;
  symmetry: number;
}

export const baseline: Baseline = {
  avr: 0.72,
  cupDiscRatio: 0.35,
  tortuosity: 1.12,
  symmetry: 0.95,
};

export const thresholds = {
  avr: { green: 0.08, yellow: 0.15 },
  cupDiscRatio: { green: 0.1, yellow: 0.2 },
  tortuosity: { green: 0.15, yellow: 0.3 },
  symmetry: { green: 0.08, yellow: 0.15 },
};

export type StatusLevel = "green" | "yellow" | "red";

export function getStatus(value: number, baselineVal: number, key: keyof typeof thresholds): StatusLevel {
  const diff = Math.abs(value - baselineVal);
  const t = thresholds[key];
  if (diff <= t.green) return "green";
  if (diff <= t.yellow) return "yellow";
  return "red";
}

export const mockScans: ScanResult[] = [
  { id: "1", date: "2026-03-28", eye: "right", avr: 0.71, cupDiscRatio: 0.34, tortuosity: 1.10, symmetry: 0.94 },
  { id: "2", date: "2026-03-21", eye: "left", avr: 0.74, cupDiscRatio: 0.36, tortuosity: 1.15, symmetry: 0.92 },
  { id: "3", date: "2026-03-14", eye: "right", avr: 0.70, cupDiscRatio: 0.38, tortuosity: 1.18, symmetry: 0.93 },
  { id: "4", date: "2026-03-07", eye: "left", avr: 0.73, cupDiscRatio: 0.33, tortuosity: 1.11, symmetry: 0.96 },
  { id: "5", date: "2026-02-28", eye: "right", avr: 0.69, cupDiscRatio: 0.35, tortuosity: 1.13, symmetry: 0.91 },
  { id: "6", date: "2026-02-21", eye: "left", avr: 0.75, cupDiscRatio: 0.40, tortuosity: 1.25, symmetry: 0.88 },
];

export function simulateVisionPipeline(): Omit<ScanResult, "id" | "date" | "eye" | "imageUrl"> {
  const jitter = (base: number, range: number) => +(base + (Math.random() - 0.5) * range).toFixed(3);
  return {
    avr: jitter(0.72, 0.12),
    cupDiscRatio: jitter(0.35, 0.15),
    tortuosity: jitter(1.12, 0.3),
    symmetry: jitter(0.95, 0.15),
  };
}

export const biomarkerInfo = {
  avr: {
    label: "Vessel Diameter Ratio (AVR)",
    description: "Ratio of artery width to vein width. Deviations may indicate hypertensive retinopathy.",
    unit: "",
    clinical: "Hypertension",
  },
  cupDiscRatio: {
    label: "Optic Disc-to-Cup Ratio",
    description: "Ratio of the optic cup to the optic disc. Elevated values are associated with glaucoma risk.",
    unit: "",
    clinical: "Glaucoma",
  },
  tortuosity: {
    label: "Vessel Tortuosity Score",
    description: "Measures curvature of retinal vessels. Increased tortuosity correlates with vascular stress.",
    unit: "",
    clinical: "Hypertension",
  },
  symmetry: {
    label: "Inter-Quadrant Brightness Symmetry",
    description: "Pixel intensity symmetry across retinal quadrants. Asymmetry may signal neuro-vascular changes.",
    unit: "",
    clinical: "Neuro-vascular",
  },
};
