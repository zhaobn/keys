
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
      let cId = 'c' + i.toString() + j.toString();
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
  return parseInt(tabId[1])
}
function getY(tabId) {
  return parseInt(tabId[2])
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
      fillBlock(divPrefix, tabVars, `c${lastX}${lastY+i}`)
    }
  }
}
function moveDown(divPrefix, tabVars, n, limit) {
  let curIds = getCurrentBlocks(tabVars);
  const lastBlock = curIds.slice(-1)[0];
  if (getX(lastBlock)+n < limit) {
    let newIds = [];
    curIds.forEach(el => {
      let newId = `c${getX(el)+n}${getY(el)}`;
      newIds.push(newId)
    })

    const toRemove = curIds.filter(el => newIds.indexOf(el) < 0);
    const toFill = newIds.filter(el => curIds.indexOf(el) < 0);

    toRemove.forEach(el=>clearBlock(divPrefix, tabVars, el));
    toFill.forEach(el=>fillBlock(divPrefix, tabVars, el));
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
