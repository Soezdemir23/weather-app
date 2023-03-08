import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { apiCall2CustomObjects } from "./interfaces";

import { useQuery } from "@tanstack/react-query";
import { fetchLongLatByCityName, fetchWeatherByLongLat } from "./queries";

function App() {
  const [weekWeather, setWeekWeather] = useState<{ [key: string]: any }>();
  const [searchResults, setSearchResults] = useState<{ [key: string]: any }[]>(
    []
  );

  // This is only for the default startup, we STILL get a Weather data back.
  // Let's worry about adding an array of Weather objects later on,
  // when I have thought of the most visited cities.
  const {
    isLoading: defaultWeatherIsLoading,
    error: defaulttWeatherError,
    data: defaultWeatherData,
  } = useQuery({
    queryKey: ["start up weather"],
    queryFn: async (): Promise<apiCall2CustomObjects.Weather> => {
      try {
        // why can I  never access the object directly? this is stupid!!!!
        const cityToLongLatRequest = await fetchLongLatByCityName("Köln");
        const cityToLongLatObject = await cityToLongLatRequest[0];
        const thisWeek: apiCall2CustomObjects.Weather =
          await fetchWeatherByLongLat(
            cityToLongLatObject.lat,
            cityToLongLatObject.lon,
            cityToLongLatObject.country,
            cityToLongLatObject.name,
            cityToLongLatObject.state
          );
        // I wrapped this object into
        return thisWeek;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error("Setting up Weather Object failed", error);
        }
        throw new Error();
      }
    },
  });

  function clickedSearch(data: { [key: string]: any }) {
    setSearchResults([...searchResults, data]);
  }
  if (defaulttWeatherError === true || defaultWeatherData === undefined)
    return <p>Error with Weather api call not working</p>;
  return (
    <>
      <Header clickedSearch={clickedSearch}></Header>
      <Main weather={defaultWeatherData} results={searchResults}></Main>
      <Footer></Footer>
    </>
  );
}

export default App;
