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
      <div className="bg-green-500 grid pt-7">
        <Card className="w-max">
          <CardHeader>
            {/* the header needs the title,
             seperated from the content in the header.
             Then we need the fucking div with the weather symbol on the left.
             Then we need the fucking div on the right withfahernheit, celsius 
              and rain/snow probability.*/}
            <h3></h3>

            <div className="flex">
              <div>
                <img src="" alt="#" />
                <cite></cite>
              </div>
              <div>
                <h4>Celsius: °</h4>
                <h4>Fahrenheit: °</h4>
                <h4>Wind: </h4>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <Typography>cozy 5 start</Typography>
            <Typography>asdfsdf</Typography>
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
