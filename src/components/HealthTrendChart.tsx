import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mockScans } from "@/lib/mockData";

const chartData = [...mockScans].reverse().map((s) => ({
  date: new Date(s.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  AVR: s.avr,
  "Cup/Disc": s.cupDiscRatio,
  Tortuosity: s.tortuosity,
  Symmetry: s.symmetry,
}));

const lines = [
  { key: "AVR", color: "hsl(210, 80%, 45%)" },
  { key: "Cup/Disc", color: "hsl(152, 60%, 42%)" },
  { key: "Tortuosity", color: "hsl(38, 92%, 50%)" },
  { key: "Symmetry", color: "hsl(280, 60%, 55%)" },
];

const HealthTrendChart = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">Health Trends</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
            <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            {lines.map((l) => (
              <Line
                key={l.key}
                type="monotone"
                dataKey={l.key}
                stroke={l.color}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default HealthTrendChart;
