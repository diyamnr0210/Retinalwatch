import HealthTrendChart from "@/components/HealthTrendChart";
import RecentScans from "@/components/RecentScans";

const Dashboard = () => (
  <div className="container py-6 space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Monitor your retinal health biomarkers over time</p>
    </div>
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <HealthTrendChart />
      </div>
      <div className="lg:col-span-2">
        <RecentScans />
      </div>
    </div>
  </div>
);

export default Dashboard;
