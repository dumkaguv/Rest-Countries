const rootSelector = "[data-js-custom-selector]";

class CustomSelect {
  stateClasses = {
    isExpanded: "is-expanded",
  };

  stateAttributes = {
    ariaExpanded: "aria-expanded",
    ariaSelected: "aria-selected",
  };

  selectors = {
    root: rootSelector,
    titleTextContent: "[data-js-custom-select-title]",
    options: "[data-js-custom-select-options]",
    option: "[data-js-custom-select-option]",
  };

  constructor(rootElement, countries) {
    this.rootElement = rootElement;
    this.countries = countries;
    this.titleTextContentElement = this.rootElement.querySelector(
      this.selectors.titleTextContent
    );
    this.optionsElement = this.rootElement.querySelector(
      this.selectors.options
    );
    this.optionElement = this.optionsElement.querySelectorAll(
      this.selectors.option
    );

    this.bindEvents();
  }

  onSelectorClick = (event) => {
    this.renderOptions();
    const target = event?.target;

    const isExpanded =
      this.rootElement.getAttribute(this.stateAttributes.ariaExpanded) ===
      "true";

    this.rootElement.setAttribute(
      this.stateAttributes.ariaExpanded,
      isExpanded ? "false" : "true"
    );

    this.rootElement.classList.toggle(
      this.stateClasses.isExpanded,
      !isExpanded
    );

    if (target.matches(this.selectors.option)) {
      this.onOptionSelect(target);
    }
  };

  onOptionSelect = (optionElement) => {
    const filteredOption = optionElement.textContent.trim();

    this.titleTextContentElement.textContent = filteredOption;
    this.countries.updateFilteredOption(
      filteredOption === "All" ? "" : filteredOption
    );

    const items = this.optionsElement.querySelectorAll(
      this.selectors.option
    );

    const updateAriaStates = () => {
      items.forEach((item) => {
        item.setAttribute(
          this.stateAttributes.ariaSelected,
          optionElement === item
        );
      });
    };

    updateAriaStates();
  };

  onDocumentClick = (event) => {
    const target = event.target;

    if (!target.closest(rootSelector)) {
      this.closeSelect();
    }
  };

  closeSelect() {
    this.rootElement.setAttribute(
      this.stateAttributes.ariaExpanded,
      "false"
    );
    this.rootElement.classList.remove(this.stateClasses.isExpanded);
  }

  bindEvents() {
    this.rootElement.addEventListener("click", this.onSelectorClick);
    document.addEventListener("click", this.onDocumentClick);
  }

  renderOptions = () => {
    if (this.optionsElement?.children.length) {
      return;
    }

    this.getOptions();
    this.optionsElement.innerHTML = "";
    this.optionsElement.insertAdjacentHTML(
      "beforeend",
      this.optionTemplateHTML("All")
    );

    this.availableOptions.forEach((region) => {
      this.optionsElement.insertAdjacentHTML(
        "beforeend",
        this.optionTemplateHTML(region)
      );
    });
  };

  getOptions = () => {
    this.availableOptions = new Set(
      this.countries.data.map((country) => country.region)
    );
  };

  optionTemplateHTML(region) {
    return `
      <li
        class="custom-select__option"
        role="option"
        aria-selected="false"
        data-js-custom-select-option
      >
        ${region}
      </li>
    `;
  }
}

class CustomSelectCollection {
  constructor(countries) {
    this.countries = countries;
    this.init();
  }

  init() {
    document
      .querySelectorAll(rootSelector)
      .forEach((element) => new CustomSelect(element, this.countries));
  }
}

export default CustomSelectCollection;
