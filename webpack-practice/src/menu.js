// getting the div content
const content = document.getElementById('content');
import { homeBtn, menuBtn, aboutBtn, clearHTML } from "./index";
import platePhotoOne from "./dish-one.jpg";
import platePhotoTwo from "./dish-two.jpg";

// array to hold dishes
let dishes = [];

// creating menu items with classes
class Dish {

  constructor (img, title, desc, cal, price) {
    this.img = img;
    this.title = title;
    this.desc = desc;
    this.cal = cal;
    this.price = price;
  };
};

dishes.push( new Dish(
  platePhotoOne,
  "Feijoada",
  "a hearty stew of beans and meat that originated in Portugal and is now Brazil's national dish. <span>Served over steamed rice</span>.",
  "500-600cal.",
  "<strong>$17.99</strong> b/ taxes."
) );

dishes.push( new Dish(
  platePhotoTwo,
  "Pastéis",
  "Pastéis are a Brazilian street food delicacy. These fried pastries are often sold filled with various savory fillings like <span>chicken</span>, <span>shrimp</span>, <span>ham and cheese</span>, or <span>ground beef</span>.",
  "100-300cal.",
  "<strong>$4.99</strong> per unit b/ taxes."
) );

// dish cards generator
export function renderMenuPage () {

  homeBtn.classList.remove("highlight");
  menuBtn.classList.add("highlight");
  aboutBtn.classList.remove("highlight");

  // clearing HTML before rendering new tab
  clearHTML();

  // creating card html elements
  const menuContainer = document.createElement('div');
  menuContainer.className = "menu";

  // iterating through array
  dishes.forEach(x => {

    const dishCard = document.createElement('div');
    dishCard.className = "dish-card";
    const dishPhoto = document.createElement('img');
    dishPhoto.className = "dish-photo";
    const rightPanel = document.createElement('div');
    rightPanel.className = "rightpanel";
    const dishTitle = document.createElement('h1');
    dishTitle.className = "title";
    const dishDesc = document.createElement('p');
    dishDesc.className = "description";
    const calPriceContainer = document.createElement('div');
    calPriceContainer.className = "cal-price"
    const calories = document.createElement('p');
    calories.className = "calories";
    const dishPrice = document.createElement('p');
    dishPrice.className = "price";

    // appending card elements
    menuContainer.appendChild(dishCard);
    dishCard.appendChild(dishPhoto);
    dishCard.appendChild(rightPanel);
    rightPanel.appendChild(dishTitle);
    rightPanel.appendChild(dishDesc);
    rightPanel.appendChild(calPriceContainer);
    calPriceContainer.appendChild(calories);
    calPriceContainer.appendChild(dishPrice);
    
    // desconstructing
    const {img, title, desc, cal, price} = x;
    dishPhoto.src = img;
    dishTitle.textContent = title;
    dishDesc.innerHTML = desc;
    calories.textContent = cal;
    dishPrice.innerHTML = price;
    
    // appending menu to content
    content.appendChild(menuContainer); 
  });
  
};