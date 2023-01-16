function showNext(id, display = "flex", center = true) {
  let div = document.getElementById(id);
  div.style.display = display;
  if (center) {
    div.scrollIntoView(center);
  }
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
