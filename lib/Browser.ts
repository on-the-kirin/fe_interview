import { Builder } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";

export class Browser {
  async build() {
    const options = this.setOptions();
    return await new Builder().forBrowser("chrome").setChromeOptions(options).build();
  }

  setOptions() {
    const options = new ChromeOptions();
    options.addArguments("start-maximized");
    options.excludeSwitches("enable-logging");
    options.addArguments("disable-plugins");
    return options;
  }
}
