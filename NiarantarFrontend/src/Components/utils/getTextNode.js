
export function getTextNodes(node) {
    const textNodes = [];
    if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
    } else {
        for (const childNode of node.childNodes) {
            textNodes.push(...getTextNodes(childNode));
        }
    }
    return textNodes;
}
