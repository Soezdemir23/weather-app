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

  //I tried to make the kids inherit some properties,
  // but i guess that's not gonna fly
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
        <div
          key={index}
          className="flex flex-col items-center justify-center mx-1"
        >
          <Typography variant={"small"} className="md:text-xl md:my-2">
            {" "}
            {WMOComponent(theWeather.dailiesWeather.weathercode[index])}
          </Typography>
          <Typography
            variant={"small"}
            className="flex flex-col items-center my-1 md:text-lg"
          >
            <span>
              {(
                (theWeather.dailiesWeather.temperature_2m_max[index] +
                  theWeather.dailiesWeather.temperature_2m_min[index]) /
                2
              ).toFixed(1)}
            </span>
            <span>°C</span>
          </Typography>
          <Typography variant={"small"} className="">
            {indexToDayName(index)}
          </Typography>
        </div>
      );
    }
    return theWeek;
  }
  return (
    <Card className="bg-brown-800 h-max self-center only:col-span-full w-11/12 md:w-72 lg:w-80 ">
      <CardHeader className="min-w-max m-auto -mt-5 text-center w-11/12 bg-orange-700 text-white md:w-5/6 ">
        <Typography variant="h5" className="flex justify-center my-4 -mb-2">
          {weather.cityname}
        </Typography>
        <Typography className=" -mb-2 md:text-lg">
          {weather.state + ", " + weather.countrycode}
        </Typography>
        <Typography className="md:text-lg">
          Temperature: {weather.currentWeather.temperature} °C
        </Typography>
        <Typography className="-mt-2 md:text-lg lg:text-xl">
          Weather: {WMOInterpreter(weather.currentWeather.weathercode)}
          {WMOComponent(weather.currentWeather.weathercode)}
        </Typography>
      </CardHeader>
      <CardBody className="flex justify-center text-white">
        {returnTheWeek(weather)}
      </CardBody>
      <CardFooter className="text-white">
        {""}I will have a feature soon
      </CardFooter>
    </Card>
  );
}
