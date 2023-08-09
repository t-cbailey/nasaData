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
  const [current, setCurrent] = React.useState<"open" | "closed" | "all">(
    "all"
  );
  const [limit, setLimit] = React.useState<string>("100");

  const ITEM_HEIGHT = 100;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
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

  const handleCurrentChange = (event: SelectChangeEvent) => {
    setCurrent(event.target.value as "open" | "closed" | "all");
  };
  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value as string);
  };

  React.useEffect(() => {
    let url = "";

    if (categoryName.length > 0) {
      categoryName.forEach((name) => {
        url.length < 1 ? (url += `?category=${name},`) : (url += `${name},`);
      });
      url = url.slice(0, url.length - 1);
      url += `&status=${current}`;
    } else if (categoryName.length < 1) {
      url += `?status=${current}`;
    } else {
      setFiltersUrl("");
    }

    setFiltersUrl(url + `&limit=${limit}`);
  }, [categoryName, current, limit]);

  const handleFilterSubmit = () => {
    setDrawerOpen(false);
    setUrl(filtersUrl);
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <Typography sx={{ m: "10%" }}>Filters</Typography>
      <Divider>
        <FormControl sx={{ m: 1, width: 200 }}>
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
      </Divider>
      <Divider />

      <Divider>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel id="current-dropdown">Current?</InputLabel>
          <Select
            labelId="current-dropdown-checkbox"
            id="current-dropdown-checkbox"
            value={current}
            onChange={handleCurrentChange}
            input={<OutlinedInput label="Current" />}
            MenuProps={MenuProps}
          >
            <MenuItem key="open" value="open">
              <ListItemText primary="open" />
            </MenuItem>
            <MenuItem key="closed" value="closed">
              <ListItemText primary="closed" />
            </MenuItem>
            <MenuItem key="all" value="all">
              <ListItemText primary="all" />
            </MenuItem>
          </Select>
        </FormControl>
      </Divider>
      <Divider>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel id="limit-dropdown">Limit</InputLabel>
          <Select
            labelId="limit-dropdown-checkbox"
            id="limit-dropdown-checkbox"
            value={limit}
            onChange={handleLimitChange}
            input={<OutlinedInput label="Limit" />}
            MenuProps={MenuProps}
          >
            <MenuItem key="10" value="10">
              <ListItemText primary="10" />
            </MenuItem>
            <MenuItem key="100" value="100">
              <ListItemText primary="100" />
            </MenuItem>
            <MenuItem key="500" value="500">
              <ListItemText primary="500" />
            </MenuItem>
            <MenuItem key="1000" value="1000">
              <ListItemText primary="1000" />
            </MenuItem>
            <MenuItem key="2000" value="2000">
              <ListItemText primary="2000" />
            </MenuItem>
          </Select>
        </FormControl>
      </Divider>

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
        <Button
          sx={{
            color: "black",
            border: "solid black 2px",
            boxShadow: "2px 2px 2px grey",
          }}
          onClick={toggleDrawer(true)}
        >
          {"Set Filters"}
        </Button>
        <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default Filters;
