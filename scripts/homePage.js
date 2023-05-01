async function homeCard() {
  let response = await fetch("https://api.scryfall.com/cards/random");
  let mtg = await response.json();
    let img = document.createElement("img");
    img.src = mtg.image_uris.border_crop;
    img.className = "homeCard";
    img.id = "homeCard";
    document.body.append(img)
    console.log(mtg)
  };
window.onload = function () {
  homeCard();
};
function removeCard() {
  // Removes an element from the document
  var element = document.getElementById('homeCard');
  element.parentNode.removeChild(element);
}



