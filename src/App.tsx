import Map from "./Map";
import Filters from "./Filters";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import { Typography } from "@mui/material";

import "../styling/App.css";

function App() {
  const [url, setUrl] = React.useState<string>("?limit=100");

  return (
    <>
      <div id="app">
        <Typography variant="h3" marginBottom={"2%"}>
          Nasa Recorded Global Events
        </Typography>
        <Filters setUrl={setUrl} />
        <Map url={url} />
        <footer>
          All data from{" "}
          <a href="https://eonet.gsfc.nasa.gov/" target="blank">
            https://eonet.gsfc.nasa.gov/
          </a>
        </footer>
      </div>
    </>
  );
}

export default App;
