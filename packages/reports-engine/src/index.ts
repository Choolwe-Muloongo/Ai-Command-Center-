export type ReportConfig = { id: string; title: string; queryKey: string };
export const tenantRentalReports: ReportConfig[] = [
  { id: "occupancy", title: "Occupancy Snapshot", queryKey: "occupancy.snapshot" },
  { id: "rent-roll", title: "Rent Roll", queryKey: "rent.roll" }
];
