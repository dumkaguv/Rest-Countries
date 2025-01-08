const rootSelector = "[data-js-search-input]";

class Search {
  constructor(rootElement, countries) {
    this.rootElement = rootElement;
    this.countries = countries;
    this.bindEvents();
  }

  onInputChange = () => {
    const textInput = this.rootElement.value.trim().toLowerCase();
    this.countries.renderCountries({
      name: textInput,
      capital: textInput,
      population: textInput,
    });
  };

  bindEvents() {
    this.rootElement.addEventListener("input", this.onInputChange);
  }
}

class SearchCollection {
  constructor(countries) {
    this.countries = countries;
    this.init();
  }

  init() {
    document
      .querySelectorAll(rootSelector)
      .forEach((element) => new Search(element, this.countries));
  }
}

export default SearchCollection;
