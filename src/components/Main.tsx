import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

// first an interface for just one object.

interface CurrentWeatherObject {
  weather: { [key: string]: any };
}

export default function Main({ weather }: CurrentWeatherObject) {
  return (
    <main className="flex-1 mx-10">
      <div className="grid pt-7 ">
        <Card className="w-max">
          <CardHeader>
            {/* the header needs the title,
             seperated from the content in the header.
             Then we need the fucking div with the weather symbol on the left.
             Then we need the fucking div on the right withfahernheit, celsius 
              and rain/snow probability.*/}
            <h3>
              {weather.forecastData.location.name +
                ", " +
                weather.forecastData.location.country}
            </h3>

            <div className="flex">
              <div>
                <img
                  src={weather.forecastData.current.condition.icon}
                  alt="#"
                />
                <cite>{weather.forecastData.current.condition.text}</cite>
              </div>
              <div>
                <h4>Celsius: {weather.forecastData.current.temp_c}°</h4>
                <h4>Fahrenheit: {weather.forecastData.current.temp_f}°</h4>
                <h4>Wind: {weather.forecastData.current.wind_kph}kph </h4>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {weather.forecastData.forecast.forecastday.map(
              (event: { [key: string]: any }) => (
                <p>{event.date}</p>
              )
            )}
          </CardBody>
          <CardFooter divider>
            <Typography>$899/night</Typography>
            <Typography>
              <i />
              Barcelona, Spain
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
