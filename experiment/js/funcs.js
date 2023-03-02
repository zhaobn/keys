
/* Div related functions */
function showNext(id, display = "flex", center = true) {
  let div = document.getElementById(id);
  div.style.display = display;
  if (center) {
    div.scrollIntoView(center);
  }
}
function reveal(id) {
  let div = document.getElementById(id);
  div.style.opacity = 1;
}
function hide(id) {
  let div = document.getElementById(id);
  div.style.display = "none";
}
function disableFormInputs (formId) {
  const form = document.getElementById(formId);
  const inputs = form.elements;
  (Object.keys(inputs)).forEach((input) => inputs[input].disabled = true);
}
function isFilled (formID) {
  let notFilled = false;
  const nulls = [ '', '--', '', '--', '', '--' ];
  const form = document.getElementById(formID);
  const inputs = form.elements;
  (Object.keys(inputs)).forEach((input, idx) => {
    let field = inputs[input];
    notFilled = (notFilled || (field.value === nulls[idx]));
  });
  return (!notFilled)
}

/* Grid generator */
function makeGridVars(n, showCenter = true) {
  let varList = {};
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let cId = makeUnit(i, j);
      if (showCenter && i==Math.floor(n/2) && j==Math.floor(n/2)) {
        varList[cId] = 1;
      } else {
        varList[cId] = 0;
      }
    }
  }
  return varList
}

/* Key-maker button functions */
function recordClick(div, tabVars) {
  const cellId = div.id.split('-')[3];
  tabVars[cellId] += 1;
  div.style.backgroundColor = (tabVars[cellId] % 2 == 1) ? 'black' : 'white';
}
function setInitClick(div, divPostId, tabVarThis, tabVarPost) {
  const cellId = div.id.split('-')[3];
  tabVarThis[cellId] += 1;
  tabVarPost[cellId] += 1;
  div.style.backgroundColor = (tabVarThis[cellId] % 2 == 1) ? 'black' : 'white';
  const repCellId = divPostId + '-' + cellId;
  document.getElementById(repCellId).style.backgroundColor = (tabVarPost[cellId] % 2 == 1) ? 'black' : 'white';
}
function getX(tabId) {
  return parseInt(tabId.slice(1).split('-')[0])
}
function getY(tabId) {
  return parseInt(tabId.slice(1).split('-')[1])
}
function makeUnit(x, y) {
  return `c${x}-${y}`
}
function getCurrentBlocks (tabVars) {
  const selected = []
  for (const [tab, val] of Object.entries(tabVars)) {
    (val % 2 ==1) ? selected.push(tab) : null;
  }
  return selected
}
function fillBlock (divPrefix, tabVars, blockId) {
  let blockEl = document.getElementById(`${divPrefix}-${blockId}`);
  blockEl.style.backgroundColor = 'black';
  tabVars[blockId] += 1;
}
function clearBlock (divPrefix, tabVars, blockId) {
  let blockEl = document.getElementById(`${divPrefix}-${blockId}`);
  blockEl.style.backgroundColor = 'white';
  tabVars[blockId] += 1;
}
function growRight(divPrefix, tabVars, n, limit) {
  const curIds = getCurrentBlocks(tabVars);
  const lastBlock = curIds.slice(-1)[0];
  const [ lastX, lastY ] = [ getX(lastBlock), getY(lastBlock) ];

  if (lastY+n < limit) {
    for (let i = 1; i < n+1; i++) {
      fillBlock(divPrefix, tabVars, makeUnit(lastX, lastY+1));
    }
  }
}
function moveDown(divPrefix, tabVars, n, limit) {
  let curIds = getCurrentBlocks(tabVars);
  const lastBlock = curIds.slice(-1)[0];
  if (getX(lastBlock)+n < limit) {
    let newIds = [];
    curIds.forEach(el => newIds.push(makeUnit(getX(el)+n, getY(el))));

    const toRemove = curIds.filter(el => newIds.indexOf(el) < 0);
    const toFill = newIds.filter(el => curIds.indexOf(el) < 0);

    toRemove.forEach(el=>clearBlock(divPrefix, tabVars, el));
    toFill.forEach(el=>fillBlock(divPrefix, tabVars, el));
  }
}
function moveUp(divPrefix, tabVars, n) {
  let curIds = getCurrentBlocks(tabVars);
  const firstBlock = curIds[0];
  if (getX(firstBlock)-n >= 0) {
    let newIds = [];
    curIds.forEach(el => newIds.push(makeUnit(getX(el)-n, getY(el))));

    const toRemove = curIds.filter(el => newIds.indexOf(el) < 0);
    const toFill = newIds.filter(el => curIds.indexOf(el) < 0);

    toRemove.forEach(el=>clearBlock(divPrefix, tabVars, el));
    toFill.forEach(el=>fillBlock(divPrefix, tabVars, el));
  }
}
function moveRight(divPrefix, tabVars, limit) {
  let curIds = getCurrentBlocks(tabVars);
  let curYs = curIds.map(el=>getY(el));
  if (Math.max(...curYs)+1 < limit) {
    let newIds = [];
    curIds.forEach(el => newIds.push(makeUnit(getX(el), getY(el)+1)));

    const toRemove = curIds.filter(el => newIds.indexOf(el) < 0);
    const toFill = newIds.filter(el => curIds.indexOf(el) < 0);

    toRemove.forEach(el=>clearBlock(divPrefix, tabVars, el));
    toFill.forEach(el=>fillBlock(divPrefix, tabVars, el));
  }
}
function moveLeft(divPrefix, tabVars) {
  let curIds = getCurrentBlocks(tabVars);
  let curYs = curIds.map(el=>getY(el));
  if (Math.min(...curYs)-1 >= 0) {
    let newIds = [];
    curIds.forEach(el => newIds.push(makeUnit(getX(el), getY(el)-1)));

    const toRemove = curIds.filter(el => newIds.indexOf(el) < 0);
    const toFill = newIds.filter(el => curIds.indexOf(el) < 0);

    toRemove.forEach(el=>clearBlock(divPrefix, tabVars, el));
    toFill.forEach(el=>fillBlock(divPrefix, tabVars, el));
  }
}
function rotateRight(divPrefix, tabVars, limit) {
  const curIds = getCurrentBlocks(tabVars);
  const centre = curIds.slice(-1)[0];

  let newCoords = [];
  curIds.forEach(el => {
    let [ relX, relY ] = [ getX(el)-getX(centre), getY(el)-getY(centre) ];
    let [ newX, newY ] = [ getX(centre) + relY, getY(centre)-relX ];
    newCoords.push(makeUnit(newX, newY));
  })

  // check limits
  let isGood = 1;
  let newXs = newCoords.map(el=>getX(el));
  let newYs = newCoords.map(el=>getY(el));
  isGood = isGood & (Math.min(...newXs)>=0) & (Math.max(...newXs)<limit);
  isGood = isGood & (Math.min(...newYs)>=0) & (Math.max(...newYs)<limit);

  if (isGood) {
    curIds.forEach(el => clearBlock(divPrefix, tabVars, el));
    newCoords.forEach(el => fillBlock(divPrefix, tabVars, el));
  }
}
function removeLastRow(divPrefix, tabVars) {
  const curIds = getCurrentBlocks(tabVars);
  if (curIds.length > 0) {
    const lastBlock =  curIds.slice(-1)[0];

    curIds.forEach(el => {
      let curX = parseInt(el[1]);
      (curX == getX(lastBlock))? clearBlock(divPrefix, tabVars, el): null;
    })
  }
}
function resetGrid(divPrefix, tabVars, limit, keepCenter = true) {
  for (let i = 0; i < limit; i++) {
    for (let j = 0; j < limit; j++) {
      let blockId = 'c' + i.toString() + j.toString();
      if (keepCenter && i==Math.floor(limit/2) && j==Math.floor(limit/2)) {
        fillBlock(divPrefix, tabVars, blockId);
        tabVars[blockId] = 1;
      } else {
        clearBlock(divPrefix, tabVars, blockId);
        tabVars[blockId] = 0;
      }
    }
  }
}
function addSquare(divPrefix, tabVars, tabLen) {
  const [ cX, cY ] = [ Math.floor(tabLen/2), Math.floor(tabLen/2) ];
  const newSqaureId = makeUnit(cX, cY);

  if (tabVars[newSqaureId]%2==0) {
    fillBlock(divPrefix, tabVars, newSqaureId);
  }
}
function addTriangle(divPrefix, tabVars, tabLen) {
  const [ cX, cY ] = [ Math.floor(tabLen/2), Math.floor(tabLen/2) ];
  const newTriIds = [ makeUnit(cX, cY+1), makeUnit(cX, cY), makeUnit(cX-1, cY) ];

  newTriIds.forEach(id => {
    if (tabVars[id]%2==0) {
      fillBlock(divPrefix, tabVars, id);
    }
  })
}
function addBox(divPrefix, tabVars, tabLen) {
  const [ cX, cY ] = [ Math.floor(tabLen/2), Math.floor(tabLen/2) ];
  const newBoxId = [ makeUnit(cX, cY), makeUnit(cX-1, cY), makeUnit(cX, cY+1), makeUnit(cX-1, cY+1) ];

  newBoxId.forEach(el=> {
    if (tabVars[el]%2==0) {
      fillBlock(divPrefix, tabVars, el);
    }
  })
}
function addStick(divPrefix, tabVars, tabLen) {
  const [ cX, cY ] = [ Math.floor(tabLen/2), Math.floor(tabLen/2) ];
  const newTriIds = [ makeUnit(cX, cY), makeUnit(cX, cY-1), makeUnit(cX, cY+1) ];

  newTriIds.forEach(id => {
    if (tabVars[id]%2==0) {
      fillBlock(divPrefix, tabVars, id);
    }
  })
}
