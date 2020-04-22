function handleSubmit(event) {
  event.preventDefault();
  clearInnerHTML();

  const url = 'http://localhost:8080';
  // check what text was put into the form field
  let city = document.getElementById('location').value.split(', ')[0];
  let state = document.getElementById('location').value.split(', ')[1];
  let date = document.getElementById('date').value;

  console.log('::: Form Submitted :::', city, state);

  if (state != undefined) {
    checkDate(date)
      ? (document.querySelector('#error').innerHTML =
          'Please enter a date that has not passed!')
      : Client.getData(url, city, state)
          .then((data) => Client.postData(`${url}/travel`, data))
          .then((data) => Client.updateUI(data, date));
  } else {
    let errMsg = 'Please enter valid US city and state! ex. Atlanta, GA';
    document.querySelector('#error').innerHTML = errMsg;
    document.getElementById('location').value = '';
  }
}

function checkDate(date) {
  let selectedDate = new Date(date);
  let now = new Date();
  if (selectedDate <= now) {
    return true;
  } else {
    return false;
  }
}

function clearInnerHTML() {
  let d = document.getElementById('error');
  if (d.innerHTML.length > 0) {
    console.log('remove');
    d.innerHTML = '';
  }
}

export { handleSubmit };
