/* global browser */
import { allOptions, isEmpty } from '../defaults.js'

var countLoads = 0
console.log('loading options for the ' + countLoads++ + 'time')
updateList()

function updateList () {
  console.log(allOptions)
  makeOptionsMenu(allOptions)
}

function makeOptionsMenu (options) {
  browser.storage.local.get().then((optionFromStorage) => {
    allOptions.forEach((item) => {
      var newOption = document.createElement('option')
      newOption.text = item.name
      newOption.value = item.id
      document.getElementById('banks').add(newOption)
    })
    if (!isEmpty(optionFromStorage)) {
      document.getElementById('banks').value = optionFromStorage.id
    }
  })
}

function saveButtonHandler (e) {
  e.preventDefault()
  var valueOfSelected = parseInt(document.getElementById('banks').value)
  var selectedBank = allOptions.filter((bank) => bank.id === valueOfSelected)[0]
  browser.storage.local.set(selectedBank)
  console.log('stored selection:' + selectedBank)
}
document.getElementById('selected-regexp').addEventListener('submit', saveButtonHandler)
