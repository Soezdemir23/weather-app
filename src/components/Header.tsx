import { Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { countryCodeComponent } from "../countryCodes";
import { apiCall2CustomObjects, apiCalledFromMeteo } from "../interfaces";

export default function Header({ clickedSearch }: any) {
  // we need to get the days
  const [searchQuery, setSearchQuery] = useState("");
  const [clickedResult, setClickedResult] = useState<
    apiCall2CustomObjects.CityInformation | undefined
  >(undefined);
  // debounce
  const [debounceQuery] = useDebounce(searchQuery, 1500);
  const [resultEnabled, setResultEnabled] = useState(false);

  function handleResultClick(index: number) {
    if (searchData === undefined) {
      throw new Error("calling handleResultClick with undefined data");
    } else {
      setClickedResult(searchData[index]);
    }
  }

  const { data: resultData } = useQuery({
    queryKey: ["clickedResult", clickedResult],
    queryFn: async (): Promise<
      apiCalledFromMeteo.RootObject | apiCalledFromMeteo.RootObject[]
    > => {
      try {
        const fetchWeekWeather = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${clickedResult?.lat}&longitude=${clickedResult?.lon}`
        );
        const result: apiCalledFromMeteo.RootObject =
          await fetchWeekWeather.json();
        return result;
      } catch (error) {
        throw new Error("Cannot read clickedResult");
      }
    },
  });

  // call API depending on the searchTerm given to 'debounceQuery'
  const { data: searchData, isError: searchError } = useQuery({
    queryKey: ["query", debounceQuery],
    queryFn: async (): Promise<
      apiCall2CustomObjects.CityInformation[] | undefined
    > => {
      try {
        const response = await fetch(
          "http://api.openweathermap.org/geo/1.0/direct?q=" +
            debounceQuery +
            "&limit=10&appid=" +
            import.meta.env.VITE_API_OPENWEATHER_KEY,
          { mode: "cors" }
        );
        const data: Promise<apiCall2CustomObjects.CityInformation[]> =
          await response.json();
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error("queryfunction mucks", error);
        }
        return undefined;
      }
    },
    enabled: debounceQuery.length > 0,
  });

  if (searchError) {
    return <p>There is an error loading the API by searching</p>;
  }
  console.log("debug", searchData, searchQuery);
  return (
    <header className="bg-blue-gray-200 p-4 flex items-baseline gap-9">
      <Typography variant="h1" className="max-w-xs mr-4">
        Weatherlicious
      </Typography>
      <div className="w-40 relative">
        <input
          className="relative bottom-2 w-full border-0 rounded-xl h-5 outline-none indent-1 focus:ring-2 focus:ring-inset focus:ring-offset-teal-400 focus:bg-orange-300 focus:text-white focus:placeholder:text-white"
          placeholder="City, State, Country"
          type={"text"}
          size={14}
          onInput={(e) => {
            setSearchQuery(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              return;
            }
            // do nothing, just return
            return;
          }}
        />
        <div className="absolute z-10 list-none flex flex-col w-full">
          {/**
           * 1st state Typography is not rendering: user didn't enter anything: searchData is undefined, searchQuery is empty ""
           * 2nd state Typography is being rendered: user entered a searchQuery and searchData has a length of 0: show the search notifier
           * searchData === undefined || searchquery === ""
           *  ? zeige nichts
           *  : searchData.length === 0
           *  ? Zeige "search"
           *  : result
           *
           */}
          {searchData === undefined || searchQuery === " " ? (
            <span className="hidden"></span>
          ) : searchData.length === 0 ? (
            <Typography
              variant="small"
              className="bg-teal-200 w-full rounded border-0 border-b border-solid border-teal-600 m-0"
            >
              searching, please
            </Typography>
          ) : (
            searchData.map(
              (event: apiCall2CustomObjects.CityInformation, index: number) => (
                <Typography
                  key={index}
                  variant="small"
                  className="bg-teal-200 w-full rounded border-0 border-b border-solid border-teal-600 m-0 hover:cursor-pointer hover:bg-teal-50 active:bg-teal-100 "
                  onClick={() => handleResultClick(index)}
                >
                  {event.name}, {event.state}, {event.country}{" "}
                  {countryCodeComponent(event.country)}{" "}
                </Typography>
              )
            )
          )}
        </div>
      </div>
    </header>
  );
}
