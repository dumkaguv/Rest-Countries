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
    this.countries.renderCountries({
      name: this.searchQuery,
      region: this.filteredOption,
    });
  }
}

export default SearchManagerFilter;
