function flipScreen() {
  const style = document.createElement('style');
  style.id = 'flip-screen-style';
  style.textContent = `
    body {
      transform: rotate(180deg);
      transform-origin: center;
    }
  `;
  document.head.appendChild(style);
}

function unflipScreen() {
  const style = document.getElementById('flip-screen-style');
  if (style) {
    style.remove();
  }
}

// Check if we should flip on load
chrome.storage.local.get(['isFlipped'], function(result) {
  if (result.isFlipped) {
    flipScreen();
  }
});