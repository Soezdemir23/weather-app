import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import ErrorBoundary from "./ErrorBoundary";
import { useQuery } from "@tanstack/react-query";
import { getCurrentWeekDates } from "./date";

function App() {
  const [weekWeather, setWeekWeather] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    fetchCurrentWeek();
  }, []);

  async function fetchCurrentWeek() {
    let weather = getCurrentWeekDates();
    console.log(weather);
    //forecast is easy, just do forecast api call and then put that object away
    const forecastRequest = await fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=" +
        import.meta.env.VITE_API_KEY +
        "&q=London&days=" +
        weather.todayAndRestOfWeek.length +
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
            import.meta.env.VITE_API_KEY +
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

    setWeekWeather({ ["forecast"]: forecastData, ["past"]: historyResponses });
  }

  return <h1>sdfasdf</h1>;
}

export default App;
