import Map from "../Map";
import Filters from "./Filters";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";

import "../App.css";

function App() {
  const [url, setUrl] = React.useState<string>("");
  return (
    <>
      <div id="app">
        <h1>Nasa recorded natural events!</h1>
        <Filters setUrl={setUrl} />
        <Map url={url} />
      </div>
    </>
  );
}

export default App;
