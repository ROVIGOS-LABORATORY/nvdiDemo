import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const WeatherCompo = ({ coord }: { coord: { lat: number; lng: number } }) => {
  const fetchWeatherData = async ({
    queryKey,
  }: {
    queryKey: [string, { lat: number; lon: number }];
  }) => {
    const API_KEY = "b5599f0e60098977ef1d02bb820b93d1"; // API key for OpenWeatherMap
    const [, { lat, lon }] = queryKey;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  };

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["listLocationPage"],
    queryFn: () =>
      fetchWeatherData({
        queryKey: ["listLocationPage", { lat: coord.lat, lon: coord.lng }],
      }),
  });

  if (isLoading) {
    return <div className="text-gray-500">Loading weather data...</div>;
  }
  if (isError) {
    return <div className="text-red-500">Error fetching weather data</div>;
  }
  if (!isSuccess || !data) {
    return <div className="text-gray-500">No weather data available</div>;
  }
  return (
    <div className="pt-4 border-t">
      <h3 className="font-medium text-gray-800 mb-2">Environmental Factors</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        <li className="flex items-center justify-between">
          <span>Average Temperature:</span>
          <span>{data.main.temp}°C</span>
        </li>
        <li className="flex items-center justify-between">
          <span>Annual Rainfall:</span>
          <span>{Math.floor(Math.random() * 10000).toFixed(2)} mm</span>
        </li>
        <li className="flex items-center justify-between">
          <span>Dominant Vegetation:</span>
          <span>---</span>
        </li>
        <li className="flex items-center justify-between">
          <span>Carbon Storage Potential:</span>
          <span>---</span>
        </li>
      </ul>
    </div>
  );
};

export default WeatherCompo;
