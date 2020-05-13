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

    // Meal selectors
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

    // Swap selectors
    d3.select('.dropdown--swap--' + meal)
      .style('display', 'none');
    let swapContainer = d3.select('.dropdown-container--swap--' + meal)
      .append('div')
      .attr('id', 'dropdown--swap--' + meal)
      .attr('class', 'dropdown dropdown--swap dropdown--swap--' + meal)
      .attr('onclick', 'toggleDropdownDisplay(event.target)');
    swapContainer.append('div')
      .attr('class', 'dropdown-header');
    swapContainer.append('div')
      .attr('class', 'dropdown-options hide-options');

    let swapHeader = d3.select('.dropdown--swap--' + meal + ' .dropdown-header');
    swapHeader.append('div')
      .attr('class', 'dropdown-selection')
      .text('Select a swap');
    swapHeader.append('div')
      .attr('class', 'dropdown-arrow--container')
      .append('span')
        .attr('class', 'dropdown-arrow');
  }
}

// Open/Close dropdown
function toggleDropdownDisplay(target) {
  // Open/Close dropdown
  if (target.parentNode.parentNode.classList.contains('dropdown') || target.parentNode.parentNode.parentNode.classList.contains('dropdown')) {
    const dropdown = target.closest('.dropdown');
    const options = dropdown.querySelector('.dropdown-options');
    
    // Close swap impact if open
    if (dropdown.classList.contains('dropdown--meal') && document.querySelector('#tooltip-swap-impact.visible') !== null) {
      hideSwapImpactTooltip();
    }
  
    if (!dropdown.parentNode.classList.contains('disabled')) {
      if (options.classList.contains('hide-options')) {
        dropdown.classList.add('open');
        options.classList.remove('hide-options');
      } else {
        dropdown.classList.remove('open');
        options.classList.add('hide-options');
      }
    }
  }
}
// If click anywhere else on the page, close open dropdowns
document.addEventListener('click', (e) => {
  let isDropdown = false;
  if (e.target.classList.contains('dropdown-selection') || e.target.classList.contains('dropdown-arrow--container') || e.target.classList.contains('swap-child')) {
    isDropdown = true;
  }
  const parent = e.target.parentNode.parentNode;
  if (parent === null || parent.classList === undefined || !isDropdown) {
    closeDropdowns();
    closeTooltip(e.target);
    hideInstructions();
  }
});
// Close open dropdowns
function closeDropdowns() {
  const dropdowns = document.getElementsByClassName('dropdown-options');
  for (let dropdown of dropdowns) {
    if (!dropdown.classList.contains('hide-options')) {
      dropdown.parentNode.classList.remove('open');
      dropdown.classList.add('hide-options');
    }
  }
}
// Close open tooltip
function closeTooltip(target) {
  const categoryTooltip = document.getElementById('tooltip-category');
  const swapImpactTooltip = document.getElementById('tooltip-swap-impact');
  if (!target.parentNode.classList.contains('tooltip') && categoryTooltip.classList.contains('visible')) {
    hideCategoryTooltip();
  } else if (!target.parentNode.classList.contains('tooltip') && swapImpactTooltip.classList.contains('visible') && (!target.classList.contains('option') && !target.classList.contains('child-label'))) {
    hideSwapImpactTooltip();
  }
}

// Handle dropdown selection
function handleDropdownSelection(newSelection) {
  let childLabels = [];
  if (newSelection.classList.contains('child-label')) {
    newSelection = newSelection.parentNode;
    getChildLabels();
  } else if (newSelection.childNodes.length === 3) {
    getChildLabels();
  }

  function getChildLabels() {
    childLabels[0] = newSelection.childNodes[0].innerText;
    childLabels[1] = newSelection.childNodes[2].innerText;
  }

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
  if (childLabels.length !== 0) {
    const header = d3.select('#' + dropdownContainer.id + ' .dropdown-selection');
    header.text('');
    header.append('span').classed('swap-child', true).text(childLabels[0]);
    header.append('span').classed('swap-child icon-swap', true);
    header.append('span').classed('swap-child', true).text(childLabels[1]);
  } else {
    dropdownHeader.textContent = newSelection.innerText;
  }

  // Call the visualization
  const toStrip = 'dropdown--';
  const meal = dropdownContainer.classList[2].substring(toStrip.length);
  if (dropdownContainer.classList[1].substring(toStrip.length) === 'meal') {
    // Call viz
    addMeal(meal, currentSelection, newSelection.id);
    // If this is the first meal selection, show the second instruction
    if (!secondInstructionShown) {
      setTimeout(function() {
        showInstruction('two');
        secondInstructionShown = true;
      }, 2000);
    }
    // Handle swap selector
    const swapContainer = dropdownContainer.parentNode.parentNode.querySelector('.dropdown-container--swap--' + meal);
    fillSwapDropdown(meal, newSelection.id, swapContainer);
  } else {
    // Update viz
    swapIngredient(meal.substring(6), newSelection.id);
  }
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

  // Call the visualization and handle the swap selector
  const toStrip = 'dropdown--';
  const meal = selector.id.substring(toStrip.length);
  if (selector.classList[1].substring(toStrip.length) === 'meal') {
    // Call viz
    addMeal(meal, currentSelection.value ? currentSelection.value : '', newSelection.value);
    // Handle swap selector
    const swapContainer = selector.parentNode.parentNode.querySelector('.dropdown-container--swap--' + meal);
    fillSwapSelect(meal, newSelection.value, swapContainer);
  } else {
    // Update viz
    swapIngredient(meal.slice(0, -6), selector.value);
  }
}

// Fill options of the swap selectors
function fillSwapDropdown(meal, selection, swapContainer) {
  const swaps = menusDetail[meal].find(menu => menu.key === selection).swaps;
  let selector = d3.select('#dropdown--swap--' + meal + ' .dropdown-options');

  // Reset selector
  d3.select('#dropdown--swap--' + meal + ' .dropdown-selection').text('Select a swap');
  selector.selectAll('.option').remove();

  // Fill options
  swaps.forEach(swap => {
    selector.append('div')
      .attr('class', swap.key === 'reset' ? 'option reset hidden' : 'option')
      .attr('id', swap.key)
      .attr('onclick', 'handleDropdownSelection(event.target)');
    
    if (swap.label !== undefined) {
      d3.select('#' + swap.key)
        .text(swap.label);
    } else {
      d3.select('#' + swap.key)
        .append('span').attr('class', 'child-label label1').text(swap.label1);
      d3.select('#' + swap.key)
        .append('span').attr('class', 'child-label icon-swap');
      d3.select('#' + swap.key)
        .append('span').attr('class', 'child-label label2').text(swap.label2);
    }
  });

  // Enable swap selector
  if (swapContainer.classList.contains('disabled')) {
    swapContainer.classList.remove('disabled');
  }
}

function fillSwapSelect(meal, selection, swapContainer) {
  const swaps = menusDetail[meal].find(menu => menu.key === selection).swaps;
  let selector = d3.select('#dropdown--' + meal + '--swap');

  // Reset selector
  const select = swapContainer.querySelector('.dropdown');
  while (select.length > 1) {
    select.remove(1);
  }
  select.selectedIndex = 0;

  // Fill options
  swaps.forEach(swap => {
    selector.append('option')
    .attr('class', 'option')
    .attr('value', swap.key)
    .text(swap.label);
  });
  
  // Enable swap selector
  if (swapContainer.classList.contains('disabled')) {
    swapContainer.classList.remove('disabled');
    swapContainer.querySelector('select').disabled = false;
  }
}
