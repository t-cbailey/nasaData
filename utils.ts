export const getEvents = async () => {
  try {
    const response = await fetch("https://eonet.gsfc.nasa.gov/api/v3/events", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const events = await response.json();
    return events;
  } catch (error) {
    console.error(error);
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(
      "https://eonet.gsfc.nasa.gov/api/v3/categories"
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const { categories } = await response.json();
    return categories;
  } catch (error) {
    console.log(error);
  }
};
