
const mode = '';

// instruction page 0
let insCounter = 0;
const insBtn0 = document.getElementById('task-btn-instruction0-next');
insBtn0.onclick = () => {
  if (insCounter < 3) {
    showNext(`instruction-0${insCounter+1}`, 'block', 0);
    insCounter += 1
  } else {
    hide('instruction-0')
    showNext('instruction-1', 'flex', 0)
  }
}

// instruction page 1
let insCounter1 = 0;
const insBtn1 = document.getElementById('task-btn-instruct1-next');
insBtn1.onclick = () => {
  if (insCounter1 < 2) {
    showNext(`instruction-1${insCounter1+1}`, 'block', 0);
    insCounter1 += 1
  } else {
    hide('instruction-1')
    showNext('instruction-2', 'flex', 0)
  }
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



// Dev show all
const devBtn = document.getElementById('dev-show-all');
if (mode != 'dev') {
  devBtn.style.display = 'none'
}
devBtn.onclick = () => {
  showNext('instruction-01', 'block', 0);
  showNext('instruction-02', 'block', 0);
  showNext('instruction-03', 'block', 0);

  showNext('instruction-1', 'flex', 0);
  showNext('instruction-11', 'block', 0);
  showNext('instruction-12', 'block', 0);

  showNext('instruction-2', 'flex', 0);
  showNext('instruction-3', 'flex', 0);
  showNext('instruction-4', 'flex', 0);

  showNext('collect-0', 'flex', 0);
  showNext('collect-1', 'flex', 0);

  showNext('target-easy', 'flex', 0);
  showNext('target-hard', 'flex', 0);

}
