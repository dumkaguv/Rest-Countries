import Countries from "./Countries.js";
import SearchCollection from "./Search.js";

document.addEventListener("DOMContentLoaded", () => {
  const countries = new Countries();
  new SearchCollection(countries);
});
