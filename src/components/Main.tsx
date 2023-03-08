import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { apiCall2CustomObjects } from "../interfaces";

import { WMOInterpreter, WMOComponent } from "../wmoUtil";
// first an interface for just one object.

interface CurrentWeatherObject {
  weather: apiCall2CustomObjects.Weather;
  results: { [key: string]: any }[];
}

export default function Main({ weather, results }: CurrentWeatherObject) {
  // use a let first. Later go for a Ref. Maybe use state if you necessarily need to re-render it.
  // I can't test the object, stupid read write. Might as well pass it to this main after I have put it all into a query run and return it.

  // There is a problem with the daily weather being rendered automatically due to constrains of the JSON properties etc.
  // , which would make life easier
  function indexToDayName(number: number): string {
    switch (number) {
      case 0:
        return "Mon";
      case 1:
        return "Tue";
      case 2:
        return "Wed";
      case 3:
        return "Thu";
      case 4:
        return "Fri";
      case 5:
        return "Sat";
      case 6:
        return "Sun";
      default:
        return "Unknown day " + number;
    }
  }

  function returnTheWeek(
    theWeather: apiCall2CustomObjects.Weather
  ): React.ReactElement[] | React.ReactElement {
    let theWeek: React.ReactElement[] = [];
    if (
      theWeather.dailiesWeather === undefined ||
      theWeather.dailiesWeather.weathercode === undefined ||
      theWeather.dailiesWeather.temperature_2m_max === undefined ||
      theWeather.dailiesWeather.temperature_2m_min === undefined
    )
      return <p>Problem with the passed object, weather unavailable</p>;
    for (
      let index = 0;
      index < theWeather.dailiesWeather?.weathercode?.length;
      index++
    ) {
      theWeek.push(
        <div key={index}>
          <Typography variant={"small"}>
            {" "}
            {WMOComponent(theWeather.dailiesWeather.weathercode[index])}
          </Typography>
          <Typography variant={"small"}>
            {(
              (theWeather.dailiesWeather.temperature_2m_max[index] +
                theWeather.dailiesWeather.temperature_2m_min[index]) /
              2
            ).toFixed(1)}{" "}
            °C
          </Typography>
          <Typography variant={"small"}>{indexToDayName(index)}</Typography>
        </div>
      );
    }
    return theWeek;
  }

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
        <Card>
          <CardHeader color="blue-gray" className="text-center">
            <Typography variant="h5" className="mb-2 flex justify-center">
              {weather.cityname}
            </Typography>
            <Typography>
              {weather.state + ", " + weather.countrycode}
            </Typography>
            <Typography>
              temperature: {weather.currentWeather.temperature} °C
            </Typography>
            <Typography>
              weather: {WMOInterpreter(weather.currentWeather.weathercode)}
              {WMOComponent(weather.currentWeather.weathercode)}
            </Typography>
          </CardHeader>
          <CardBody className="flex justify-center gap-2">
            {returnTheWeek(weather)}
          </CardBody>
          <CardFooter>asdf</CardFooter>
        </Card>
      </div>
    </main>
  );
}
