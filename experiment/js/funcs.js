
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
function makeGridVars(n) {
  let varList = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let cId = i.toString() + j.toString();
      varList.push(`'c${cId}': 0,`)
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
function clearBlock (blockId) {
  let blockEl = document.getElementById(`task-grid-tab-${blockId}`);
  blockEl.style.backgroundColor = 'white';
  tabVars[blockId] += 1;
}
function growRight(divPrefix, tabVars, n) {
  const curIds = getCurrentBlocks(tabVars);
  const lastBlock = curIds.slice(-1)[0];
  const [ lastX, lastY ] = [ getX(lastBlock), getY(lastBlock) ];

  if (lastY+n < 7) {
    for (let i = 1; i < n+1; i++) {
      fillBlock(divPrefix, `c${lastX}${lastY+i}`)
    }
  }
}
