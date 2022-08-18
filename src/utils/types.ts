export interface WeatherResponse {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lat: number; lon: number };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: { description: string; icon: string; id: number; main: string }[];
  wind: { deg: number; speed: number };
}

export interface ForecastResponse {
  city: {
    coord: { lat: number; lon: number };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  message: number;
  cod: string;
  list: {
    clouds: {
      all: number;
    };
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    pop: number;
    sys: {
      pod: string;
    };
    visibility: number;
    weather: { description: string; icon: string; id: number; main: string }[];
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
  }[];
}
