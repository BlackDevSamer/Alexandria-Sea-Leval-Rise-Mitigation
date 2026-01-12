import { useRiskStore } from "../store/riskStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

export const RiskCharts = () => {
  const { dashboardData, populationData, isLoading } = useRiskStore();

  if (isLoading || !dashboardData || !populationData) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
        <div className="bg-white p-6 rounded-xl shadow h-80 bg-gray-100"></div>
        <div className="bg-white p-6 rounded-xl shadow h-80 bg-gray-100"></div>
      </div>
    );
  }

  // Transform data for charts
  // This is a simplified transformation. In a real app, we might want historical data in the store.
  // For now, we simulate history or just show distribution.

  const riskDistributionData = [
    { name: "منخفض", value: 30, color: "#4CAF50" },
    { name: "متوسط", value: 45, color: "#FFC107" },
    { name: "مرتفع", value: 15, color: "#FF9800" },
    { name: "شديد", value: 10, color: "#F44336" },
  ];

  // We can show the population exposure per Qism
  const qismRiskData = populationData.qisms.map((q) => ({
    name: q.name,
    exposed: q.exposedPopulation,
    risk: q.riskLevel,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="bg-white p-4 border border-gray-100 shadow-xl rounded-lg text-right"
          dir="rtl"
        >
          <p className="font-bold text-gray-800 mb-2">{label}</p>
          <p className="text-sm text-blue-600">
            السكان المعرضين للخطر:{" "}
            <span className="font-mono font-bold">
              {payload[0].value.toLocaleString()}
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {payload[0].payload.risk}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" dir="rtl">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            السكان المعرضين للخطر
          </h3>
          <div className="text-3xl font-bold text-gray-800">
            {dashboardData.populationAtRisk}
          </div>
          <div className="text-xs text-red-500 mt-2 font-medium">
            ↑ متزايد مع مرور الوقت
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            المساحة المغمورة (كم²)
          </h3>
          <div className="text-3xl font-bold text-blue-600">
            {dashboardData.floodedAreaKm2}
          </div>
          <div className="text-xs text-blue-400 mt-2 font-medium">
            مساحة اليابسة المتأثرة
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-1">
            المناطق الأكثر تضرراً
          </h3>
          <div className="flex flex-wrap gap-1 mt-2">
            {dashboardData.highRiskAreas.slice(0, 3).map((area) => (
              <span
                key={area}
                className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-bold border border-red-100"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        dir="rtl"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">
          تحليل المخاطر حسب المنطقة (القسم)
        </h3>
        <div className="h-[300px] w-full" dir="ltr">
          {" "}
          {/* ltr for chart layout, tooltip handles rtl */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={qismRiskData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "transparent" }}
              />
              <Bar dataKey="exposed" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                {qismRiskData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.risk === "شديد"
                        ? "#EF4444"
                        : entry.risk === "مرتفع"
                        ? "#F59E0B"
                        : "#10B981"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution Pie Chart (Placeholder logic for demo) */}
      <div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        dir="rtl"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">
          توزيع مستويات الخطورة
        </h3>
        <div
          className="h-[250px] w-full flex items-center justify-center"
          dir="ltr"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {riskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
