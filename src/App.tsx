import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import ErrorBoundary from "./ErrorBoundary";
import { useQuery } from "@tanstack/react-query";
import { getCurrentWeekDates } from "./date";

function App() {
  getCurrentWeekDates();
  return <h1>sdfasdf</h1>;
}

export default App;
