// Append dropdown to the markup
function appendDropdown(meal, menuList) {
  let selectorOptions = d3.select('.dropdown--' + meal + ' .dropdown-options');
  menuList.forEach(menu => {
    selectorOptions.append('div')
      .attr('class', 'options')
      .attr('id', menu.key)
      .attr('onclick', 'handleDropdownSelection(event.target)')
      .text(menu.label);
  });
}

// Open/Close dropdown
function toggleDropdownDisplay(target) {
  if (target.parentNode.parentNode.classList.contains('dropdown')) {
    const dropdown = target.parentNode.parentNode;
    const options = dropdown.querySelector('.dropdown-options');
  
    if (options.classList.contains('hide-options')) {
      dropdown.classList.add('open');
      options.classList.remove('hide-options');
    } else {
      dropdown.classList.remove('open');
      options.classList.add('hide-options');
    }
  }
}
// If click anywhere else on the page, close open dropdowns
document.addEventListener('click', (e) => {
  const parent = e.target.parentNode.parentNode;
  if (parent === null || parent.classList === undefined || !parent.classList.contains('dropdown')) {
    closeDropdowns();
  }
});
// Close open dropdowns
function closeDropdowns() {
  console.log('close');
  const dropdowns = document.getElementsByClassName('dropdown-options');
  for (let dropdown of dropdowns) {
    if (!dropdown.classList.contains('hide-options')) {
      dropdown.classList.add('hide-options');
    }
  }
}

// Handle dropdown selection
function handleDropdownSelection(newSelection) {
  let currentSelection = '';

  // Remove active class from other options
  let sibling = newSelection.parentNode.firstChild;
  while (sibling) {
    if (sibling.classList.contains('active')) {
      currentSelection = sibling.id;
      sibling.classList.remove('active');
    }
    sibling = sibling.nextSibling;
  }

  // Add active class to selected option
  newSelection.classList.add('active');

  // Add label of the selected option to the dropdown header
  const dropdownContainer = newSelection.parentNode.parentNode;
  const dropdownHeader = dropdownContainer.querySelector('.dropdown-selection');
  dropdownHeader.textContent = newSelection.innerText;

  // Call the visualization
  const toStrip = 'dropdown--';
  const meal = dropdownContainer.classList[2].substring(toStrip.length);
  dropdownContainer.classList[1].substring(toStrip.length) === 'meal' ?
    addMeal(meal, currentSelection, newSelection.id) :
    swapIngredient();
}
