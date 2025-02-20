class Theme {
  selectors = {
    root: "[data-js-theme]",
    icon: "[data-js-theme-icon]",
    text: "[data-js-theme-text]",
  };

  stateAttributes = {
    light: "light",
    dark: "dark",
  };

  themeButtonTextContent = {
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
  };

  stateClasses = {
    themeLoaded: "theme-loaded",
  }

  dataAttribute = "data-theme";

  localStorageValue = "theme";

  constructor() {
    this.restorePreference();
    document.documentElement.classList.add(this.stateClasses.themeLoaded);

    this.rootElement = document.querySelector(this.selectors.root);
    this.iconElement = document.querySelector(this.selectors.icon);
    this.textElement = document.querySelector(this.selectors.text);
    this.currentTheme = document.documentElement.getAttribute(this.dataAttribute);

    this.changeThemeButtonContent();
    this.bindEvents();
  }

  changeTheme = () => {
    const newTheme =
      this.currentTheme === this.stateAttributes.dark
        ? this.stateAttributes.light
        : this.stateAttributes.dark;
    document.documentElement.setAttribute(this.dataAttribute, newTheme);
    this.currentTheme = newTheme;

    this.savePreference(newTheme);
    this.changeThemeButtonContent();
  };

  changeThemeButtonContent = () => {
    const changeTextContent = () => {
      const textContent =
        this.currentTheme === this.stateAttributes.light
          ? this.themeButtonTextContent.darkMode
          : this.themeButtonTextContent.lightMode;
      this.textElement.textContent = textContent;
    };

    const changeIcon = () => {
      const currentIconHTML =
        this.currentTheme === this.stateAttributes.light
          ? this.getThemeIconSVG(this.stateAttributes.light)
          : this.getThemeIconSVG(this.stateAttributes.dark);
          
      const icon = this.rootElement.querySelector(this.selectors.icon);
      icon?.remove();
      this.rootElement.insertAdjacentHTML("afterbegin", currentIconHTML);
    };

    changeTextContent();
    changeIcon();
  };

  onButtonClick = () => {
    this.changeTheme();
  };

  savePreference = (theme) => {
    localStorage.setItem(this.localStorageValue, theme);
  };

  restorePreference = () => {
    const savedTheme = localStorage.getItem(this.localStorageValue);
    if (savedTheme) {
      document.documentElement.setAttribute(
        this.dataAttribute,
        savedTheme
      );
    } else {
      document.documentElement.setAttribute(
        this.dataAttribute,
        this.stateAttributes.light
      );
    }
  };

  bindEvents() {
    this.rootElement.addEventListener("click", this.onButtonClick);
  }

  getThemeIconSVG = () => {
    if (this.currentTheme === this.stateAttributes.light) {
      return `
        <svg fill="#000000" class="theme__icon" height="32px" width="32px" version="1.1" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" data-js-theme-icon>
          <path d="M63.4374046,38.4606323c-0.4258003-0.2060013-0.9384995-0.0848999-1.2276001,0.2910995 c-1.2803001,1.6650009-2.9452972,3.2001991-4.9501991,4.5625c-11.6180992,7.8808022-27.544899,4.9248009-35.4971008-6.5956993 c-7.8154011-11.3204002-4.9902-26.9736996,6.2968998-34.8936005c0.3799-0.2666,0.5263996-0.7588,0.3544998-1.1895001 c-0.1728001-0.4316-0.625-0.6835-1.0771008-0.6181c-4.6474991,0.6953-9.2070999,2.4902-13.1875,5.1893997 C6.9706059,10.0759325,2.1415057,17.427433,0.5526057,25.9079323c-1.582,8.4414024,0.2402,16.9932022,5.1308002,24.0791016 c6.2872,9.1054993,16.4864006,14.0058975,26.8554993,14.0058975c6.3173981,0,12.6982994-1.819397,18.2939987-5.6161995 c6.5800018-4.461998,11.2461014-11.1298981,13.1406021-18.7753983 C64.0877075,39.142334,63.8631058,38.6657333,63.4374046,38.4606323z M49.7098045,56.7224312 c-13.8710976,9.410099-32.8847961,5.8828011-42.3798981-7.872097c-4.5858998-6.642601-6.2948999-14.660202-4.8114996-22.5742016 C4.0086055,18.3239326,8.5379057,11.4294329,15.2723055,6.861033c2.5801001-1.75,5.4189997-3.0937002,8.3643007-3.9726 c-9.3916006,9.0702991-11.1416006,23.9258003-3.5205002,34.9668007 c8.5741997,12.4188995,25.7422009,15.6094017,38.2666016,7.1133003c0.8260994-0.5606003,1.5996017-1.149498,2.3182983-1.764698 C58.4803047,48.6472321,54.6766052,53.3542328,49.7098045,56.7224312z"/>
        </svg>
      `;
    } else {
      return `
        <svg class="theme__icon" width="32px" height="32px" viewBox="0 0 24 24" fill="none" data-js-theme-icon>
          <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
  };
}
  
export default Theme;
