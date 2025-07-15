document.getElementById('flipBtn').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      files: ['flip.js']
    }, () => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: flipScreen
      });
      chrome.storage.local.set({isFlipped: true});
    });
  });
});

document.getElementById('resetBtn').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: unflipScreen
    });
    chrome.storage.local.set({isFlipped: false});
  });
});

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