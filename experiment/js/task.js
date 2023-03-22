
const mode = '' // '', 'dev', 'live'

/** Pick a condition */
const conds_for_exp = ['unit', 'stick', 'corner'];
const cond = 'unit'; // conds_for_exp[Math.floor(Math.random() * conds_for_exp.length)];
(mode===''|mode==='dev')? console.log(`${mode} mode; condition ${cond}.`) : null;

const start_time = Date.now();
let start_task_time = 0;



/** Collect prolific id */
let subjectData = {};

if (mode == '') {
  subjectData['prolific_id'] = 'NA';
  hide('prolific_id');
  // showNext('training', 'block');
  showNext('training-quiz', 'block');
  // showNext('instruction', 'block');
  // showNext('instruction-quiz', 'block');
  // showNext('task', 'block');
  // showNext('debrief', 'block');
  // showCompletion('XXXX', 0);

} else {
  const prolificIdBtn = document.getElementById('prolific_id-btn');
  const prolificText = document.getElementById('prolific_id_text');
  prolificIdBtn.onclick = () => {
    subjectData['prolific_id'] = prolificText.value;
    hide('prolific_id');
    showNext('instruction', 'block');
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
const N = 7;
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
const demoStickBtn = document.getElementById('playgd-wif');
const demoTriBtn = document.getElementById('playgd-zip');
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
      break;
    case 's':
    case 'ArrowDown':
      moveDownInf('demo-grid', demoGrid, 1, N);
      demoTraces['direc'] += 1;
      trainProceed(demoTraces);
      break;
    case 'a':
    case 'ArrowLeft':
      moveLeftInf('demo-grid', demoGrid, 1, N);
      demoTraces['direc'] += 1;
      trainProceed(demoTraces);
      break;
    case 'd':
    case 'ArrowRight':
      moveRightInf('demo-grid', demoGrid, 1, N);
      demoTraces['direc'] += 1;
      trainProceed(demoTraces);
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
const trainingAnswers = [ 'dax', 'zip', 'wif', 'right90', 'yes' ];

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
    hide('instruction-quiz');
    showNext('task', 'block');
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

introQuizForm.onchange = () => compIsFilled(introAnswers.length + trainingAnswers.length) ? introQuizCheckBtn.disabled = false : null;





/** Tasks */
let nCorrect = 0;

const taskNextBtn_1 = document.getElementById('task-next-btn-1');
taskNextBtn_1.onclick = () => {
  hide('task');
  showNext('debrief', 'block');
}







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

  let clientData = {};
  clientData.subject = subjectData;
  clientData.subject.condition = cond;
  clientData.subject.date = formatDates(end_time, 'date');
  clientData.subject.time = formatDates(end_time, 'time');
  clientData.subject.instructions_duration = start_task_time - start_time;
  clientData.subject.task_duration = end_time - start_task_time;
  clientData.subject.token = token;
  // clientData.trials = trialData;


  showCompletion('8692C148', nCorrect);
  console.log(clientData);
  // download(JSON.stringify(clientData), 'data.txt', '"text/csv"');


};
