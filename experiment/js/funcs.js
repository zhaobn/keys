
/* Div functions */
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
function createCustomElement (type = 'div', className, id) {
  let element = (["svg", "polygon"].indexOf(type) < 0)?
    document.createElement(type):
    document.createElementNS("http://www.w3.org/2000/svg", type);
  if (className.length > 0) element.setAttribute("class", className);
  element.setAttribute("id", id);
  return element;
}
function createDivWithStyle (className = "div", id = "", style = "") {
  let element = createCustomElement('div', className, id);
  setStyle(element, style);
  return element;
}
function createText(h = "h1", text = 'hello') {
  let element = document.createElement(h);
  let tx = document.createTextNode(text);
  element.append(tx);
  return(element)
}
function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
function createBtn (btnId, text = "Button", on = true, className = "task-button") {
  let btn = createCustomElement("button", className, btnId);
  btn.disabled = !on;
  (text.length > 0) ? btn.append(document.createTextNode(text)): null;
  return(btn)
}


/* Form functions */
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
function disableFormInputs (formId) {
  const form = document.getElementById(formId);
  const inputs = form.elements;
  (Object.keys(inputs)).forEach((input) => inputs[input].disabled = true);
}
function findAllIndex(element, array) {
  let indices = [];
  let idx = array.indexOf(element);
  while (idx != -1) {
    indices.push(idx);
    idx = array.indexOf(element, idx + 1);
  }
  return(indices);
}
function compIsFilled (nChecks) {
  let radios = document.getElementsByTagName('input');
  let checked = 0;
  for (let i = 0; i < radios.length; i++) {
      checked += radios[i].checked;
  }
  return (checked == nChecks)
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
function matchLimit(x, limit) {
  return (x < 0)? x + limit: x % limit;
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

function moveDownInf(divPrefix, tabVars, n, limit) {
  let curIds = getCurrentBlocks(tabVars);
  if (curIds.length > 0) {
    let newIds = [];
    curIds.forEach(el => newIds.push(makeUnit(matchLimit(getX(el)+n, limit), getY(el))));
    curIds.filter(el => newIds.indexOf(el) < 0).forEach(el=>clearBlock(divPrefix, tabVars, el));
    newIds.filter(el => curIds.indexOf(el) < 0).forEach(el=>fillBlock(divPrefix, tabVars, el));
  }
}
function moveUpInf(divPrefix, tabVars, n, limit) {
  let curIds = getCurrentBlocks(tabVars);
  if (curIds.length > 0) {
    let newIds = [];
    curIds.forEach(el => newIds.push(makeUnit(matchLimit(getX(el)-n, limit), getY(el))));
    curIds.filter(el => newIds.indexOf(el) < 0).forEach(el=>clearBlock(divPrefix, tabVars, el));
    newIds.filter(el => curIds.indexOf(el) < 0).forEach(el=>fillBlock(divPrefix, tabVars, el));
  }
}
function moveRightInf(divPrefix, tabVars, n, limit) {
  let curIds = getCurrentBlocks(tabVars);
  if (curIds.length > 0) {
    let newIds = [];
    curIds.forEach(el => newIds.push(makeUnit(getX(el), matchLimit(getY(el)+n, limit))));
    curIds.filter(el => newIds.indexOf(el) < 0).forEach(el=>clearBlock(divPrefix, tabVars, el));
    newIds.filter(el => curIds.indexOf(el) < 0).forEach(el=>fillBlock(divPrefix, tabVars, el));
  }
}
function moveLeftInf(divPrefix, tabVars, n, limit) {
  let curIds = getCurrentBlocks(tabVars);
  if (curIds.length > 0) {
    let newIds = [];
    curIds.forEach(el => newIds.push(makeUnit(getX(el), matchLimit(getY(el)-n, limit))));
    curIds.filter(el => newIds.indexOf(el) < 0).forEach(el=>clearBlock(divPrefix, tabVars, el));
    newIds.filter(el => curIds.indexOf(el) < 0).forEach(el=>fillBlock(divPrefix, tabVars, el));
  }
}


function rotateRightCenter(divPrefix, tabVars, limit) {
  const curIds = getCurrentBlocks(tabVars);
  if (curIds.length > 0) {
    let [ firstCell, lastCell ] = [ curIds[0], curIds.slice(-1)[0] ];
    let [ fX, fY, lX, lY ] = [ getX(firstCell), getY(firstCell), getX(lastCell), getY(lastCell) ];
    let [ startX, endX ] = (fX < lX)? [ fX, lX ]: [ lX, fX ];
    let [ startY, endY ] = (fY < lY)? [ fY, lY ]: [ lY, fY ];

    let centerX = ((endX - startX) > 0) ? startX + Math.ceil((endX - startX)/2) : startX;
    let centerY = ((endY - startY) > 0) ? startY + Math.floor((endY - startY)/2) : startY;

    let newCoords = [];
    curIds.forEach(el => {
      let [ relX, relY ] = [ getX(el)-centerX, getY(el)-centerY ];
      let [ newX, newY ] = [ centerX + relY, centerY-relX ];
      newCoords.push(makeUnit(matchLimit(newX, limit), matchLimit(newY, limit)));
    })
    curIds.forEach(el => clearBlock(divPrefix, tabVars, el));
    newCoords.forEach(el => fillBlock(divPrefix, tabVars, el));
  }

}
function rotateRight(divPrefix, tabVars, limit) {
  const curIds = getCurrentBlocks(tabVars);
  if (curIds.length > 0) {
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
}
function flipLeftRight() {}
function flipTopBottom() {}
function moveRight(divPrefix, tabVars, limit) {
  let curIds = getCurrentBlocks(tabVars);
  if (curIds.length > 0) {
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

}
function moveLeft(divPrefix, tabVars) {
  let curIds = getCurrentBlocks(tabVars);
  if (curIds.length > 0) {
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
}
function moveDown(divPrefix, tabVars, n, limit) {
  let curIds = getCurrentBlocks(tabVars);
  if (curIds.length > 0) {
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
}
function moveUp(divPrefix, tabVars, n) {
  let curIds = getCurrentBlocks(tabVars);
  if (curIds.length > 0) {
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
      let blockId = makeUnit(i, j);
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







/* Bebrief form */
function removeSpecial (text) {
  text = text.replace(/[&\/\\#,$~%"\[\]{}@^_|`']/gi, '');
  text = text.replace(/(\r\n|\n|\r|\t)/gm, " ")
  return text
}
function showPostCheckPage (isPass) {
  const pageDiv = isPass? 'pass' : 'retry';
  document.getElementById('check-btn').style.display = 'none';
  document.getElementById(pageDiv).style.display = 'flex';
}
function showCompletion(code, nCorrect) {
  hide("debrief");
  showNext("completed", 'block');
  let bonusVal = nCorrect * 1.0;
  bonusVal = Math.round(bonusVal*100)/100;
  let t = document.createTextNode(code);
  let co = createText('p', `You completed ${nCorrect} tasks successfully!
  You will get ${bonusVal} pounds bonus on top of your base pay.`)
  // let returnLink = createCustomElement('p', '', '')
  // returnLink.innerHTML = `Click <a href='https://app.prolific.co/submissions/complete?cc=${code}'>here</a> to redirect to Prolific.`
  document.getElementById('completion-code').append(t);
  document.getElementById('completed').append(co);
  // document.getElementById('completed').append(returnLink);
}
function generateToken (length) {
  let tokens = '';
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < length; i ++) {
      tokens += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return tokens;
}
function formatDates (date, option = 'date') {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate() + 1).padStart(2, '0');
  let hour = String(date.getHours()+ 1).padStart(2, '0');
  let min = String(date.getMinutes() + 1).padStart(2, '0');
  let sec = String(date.getSeconds() + 1).padStart(2, '0');
  dateParts = (option === 'date') ? [ year, month, day ] : [ hour, min, sec ];
  return dateParts.join('_');
}
function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
