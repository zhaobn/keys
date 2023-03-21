
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
  showNext('training', 'block');
  // showNext('training-quiz', 'block');
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
const trainingNextBtn = document.getElementById('training-next-btn');
trainingNextBtn.onclick = () => {
  hide('training');
  showNext('training-quiz', 'block');
}




/** Training quiz */
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
