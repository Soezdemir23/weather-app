import { ReactElement, SVGProps } from "react";

import WiCloud from "~icons/wi/cloud";
import WiShowers from "~icons/wi/showers";
import WiDaySunny from "~icons/wi/day-sunny";
import WiDayCloudy from "~icons/wi/day-cloudy";
import WiCloudy from "~icons/wi/cloudy";
import WiDaySunnyOvercast from "~icons/wi/day-sunny-overcast";
import WiFog from "~icons/wi/fog";
import CarbonRainDrizzle from "~icons/carbon/rain-drizzle";
import BiCloudDrizzle from "~icons/bi/cloud-drizzle";
import UilCloudDrizzle from "~icons/uil/cloud-drizzle";
import CarbonRainHeavy from "~icons/carbon/rain-heavy";
import BiCloudRainHeavy from "~icons/bi/cloud-rain-heavy";
import FluentWeatherDrizzle48Regular from "~icons/fluent/weather-drizzle-48-regular";
import CarbonRain from "~icons/carbon/rain";
import MdiWeatherSnowy from "~icons/mdi/weather-snowy";
import MdiWeatherSnowyHeavy from "~icons/mdi/weather-snowy-heavy";
import MdiWeatherHail from "~icons/mdi/weather-hail";
import FluentMdl2SnowShowerDay from "~icons/fluent-mdl2/snow-shower-day";
import CarbonThunderstorm from "~icons/carbon/thunderstorm";
import WiDaySnowThunderstorm from "~icons/wi/day-snow-thunderstorm";
import CarbonThunderstormSevere from "~icons/carbon/thunderstorm-severe";
export function WMOInterpreter(input: number) {
  switch (input) {
    case 0:
      return "clear";
    case 1:
      return "mainly clear";
    case 2:
      return "partly cloudy";
    case 3:
      return "overcast";
    case 45:
      return "fog";
    case 48:
      return "depositing rime fog";
    case 51:
      return "light drizzle";
    case 52:
      return "moderate drizzle";
    case 53:
      return "dense drizzle";
    case 56:
      return "light drizzle, freezing";
    case 57:
      return "intense drizzle, freezing";
    case 61:
      return "slight rain";
    case 63:
      return "moderate rain";
    case 65:
      return "heavy rain";
    case 66:
      return "freezing light rain";
    case 67:
      return "freezing heavy rain";
    case 71:
      return "slight snow fall";
    case 73:
      return "moderate snow fall";
    case 75:
      return "heavy snow fall";
    case 77:
      return "snow grains";
    case 80:
      return "slight rain shower";
    case 81:
      return "moderate rain shower";
    case 82:
      return "violent rain shower";
    case 85:
      return "slight snow shower";
    case 86:
      return "heavy snow shower";
    case 95:
      return "thunderstorm, rainy";
    case 96:
      return "thunderstorm, slight hail";
    case 99:
      return "thunderstorm, heavy hail";
    default:
      return `unknown weathercode: ${input}`;
  }
}

export function WMOComponent(input: number): React.ReactElement {
  switch (input) {
    case 0:
      return <WiDaySunny />;
    case 1:
      return <WiDayCloudy />;
    case 2:
      return <WiCloudy />;
    case 3:
      return <WiDaySunnyOvercast />;
    case 45:
      return <WiFog />;
    case 48:
      return <WiFog />;
    case 51:
      return <BiCloudDrizzle />;
    case 52:
      return <UilCloudDrizzle />;
    case 53:
      return <CarbonRainDrizzle />;
    case 56:
      return <FluentWeatherDrizzle48Regular />;
    case 57:
      return <FluentWeatherDrizzle48Regular />;
    case 61:
      return <CarbonRainHeavy />;
    case 63:
      return <BiCloudRainHeavy />;
    case 65:
      return <CarbonRainHeavy />;
    case 66:
      return <CarbonRain />;
    case 67:
      return <CarbonRain />;
    case 71:
      return <MdiWeatherSnowy />;
    case 73:
      return <MdiWeatherSnowy />;
    case 75:
      return <MdiWeatherSnowyHeavy />;
    case 77:
      return <MdiWeatherHail />;
    case 80:
      return <WiShowers />;
    case 81:
      return <WiShowers />;
    case 82:
      return <WiShowers />;
    case 85:
      return <FluentMdl2SnowShowerDay />;
    case 86:
      return <FluentMdl2SnowShowerDay />;
    case 95:
      return <CarbonThunderstorm />;
    case 96:
      return <WiDaySnowThunderstorm />;
    case 99:
      return <CarbonThunderstormSevere />;
    default:
      return <small>No component for weatherCode: {input}</small>;
  }
}
