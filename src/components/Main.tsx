import { apiCall2CustomObjects } from "../interfaces";

import WeatherCard from "./WeatherCard";
// first an interface for just one object.

interface CurrentWeatherInterface {
  weather: apiCall2CustomObjects.Weather;
  results: { [key: string]: any }[];
}

export default function Main({ weather, results }: CurrentWeatherInterface) {
  // use a let first. Later go for a Ref. Maybe use state if you necessarily need to re-render it.
  // I can't test the object, stupid read write. Might as well pass it to this main after I have put it all into a query run and return it.

  // There is a problem with the daily weather being rendered automatically due to constrains of the JSON properties etc.
  // , which would make life easier

  if (weather === undefined || weather === null) {
    return (
      <>
        <h1>...weather data is missing or mangled</h1>
      </>
    );
  }

  return (
    <main className="flex-1 mx-10">
      <div className="grid pt-7 grid-row-3 grid-cols-4">
        <WeatherCard weather={weather} />
      </div>
    </main>
  );
}
