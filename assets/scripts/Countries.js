class Countries {
  rootSelector = "[data-js-countries-list]";

  constructor() {
    this.rootElement = document.querySelector(this.rootSelector);
    this._data = [];
    this.init();
  }

  saveData = (data) => {
    localStorage.setItem('countriesData', JSON.stringify(data));
  };

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
  }

  async init() {
    this.data = await this.getData();

    if (!this.isDataInitialized) {
      this.isDataInitialized = true;
    }

    this.saveData(this.data)
    this.renderCountries();
  }

  async getData() {
    try {
      const response = await fetch("./data.json");

      if (response.status === 404) {
        console.error("Ошибка при загрузке данных 404");
        return [];
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);

      return [];
    }
  }

  filterData = (searchParams = {}) => {
    const filteredData = this.data.filter((item) => {
      if (Object.values(searchParams).every((value) => !value)) {
        return true;
      }

      return Object.entries(searchParams).every(([key, value]) => {
        if (!value) return true;

        return item[key]
          ?.toString()
          .trim()
          .toLowerCase()
          .startsWith(value.trim().toLowerCase());
      });
    });

    return filteredData || [];
  };

  renderCountries = (searchParams = {}) => {
    const filteredData = this.filterData(searchParams);
    const countriesHTML = filteredData
      .map(({ name, population, region, capital, flags, alpha2Code }) =>
        this.countryTemplateHTML(
          name,
          numeral(population).format("0,0"),
          region,
          capital,
          flags.svg,
          `./details.html?id=${alpha2Code}`
        )
      )
      .join("");

    if (this.rootElement) {
      this.rootElement.innerHTML = countriesHTML;
    }
  };

  countryTemplateHTML(
    country = "N/A",
    population = "N/A",
    region = "N/A",
    capital = "N/A",
    srcImage,
    link = "./"
  ) {
    return `
      <li class="countries__item">
        <a href="${link}" class="countries__link">
          <article class="countries__card" data-js-country-card>
            <img
              class="countries__card-img"
              width="300"
              height="250"
              src="${srcImage}"
              alt="${country}"
            />
            <h2 class="countries__card-title">${country}</h2>
            <dl class="countries__card-info">
              <div class="countries__card-info-item">
                <dt class="countries__card-info-key">Population:</dt>
                <dd class="countries__card-info-value">
                  ${population}
                </dd>
              </div>
              <div class="countries__card-info-item">
                <dt class="countries__card-info-key">Region:</dt>
                <dd class="countries__card-info-value">${region}</dd>
              </div>
              <div class="countries__card-info-item">
                <dt class="countries__card-info-key">Capital:</dt>
                <dd class="countries__card-info-value">${capital}</dd>
              </div>
            </dl>
          </article>
        </a>
      </li>
    `;
  }
}

export default Countries;
