import React from "react";
import { getCategories } from "../utils";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

import ListItemText from "@mui/material/ListItemText";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { category, filtersProps } from "../customTypes";

function Filters({ setUrl }: filtersProps) {
  const [categories, setCategories] = React.useState<category[]>([]);
  const [categoryName, setCategoryName] = React.useState<string[]>([]);
  const [filtersUrl, setFiltersUrl] = React.useState<string>("");
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  React.useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  const handleCategoryChange = (
    event: SelectChangeEvent<typeof categoryName>
  ) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  React.useEffect(() => {
    let url = "?category=";

    if (categoryName.length > 0) {
      categoryName.forEach((name) => {
        setFiltersUrl((url += `${name},`));
      });
    } else {
      setFiltersUrl("");
    }
  }, [categoryName]);

  const handleFilterSubmit = () => {
    setDrawerOpen(false);
    setUrl(filtersUrl.slice(0, filtersUrl.length - 1));
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <Typography sx={{ margin: "5%" }}>Filters</Typography>
      <FormControl sx={{ m: 1, width: 200, marginTop: "5vh" }}>
        <InputLabel id="category-dropdown">Category</InputLabel>
        <Select
          labelId="category-dropdown-checkbox"
          id="category-dropdown-checkbox"
          multiple
          value={categoryName}
          onChange={handleCategoryChange}
          input={<OutlinedInput label="Category" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              <Checkbox checked={categoryName.indexOf(category.id) > -1} />
              <ListItemText primary={category.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider />
      <Button
        variant="contained"
        onClick={handleFilterSubmit}
        onKeyDown={handleFilterSubmit}
        id="filterSubmitButton"
        sx={{ position: "fixed", bottom: "10%", marginLeft: "5%" }}
      >
        Apply
      </Button>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>{"Filters"}</Button>
        <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default Filters;
