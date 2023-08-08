import React from "react";
import { getCategories } from "../utils";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
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

  React.useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  React.useEffect(() => {
    let url = "?category=";
    let currUrl = filtersUrl;
    categoryName.forEach((name) => {
      if (filtersUrl.length === 0) {
        setFiltersUrl((url += `${name},`));
      } else setFiltersUrl((currUrl += `${name},`));
    });
  }, [categoryName]);

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

  const [drawerOpen, setDrawerOpen] = React.useState(false);

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

  const handleFilterSubmit = () => {
    console.log("in submit");
    setDrawerOpen(false);
    setUrl(filtersUrl.slice(0, filtersUrl.length - 1));
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={categoryName}
          onChange={handleCategoryChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              <Checkbox checked={categoryName.indexOf(category.id) > -1} />
              <ListItemText primary={category.id} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleFilterSubmit}
        onKeyDown={handleFilterSubmit}
      >
        Apply
      </Button>
      <Divider />
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
