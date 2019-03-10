export function hasChildren(elem: Node) {
  return (
    elem.nodeType === Node.ELEMENT_NODE
    || elem.nodeType === Node.DOCUMENT_NODE
    || elem.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
}


export function getTextNodes(elem: Node) {
  return _getTextNodes(elem)
    .filter((node: Node) => Boolean(node.textContent.trim()))
    .filter((node: Node) => node.textContent.match(/[\S]+/));;
}

function _getTextNodes(elem: Node) {
  var textNodes = [];
  if (hasChildren(elem)) {

    Array.from(elem.childNodes).forEach((node: Node) => {
      if (node.nodeType == Node.TEXT_NODE) {
        textNodes.push(node);
      }
      else {
        textNodes = textNodes.concat(_getTextNodes(node));
      }

    })
  }
  return textNodes;
}
