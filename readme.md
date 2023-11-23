### 진행 시 참고 사항

1. 모든 코드 작성은 타입스크립트를 사용합니다.
2. 환경은 selenium으로 되어있으나 selenium 함수는 사용하지 않습니다.
3. 빌드는 'npm run build', 실행은 'node ./dist/index.js' 로 합니다.
4. 작업은 tutorial 패키지 내부에서만 진행합니다.
5. index.ts 및 lib 패키지의 Browser.ts는 변경하지 않습니다.
6. TutorialController를 제외한 tutorial 패키지 내 모든 구현은 class를 활용합니다.

### 요구사항

- 고객이 제품을 사용함에 있어서 절차가 복잡할 경우, 그대로 이탈하는 경우가 많습니다.
- 따라서 고객이 이탈하지 않도록 고객이 보는 페이지에서 튜토리얼을 노출하려 합니다.
- 보여주고자 하는 튜토리얼의 정의는 apiResponse.ts 파일에 apiResponse가 json의 형태로 구현되어 있습니다.
- 아래의 요구 사항에 맞춰 튜토리얼 기능을 구현해주세요.

1. TutorialController를 통해 현재 url의 변경 사항을 지속적으로 수집하는 기능을 구현하세요.
2. Url 이동 시, 빌드 파일이 재로드되므로 Cookie를 이용 (sub-domain이 동일한 환경이므로 cookie의 공유 가능) 하여 order 정보를 저장, 수정, 불러오는 기능을 구현하세요.
3. apiResponse.ts의 response 를 TutorialService를 통하여 Tutorial로 인스턴스화 하세요. 이후 모든 실행은 TutorialService를 통하여 진행하세요.

```
  예시.
  const tutorialService = new TutorialService(response);
  tutorialService.executeStep(...);
```

4. url이 변경됨을 감지하면 Tutorial의 steps를 order 순서대로 순회하며, 각 step의 command를 실행하세요.
   step 실행 조건은 각 step의 location과 현재 url이 일치할 경우 입니다. location이 all일 경우, 어떤 url이든 실행합니다.
   이미 실행된 step은 다시 실행되지 않습니다.
5. command가 MOVE인 경우, 해당 step의 commandTarget으로 이동하세요.
6. command가 POPUP인 경우, 해당 step의 xpath를 통하여 element를 찾으세요. 찾은 element의 하단에 팝업을 띄우세요. 팝업의 내용은 해당 step의 content를 표시하세요.
7. command가 CLICK인 경우, 해당 step의 xpath를 통하여 element를 찾으세요. 찾은 element를 클릭하는 이벤트를 발생시키세요.
