const updateUI = () => {
  const displayData = async () => {
    const res = await fetch('http://localhost:8080/travel');
    const data = await res.json();
    return data;
  };

  displayData().then((data) => {
    let newHTML = `<div>
    <h2>Trip Details:</h2>
    <h1>${data.city}, ${data.state}</h1>
    </div>`;

    document.querySelector('#results').innerHTML = newHTML;
  });
};

export { updateUI };
