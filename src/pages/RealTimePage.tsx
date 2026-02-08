import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import React, { useMemo, useState } from "react";

import busan from "../assets/images/mockImage/old/busan.png";
import chuncheon from "../assets/images/mockImage/old/chuncheon.png";
import jejudo from "../assets/images/mockImage/old/jejudo.png";
import sokcho from "../assets/images/mockImage/old/sockcho.png";
import songdo from "../assets/images/mockImage/old/songdo.png";

import { useQuery } from "@tanstack/react-query";
import busanNew from "../assets/images/mockImage/recent/busan.png";
import chuncheonNew from "../assets/images/mockImage/recent/chuncheon.png";
import jejudoNew from "../assets/images/mockImage/recent/jejudo.png";
import sokchoNew from "../assets/images/mockImage/recent/sockcho.png";
import songdoNew from "../assets/images/mockImage/recent/songdo.png";
import Loading from "../components/Loading";
import WeatherCompo from "../components/realtime/WeatherCompo";
import NdviService from "../service/ndvi/NdviService";

const zones = [
  {
    id: 1,
    name: "Incheon Songdo-dong",
    apiName: "songdo",
    lat: 37.3944,
    lng: 126.6328,
    imgOld: songdo,
    imgNew: songdoNew,
  },
  {
    id: 2,
    name: "Jeju-do",
    apiName: "jejudo",
    lat: 33.4996,
    lng: 126.5312,
    imgOld: jejudo,
    imgNew: jejudoNew,
  },
  {
    id: 3,
    name: "Busan",
    apiName: "busan",
    lat: 35.1796,
    lng: 129.0756,
    imgOld: busan,
    imgNew: busanNew,
  },
  {
    id: 4,
    name: "Sokcho",
    apiName: "sokcho",
    lat: 38.2056,
    lng: 128.5914,
    imgOld: sokcho,
    imgNew: sokchoNew,
  },
  {
    id: 5,
    name: "Chuncheon",
    apiName: "chuncheon",
    lat: 37.8813,
    lng: 127.7298,
    imgOld: chuncheon,
    imgNew: chuncheonNew,
  },
];

const dates = {
  past: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    .toISOString()
    .split("T")[0],
  present: new Date().toISOString().split("T")[0],
};

const RealTimePage = () => {
  const [selectedZone, setSelectedZone] = useState(zones[0]);
  const [coord, setCoord] = useState({
    lat: selectedZone.lat,
    lng: selectedZone.lng,
  });

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["ndviData", selectedZone.name],
    queryFn: () => NdviService.getNdviPerPlace(selectedZone.apiName),
    retry: 2,
  });

  const ndviPast = 0.67;
  const ndviPresent = 0.72;
  const ndviDifference = (((ndviPresent - ndviPast) / ndviPast) * 100).toFixed(
    2
  );
  const ndviTrend = ndviPresent > ndviPast ? "positive" : "negative";

  const rightSideImg = useMemo(() => {
    return zones.find((zone) => zone.id === selectedZone.id)?.imgNew || "";
  }, [selectedZone.id]);

  const leftSideImg = useMemo(() => {
    return zones.find((zone) => zone.id === selectedZone.id)?.imgOld || "";
  }, [selectedZone.id]);

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const zoneId = parseInt(e.target.value);
    const zone = zones.find((z) => z.id === zoneId);
    if (zone) {
      setSelectedZone(zone);
      setCoord({ lat: zone.lat, lng: zone.lng });
    }
  };

  console.log(data);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Real-Time Analysis</h1>

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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Past Image */}

        <div className="bg-white p-4 rounded-lg shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-500" />
              <span className="font-medium text-gray-700">
                {format(new Date(dates.past), "MMMM d, yyyy")}
              </span>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <div className="text-red-500">Error loading data</div>
          ) : isSuccess && data ? (
            <div className={"relative rounded-lg overflow-hidden"}>
              <img
                src={leftSideImg}
                alt={`${selectedZone.name} on ${dates.past}`}
                className="w-full h-auto rounded-lg object-cover aspect-video"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                NDVI: {data.ndvi_past}
              </div>
            </div>
          ) : null}
        </div>

        {/* <div className="bg-white p-4 rounded-lg shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-500" />
              <span className="font-medium text-gray-700">
                {format(new Date(dates.past), "MMMM d, yyyy")}
              </span>
            </div>
          </div>

          <div className={"relative rounded-lg overflow-hidden"}>
            <img
              src={leftSideImg}
              alt={`${selectedZone.name} on ${dates.past}`}
              className="w-full h-auto rounded-lg object-cover aspect-video"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
              NDVI: {data.ndvi_past}
            </div>
          </div>
        </div> */}

        {/* Present Image */}
        <div className="bg-white p-4 rounded-lg shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-500" />
              <span className="font-medium text-gray-700">
                {format(new Date(dates.present), "MMMM d, yyyy")}
              </span>
            </div>
          </div>

          {isLoading ? (
            <Loading />
          ) : isError ? (
            <div className="text-red-500">Error loading data</div>
          ) : isSuccess && data ? (
            <div className={"relative rounded-lg overflow-hidden"}>
              <img
                src={rightSideImg}
                alt={`${selectedZone.name} on ${dates.present}`}
                className="w-full h-auto rounded-lg object-cover aspect-video"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                NDVI: {data.ndvi_current}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Analysis Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Analysis</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">NDVI Change:</span>
              <span
                className={`font-medium ${
                  ndviTrend === "positive" ? "text-green-600" : "text-red-600"
                }`}
              >
                {ndviTrend === "positive" ? "+" : ""}
                {ndviDifference}%
              </span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  ndviTrend === "positive" ? "bg-green-500" : "bg-red-500"
                }`}
                style={{ width: `${Math.abs(parseFloat(ndviDifference))}%` }}
              ></div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-medium text-gray-800 mb-2">Interpretation</h3>
              <p className="text-gray-600 text-sm">
                {ndviTrend === "positive"
                  ? `The NDVI has increased by ${ndviDifference}% in the selected region, indicating improved vegetation health and density. This suggests successful conservation efforts and potential increased carbon sequestration.`
                  : `The NDVI has decreased by ${Math.abs(
                      parseFloat(ndviDifference)
                    )}% in the selected region, indicating vegetation stress or loss. This may lead to reduced carbon sequestration capacity and requires attention.`}
              </p>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Location Information
          </h2>

          <div className="space-y-4">
            <div>
              <span className="text-gray-600 block mb-1">Region Name:</span>
              <span className="font-medium text-gray-800">
                {selectedZone.name}
              </span>
            </div>

            <div>
              <span className="text-gray-600 block mb-1">Coordinates:</span>
              <span className="font-medium text-gray-800">
                {selectedZone.lat.toFixed(4)}°, {selectedZone.lng.toFixed(4)}°
              </span>
            </div>

            <WeatherCompo coord={coord} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimePage;
