import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { apiCall2CustomObjects } from "../interfaces";
import { WMOInterpreter, WMOComponent } from "../wmoUtil";

interface WeatherCardInterface {
  weather: apiCall2CustomObjects.Weather;
}

/**
 * takes one Weather object, probably passed from an array.
 * so basically I need to find out
 * @returns weather card
 */
export default function WeatherCard({ weather }: WeatherCardInterface) {
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
  return (
    <>
      <Card className="bg-brown-800">
        <CardHeader color="blue-gray" className="text-center">
          <Typography
            variant="h5"
            className="mb-2 flex justify-center xs:my-4 xs:text-2xl"
          >
            {weather.cityname}
          </Typography>
          <Typography className="xs:text-xl xs:my-4">
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
        <CardBody className="flex justify-center gap-2 text-white">
          {returnTheWeek(weather)}
        </CardBody>
        <CardFooter>{""}</CardFooter>
      </Card>
    </>
  );
}
