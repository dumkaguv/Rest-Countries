class SearchManagerFilter {
  constructor(countries) {
    this.countries = countries;
    this.searchQuery = "";
    this.filteredOption = "";
  }

  get data() {
    return this.countries.data;
  }

  updateSearchQuery(searchQuery) {
    this.searchQuery = searchQuery;
    this.renderCountries();
  }

  updateFilteredOption(filteredOption) {
    this.filteredOption = filteredOption;
    this.renderCountries();
  }

  renderCountries() {
    console.log("Rendering with:", {
      name: this.searchQuery,
      region: this.filteredOption,
    });

    this.countries.renderCountries({
      name: this.searchQuery,
      region: this.filteredOption,
    });
  }
}

export default SearchManagerFilter;
