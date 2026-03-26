export interface PerformanceDataPoint {
  date: string;
  invested: number;
  value: number;
}

export function generatePortfolioData(): PerformanceDataPoint[] {
  const data: PerformanceDataPoint[] = [];

  // Fund started deploying in Jan 2024
  const investments = [
    { month: "2024-01", amount: 2000000 }, // LunarLogistics
    { month: "2024-03", amount: 1500000 }, // NovaSenescence
    { month: "2024-05", amount: 1200000 }, // EpigenReset
    { month: "2024-06", amount: 800000 }, // OrbitMaterials
    { month: "2024-08", amount: 700000 }, // AstroFarm
    { month: "2024-09", amount: 500000 }, // CryoGenix
  ];

  let totalInvested = 0;
  let investmentIdx = 0;

  // Generate monthly data from Jan 2024 to current
  const startDate = new Date(2024, 0, 1);
  const now = new Date();

  for (
    let d = new Date(startDate);
    d <= now;
    d = new Date(d.getFullYear(), d.getMonth() + 1, 1)
  ) {
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

    // Add any new investments for this month
    while (
      investmentIdx < investments.length &&
      investments[investmentIdx].month <= monthKey
    ) {
      totalInvested += investments[investmentIdx].amount;
      investmentIdx++;
    }

    if (totalInvested === 0) continue;

    // Calculate months since first investment for growth curve
    const monthsSinceStart =
      (d.getFullYear() - 2024) * 12 + d.getMonth();

    // Simulate portfolio appreciation with some variance
    // Average ~2% monthly growth, with slight randomness seeded by month
    const seed = monthsSinceStart * 7 + 13;
    const pseudoRandom = ((Math.sin(seed) * 10000) % 1 + 1) % 1;
    const monthlyGrowth = 1 + 0.015 + pseudoRandom * 0.015;

    const previousValue =
      data.length > 0 ? data[data.length - 1].value : totalInvested;
    const newInvestmentThisMonth =
      investmentIdx > 0 &&
      investments[investmentIdx - 1]?.month === monthKey
        ? investments[investmentIdx - 1].amount
        : 0;

    const value = Math.round(
      (previousValue - (data.length > 0 ? 0 : 0)) * monthlyGrowth +
        newInvestmentThisMonth
    );

    data.push({
      date: d.toISOString(),
      invested: totalInvested,
      value: Math.max(value, totalInvested * 0.9), // Floor at 90% of invested
    });
  }

  // Ensure final value matches fund summary (~1.4x MOIC)
  if (data.length > 0) {
    data[data.length - 1].value = 9380000; // ~1.4x of 6.7M deployed
  }

  return data;
}
