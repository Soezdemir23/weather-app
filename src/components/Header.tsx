import { Input, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { countryCodeComponent } from "../countryCodes";

export default function Header() {
  console.log("header renders");
  // we need to get the days
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceQuery] = useDebounce(searchQuery, 1500);
  const { data, isError, error } = useQuery({
    queryKey: ["query", debounceQuery],
    queryFn: async () => {
      try {
        const response = await fetch(
          "http://api.openweathermap.org/geo/1.0/direct?q=" +
            debounceQuery +
            "&limit=10&appid=" +
            import.meta.env.VITE_API_OPENWEATHER_KEY,
          { mode: "cors" }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("Error happened while fetching searchbar: " + error);
      }
    },
    enabled: debounceQuery.length > 0,
  });

  if (error) {
    return <p>There is an error loading the API</p>;
  }

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
            console.log("reee");
            return;
          }}
        />
        <div className="absolute z-10 list-none flex flex-col w-full">
          {/** undefined because it is not filled yet. */}
          {data === undefined ? (
            <p></p>
          ) : (
            data.map((event: { [key: string]: any }, index: number) => (
              <Typography
                key={index}
                variant="small"
                className="bg-teal-200 w-full rounded border-0 border-b border-solid border-teal-600 m-0 "
              >
                {event.name}, {event.state}, {event.country}{" "}
                {countryCodeComponent(event.country)}{" "}
              </Typography>
            ))
          )}
        </div>
      </div>
    </header>
  );
}
