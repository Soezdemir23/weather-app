import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import ErrorBoundary from "./ErrorBoundary";
function App() {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchWeather();
  }, []);

  async function fetchWeather() {
    try {
      const request = await fetch(
        "https://api.weatherapi.com/v1/current.json?key=" +
          import.meta.env.VITE_API_KEY +
          "&q=London&aqi=no",
        { mode: "cors" }
      );
      const data = await request.json();
      console.log(data);
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error(
        "This error happened while fetchiung the apidata: " + error
      );
    }
  }
  // api call from weatherapi.com to get initial information out
  // for the weahter we need: + the img of the weather,
  // the description the F°, C°, the

  if (loading === true) {
    return <div>... Loading</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <ErrorBoundary>
        <Main weather={weather} />
      </ErrorBoundary>
      <div>{JSON.stringify(import.meta.env)}</div>
      <Footer />
    </div>
  );
}

export default App;
