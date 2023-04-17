
const N = 9;
Object.keys(data).forEach(id => {
  let ppt_data = data[id];
  let ppt_id = id.substring(3);

  let ppt_div = createCustomElement('div', 'vis-ppt', `vis-ppt-${ppt_id}`);
  ppt_div.append(createText('p', `PPT ${ppt_id}`));

  let task_wrapper = createCustomElement('div', 'vis-taskwrapper', `vis-taskwrapper-${ppt_id}`);

  Object.keys(ppt_data).forEach(tid => {
    let task_data = ppt_data[tid];
    let task_id = tid.substring(5);

    let task_div = createCustomElement('div', 'vis-taskbox', `vis-taskbox-${ppt_id}-${task_id}`);
    task_div.append(createText('h3', `Task ${task_id}`));

    let table_div = createCustomElement('div', 'taskinnerbox', '');
    let task_table = createCustomElement('table', 'demo-tabs', `vis-table-${ppt_id}-${task_id}`);

    console.log(task_data);
    let cell_prefix = `tab-ppt_${ppt_id}-${tid}`;
    for (let i = 0; i < N; i++) {
      let tcCodeList = task_table.insertRow();
      for (let j = 0; j < N; j++) {
        let tcell = tcCodeList.insertCell();
        let cellIndex = 'c' + i.toString() + '-' + j.toString();
        tcell.id = cell_prefix + '-' + cellIndex;
        tcell.style.border = '#ffffff solid 1px';
        if (i == Math.floor(N/2) & j == Math.floor(N/2)) {
          tcell.style.borderColor='red';
        }

        if (task_data[cellIndex] % 2 == 1) {
          tcell.style.backgroundColor = 'black';
        }

      }
    }
    table_div.append(task_table);
    task_div.append(table_div);

    task_wrapper.append(task_div);

  })



  document.body.append(ppt_div);
  document.body.append(task_wrapper);


})
