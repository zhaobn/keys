
const mode = 'dev' // '', 'dev', 'live'

/** Pick a condition */
const conds_for_exp = ['unit', 'stick', 'corner'];
let cond = 'corner'; // conds_for_exp[Math.floor(Math.random() * conds_for_exp.length)];
(mode===''|mode==='dev')? console.log(`${mode} mode; condition ${cond}.`) : null;

const start_time = Date.now();
let start_task_time = 0;



/** Collect prolific id */
let subjectData = {};

if (mode == '' | mode == 'dev') {
  subjectData['prolific_id'] = 'NA';
  hide('prolific_id');
  // showNext('training', 'block');
  // showNext('training-quiz', 'block');
  // showNext('instruction', 'block');
  // showNext('instruction-quiz', 'block');
  showNext('task', 'block');
  // showNext('debrief', 'block');
  // showCompletion('XXXX', 0);

} else {
  const prolificIdBtn = document.getElementById('prolific_id-btn');
  const prolificText = document.getElementById('prolific_id_text');
  prolificIdBtn.onclick = () => {
    subjectData['prolific_id'] = prolificText.value;
    hide('prolific_id');
    showNext('training', 'block');
  }

}




/** Trainings */
// Enable the Next button only after sufficient play
let demoTraces = { 'unit': 0, 'stick': 0, 'tria': 0, 'rotate': 0, 'direc': 0 };
const trainingNextBtn = document.getElementById('training-next-btn');
trainingNextBtn.onclick = () => {
  hide('training');
  showNext('training-quiz', 'block');
}
function trainProceed(clickHistory) {
  if (Object.values(clickHistory).filter(v => v < 1).length < 1) {
    trainingNextBtn.disabled = false;
  }
}


// Draw grid
const N = 9;
let demoGrid = makeGridVars(N, showCenter=0);
let demoGridDiv = document.getElementById('demo-grid');
for (let i = 0; i < N; i++) {
  let tcCodeList = demoGridDiv.insertRow();
  for (let j = 0; j < N; j++) {
    let tcell = tcCodeList.insertCell();
    tcell.id = `demo-grid-c` + i.toString() + '-' + j.toString();
    tcell.style.border = '#ffffff solid 1px';
  }
}
let centerCellId = makeUnit(Math.floor(N/2),Math.floor(N/2));
document.getElementById(`demo-grid-${centerCellId}`).style.borderColor='red';


// Buttton functionalities
const demoUniBtn = document.getElementById('playgd-dax');
const demoStickBtn = document.getElementById('playgd-wip');
const demoTriBtn = document.getElementById('playgd-zif');
const demoRotateBtn = document.getElementById('playgd-kiki');
const demoClearBtn = document.getElementById('training-clear-btn');

demoUniBtn.onclick = () => { addSquare('demo-grid', demoGrid, N); demoTraces['unit'] +=1; trainProceed(demoTraces) };
demoStickBtn.onclick = () => { addStick('demo-grid', demoGrid, N); demoTraces['stick'] += 1; trainProceed(demoTraces) };
demoTriBtn.onclick = () => { addTriangle('demo-grid', demoGrid, N); demoTraces['tria'] += 1; trainProceed(demoTraces) };
demoRotateBtn.onclick = () => { rotateRightCenter('demo-grid', demoGrid, N); demoTraces['rotate'] += 1; trainProceed(demoTraces) };
demoClearBtn.onclick = () => resetGrid('demo-grid', demoGrid, N, false);

document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;
  switch(e.key) {
    case 'w':
    case 'ArrowUp':
      moveUpInf('demo-grid', demoGrid, 1, N);
      demoTraces['direc'] += 1;
      trainProceed(demoTraces);

      moveUpInf('task-1', taskGridVars['task_1'], 1, N);
      moveUpInf('task-2', taskGridVars['task_2'], 1, N);
      moveUpInf('task-3', taskGridVars['task_3'], 1, N);
      moveUpInf('task-4', taskGridVars['task_4'], 1, N);
      moveUpInf('task-5', taskGridVars['task_5'], 1, N);
      moveUpInf('task-6', taskGridVars['task_6'], 1, N);
      moveUpInf('task-7', taskGridVars['task_7'], 1, N);

      break;


    case 's':
    case 'ArrowDown':
      moveDownInf('demo-grid', demoGrid, 1, N);
      demoTraces['direc'] += 1;
      trainProceed(demoTraces);

      moveDownInf('task-1', taskGridVars['task_1'], 1, N);
      moveDownInf('task-2', taskGridVars['task_2'], 1, N);
      moveDownInf('task-3', taskGridVars['task_3'], 1, N);
      moveDownInf('task-4', taskGridVars['task_4'], 1, N);
      moveDownInf('task-5', taskGridVars['task_5'], 1, N);
      moveDownInf('task-6', taskGridVars['task_6'], 1, N);
      moveDownInf('task-7', taskGridVars['task_7'], 1, N);

      break;


    case 'a':
    case 'ArrowLeft':
      moveLeftInf('demo-grid', demoGrid, 1, N);
      demoTraces['direc'] += 1;
      trainProceed(demoTraces);

      moveLeftInf('task-1', taskGridVars['task_1'], 1, N);
      moveLeftInf('task-2', taskGridVars['task_2'], 1, N);
      moveLeftInf('task-3', taskGridVars['task_3'], 1, N);
      moveLeftInf('task-4', taskGridVars['task_4'], 1, N);
      moveLeftInf('task-5', taskGridVars['task_5'], 1, N);
      moveLeftInf('task-6', taskGridVars['task_6'], 1, N);
      moveLeftInf('task-7', taskGridVars['task_7'], 1, N);

      break;


    case 'd':
    case 'ArrowRight':
      moveRightInf('demo-grid', demoGrid, 1, N);
      demoTraces['direc'] += 1;
      trainProceed(demoTraces);

      moveRightInf('task-1', taskGridVars['task_1'], 1, N);
      moveRightInf('task-2', taskGridVars['task_2'], 1, N);
      moveRightInf('task-3', taskGridVars['task_3'], 1, N);
      moveRightInf('task-4', taskGridVars['task_4'], 1, N);
      moveRightInf('task-5', taskGridVars['task_5'], 1, N);
      moveRightInf('task-6', taskGridVars['task_6'], 1, N);
      moveRightInf('task-7', taskGridVars['task_7'], 1, N);

      break;
  }
}





/** Training quiz */
// Draw shapes in quiz
let unitDraw = document.getElementById('canvas-unit').getContext('2d');
unitDraw.fillRect(0,0,30,30);
let stickDraw = document.getElementById('canvas-stick').getContext('2d');
stickDraw.fillRect(0,0,90,30);
stickDraw.strokeStyle = "#ffffff";
stickDraw.lineWidth = 2;
stickDraw.strokeRect(0,0,30,30);
stickDraw.strokeRect(30,0,30,30);
stickDraw.strokeRect(60,0,30,30);
let triaDraw = document.getElementById('canvas-triangle').getContext('2d');
triaDraw.fillRect(0,0,30,60);
triaDraw.fillRect(30,30,30,60);
triaDraw.strokeStyle = "#ffffff";
triaDraw.lineWidth = 2;
triaDraw.strokeRect(0,0,30,30);
triaDraw.strokeRect(0,30,30,30);
triaDraw.strokeRect(30,30,30,30);


// Check quiz answers
const trainingQuizForm = document.getElementById('training-quiz-form');
const trainingRetryBtn = document.getElementById('training-retry-btn');
const trainingQuizCheckBtn = document.getElementById('training-quiz-check-btn');

const trainingChecks = [ 'check1', 'check2', 'check3', 'check4', 'check5' ];
const trainingAnswers = [ 'wip', 'dax', 'zif', 'right90', 'yes' ];

trainingQuizCheckBtn.onclick = () => {
  trainingQuizCheckBtn.style.display = 'none';
  let inputs = [];
  trainingChecks.map(check => {
    const vals = document.getElementsByName(check);
    vals.forEach(v => { v.checked? inputs.push(v.value): null;});
  });
  const pass = (inputs.join('') === trainingAnswers.join(''));
  if (pass) {
    hide('training-quiz');
    showNext('instruction', 'block');
  } else {
    showNext('training-retry', 'block');
  }
}

trainingRetryBtn.onclick = () => {
  hide("training-retry");
  hide("training-quiz");
  showNext("training", "block");
  trainingQuizCheckBtn.style.display = 'flex';
};

trainingQuizForm.onchange = () => compIsFilled(trainingChecks.length) ? trainingQuizCheckBtn.disabled = false : null;




/** Instructions */
const introNextBtn = document.getElementById('intro-next-btn');
introNextBtn.onclick = () => {
  hide('instruction');
  showNext('instruction-quiz', 'block');
}




/** Instruction quiz */
const introQuizForm = document.getElementById('intro-quiz-form');
const introRetryBtn = document.getElementById('intro-retry-btn');
const introPassBtn = document.getElementById('intro-pass-btn');
const introQuizCheckBtn = document.getElementById('intro-quiz-check-btn');

const introChecks = [ 'intro1', 'intro2', 'intro3', 'intro4' ];
const introAnswers = [ true, false, false, true ];

introQuizCheckBtn.onclick = () => {
  introQuizCheckBtn.style.display = 'none';
  let inputs = [];
  introChecks.map(check => {
    const vals = document.getElementsByName(check);
    inputs.push(vals[0].checked);
  });
  const pass = (inputs.join('') === introAnswers.join(''));
  if (pass) {
    hide('intro-quiz-check-btn');
    showNext('intro-pass', 'block');
  } else {
    showNext('intro-retry', 'block');
  }
}

introRetryBtn.onclick = () => {
  hide("intro-retry");
  hide("instruction-quiz");
  showNext("instruction", "block");
  introQuizCheckBtn.style.display = 'flex';
};
introPassBtn.onclick = () => {
  hide("instruction-quiz");
  showNext('task', 'block');
}

introQuizForm.onchange = () => compIsFilled(introAnswers.length + trainingAnswers.length) ? introQuizCheckBtn.disabled = false : null;
// introQuizForm.onchange = () => compIsFilled(introAnswers.length) ? introQuizCheckBtn.disabled = false : null;





/** Tasks */
let nCorrect = 0;
let toShow = (mode=='dev')? true: false;
// cond = 'corner';

// Set task sequence
let [task1, task2, task3] = ['unit', 'unit2', 'unit3'];
if (cond == 'stick') {
  [task1, task2, task3] = ['stick', 'stick-l', 'stick-vl'];
} else if (cond == 'corner') {
  [task1, task2, task3] = ['corner', 'corner2', 'corner3'];
}

// Prep data vars
const BTNS = ['dax', 'wip', 'zif', 'kiki'];
let [ taskGridVars, taskData, taskBtnClicks ] = [ {}, {}, {} ];
for (let i = 0; i < 7; i++) {
  taskGridVars[`task_${i+1}`] = makeGridVars(N, showCenter=false);
  taskData[`task_${i+1}`] = [];
  taskBtnClicks[`task_${i+1}`] = {};
  BTNS.forEach(el => taskBtnClicks[`task_${i+1}`][el] = 0);
}


// Track button clicks
function checkBtnStatus(status, prefix, limit) {
  if (Object.values(status).reduce((a, b) => a + b, 0) >= limit) {
    BTNS.forEach(el => document.getElementById(`${prefix}-${el}`).disabled = true);
  }
}


// Make the page
document.getElementById('task').append(generateTaskDiv(1, 1, makeGridTarget(N, task1, 'target-1-')));
document.getElementById('task-1-dax').onclick = () => {
  addSquare('task-1', taskGridVars['task_1'], N);
  taskData['task_1'].push('dax');
  taskBtnClicks['task_1']['dax'] += 1;
  checkBtnStatus(taskBtnClicks['task_1'], 'task-1', 1);
};
document.getElementById('task-1-wip').onclick = () => {
  addStick('task-1', taskGridVars['task_1'], N);
  taskData[`task_1`].push('wip');
  taskBtnClicks['task_1']['wip'] += 1;
  checkBtnStatus(taskBtnClicks['task_1'], 'task-1', 1);
};
document.getElementById('task-1-zif').onclick = () => {
  addTriangle('task-1', taskGridVars['task_1'], N);
  taskData[`task_1`].push('zif');
  taskBtnClicks['task_1']['zif'] += 1;
  checkBtnStatus(taskBtnClicks['task_1'], 'task-1', 1);
};
document.getElementById('task-1-kiki').onclick = () => {
  rotateRightCenter('task-1', taskGridVars['task_1'], N);
  taskData[`task_1`].push('kiki');
  taskBtnClicks['task_1']['kiki'] += 1;
  checkBtnStatus(taskBtnClicks['task_1'], 'task-1', 1);
};
document.getElementById('task-1-next-btn').onclick = () => switchTask('task-1', 'task-2', 'block');


document.getElementById('task').append(generateTaskDiv(2, 2, makeGridTarget(N, task2, 'target-2-'), toShow));
document.getElementById('task-2-dax').onclick = () => {
  addSquare('task-2', taskGridVars['task_2'], N);
  taskData[`task_2`].push('dax');
  taskBtnClicks['task_2']['dax'] += 1;
  checkBtnStatus(taskBtnClicks['task_2'], 'task-2', 2);

};
document.getElementById('task-2-wip').onclick = () => {
  addStick('task-2', taskGridVars['task_2'], N);
  taskData[`task_2`].push('wip');
  taskBtnClicks['task_2']['wip'] += 1;
  checkBtnStatus(taskBtnClicks['task_2'], 'task-2', 2);

};
document.getElementById('task-2-zif').onclick = () => {
  addTriangle('task-2', taskGridVars['task_2'], N);
  taskData[`task_2`].push('zif');
  taskBtnClicks['task_2']['zif'] += 1;
  checkBtnStatus(taskBtnClicks['task_2'], 'task-2', 2);

};
document.getElementById('task-2-kiki').onclick = () => {
  rotateRightCenter('task-2', taskGridVars['task_2'], N);
  taskData[`task_2`].push('kiki');
  taskBtnClicks['task_2']['kiki'] += 1;
  checkBtnStatus(taskBtnClicks['task_2'], 'task-2', 2);
};
document.getElementById('task-2-next-btn').onclick = () => switchTask('task-2', 'task-3', 'block');


document.getElementById('task').append(generateTaskDiv(3, 3, makeGridTarget(N, task3, 'target-3-'), toShow));
document.getElementById('task-3-dax').onclick = () => {
  addSquare('task-3', taskGridVars['task_3'], N);
  taskData[`task_3`].push('dax');
  taskBtnClicks['task_3']['dax'] += 1;
  checkBtnStatus(taskBtnClicks['task_3'], 'task-3', 3);

};
document.getElementById('task-3-wip').onclick = () => {
  addStick('task-3', taskGridVars['task_3'], N);
  taskData[`task_3`].push('wip');
  taskBtnClicks['task_3']['wip'] += 1;
  checkBtnStatus(taskBtnClicks['task_3'], 'task-3', 3);

};
document.getElementById('task-3-zif').onclick = () => {
  addTriangle('task-3', taskGridVars['task_3'], N);
  taskData[`task_3`].push('zif');
  taskBtnClicks['task_3']['zif'] += 1;
  checkBtnStatus(taskBtnClicks['task_3'], 'task-3', 3);
};
document.getElementById('task-3-kiki').onclick = () => {
  rotateRightCenter('task-3', taskGridVars['task_3'], N);
  taskData[`task_3`].push('kiki');
  taskBtnClicks['task_3']['kiki'] += 1;
  checkBtnStatus(taskBtnClicks['task_3'], 'task-3', 3);

};
document.getElementById('task-3-next-btn').onclick = () => switchTask('task-3', 'task-4', 'block');


document.getElementById('task').append(generateTaskDiv(4, 0, makeGridTarget(N, 'cross', 'target-4-'), toShow));
document.getElementById('task-4-dax').onclick = () => { addSquare('task-4', taskGridVars['task_4'], N); taskData[`task_4`].push('dax');};
document.getElementById('task-4-wip').onclick = () => { addStick('task-4', taskGridVars['task_4'], N); taskData[`task_4`].push('wip');};
document.getElementById('task-4-zif').onclick = () => { addTriangle('task-4', taskGridVars['task_4'], N); taskData[`task_4`].push('zif');};
document.getElementById('task-4-kiki').onclick = () => { rotateRightCenter('task-4', taskGridVars['task_4'], N); taskData[`task_4`].push('kiki');};
document.getElementById('task-4-next-btn').onclick = () => switchTask('task-4', 'task-5', 'block');


document.getElementById('task').append(generateTaskDiv(5, 0, makeGridTarget(N, 'block', 'target-5-'), toShow));
document.getElementById('task-5-dax').onclick = () => { addSquare('task-5', taskGridVars['task_5'], N); taskData[`task_5`].push('dax');};
document.getElementById('task-5-wip').onclick = () => { addStick('task-5', taskGridVars['task_5'], N); taskData[`task_5`].push('wip');};
document.getElementById('task-5-zif').onclick = () => { addTriangle('task-5', taskGridVars['task_5'], N); taskData[`task_5`].push('zif');};
document.getElementById('task-5-kiki').onclick = () => { rotateRightCenter('task-5', taskGridVars['task_5'], N); taskData[`task_5`].push('kiki');};
document.getElementById('task-5-next-btn').onclick = () => switchTask('task-5', 'task-6', 'block');


document.getElementById('task').append(generateTaskDiv(6, 0, makeGridTarget(N, 'circle', 'target-6-'), toShow));
document.getElementById('task-6-dax').onclick = () => { addSquare('task-6', taskGridVars['task_6'], N); taskData[`task_6`].push('dax');};
document.getElementById('task-6-wip').onclick = () => { addStick('task-6', taskGridVars['task_6'], N); taskData[`task_6`].push('wip');};
document.getElementById('task-6-zif').onclick = () => { addTriangle('task-6', taskGridVars['task_6'], N); taskData[`task_6`].push('zif');};
document.getElementById('task-6-kiki').onclick = () => { rotateRightCenter('task-6', taskGridVars['task_6'], N); taskData[`task_6`].push('kiki');};
document.getElementById('task-6-next-btn').onclick = () => switchTask('task-6', 'task-7', 'block');


document.getElementById('task').append(generateTaskDiv(7, 5, makeGridTarget(N, 'bigl', 'target-7-'), toShow));
document.getElementById('task-7-dax').onclick = () => { addSquare('task-7', taskGridVars['task_7'], N); taskData[`task_7`].push('dax');};
document.getElementById('task-7-wip').onclick = () => { addStick('task-7', taskGridVars['task_7'], N); taskData[`task_7`].push('wip');};
document.getElementById('task-7-zif').onclick = () => { addTriangle('task-7', taskGridVars['task_7'], N); taskData[`task_7`].push('zif');};
document.getElementById('task-7-kiki').onclick = () => { rotateRightCenter('task-7', taskGridVars['task_7'], N); taskData[`task_7`].push('kiki');};
document.getElementById('task-7-next-btn').onclick = () => switchTask('task', 'debrief', 'block');



/** Debrief and save */
const doneBtn = document.getElementById('done-btn');
const debriefForm = document.getElementById('postquiz');

debriefForm.onchange = () => {
  isFilled('postquiz')? doneBtn.disabled = false: null;
}
doneBtn.onclick = () => {
  let inputs = debriefForm.elements;
  Object.keys(inputs).forEach(id => subjectData[inputs[id].name] = inputs[id].value);

  // Clean up free responses
  subjectData['feedback'] = removeSpecial(subjectData['feedback']);

  const end_time = new Date();
  let token = generateToken(8);

  subjectData['condition'] = cond;
  subjectData['date'] = formatDates(end_time, 'date');
  subjectData['time'] = formatDates(end_time, 'time');
  subjectData['instructions_duration'] = start_task_time - start_time;
  subjectData['task_duration'] = end_time - start_task_time;
  subjectData['token'] = token;

  let clientData = {};
  clientData.subject = JSON.stringify(subjectData);
  clientData.trials = JSON.stringify(taskData);
  clientData.states = JSON.stringify(taskGridVars);


  showCompletion('C12721UB', nCorrect);
  console.log(clientData);
  // download(JSON.stringify(clientData), 'data.txt', '"text/csv"');
  fetch("static/php/save_data.php", {
    method: 'post',
    body: clientData,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json()
  }).then((res) => {
    if (res.status === 201) {
        console.log("Post successfully created!")
    }
  }).catch((error) => {
    console.log(error)
  })
};
