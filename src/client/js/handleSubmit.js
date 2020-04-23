async function handleSubmit(event) {
  event.preventDefault();
  clearInnerHTML();

  const url = 'http://localhost:8080';
  // check what text was put into the form field
  let city = document
    .getElementById('location')
    .value.split(', ')[0]
    .toUpperCase();
  let state = document
    .getElementById('location')
    .value.split(', ')[1]
    .toUpperCase();
  let date = document.getElementById('date').value;

  console.log('::: Form Submitted :::');

  Client.getData(url, city, state);

  if (state != undefined) {
    checkDate(date)
      ? (document.querySelector('#error').innerHTML =
          'Please enter a date that has not passed!')
      : await Client.getData(url, city, state, date);
  } else {
    let errMsg = 'Please enter valid US city and state! ex. Atlanta, GA';
    document.querySelector('#error').innerHTML = errMsg;
    document.getElementById('location').value = '';
  }
}

function checkDate(date) {
  return new Date(date) < new Date();
}

function clearInnerHTML() {
  let d = document.getElementById('error');
  if (d.innerHTML.length > 0) {
    d.innerHTML = '';
  }
}

export { handleSubmit };
