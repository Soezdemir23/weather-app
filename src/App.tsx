import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { apiCall2CustomObjects } from "./interfaces";

import { useQuery } from "@tanstack/react-query";
import { fetchLongLatByCityName, fetchWeatherByLongLat } from "./queries";

function App() {
  const [searchResults, setSearchResults] = useState<
    apiCall2CustomObjects.Weather[]
  >([]);

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
        const cityToLongLatObject = cityToLongLatRequest[0];
        const thisWeek: apiCall2CustomObjects.Weather =
          await fetchWeatherByLongLat(cityToLongLatObject);
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

  // Wouldn't it be actually better to put this information into a map,
  // then check if the name of the result exists inside the keys?
  // It can be easily done by trying to find the country name inside the weather
  // interfaced object.
  // Then only then make an api call, then add the result of it into that map,
  // so the whole information doesn't have to be refetched?
  async function clickedSearch(data: apiCall2CustomObjects.CityInformation) {
    if (
      searchResults.find(
        (result) =>
          data.name === result.cityname &&
          data.country === result.countrycode &&
          result.state === data.state
      )
    )
      // you can still have th same name of cities, but varying information
      return;
    // make an api call
    const cityWeather: apiCall2CustomObjects.Weather =
      await fetchWeatherByLongLat(data);
    setSearchResults([...searchResults, cityWeather]);
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
