import { getCurrentWeekDates } from "./date";
import { apiCall2CustomObjects, apiCalledFromMeteo } from "./interfaces";

export async function fetchLongLatByCityName(
  city = "Toscana"
): Promise<apiCall2CustomObjects.CityInformation[]> {
  try {
    const result = await fetch(
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&limit=1&appid=" +
        import.meta.env.VITE_API_OPENWEATHER_KEY,
      { mode: "cors" }
    );
    const response: apiCall2CustomObjects.CityInformation[] =
      await result.json();
    return response;
  } catch (error) {
    throw new Error("Errorr with query fetchLongLatByCityName");
  }
}

export async function fetchWeatherByLongLat(
  CityToWeatherObject: apiCall2CustomObjects.CityInformation
): Promise<apiCall2CustomObjects.Weather> {
  try {
    const {
      name: cityname,
      country: countrycode,
      lon,
      lat,
      state,
    } = CityToWeatherObject;
    let weather = getCurrentWeekDates();

    const fetchWeekWeather = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,rain_sum&current_weather=true&timezone=auto&start_date=${
        weather.previousDaysOfWeek.length === 0
          ? weather.todayAndRestOfWeek[0]
          : weather.previousDaysOfWeek[0]
      }&end_date=${
        weather.todayAndRestOfWeek[weather.todayAndRestOfWeek.length - 1]
      }`,
      { mode: "cors", method: "GET" }
    );

    const processWeather: apiCalledFromMeteo.RootObject =
      await fetchWeekWeather.json();
    const dailiesWeather = processWeather.daily;
    const currentWeather = processWeather.current_weather;
    return { cityname, countrycode, state, dailiesWeather, currentWeather };
    // I could specify what exactly I want back... yeah
    // But the processWeather is part of a larger data, so I have to await accessing the deeper parts, too.
    // So this below will never work.
    // return { cityname, countrycode , processWeather, processWeather.current_weather}
  } catch (error) {
    throw new Error("querying meteo data failed, please check the function ");
  }
}
