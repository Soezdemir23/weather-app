import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import ErrorBoundary from "./ErrorBoundary";
import { useQuery } from "@tanstack/react-query";
import { getCurrentWeekDates } from "./date";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/lib/devtools";

function App() {
  const [weekWeather, setWeekWeather] = useState<{ [key: string]: any }>();

  useEffect(() => {
    fetchCurrentWeek();
  }, []);

  async function fetchCurrentWeek() {
    let weather = getCurrentWeekDates();

    // first use the one API to get the longitude and latitude by city, state, or Country name
    const fetchLongLat = await fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=Bielefeld&limit=1&appid=" +
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
    //
    const processWeekWeather = await fetchWeekWeather.json();
    setWeekWeather({ fetchLongLat, processWeekWeather });
    //forecast is easy, just do forecast api call and then put that object away
    /* I tried to use weahterapi.com for fetching information to get weather 
   for the whole week.
   Sadly the api doesn't allow for a whole week information. 
    The current commented code is kept as a reminder for me and people 
    in the future trying to find 
    const forecastRequest = await fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=" +
        import.meta.env.VITE_API_WEATHER_KEY +
        "&q=London&days=" +
        // weather.todayAndRestOfWeek.length <- so far as I know, they do not
        // offer a "day" option. So i hope I can get the issue resolved like that.
        // Definitely needs to get the date file refactored after getting what I need.
        10 +
        "&aqi=no&alerts=yes",
      { mode: "cors" }
    );

    const forecastData = await forecastRequest.json();
    // this was more complicated to get into.
    // But this makes sense to debug it faster and still be able to show the ui
    const historyRequests = await Promise.allSettled(
      weather.previousDaysOfWeek.map((date) =>
        fetch(
          "https://api.weatherapi.com/v1/history.json?key=" +
            import.meta.env.VITE_API_WEATHER_KEY +
            "&q=London&dt=" +
            date,
          { mode: "cors" }
        )
      )
    );
    // I could use filter and then map, but that would take even more lines.
    // This is doing great enough
    const historyResponses = await Promise.allSettled(
      historyRequests.map(async (response) =>
        response.status === "rejected"
          ? { ["status"]: "rejected" }
          : response.value.json()
      )
    );

    setWeekWeather({ ["forecast"]: forecastData, ["past"]: historyResponses });*/
  }
  if (weekWeather === undefined) {
    return <h1>Wait</h1>;
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
