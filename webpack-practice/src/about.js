// getting the div content
const content = document.getElementById('content');
import { homeBtn, menuBtn, aboutBtn, clearHTML } from "./index";

export function renderAboutPage () {

  // highlighting page buttons
  homeBtn.classList.remove("highlight");
  menuBtn.classList.remove("highlight");
  aboutBtn.classList.add("highlight");

  // clearing HTML before rendering new tab
  clearHTML();

  // parent container
  const menuContainer = document.createElement('div');
  menuContainer.className = "menu";
  menuContainer.classList.add("grid");

  // about us container
  const aboutUs = document.createElement('div');
  aboutUs.className = "about-us";
  aboutUs.classList.add("grid-item");
  const aboutUsHeader = document.createElement('h2');
  const aboutUsP = document.createElement('p');
  const aboutUsO = document.createElement('p');
  aboutUsO.className = "owner-name";
  aboutUsHeader.textContent = `About Us`;
  aboutUsP.textContent = `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae recusandae repellendus voluptates eius aut alias, dolores aliquam blanditiis eaque unde ipsam sint aperiam fugit saepe rem quas veritatis nam perferendis!"`;
  aboutUsO.textContent = `~Restaurat Owner`

  // hours container
  const hours = document.createElement('div');
  hours.className = "hours";
  hours.classList.add("grid-item");
  const hoursHeader = document.createElement('h2');
  const hoursList = document.createElement('ul');
  hoursList.className = "hours-list";
  hoursHeader.textContent = `Hours of Operation`;
  hoursList.innerHTML = `
    <li>Sunday: 9am - 10pm</li>
    <li>Monday: 9am - 8pm</li>
    <li>Tuesday: 9am - 8pm</li>
    <li>Wednesday: 9am - 8pm</li>
    <li>Thursday: 9am - 8pm</li>
    <li>Friday: 9am - 10pm</li>
    <li>Saturday: 9am - 10pm</li>
  `;

  // careers contaner 
  const careers = document.createElement('div');
  careers.className = "careers";
  careers.classList.add("grid-item");
  const careersHeader = document.createElement('h2');
  const careersResume = document.createElement('p');
  const careersText = document.createElement('p');
  careersHeader.textContent = `Careers`;
  careersResume.innerHTML = `Send your resume at <a href="#">restauranthr@address.com.</a>`;
  careersText.textContent = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque error nostrum mollitia excepturi nulla iste illum officiis vero numquam expedita. Lorem ipsum, dolor sit amet consectetur adipisicing.`;

  // appending
  menuContainer.appendChild(aboutUs);
  aboutUs.appendChild(aboutUsHeader);
  aboutUs.appendChild(aboutUsP);
  aboutUs.appendChild(aboutUsO);
  //
  menuContainer.appendChild(hours);
  hours.appendChild(hoursHeader);
  hours.appendChild(hoursList);
  //
  menuContainer.appendChild(careers);
  careers.appendChild(careersHeader);
  careers.appendChild(careersResume);
  careers.appendChild(careersText);
  //
  content.appendChild(menuContainer);

} 