import { getTextNodes  } from "./getTextNode"



export  function highlightWord(word) {
  if (word.length > 1) {
    const textNodes = getTextNodes(document.body);
    textNodes.forEach(node => {
      const content = node.nodeValue;
      const regex = new RegExp(`\\b${word}\\b`, 'gi');

      // Check if the word is empty, and if so, remove any existing highlighted spans
      if (word.trim() === '') {
        const highlightedSpans = node.parentNode.querySelectorAll('.highlight');
        highlightedSpans.forEach(span => {
          const text = document.createTextNode(span.innerText);
          node.parentNode.insertBefore(text, span);
          node.parentNode.removeChild(span);
        });
      } else if (regex.test(content)) {
        const span = document.createElement('span');
        span.className = 'highlight';
        const highlightedContent = content.replace(regex, match => `<span class="highlight">${match}</span>`);

        // Replace the entire content of the node with the highlighted content
        node.parentNode.replaceChild(span, node);
        span.innerHTML = highlightedContent;
      }
    });
  } else {
    // Remove all existing highlighted spans from the DOM
    const highlightedSpans = document.querySelectorAll('.highlight');
    highlightedSpans.forEach(span => {
      const text = document.createTextNode(span.innerText);
      span.parentNode.insertBefore(text, span);
      span.parentNode.removeChild(span);
    });
  }
}
