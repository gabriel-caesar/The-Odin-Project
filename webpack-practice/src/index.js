// index.js
import "./styles.css";
// import { greeting } from "./greeting.js";
import { renderHomePage } from "./home-page";
import { renderMenuPage } from "./menu";
import { renderAboutPage } from "./about";


export function clearHTML () {
  const content = document.getElementById('content');
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
};

window.onload = (e) => {
  renderHomePage();
}

// document.body.appendChild(image);

// getting the nav buttons
const homeBtn = document.getElementById('home-btn');
const menuBtn = document.getElementById('menu-btn');
const aboutBtn = document.getElementById('about-btn');

export {homeBtn, menuBtn, aboutBtn};

// assigning functions to the btns
homeBtn.addEventListener('click', () => renderHomePage());
menuBtn.addEventListener('click', () => renderMenuPage());
aboutBtn.addEventListener('click', () => renderAboutPage());