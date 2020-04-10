// Append dropdown to the markup
function appendDropdown(windowWidth, meal, menuList) {
  const selectorOptions = d3.select('.dropdown--' + meal);

  if (windowWidth <= 768) {
    // If mobile, add options to select elements
    menuList.forEach(menu => {
      selectorOptions.append('option')
        .attr('class', 'option')
        .attr('value', menu.key)
        .text(menu.label);
    });
  } else {
    // If desktop, replace select elements with dropdowns
    selectorOptions.style('display', 'none');
    let container = d3.select('.dropdown-container--' + meal)
      .append('div')
        .attr('id', 'dropdown--' + meal)
        .attr('class', 'dropdown dropdown--meal dropdown--' + meal)
        .attr('onclick', 'toggleDropdownDisplay(event.target)');
    container.append('div')
      .attr('class', 'dropdown-header');
    container.append('div')
      .attr('class', 'dropdown-options hide-options');

    let header = d3.select('.dropdown--' + meal + ' .dropdown-header');
    header.append('div')
      .attr('class', 'dropdown-selection')
      .text('Select a ' + meal);
    header.append('div')
      .attr('class', 'dropdown-arrow--container')
      .append('span')
        .attr('class', 'dropdown-arrow');

    let options = d3.select('.dropdown--' + meal + ' .dropdown-options');
    menuList.forEach(menu => {
      options.append('div')
        .attr('class', 'option')
        .attr('id', menu.key)
        .attr('onclick', 'handleDropdownSelection(event.target)')
        .text(menu.label);
    });

  }
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
    swapIngredient(meal);
}

// Handle Select change
function handleSelectChange(selector) {
  let currentSelection = '';
  const newSelection = selector[selector.selectedIndex];

  // Remove active class from other options
  let sibling = selector.getElementsByTagName('option')[1];
  while (sibling) {
    if (sibling.classList.contains('active')) {
      currentSelection = sibling;
      sibling.classList.remove('active');
    }
    sibling = sibling.nextSibling;
  }

  // Add active class to selected option
  newSelection.classList.add('active');

  // Call the visualization
  const toStrip = 'dropdown--';
  const meal = selector.id.substring(toStrip.length);
  selector.classList[1].substring(toStrip.length) === 'meal' ?
    addMeal(meal, currentSelection.value ? currentSelection.value : '', newSelection.value) :
    swapIngredient(meal);
}
