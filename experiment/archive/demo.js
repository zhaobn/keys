
function myFunc(div) {
  const cellId = div.id.split('-')[3];
  tabVars[cellId] += 1;
  div.style.backgroundColor = (tabVars[cellId] % 2 == 1) ? 'black' : 'white';
  // console.log(testVar)
}
function getX(tabId) { // I might have swapped the meaning of X and Y coordinates here who knows
  return parseInt(tabId[1])
}
function getY(tabId) {
  return parseInt(tabId[2])
}

// Helper functions
function getCurrentBlocks () {
  const selected = []
  for (const [tab, val] of Object.entries(tabVars)) {
    (val % 2 ==1) ? selected.push(tab) : null;
  }
  return selected
}
function fillBlock (blockId) {
  let blockEl = document.getElementById(`task-grid-tab-${blockId}`);
  blockEl.style.backgroundColor = 'black';
  tabVars[blockId] += 1;
}
function clearBlock (blockId) {
  let blockEl = document.getElementById(`task-grid-tab-${blockId}`);
  blockEl.style.backgroundColor = 'white';
  tabVars[blockId] += 1;
}

// Example functions
function growRight(n) {
  const curIds = getCurrentBlocks();
  const lastBlock = curIds.slice(-1)[0];
  const [ lastX, lastY ] = [ getX(lastBlock), getY(lastBlock) ];

  if (lastY+n > 6) {
    alert('Exceed boundary!')
  } else {
    for (let i = 1; i < n+1; i++) {
      fillBlock(`c${lastX}${lastY+i}`)
    }
  }
}
function moveDown(n) {
  let curIds = getCurrentBlocks();
  const lastBlock = curIds.slice(-1)[0];

  if (getX(lastBlock)+n > 6) {
    alert('Exceed boundary!')
  } else {
    let newIds = [];
    curIds.forEach(el => {
      let newId = `c${getX(el)+n}${getY(el)}`;
      newIds.push(newId)
    })

    const toRemove = curIds.filter(el => newIds.indexOf(el) < 0);
    const toFill = newIds.filter(el => curIds.indexOf(el) < 0);

    toRemove.forEach(el=>clearBlock(el));
    toFill.forEach(el=>fillBlock(el));
  }

}
function fillUp() {
  const curIds = getCurrentBlocks();
  let allX = [];
  let allY = [];
  curIds.forEach(el=>{
    allX.push(getX(el));
    allY.push(getY(el));
  })
  for (let i = Math.min(...allX); i <= Math.max(...allX); i++) {
    for (let j = Math.min(...allY); j <= Math.max(...allY); j++) {
      let curBlock = `c${i}${j}`;
      (curIds.indexOf(curBlock) < 0)? fillBlock(curBlock): null;
    }
  }
}
function removeLastRow() {
  const curIds = getCurrentBlocks();
  const lastBlock =  curIds.slice(-1)[0];

  curIds.forEach(el => {
    let curX = parseInt(el[1]);
    (curX == getX(lastBlock))? clearBlock(el): null;
  })
}
function rotateRight() {
  const curIds = getCurrentBlocks();
  const centre = curIds.slice(-1)[0];

  let newCoords = [];
  curIds.forEach(el => {
    let [ relX, relY ] = [ getX(el)-getX(centre), getY(el)-getY(centre) ];
    let [ newX, newY ] = [ getX(centre) + relY, getY(centre)-relX ];
    let newCoord = `c${newX}${newY}`;
    newCoords.push(newCoord)
  })

  // check limits
  let isGood = 1;
  newCoords.forEach(el=> {
    let [ elX, elY ] = [ getX(el), getY(el) ];
    if (elX < 0 || elX > 6 || elY < 0 || elY > 6) {
      isGood = 0;
    }
  })
  if (isGood) {
    curIds.forEach(el => clearBlock(el));
    newCoords.forEach(el => fillBlock(el));
  } else {
    alert('Exceed boundary!');
  }
}
