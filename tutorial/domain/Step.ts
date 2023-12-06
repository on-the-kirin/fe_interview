import { StepResponse } from "apiResponse";

class Step {
  stepIdx: number;
  stepDescription: string;
  location: string;
  content: string | null;
  command: string;
  commandTarget: string | null;
  order: number;
  xpath: string | null;

  constructor(data: StepResponse) {
    this.stepIdx = data.stepIdx;
    this.stepDescription = data.stepDescription;
    this.location = data.location;
    this.content = data.content;
    this.command = data.command;
    this.commandTarget = data.commandTarget;
    this.order = data.order;
    this.xpath = data.xpath;
  }
}

export default Step;
