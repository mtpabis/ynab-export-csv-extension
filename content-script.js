/* global browser */
document.addEventListener('mouseup', sendSelectedTextToBackgroundPage)

function sendSelectedTextToBackgroundPage () {
  var selectedText = window.getSelection().toString().trim()

  if (selectedText) {
    browser.runtime.sendMessage({
      textFromSelection: selectedText
    })
  }
}
