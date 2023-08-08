import Map from "../Map";
import Filters from "./Filters";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

import "../App.css";

function App() {
  const [url, setUrl] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div id="app">
        <h1>Nasa recorded natural events!</h1>
        <Filters setUrl={setUrl} />
        <Map url={url} setLoading={setLoading} />
      </div>
    </>
  );
}

export default App;
