
let n=8

// Generate html table cells
let tabCodeList = []
for (let i = 0; i < n; i++) {
  let tcCodeList = []
  for (let j = 0; j < n; j++) {
    let cId = i.toString() + j.toString()
    let tcCdoe = `<td id="task-grid-tab-c${cId}" onclick=myFunc(this)></td>`
    tcCodeList.push(tcCdoe)
  }
  let trCode = '<tr> ' + tcCodeList.join('') + ' </tr>'
  tabCodeList.push(trCode)
}
console.log(tabCodeList.join('\n'))

console.log('\n')
console.log('\n')
console.log('\n')


// Generate global vars
let varList = []
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    let cId = i.toString() + j.toString();
    varList.push(`'c${cId}': 0,`)
  }
}
console.log(varList.join('\n'))
