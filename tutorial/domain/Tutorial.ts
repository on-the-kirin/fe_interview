import { TutorialResponse } from "apiResponse";
import Step from "./Step";

class Tutorial {
  tutorialIdx: number;
  tutorialName: string;
  tutorialDescription: string;
  stepsOrderd: Step[];

  constructor(tutorialResponse: TutorialResponse) {
    this.tutorialIdx = tutorialResponse.tutorialIdx;
    this.tutorialName = tutorialResponse.tutorialName;
    this.tutorialDescription = tutorialResponse.tutorialDescription;
    this.stepsOrderd = tutorialResponse.steps
      .map((stepResponse) => new Step(stepResponse))
      .sort((a, b) => a.order - b.order);
  }
}

export default Tutorial;
