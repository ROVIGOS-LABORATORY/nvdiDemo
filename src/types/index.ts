// Zone type
export interface Zone {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

// NDVI data point
export interface NDVIDataPoint {
  date: string;
  value: number;
}

// Carbon emissions data point
export interface CarbonDataPoint {
  month: string;
  carbon: number;
  vegetation?: number;
}

// Forecast data point
export interface ForecastDataPoint {
  month: string;
  actual: number | null;
  predicted: number | null;
}