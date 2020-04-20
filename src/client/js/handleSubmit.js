function handleSubmit(event) {
  event.preventDefault();
  const url = 'http://localhost:8080';
  // check what text was put into the form field
  let location = document.getElementById('location').value;
  let date = document.getElementById('date').value;

  console.log('::: Form Submitted :::');

  Client.getData(url, location)
    .then((data) => Client.postData(`${url}/travel`, data))
    .then((data) => Client.updateUI(data, date));
}

export { handleSubmit };
