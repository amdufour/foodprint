// Append dropdown to the markup
function appendDropdown(meal, menuList) {
  let selectorOptions = d3.select('.dropdown--' + meal + ' .dropdown-options');
  menuList.forEach(menu => {
    selectorOptions.append('div')
      .attr('class', 'options')
      .attr('id', menu.key)
      .attr('onclick', 'handleDropdownSelection(event)')
      .text(menu.label);
  });
}

// Open/Close dropdown
function toggleDropdownDisplay(e) {
  if (e.target.parentNode.parentNode.classList.contains('dropdown')) {
    const dropdown = e.target.parentNode.parentNode;
    const options = dropdown.querySelector('.dropdown-options');
  
    options.classList.contains('hide-options') ?
      options.classList.remove('hide-options') :
      options.classList.add('hide-options');
  }
}

// Handle dropdown selection
function handleDropdownSelection(e) {
  const selectedOption = e.target;
  console.log(selectedOption);

  // Remove active class from other options
  let sibling = selectedOption.parentNode.firstChild;
  while (sibling) {
    if (sibling.classList.contains('active')) {
      sibling.classList.remove('active');
    }
    sibling = sibling.nextSibling;
  }

  // Add active class to selected option
  selectedOption.classList.add('active');

  // Add label of the selected option to the dropdown header
  const dropdownHeader = selectedOption.parentNode.parentNode.querySelector('.dropdown-selection');
  dropdownHeader.textContent = selectedOption.innerText;

  // Close dropdown
  console.log(selectedOption.parentNode);
  selectedOption.parentNode.classList.add('hide-options');

  // Call the visualization
  // callVisualization (meal, selection)
}
