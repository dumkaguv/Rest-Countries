import Countries from "./Countries.js";
import SearchCollection from "./Search.js";
import Theme from "./Theme.js";
import CustomSelectCollection from "./CustomSelect.js";
import SearchManagerFilter from "./SearchFilterManager.js";
import Details from "./Details.js";

document.addEventListener("DOMContentLoaded", () => {
  new Theme();

  const countries = new Countries();
  const manager = new SearchManagerFilter(countries);
  new SearchCollection(manager);
  new CustomSelectCollection(manager);

  new Details();
});
