document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);

  function handleSubmit(event) {
    event.preventDefault();
    const name = document.querySelector('#name').value.toLowerCase();
    
    let apiUrl = `https://api.scryfall.com/cards/search?q=${name}`
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const resultsContainer = document.querySelector('#search-results');
        resultsContainer.innerHTML = ''; // Clear the container before adding new results
        data.data.forEach(card => {
          const cardElement = document.createElement('img');
          cardElement.src = card.image_uris.normal;
          cardElement.addEventListener('click', function() {
          window.location.href = card.scryfall_uri;
        });
          resultsContainer.appendChild(cardElement);
        });
      })
      .catch(error => console.error(error));
  }
});
