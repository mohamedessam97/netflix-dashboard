import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
  import { MovieContextProvider } from "./context/movieContext/MovieContext";
import { ListContextProvider } from "./context/listContext/ListContext";

ReactDOM.render(
  <React.StrictMode>
      <MovieContextProvider>
        <ListContextProvider>
          <App />
        </ListContextProvider>
      </MovieContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
