import Map from "./Map";
import Filters from "./Filters";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

import "../styling/App.css";

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
        <Typography variant="h3" marginBottom={"2%"}>
          Nasa Recorded Natural Events
        </Typography>
        <Filters setUrl={setUrl} />
        <Map url={url} setLoading={setLoading} />
      </div>
    </>
  );
}

export default App;
