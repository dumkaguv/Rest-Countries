class Details {
  selectors = {
    root: "[data-js-page-details]",
    borders: "[data-js-page-details-borders-list]",
    border: "[data-js-page-details-border]",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.data = this.loadCountries();
    this.init();
  }

  loadCountries = () => {
    const savedData = localStorage.getItem("countriesData");
    if (savedData) {
      return JSON.parse(savedData);
    }
    return [];
  };

  init = () => {
    this.renderDetails();
    const backButton = document.querySelector("[data-js-button-back]");
    if (backButton) backButton.addEventListener("click", this.goBack);
  };

  renderDetails = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const urlId = params.get("id");

    if (!urlId) {
      return;
    }

    const itemID = [...this.data].findIndex(
      (item) => item.alpha2Code === urlId
    );

    const {
      flags,
      name,
      nativeName,
      population,
      region,
      subregion,
      capital,
      topLevelDomain,
      currencies,
      languages,
      borders,
    } = this.data[itemID];

    const pathToImage = flags.svg;
    const currenciesFormatted = currencies.map((currency) => {
      return currency.code + " " + currency.symbol;
    });

    const languagesFormatted = languages.map((language) => {
      return language.name;
    });

    const borderCountriesFormatted = borders?.map((border) => {
      const foundItem = this.data.find(
        (item) => item.alpha3Code === border
      );
      return foundItem
        ? { name: foundItem.name, alpha2Code: foundItem.alpha2Code }
        : "";
    });

    this.rootElement.insertAdjacentHTML(
      "afterbegin",
      this.pageDetailsTemplateHTML(
        pathToImage,
        name,
        nativeName,
        numeral(population).format("0,0"),
        region,
        subregion,
        capital,
        topLevelDomain.toString().replaceAll(",", ", "),
        currenciesFormatted.toString().replaceAll(",", ", "),
        languagesFormatted.toString().replaceAll(",", ", "),
        borderCountriesFormatted
      )
    );
  };

  goBack = () => {
    window.history.back();
  }

  pageDetailsTemplateHTML = (
    pathToImage = "",
    country = "",
    nativeName = "",
    population = "",
    region = "",  
    subregion = "",
    capital = "",
    levelDomain = [],
    currencies = [],
    languages = [],
    borderCountries = []
  ) => {
    return `
      <button type="button" class="button button--back" data-js-button-back>
          Back
        </button>
        <div class="page-details__body" data-js-page-details-body>
          <img src="${pathToImage}" alt="" class="page-details__image" />
          <div class="page-details__info">
            <h2 class="page-details__title">${country}</h2>
            <dl class="page-details__list">
              <div class="page-details__item">
                <dt class="page-details__key">Native Name:</dt>
                <dd class="page-details__value">${nativeName}</dd>
              </div>
              <div class="page-details__item">
                <dt class="page-details__key">Population:</dt>
                <dd class="page-details__value">${population}</dd>
              </div>
              <div class="page-details__item">
                <dt class="page-details__key">Region:</dt>
                <dd class="page-details__value">${region}</dd>
              </div>
              <div class="page-details__item">
                <dt class="page-details__key">Sub Region:</dt>
                <dd class="page-details__value">${subregion}</dd>
              </div>
              <div class="page-details__item">
                <dt class="page-details__key">Capital:</dt>
                <dd class="page-details__value">${capital}</dd>
              </div>
              <div class="page-details__item">
                <dt class="page-details__key">Top Level Domain:</dt>
                <dd class="page-details__value">${levelDomain}</dd>
              </div>
              <div class="page-details__item">
                <dt class="page-details__key">Currencies:</dt>
                <dd class="page-details__value">${currencies}</dd>
              </div>
              <div class="page-details__item">
                <dt class="page-details__key">Languages:</dt>
                <dd class="page-details__value">${languages}</dd>
              </div>
            </dl>
            <div class="page-details__border" data-js-page-details-border>
              <span class="page-details__border-title">Border Countries:</span>
              <ul class="page-details__border-list" data-js-page-details-borders-list>
                ${this.borderItemTemplateHTML(borderCountries)}
              </ul>
            </div>
          </div>
        </div>
      `;
  };

  borderItemTemplateHTML = (borderCountries) => {
    if (!borderCountries.length) {
      return "";
    }
    return borderCountries
      .map((country) => {
        return `
          <li class="page-details__border-item">
            <a class="page-details__border-link" href="./details.html?id=${country.alpha2Code}">${country.name}</a>
          </li>`;
      })
      .join("");
  };
}

export default Details;
