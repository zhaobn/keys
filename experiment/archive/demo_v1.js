
const N = 11;

let demoGrid1 = makeGridVars(N, showCenter=0);
let gridDiv = document.getElementById('demo-grid');
for (let i = 0; i < N; i++) {
  let tcCodeList = gridDiv.insertRow();
  for (let j = 0; j < N; j++) {
    let tcell = tcCodeList.insertCell();
    tcell.id = `demo-grid-c` + i.toString() + '-' + j.toString();
    // tcell.style.width = '5px';
    // tcell.style.height = '5px';
    // tcell.style.backgroundColor = 'black';
    tcell.style.border = '#ffffff solid 1px';
  }
}

let centerCellId = makeUnit(Math.floor(N/2),Math.floor(N/2));
document.getElementById(`demo-grid-${centerCellId}`).style.borderColor='red';


let squareBtn = document.getElementById('square-button');
let triangBtn = document.getElementById('triang-button');
// let boxBtn = document.getElementById('box-button');
let stickBtn = document.getElementById('stick-button');



let rotateBtn = document.getElementById('rotate-button');
// let flipBtn = document.getElementById('flip-button');
// // let enlargBtn = document.getElementById('enlarge-button');
// // let shrinkBtn = document.getElementById('shrink-button');


// let upBtn = document.getElementById('up-button');
// let downBtn = document.getElementById('down-button');
// let leftBtn = document.getElementById('left-button');
// let rightBtn = document.getElementById('right-button');


squareBtn.onclick = () => addSquare('demo-grid', demoGrid1, N);
triangBtn.onclick = () => addTriangle('demo-grid', demoGrid1, N);
// boxBtn.onclick = () => addBox('demo-grid', demoGrid1, N);
stickBtn.onclick = () => addStick('demo-grid', demoGrid1, N);

rotateBtn.onclick = () => rotateRight('demo-grid', demoGrid1, N);

// downBtn.onclick = () => moveDown('demo-grid', demoGrid1, 1, N);
// upBtn.onclick = () => moveUp('demo-grid', demoGrid1, 1);
// rightBtn.onclick = () => moveRight('demo-grid', demoGrid1, N);
// leftBtn.onclick = () => moveLeft('demo-grid', demoGrid1);

// Use arrow keys
document.onkeydown = checkKey;

function checkKey(e) {

  e = e || window.event;
  switch(e.key) {
    case 'w':
    case 'ArrowUp':
      moveUp('demo-grid', demoGrid1, 1);
      break;
    case 's':
    case 'ArrowDown':
      moveDown('demo-grid', demoGrid1, 1, N);
      break;
    case 'a':
    case 'ArrowLeft':
      moveLeft('demo-grid', demoGrid1);
      break;
    case 'd':
    case 'ArrowRight':
      moveRight('demo-grid', demoGrid1, N);
      break;
  }
}
