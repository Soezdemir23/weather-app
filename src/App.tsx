import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { getCurrentWeekDates } from "./date";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "@material-tailwind/react";

function App() {
  const [weekWeather, setWeekWeather] = useState<{ [key: string]: any }>();
  const { isLoading, error, data } = useQuery({
    queryKey: ["start"],
    queryFn: fetchCurrentWeek,
  });
  console.log("app renders");

  async function fetchCurrentWeek(): Promise<{ [key: string]: any } | unknown> {
    let weather = getCurrentWeekDates();

    try {
      // first use the one API to get the longitude and latitude by city, state, or Country name
      const fetchLongLat = await fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=toscana&limit=1&appid=" +
          import.meta.env.VITE_API_OPENWEATHER_KEY,
        { mode: "cors" }
      ).then((response) => response.json());

      // pass the longitude and latitude to open-meteo and a start and end date
      const fetchWeekWeather = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${
          fetchLongLat[0].lat
        }&longitude=${
          fetchLongLat[0].lon
        }&daily=weathercode,temperature_2m_max,temperature_2m_min,rain_sum&current_weather=true&timezone=auto&start_date=${
          weather.previousDaysOfWeek.length === 0
            ? weather.todayAndRestOfWeek[0]
            : weather.previousDaysOfWeek[0]
        }&end_date=${
          weather.todayAndRestOfWeek[weather.todayAndRestOfWeek.length - 1]
        }`,
        { mode: "cors" }
      );

      const processWeekWeather = await fetchWeekWeather.json();
      if (weather === undefined) {
        return error;
      }
      setWeekWeather({ fetchLongLat, processWeekWeather });
      return { fetchLongLat, processWeekWeather };
    } catch (error) {
      return error;
    }
  }

  return (
    <>
      <Header></Header>
      <Main weather={weekWeather}></Main>

      <Footer></Footer>
    </>
  );
}

export default App;
