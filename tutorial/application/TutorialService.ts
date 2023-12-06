import { TutorialResponse } from "apiResponse";
import Tutorial from "tutorial/domain/Tutorial";
import Step from "tutorial/domain/Step";
import { getCookie, setCookie, COOKIE_CURRENT_ORDER } from "utils/cookie.utils";

import {
  createPopup,
  getElementByXpath,
  insertAfter,
} from "utils/document.utils";

class TutorialService {
  private tutorial: Tutorial;

  constructor(tutorialResponse: TutorialResponse) {
    this.tutorial = new Tutorial(tutorialResponse);
  }

  public executeSteps(currentUrl: string) {
    for (const step of this.tutorial.stepsOrderd) {
      if (this.shouldExecuteStep(step, currentUrl)) {
        this.executeStep(step);
      }
    }
  }

  private shouldExecuteStep(step: Step, currentUrl: string): boolean {
    if (this.isCurrentOrder(step.order) === false) {
      return false;
    }

    // 쿼리스트링은 어떻게?
    if (step.location === "all" || step.location === currentUrl) {
      return true;
    } else {
      return false;
    }
  }

  private executeStep(step: Step) {
    switch (step.command) {
      case "MOVE":
        console.log(`ORDER${step.order}) MOVE TO ${step.commandTarget}`);
        this.move(step.commandTarget);
        break;
      case "POPUP":
        console.log(
          `ORDER${step.order}) POPUP ${step.content} under ${step.xpath}`
        );
        this.showPopup(step.content, step.xpath);
        break;
      case "CLICK":
        console.log(`ORDER${step.order}) CLICK ${step.xpath}`);
        this.clickElement(step.xpath);
        break;
      default:
        throw new Error(`유효하지 않은 커맨드 ${step.command}`);
    }

    setCookie(COOKIE_CURRENT_ORDER, (step.order + 1).toString(), 5);
  }

  private isCurrentOrder(order: number): boolean {
    const currentOrder = this.getCurrentOrderFromCookie(COOKIE_CURRENT_ORDER);
    return order === currentOrder;
  }

  private getCurrentOrderFromCookie(cookieName: string): number {
    const currentOrderStr = getCookie(cookieName);
    if (currentOrderStr) {
      return +currentOrderStr;
    } else {
      setCookie(cookieName, "0", 5);
      return 0;
    }
  }

  private clickElement(xpath: string | null) {
    if (xpath) {
      const target = getElementByXpath(xpath);
      if (target) {
        // @ts-ignore
        target.click();
      } else {
        throw new Error(
          `스텝의 xpath ${xpath}에 대한 엘리먼트를 찾을 수 없습니다.`
        );
      }
    } else {
      throw new Error("Step의 xpath가 설정되지 않았습니다.");
    }
  }

  private showPopup(content: string | null, xpath: string | null) {
    if (xpath && content) {
      const targetElement = getElementByXpath(xpath);

      if (!targetElement) {
        throw new Error(
          `스텝의 xpath ${xpath}에 대한 엘리먼트를 찾을 수 없습니다.`
        );
      }

      const popup = createPopup(content);

      insertAfter(targetElement, popup);
    } else {
      throw new Error("Step의 xpath가 설정되지 않았습니다.");
    }
  }

  private move(commandTarget: string | null) {
    if (commandTarget) {
      window.location.href = commandTarget;
    } else {
      throw new Error("Step의 commandTarget가 설정되지 않았습니다.");
    }
  }
}

export default TutorialService;
