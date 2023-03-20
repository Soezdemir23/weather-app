import { Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { countryCodeComponent } from "../countryCodes";
import { apiCall2CustomObjects, apiCalledFromMeteo } from "../interfaces";

interface clickedSearchProps {
  clickedSearch: (data: apiCall2CustomObjects.CityInformation) => void;
}

export default function Header({ clickedSearch }: clickedSearchProps) {
  // we need to get the days
  const [searchQuery, setSearchQuery] = useState("");
  const [clickedResult, setClickedResult] = useState<
    apiCall2CustomObjects.CityInformation | undefined
  >(undefined);
  // debounce
  const [debounceQuery] = useDebounce(searchQuery, 1500);

  function handleResultClick(index: number) {
    if (!searchData) return;
    clickedSearch(searchData[index]);
  }

  // call API depending on the searchTerm given to 'debounceQuery'
  const { data: searchData, isError: searchError } = useQuery({
    queryKey: ["query", debounceQuery],
    queryFn: async (): Promise<
      apiCall2CustomObjects.CityInformation[] | undefined
    > => {
      try {
        const response = await fetch(
          "https://api.openweathermap.org/geo/1.0/direct?q=" +
            debounceQuery +
            "&limit=10&appid=" +
            import.meta.env.VITE_API_OPENWEATHER_KEY,
          { mode: "cors" }
        );
        const dataDirty: Promise<apiCall2CustomObjects.CityInformation[]> =
          await response.json();
        // first modify the undefined properties, currently state
        const dataCleaned = (await dataDirty).map((content) => {
          if (content.state === undefined) {
            content.state = "No state found";
            return content;
          }
          return content;
        });
        // now actually trim the array from duplicates.
        // easiest is set, then back to array
        const dataTrimmed = new Set(dataCleaned);
        return [...dataTrimmed];
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
  return (
    <header className="bg-blue-gray-200 flex flex-col p-4 gap-9 items-center xs:p-2 xs:gap-2 mobile-m:gap-0 md:flex-row md:justify-evenly ipad-air:flex-row ipad-air:justify-evenly lg:flex-row lg:justify-evenly xl:flex-row xl:justify-evenly xl:gap-80 2xl:flex-row 2xl:justify-evenly 2xl:py-10">
      <Typography
        variant="h1"
        className="relative max-w-xs mr-4 xs:text-3xl xs:mr-0 sm:text-2xl mobile-m:text-4xl mobile-m:left-2 md:right-8 md:text-4xl md:my-0 ipad-air:text-4xl lg:text-4xl lg:right-28 xl:text-5xl xl:m-0 2xl:right-52 2xl:text-6xl 2xl:m-0"
      >
        Weatherlicious
      </Typography>
      <div className="w-40 relative xs:w-52 ">
        <input
          className="relative bottom-2 top-0 w-56 border-0 rounded-xl h-8 outline-none indent-1 focus:ring-2 focus:ring-inset focus:ring-offset-teal-400 focus:bg-orange-300 focus:text-white focus:placeholder:text-white xs:text-base xs:right-2 mobile-m:right-8 md:right-10 md:text-base ipad-air:text-xl lg:text-xl lg:w-60 xl:text-2xl xl:w-80 xl:right-20 xl:h-10 2xl:text-2xl 2xl:w-96 2xl:h-12"
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
           *  ? show nothing
           *  : searchData.length === 0
           *  ? show "search"
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
                  className="bg-teal-200 w-full rounded border-0 border-b border-solid border-teal-600 m-0 hover:cursor-pointer hover:bg-teal-50 active:bg-teal-100 mobile-m:relative mobile-m:w-52 mobile-m:right-5 md:relative md:w-56 md:right-10 md:text-lg ipad-air:text-lg ipad-air:w-56 lg:text-2xl lg:w-60 xl:w-72 xl:relative xl:right-16 xl:text-xl 2xl:w-96 2xl:text-2xl "
                  onClick={() => {
                    handleResultClick(index);
                  }}
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
