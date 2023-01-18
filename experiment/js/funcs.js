
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
