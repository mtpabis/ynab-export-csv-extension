/* global browser */
import { isEmpty, allOptions } from '/defaults.js'
var selectedText = ''

browser.storage.local.get().then((options) => {
  if (isEmpty(options)) {
    browser.storage.local.set(allOptions[0])
  }
})

browser.menus.create({
  id: 'export-ynab-csv',
  title: 'Export to YNAB CSV',
  contexts: ['all']
})

browser.runtime.onMessage.addListener(handleMessage)
function handleMessage (request) {
  selectedText = request.textFromSelection
}

browser.menus.onClicked.addListener(handleClicked)
function handleClicked (info) {
  switch (info.menuItemId) {
    case 'export-ynab-csv':
      browser.storage.local.get().then((options) => {
        downloadYnabFile(selectedText, options)
      })
      break
  }
}

function downloadYnabFile (selectedText, options) {
  var textAsCsv = WriteAsCsv(Parse(selectedText, options.regexp), options.format, options.hasSeparateFieldForSign)
  var blob = new Blob([textAsCsv],
    {
      type: 'text/plain'
    })
  var url = URL.createObjectURL(blob)
  var downloadOptions = {
    filename: 'ynab.csv',
    saveAs: true,
    url: url
  }
  browser.downloads.download(downloadOptions)
}

function Parse (copiedText, regex) {
  return copiedText.split('\n').map(line => {
    var r = regex.exec(line)
    regex.lastIndex = 0
    return r
  })
}

function WriteAsCsv (parsed, format, hasSeparateFieldForSign) {
  var result = 'Date;Payee;Memo;Inflow\n'
  parsed.forEach((line, index) => {
    // sometimes there are double \n terminators - so we have to deal with empty lines
    if (line !== null) {
      line.shift()
      var date = line[format.indexOf('D')]
      var payee = line[format.indexOf('P')]
      var inflow = line[format.indexOf('I')]
      if (hasSeparateFieldForSign) {
        var sign = line[format.indexOf('S')] === 'C' ? '+' : '-'
        console.log(sign)
        inflow = sign + inflow
      }
      result = result.concat(`${date};${payee};${payee};${inflow}\n`)
    }
  })
  return result
}
