module.exports = function displayDropdown (container, display) {
  
  if (container.style.display !== display) {
    container.style.display = display;
  } else {
    container.style.display = "none";
  }

};