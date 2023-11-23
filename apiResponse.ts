export type TutorialResponse = {
  tutorialIdx: number;
  tutorialName: string;
  tutorialDescription: string;
  steps: Array<StepResponse>;
};

export type StepResponse = {
  stepIdx: number;
  stepDescription: string;
  location: string;
  content: string | null;
  command: string;
  commandTarget: string | null;
  order: number;
  xpath: string | null;
};

export const response: TutorialResponse = {
  tutorialIdx: 1,
  tutorialName: "로그인 가이드",
  tutorialDescription: "로그인 유도 가이드입니다.",
  steps: [
    {
      stepIdx: 1,
      stepDescription: "강제 이동",
      location: "all",
      content: null,
      command: "MOVE",
      commandTarget: "https://app.keepgrow.com/admin/store",
      order: 0,
      xpath: null,
    },
    {
      stepIdx: 2,
      stepDescription: "로그인 버튼 클릭 요청",
      location: "https://app.keepgrow.com/admin/store",
      content: "로그인을 위해 버튼을 클릭해 주세요.",
      command: "POPUP",
      commandTarget: null,
      order: 1,
      xpath: '//*[@id="topbar"]/div[2]/div[2]/button[2]',
    },
    {
      stepIdx: 3,
      stepDescription: "로그인 실행 요청",
      location: "https://auth.keepgrow.com/uaa/login",
      content: "로그인을 진행해 주세요.",
      command: "POPUP",
      commandTarget: null,
      order: 2,
      xpath: '//*[@id="signInForm"]/div',
    },
    {
      stepIdx: 4,
      stepDescription: "나의 킵그로우 페이지로 이동",
      location: "https://app.keepgrow.com/admin/store",
      content: null,
      command: "CLICK",
      commandTarget: null,
      order: 3,
      xpath: '//*[@id="sidebar"]/ul/div[1]/ul/li[1]/a',
    },
  ],
};
