const rootSelector = "[data-js-custom-selector]";

class CustomSelect {}

class CustomSelectCollection {
  constructor(rootElement) {
    this.rootElement = rootElement
    this.init();
  }

  init() {
    document
      .querySelectorAll(rootSelector)
      .forEach((element) => new CustomSelect(element));
  }
}

export default CustomSelectCollection;
