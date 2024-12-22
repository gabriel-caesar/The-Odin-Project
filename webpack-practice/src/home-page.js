// getting the div content
const content = document.getElementById('content');
import { homeBtn, menuBtn, aboutBtn, clearHTML } from "./index";

function renderHomePage () {
  
  // highlighting page buttons
  homeBtn.classList.add("highlight");
  menuBtn.classList.remove("highlight");
  aboutBtn.classList.remove("highlight");

  // clearing HTML before rendering new tab
  clearHTML();

  // creating h1
  const effectPhrase = document.createElement('h1');
  effectPhrase.className = "home-title";
  effectPhrase.textContent = "FALL IN LOVE WITH BRAZIL'S FOOD";

  // creating p
  const subPhrase = document.createElement('p');
  subPhrase.className = "home-subtitle"
  subPhrase.textContent = "Screaming flavored food / Made with love";

  // appending to content
  content.appendChild(effectPhrase);
  content.appendChild(subPhrase);
  
};

export {renderHomePage};