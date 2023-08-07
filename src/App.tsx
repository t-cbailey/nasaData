import Map from "../Map";
import Filters from "./Filters";

import "../App.css";

function App() {
  return (
    <>
      <div id="app">
        <h1>Nasa recorded natural events!</h1>
        <Filters />
        <Map />
      </div>
    </>
  );
}

export default App;
