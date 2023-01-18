
const mode = 'dev';
const N = 7; // use an odd number to make "center" easy to locate


// instruction page 0a
let insCounter0a = 0;
const insBtn0a = document.getElementById('task-btn-instruction0a-next');
insBtn0a.onclick = () => {
  if (insCounter0a < 3) {
    showNext(`instruction-0${insCounter0a+1}`, 'block', 0);
    insCounter0a += 1
  } else {
    hide('instruction-0a')
    showNext('instruction-0b', 'flex', 0)
  }
}
// instruction page 0b
let insCounter0b = 0;
const insBtn0b = document.getElementById('task-btn-instruction0b-next');
insBtn0b.onclick = () => {
  if (insCounter0b < 1) {
    reveal(`instruction-1${insCounter0b+1}`);
    insCounter0b += 1
  } else {
    hide('instruction-0b')
    showNext('instruction-1', 'flex', 0)
  }
}
// instruction page 1
const insBtn1 = document.getElementById('task-btn-instruct1-next');
insBtn1.onclick = () => {
  hide('instruction-1')
  showNext('instruction-2', 'flex', 0)
}

// instruction page 2
const insBtn2 = document.getElementById('task-btn-instruct2-next');
insBtn2.onclick = () => {
  hide('instruction-2')
  showNext('instruction-3', 'flex', 0)
}

// instruction page 3
const insBtn3 = document.getElementById('task-btn-instruct3-next');
insBtn3.onclick = () => {
  hide('instruction-3')
  showNext('instruction-4', 'flex', 0)
}

// instruction page 4
const insBtn4 = document.getElementById('task-btn-instruct4-next');
insBtn4.onclick = () => {
  hide('instruction-4');
  showNext('collect-0', 'flex', 0);
}

// collection pages
const colBtn0 = document.getElementById('task-btn-collect0-next');
colBtn0.onclick = () => {
  hide('collect-0');
  showNext('collect-1', 'flex', 0);
}
const colBtn1 = document.getElementById('task-btn-collect1-next');
colBtn1.onclick = () => {
  hide('collect-1');
  showNext('target-easy', 'flex', 0);
}
const targBtnEasy1 = document.getElementById('task-btn-target-easy-next');
targBtnEasy1.onclick = () => {
  hide('target-easy');
  showNext('target-hard', 'flex', 0);
}
const targBtnHard1 = document.getElementById('task-btn-target-hard-next');
targBtnHard1.onclick = () => {
  hide('target-hard');
  showNext('debrief', 'block', 0);
}


// Bebrief
const doneBtn = document.getElementById('done-btn');
const debriefForm = document.getElementById('postquiz');

debriefForm.onchange = () => {
  isFilled('postquiz')? doneBtn.disabled = false: null;
}
doneBtn.onclick = () => {
  alert('Done')
};


// Grid
let demoGrid1 = makeGridVars(N);
let gridDiv = document.getElementById('key-demo-tab-1');
for (let i = 0; i < N; i++) {
  let tcCodeList = gridDiv.insertRow();
  for (let j = 0; j < N; j++) {
    let tcell = tcCodeList.insertCell();
    tcell.id = `key-demo-tab-1-c` + i.toString() + j.toString();
    if (i == Math.floor(N/2) && j == Math.floor(N/2)) {
      tcell.style.backgroundColor = 'black';
    }
  }
}
let demoBtnA = document.getElementById('demo-btn-A');
demoBtnA.onclick = () => growRight('key-demo-tab-1', demoGrid1, 1, N);
let demoRestetBtn = document.getElementById('demo-btn-reset-A');
demoRestetBtn.onclick = () => resetGrid('key-demo-tab-1', demoGrid1, N);


let demoGrid2 = makeGridVars(N);
let gridDiv2 = document.getElementById('key-demo-tab-2');
for (let i = 0; i < N; i++) {
  let tcCodeList = gridDiv2.insertRow();
  for (let j = 0; j < N; j++) {
    let tcell = tcCodeList.insertCell();
    tcell.id = `key-demo-tab-2-c` + i.toString() + j.toString();
    if (i == Math.floor(N/2) && j == Math.floor(N/2)) {
      tcell.style.backgroundColor = 'black';
    }
  }
}
let demoBtnB = document.getElementById('demo-btn-B');
demoBtnB.onclick = () => moveDown('key-demo-tab-2', demoGrid2, 1, N);
let demoRestetBtnB = document.getElementById('demo-btn-reset-B');
demoRestetBtnB.onclick = () => resetGrid('key-demo-tab-2', demoGrid2, N);


let demoGrid3 = makeGridVars(N);
let gridDiv3 = document.getElementById('key-demo-tab-3');
for (let i = 0; i < N; i++) {
  let tcCodeList = gridDiv3.insertRow();
  for (let j = 0; j < N; j++) {
    let tcell = tcCodeList.insertCell();
    tcell.id = `key-demo-tab-3-c` + i.toString() + j.toString();
    if (i == Math.floor(N/2) && j == Math.floor(N/2)) {
      tcell.style.backgroundColor = 'black';
    }
  }
}
let demoBtnC = document.getElementById('demo-btn-C');
demoBtnC.onclick = () => removeLastRow('key-demo-tab-3', demoGrid3);
let demoRestetBtnC = document.getElementById('demo-btn-reset-C');
demoRestetBtnC.onclick = () => resetGrid('key-demo-tab-3', demoGrid3, N);


let demoGrid4 = makeGridVars(N);
let gridDiv4 = document.getElementById('key-demo-tab-4');
for (let i = 0; i < N; i++) {
  let tcCodeList = gridDiv4.insertRow();
  for (let j = 0; j < N; j++) {
    let tcell = tcCodeList.insertCell();
    tcell.id = `key-demo-tab-4-c` + i.toString() + j.toString();
    if (i == Math.floor(N/2) && j == Math.floor(N/2)) {
      tcell.style.backgroundColor = 'black';
    }
  }
}
document.getElementById('demo-btn-4A').onclick = () => growRight('key-demo-tab-4', demoGrid4, 1, N);
document.getElementById('demo-btn-4B').onclick = () => moveDown('key-demo-tab-4', demoGrid4, 1, N);
document.getElementById('demo-btn-4C').onclick = () => removeLastRow('key-demo-tab-4', demoGrid4);
document.getElementById('demo-btn-4reset').onclick = () => resetGrid('key-demo-tab-4', demoGrid4, N);





// Dev show all
const devBtn = document.getElementById('dev-show-all');

if (mode == 'dev') {
  devBtn.style.display = 'none'
  showNext('instruction-01', 'block', 0);
  showNext('instruction-02', 'block', 0);
  showNext('instruction-03', 'block', 0);

  showNext('instruction-0b', 'flex', 0)
  reveal('instruction-11');

  showNext('instruction-1', 'flex', 0);
  showNext('instruction-2', 'flex', 0);
  showNext('instruction-3', 'flex', 0);
  showNext('instruction-4', 'flex', 0);

  showNext('collect-0', 'flex', 0);
  showNext('collect-1', 'flex', 0);

  showNext('target-easy', 'flex', 0);
  showNext('target-hard', 'flex', 0);
}

// if (mode != 'dev') {
//   devBtn.style.display = 'none'
// }
// devBtn.onclick = () => {
//   showNext('instruction-01', 'block', 0);
//   showNext('instruction-02', 'block', 0);
//   showNext('instruction-03', 'block', 0);

//   showNext('instruction-0b', 'flex', 0)
//   showNext('instruction-11', 'block', 0);

//   showNext('instruction-1', 'flex', 0);
//   showNext('instruction-2', 'flex', 0);
//   showNext('instruction-3', 'flex', 0);
//   showNext('instruction-4', 'flex', 0);

//   showNext('collect-0', 'flex', 0);
//   showNext('collect-1', 'flex', 0);

//   showNext('target-easy', 'flex', 0);
//   showNext('target-hard', 'flex', 0);

// }
