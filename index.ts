import { Browser } from "./lib/Browser";
import { urlContains, urlIs } from "selenium-webdriver/lib/until";
import * as fs from "node:fs";
import { WebDriver } from "selenium-webdriver";

async function executeScriptFromFile(driver: WebDriver, filePath: string) {
  try {
    // 파일을 동기적으로 읽어와 문자열로 반환
    const javascriptCode = fs.readFileSync(filePath, "utf-8");

    // WebDriver에서 executeScript를 사용하여 코드 실행
    await driver.executeScript(javascriptCode);
  } catch (err) {
    console.error(err);
  }
}

(async function main() {
  const browser = await new Browser().build();

  // 최초 실행
  await browser
    .get("https://app.keepgrow.com/admin/landing-info/114")
    .then(() => {
      executeScriptFromFile(browser, "./dist/tutorial.js");
    });

  // 유저 이벤트 클릭
  await browser
    .wait(urlIs("https://app.keepgrow.com/admin/store"))
    .then(() => {
      executeScriptFromFile(browser, "./dist/tutorial.js");
    })
    .then(async () => {
      await browser.sleep(10000).then(() => {
        browser
          .findElement({ xpath: '//*[@id="topbar"]/div[2]/div[2]/button[2]' })
          .click();
      });
    });

  // 유저 로그인
  await browser
    .wait(urlIs("https://auth.keepgrow.com/uaa/login"))
    .then(() => {
      executeScriptFromFile(browser, "./dist/tutorial.js");
    })
    .then(async () => {
      await browser.sleep(10000).then(() => {
        browser
          .findElement({ xpath: '//*[@id="username"]' })
          .sendKeys("fe_interview@uneedcomms.com");
        browser
          .findElement({ xpath: '//*[@id="password"]' })
          .sendKeys("welcome123");
        browser
          .findElement({ xpath: '//*[@id="signInForm"]/div/div[5]/button' })
          .click();
      });
    });

  // 로그인 후 스토어 진입시 js 실행
  await browser.wait(urlIs("https://app.keepgrow.com/admin/store")).then(() => {
    executeScriptFromFile(browser, "./dist/tutorial.js");
  });

  // 클릭을 통한 페이지 진입 시, 브라우저 종료
  await browser
    .wait(urlContains("https://app.keepgrow.com/admin/processes"))
    .then(() => {
      executeScriptFromFile(browser, "./dist/tutorial.js");
    })
    .then(async () => {
      await browser.sleep(5000).then(() => {
        browser.quit();
      });
    });
})();
