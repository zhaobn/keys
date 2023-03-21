
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
  showNext('instruction', 'block');
  showNext('training', 'block');
  showNext('test', 'block');
  showNext('debrief', 'block');
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



/** Instructions */





/** Trainings */






/** Tasks */
let nCorrect = 0;





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
