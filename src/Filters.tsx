import React from "react";
import { getCategories } from "../utils";

function Filters() {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  return <p>filters</p>;
}
export default Filters;
