document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);

  function handleSubmit(event) {
    event.preventDefault();
    const name = document.querySelector('#name').value.toLowerCase();
    const text = document.querySelector('#text').value.toLowerCase();
    const type = document.querySelector('#type').value.toLowerCase();
    const mana = document.querySelector('#mana').value.toLowerCase();
    const color = document.querySelector('#color').value;


    const queryParams = [];
    if (name !== '') queryParams.push(`name:${name}`);
    if (text !== '') queryParams.push(`oracle:${text}`);
    if (type !== '') queryParams.push(`type:${type}`);
    if (mana !== '') queryParams.push(`cmc=${mana}`);
    if (color !== '') {
  const colorQuery = color.split(',').map(c => `color=${c}`).join(' or ');
  queryParams.push(`(${colorQuery})`);
}

    const apiUrl = `https://api.scryfall.com/cards/search?q=${queryParams.join(' ')}&order=name`;
	console.log(apiUrl);
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const resultsContainer = document.querySelector('#search-results');
      resultsContainer.innerHTML = ''; // Clear the container before adding new results
      data.data.forEach(card => {
        const cardElement = document.createElement('img');
        cardElement.src = card.image_uris.normal;
        cardElement.addEventListener('click', () => {
          window.location.href = card.scryfall_uri;
        });
        resultsContainer.appendChild(cardElement);
      });
    })
    .catch(error => console.error(error));

  }
});



