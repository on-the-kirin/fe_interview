export function createPopup(content: string): any {
  const popup = document.createElement("div");

  popup.innerText = content;
  popup.setAttribute(
    "style",
    "position:absolute; top: 4rem; font-size: 2rem; text-align: center; background: black; color: white; font-weight:600"
  );

  return popup;
}

export function getElementByXpath(path: string) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

export function insertAfter(referenceNode: Node, newNode: Node) {
  referenceNode?.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
}
