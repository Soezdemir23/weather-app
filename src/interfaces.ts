declare module apiCall2CustomObjects {
  export interface CityInformation {
    name: string;
    local_names: Record<string, string>;
    lat: number;
    lon: number;
    state: string;
    country: string;
  }

  export interface Weather {
    cityname: string;
    countrycode: string;
    state: string;
    currentWeather: apiCalledFromMeteo.CurrentWeather;
    dailiesWeather: apiCalledFromMeteo.Daily;
  }
}

declare module apiCalledFromMeteo {
  export interface CurrentWeather {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
  }

  export interface DailyUnits {
    time: string;
    weathercode: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    rain_sum: string;
  }

  export interface Daily {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    rain_sum: number[];
  }

  export interface RootObject {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_weather: CurrentWeather;
    daily_units: DailyUnits;
    daily: Daily;
  }
}
// told TypeScript I want to use it as a module
// told TypeScript I want to use it as a module
export type { apiCalledFromMeteo, apiCall2CustomObjects };
