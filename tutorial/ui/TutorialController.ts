import { setCookie, getCookie } from "utils/cookie.utils";
import TutorialService from "tutorial/application/TutorialService";
import { response } from "apiResponse";

const TutorialController = () => {
  const tutorialService = new TutorialService(response);
  let previousUrl = "";

  setInterval(() => {
    const currentUrl = window.location.href;
    if (previousUrl !== currentUrl) {
      previousUrl = currentUrl;
      tutorialService.executeSteps(currentUrl);
    }
  }, 2000);
};

// 실행이 된 후에

//   const tutorialService = new TutorialService(response);
// tutorialService.executeStep(...); 와 같이 실행한다.
TutorialController();
