import { Calendar, Filter, MapPin } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import BottomCard from "../components/predictions/BottomCard";

const zones = [
  {
    id: 1,
    name: "Incheon Songdo-dong",
    lat: 37.3944,
    lng: 126.6328,
  },
  { id: 2, name: "Jeju-do", lat: 33.4996, lng: 126.5312 },
  { id: 3, name: "Busan", lat: 35.1796, lng: 129.0756 },
  { id: 4, name: "Sokcho", lat: 38.2056, lng: 128.5914 },
  { id: 5, name: "Chuncheon", lat: 37.8813, lng: 127.7298 },
];

const monthlyData = [
  { month: "Jan", carbon: 420, vegetation: 65 },
  { month: "Feb", carbon: 390, vegetation: 68 },
  { month: "Mar", carbon: 410, vegetation: 70 },
  { month: "Apr", carbon: 380, vegetation: 75 },
  { month: "May", carbon: 350, vegetation: 79 },
  { month: "Jun", carbon: 320, vegetation: 85 },
  { month: "Jul", carbon: 300, vegetation: 88 },
  { month: "Aug", carbon: 310, vegetation: 86 },
  { month: "Sep", carbon: 340, vegetation: 82 },
  { month: "Oct", carbon: 370, vegetation: 77 },
  { month: "Nov", carbon: 400, vegetation: 73 },
  { month: "Dec", carbon: 430, vegetation: 70 },
];

const forecastData = [
  { month: "Jan", actual: 420, predicted: 415 },
  { month: "Feb", actual: 390, predicted: 395 },
  { month: "Mar", actual: 410, predicted: 405 },
  { month: "Apr", actual: 380, predicted: 385 },
  { month: "May", actual: 350, predicted: 355 },
  { month: "Jun", actual: 320, predicted: 325 },
  { month: "Jul", actual: 300, predicted: null },
  { month: "Aug", actual: null, predicted: 305 },
  { month: "Sep", actual: null, predicted: 335 },
  { month: "Oct", actual: null, predicted: 365 },
  { month: "Nov", actual: null, predicted: 395 },
  { month: "Dec", actual: null, predicted: 420 },
];

const PredictionsPage = () => {
  const [timeRange, setTimeRange] = useState("year");
  const [dataView, setDataView] = useState("carbon");
  const [selectedZone, setSelectedZone] = useState(zones[0]);

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const zoneId = parseInt(e.target.value);
    const zone = zones.find((z) => z.id === zoneId);
    if (zone) setSelectedZone(zone);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">
          Carbon Emissions Predictions
        </h1>

        <div className="flex space-x-4">
          <div className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm">
            <MapPin size={16} className="text-gray-500" />
            <select
              className="bg-transparent pr-8 focus:outline-none"
              value={selectedZone.id}
              onChange={handleZoneChange}
            >
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm">
            <Calendar size={16} className="text-gray-500" />
            <select
              className="bg-transparent pr-8 focus:outline-none"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm">
            <Filter size={16} className="text-gray-500" />
            <select
              className="bg-transparent pr-8 focus:outline-none"
              value={dataView}
              onChange={(e) => setDataView(e.target.value)}
            >
              <option value="carbon">Carbon Emissions</option>
              <option value="vegetation">Vegetation Index</option>
              <option value="correlation">Correlation Analysis</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            {dataView === "carbon"
              ? "Carbon Emissions Trend"
              : dataView === "vegetation"
              ? "Vegetation Index Trend"
              : "Carbon-Vegetation Correlation"}
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {dataView === "correlation" ? (
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={timeRange === "month" ? "day" : "month"} />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="carbon"
                    name="Carbon Emissions (ppm)"
                    stroke="#EF4444"
                    fill="#FEE2E2"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="vegetation"
                    name="Vegetation Index (%)"
                    stroke="#10B981"
                    fill="#D1FAE5"
                  />
                </AreaChart>
              ) : (
                <LineChart
                  data={monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={timeRange === "month" ? "day" : "month"} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {dataView === "carbon" ? (
                    <Line
                      type="monotone"
                      dataKey="carbon"
                      name="Carbon Emissions (ppm)"
                      stroke="#EF4444"
                      activeDot={{ r: 8 }}
                    />
                  ) : (
                    <Line
                      type="monotone"
                      dataKey="vegetation"
                      name="Vegetation Index (%)"
                      stroke="#10B981"
                      activeDot={{ r: 8 }}
                    />
                  )}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Forecast vs Actual
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={forecastData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={timeRange === "month" ? "day" : "month"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual Emissions"
                  stroke="#1E40AF"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  name="Predicted Emissions"
                  stroke="#EF4444"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <BottomCard />
    </div>
  );
};

export default PredictionsPage;
