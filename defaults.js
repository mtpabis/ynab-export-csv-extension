export var allOptions = [
  {
    id: 1,
    name: 'Nordea DK',
    regexp: /(\d\d-\d\d-\d\d\d\d)\s*(.*).\d\d-\d\d-\d\d\d\d.\s*(-?[0-9.,]+)\skr\.\s*-?[0-9.,]+\skr\./gm,
    hasSeparateFieldForSign: false,
    format: ['D', 'P', 'I']
  },
  { id: 2,
    name: 'Banco BEST PT',
    regexp: /(\d\d-\d\d-\d\d\d\d)\s\d\d-\d\d-\d\d\d\d\s(.*)\s(D|C)\s(-?[0-9.,]+)\sEUR.*/gm,
    hasSeparateFieldForSign: true,
    format: ['D', 'P', 'S', 'I']
  },
  {
    id: 3,
    name: 'mBank',
    regexp: /.*(\d\d\.\d\d\.\d\d\d\d)\s*(.*)\s*(-?[0-9.,]+)\sPLN\s*/gm,
    hasSeparateFieldForSign: false,
    format: ['D', 'P', 'I'],
    newLineSeparator: "\t\t\n",
  },
]
export function isEmpty (obj) {
  for (var prop in obj) {
    return false
  }
  return true
}
