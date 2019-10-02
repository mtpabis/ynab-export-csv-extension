/* global browser */
import { allOptions, isEmpty } from '../defaults.js'

updateList()

function updateList () {
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

function bankFormatChangedHandler (e) {
  e.preventDefault()
  var valueOfSelected = parseInt(document.getElementById('banks').value)
  var selectedBank = allOptions.filter((bank) => bank.id === valueOfSelected)[0]
  browser.storage.local.set(selectedBank)
  console.log('stored selection:' + selectedBank)
}
document.getElementById('banks').addEventListener('change', bankFormatChangedHandler)
