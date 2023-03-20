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
        <div key={index} className="flex flex-col items-center ">
          <Typography
            variant={"small"}
            className="xs:text-xl xs:mb-3 ipad-air:text-2xl"
          >
            {" "}
            {WMOComponent(theWeather.dailiesWeather.weathercode[index])}
          </Typography>
          <Typography
            variant={"small"}
            className="flex flex-col items-center xs:text-lg xs:-my-3 ipad-air:text-2xl"
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
          <Typography
            variant={"small"}
            className="xs:text-lg xs:-mb-8 ipad-air:text-2xl"
          >
            {indexToDayName(index)}
          </Typography>
        </div>
      );
    }
    return theWeek;
  }
  return (
    <Card className="bg-brown-800 only:bg-white mx-2">
      <CardHeader
        color="blue-gray"
        className="text-center xs:px-5 ipad-air:w-80 ipad-air:relative ipad-air:left-28"
      >
        <Typography
          variant="h5"
          className="mb-2 flex justify-center xs:my-4 xs:text-2xl"
        >
          {weather.cityname}
        </Typography>
        <Typography className="xs:text-2xl xs:-my-2 mobile-m: ipad-air:text-2xl">
          {weather.state + ", " + weather.countrycode}
        </Typography>
        <Typography className="xs:text-2xl xs:my-4 ipad-air:text-2xl">
          temperature: {weather.currentWeather.temperature} °C
        </Typography>
        <Typography className="xs:text-2xl xs:-mt-2">
          weather: {WMOInterpreter(weather.currentWeather.weathercode)}
          {WMOComponent(weather.currentWeather.weathercode)}
        </Typography>
      </CardHeader>
      <CardBody className="flex justify-center gap-2 text-white ipad-air:relative ipad-air:left-3">
        {returnTheWeek(weather)}
      </CardBody>
      <CardFooter className="text-white">
        {""}I will have a feature soon
      </CardFooter>
    </Card>
  );
}
