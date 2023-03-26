import { Typography } from "@material-tailwind/react";
import { Temporal } from "temporal-polyfill";

export default function SimpleFooter() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <Typography color="blue-gray" className="font-normal">
        &copy; {Temporal.Now.plainDateISO().toString()} Weather-App
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 list-none mt-auto">
        <li>
          <Typography
            as="a"
            href="https://github.com/Soezdemir23/weather-app"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 no-underline"
          >
            About This Project
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="https://github.com/Soezdemir23/weather-app/blob/master/LICENSE.txt"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 no-underline"
          >
            License
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="https://www.linkedin.com/in/serdaroezdemir/"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 no-underline"
          >
            Github Profil
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="https://www.linkedin.com/in/serdaroezdemir/"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 no-underline"
          >
            LinkedIn
          </Typography>
        </li>
      </ul>
    </footer>
  );
}
