import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { WMOInterpreter, WMOComponent } from "../wmoUtil";
import MaterialSymbolsFavoriteOutlineSharp from "~icons/material-symbols/favorite-outline-sharp";
import MaterialSymbolsFavoriteSharp from "~icons/material-symbols/favorite-sharp";
// first an interface for just one object.

interface CurrentWeatherObject {
  weather: { [key: string]: any };
}

export default function Main({ weather }: CurrentWeatherObject) {
  console.log(weather);
  return (
    <main className="flex-1 mx-10 ">
      <div className="grid pt-7 grid-row-3 grid-cols-4">
        <Card>
          <CardHeader color="blue-gray" className="text-center">
            <Typography variant="h5" className="mb-2 flex justify-center">
              {weather.fetchLongLat[0].name}
            </Typography>
            <Typography variant="h6">
              {weather.fetchLongLat[0].state}
            </Typography>

            <Typography>
              temperature:{" "}
              {weather.processWeekWeather.current_weather.temperature}C°
            </Typography>

            <Typography>
              weather:{" "}
              {WMOInterpreter(
                weather.processWeekWeather.current_weather.weathercode
              )}{" "}
              {WMOComponent(
                weather.processWeekWeather.current_weather.weathercode
              )}
            </Typography>
          </CardHeader>
          <CardBody color="orange" className=" flex justify-center gap-2 ">
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[0])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[0] +
                    weather.processWeekWeather.daily.temperature_2m_min[0]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Mon</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[1])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[1] +
                    weather.processWeekWeather.daily.temperature_2m_min[1]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Tue</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[2])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[2] +
                    weather.processWeekWeather.daily.temperature_2m_min[2]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Wed</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[3])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[3] +
                    weather.processWeekWeather.daily.temperature_2m_min[3]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Thu</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[4])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[4] +
                    weather.processWeekWeather.daily.temperature_2m_min[4]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Fri</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[5])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[5] +
                    weather.processWeekWeather.daily.temperature_2m_min[5]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Sat</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[6])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[6] +
                    weather.processWeekWeather.daily.temperature_2m_min[6]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Sun</Typography>
            </div>
          </CardBody>
          <CardFooter>
            <span>
              Favorite:{" "}
              {
                <>
                  <MaterialSymbolsFavoriteOutlineSharp />
                  <MaterialSymbolsFavoriteSharp />
                </>
              }
            </span>
          </CardFooter>
        </Card>{" "}
        <Card>
          <CardHeader color="blue-gray">
            <Typography variant="h5" className="mb-2 flex justify-center">
              {weather.fetchLongLat[0].name}, {weather.fetchLongLat[0].state}
            </Typography>
            <div>
              <ul>
                <Typography>
                  temperature:{" "}
                  {weather.processWeekWeather.current_weather.temperature}C°
                </Typography>

                <Typography variant="li">
                  weather:{" "}
                  {WMOInterpreter(
                    weather.processWeekWeather.current_weather.weathercode
                  )}{" "}
                  {WMOComponent(
                    weather.processWeekWeather.current_weather.weathercode
                  )}
                </Typography>
              </ul>
            </div>
          </CardHeader>
          <CardBody color="orange" className=" flex justify-center gap-2 ">
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[0])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[0] +
                    weather.processWeekWeather.daily.temperature_2m_min[0]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Mon</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[1])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[1] +
                    weather.processWeekWeather.daily.temperature_2m_min[1]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Tue</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[2])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[2] +
                    weather.processWeekWeather.daily.temperature_2m_min[2]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Wed</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[3])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[3] +
                    weather.processWeekWeather.daily.temperature_2m_min[3]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Thu</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[4])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[4] +
                    weather.processWeekWeather.daily.temperature_2m_min[4]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Fri</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[5])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[5] +
                    weather.processWeekWeather.daily.temperature_2m_min[5]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Sat</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[6])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[6] +
                    weather.processWeekWeather.daily.temperature_2m_min[6]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Sun</Typography>
            </div>
          </CardBody>
          <CardFooter>
            <span>
              Favorite:{" "}
              {
                <>
                  <MaterialSymbolsFavoriteOutlineSharp />
                  <MaterialSymbolsFavoriteSharp />
                </>
              }
            </span>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader color="blue-gray">
            <Typography variant="h5" className="mb-2 flex justify-center">
              {weather.fetchLongLat[0].name}, {weather.fetchLongLat[0].state}
            </Typography>
            <div>
              <ul>
                <Typography>
                  temperature:{" "}
                  {weather.processWeekWeather.current_weather.temperature}C°
                </Typography>

                <Typography variant="li">
                  weather:{" "}
                  {WMOInterpreter(
                    weather.processWeekWeather.current_weather.weathercode
                  )}{" "}
                  {WMOComponent(
                    weather.processWeekWeather.current_weather.weathercode
                  )}
                </Typography>
              </ul>
            </div>
          </CardHeader>
          <CardBody color="orange" className=" flex justify-center gap-2 ">
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[0])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[0] +
                    weather.processWeekWeather.daily.temperature_2m_min[0]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Mon</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[1])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[1] +
                    weather.processWeekWeather.daily.temperature_2m_min[1]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Tue</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[2])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[2] +
                    weather.processWeekWeather.daily.temperature_2m_min[2]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Wed</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[3])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[3] +
                    weather.processWeekWeather.daily.temperature_2m_min[3]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Thu</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[4])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[4] +
                    weather.processWeekWeather.daily.temperature_2m_min[4]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Fri</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[5])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[5] +
                    weather.processWeekWeather.daily.temperature_2m_min[5]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Sat</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[6])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[6] +
                    weather.processWeekWeather.daily.temperature_2m_min[6]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Sun</Typography>
            </div>
          </CardBody>
          <CardFooter>
            <span>
              Favorite:{" "}
              {
                <>
                  <MaterialSymbolsFavoriteOutlineSharp />
                  <MaterialSymbolsFavoriteSharp />
                </>
              }
            </span>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader color="blue-gray">
            <Typography variant="h5" className="mb-2 flex justify-center">
              {weather.fetchLongLat[0].name}, {weather.fetchLongLat[0].state}
            </Typography>
            <div>
              <ul>
                <Typography>
                  temperature:{" "}
                  {weather.processWeekWeather.current_weather.temperature}C°
                </Typography>

                <Typography variant="li">
                  weather:{" "}
                  {WMOInterpreter(
                    weather.processWeekWeather.current_weather.weathercode
                  )}{" "}
                  {WMOComponent(
                    weather.processWeekWeather.current_weather.weathercode
                  )}
                </Typography>
              </ul>
            </div>
          </CardHeader>
          <CardBody color="orange" className=" flex justify-center gap-2 ">
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[0])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[0] +
                    weather.processWeekWeather.daily.temperature_2m_min[0]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Mon</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[1])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[1] +
                    weather.processWeekWeather.daily.temperature_2m_min[1]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Tue</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[2])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[2] +
                    weather.processWeekWeather.daily.temperature_2m_min[2]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Wed</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[3])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[3] +
                    weather.processWeekWeather.daily.temperature_2m_min[3]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Thu</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[4])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[4] +
                    weather.processWeekWeather.daily.temperature_2m_min[4]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Fri</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[5])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[5] +
                    weather.processWeekWeather.daily.temperature_2m_min[5]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Sat</Typography>
            </div>
            <div>
              <Typography variant={"small"}>
                {WMOComponent(weather.processWeekWeather.daily.weathercode[6])}
              </Typography>
              <Typography variant={"small"}>
                {(
                  (weather.processWeekWeather.daily.temperature_2m_max[6] +
                    weather.processWeekWeather.daily.temperature_2m_min[6]) /
                  2
                ).toFixed(1)}{" "}
                °C
              </Typography>
              <Typography variant={"small"}>Sun</Typography>
            </div>
          </CardBody>
          <CardFooter>
            <span>
              Favorite:{" "}
              {
                <>
                  <MaterialSymbolsFavoriteOutlineSharp />
                  <MaterialSymbolsFavoriteSharp />
                </>
              }
            </span>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
