import Countries from "./Countries.js";
import SearchCollection from "./Search.js";
import Theme from "./Theme.js";

document.addEventListener("DOMContentLoaded", () => {
  const countries = new Countries();
  new SearchCollection(countries);
  new Theme();
});
