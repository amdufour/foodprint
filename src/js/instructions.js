// Make first instruction appear 3s after page load
window.onload = function() {
  setTimeout(function() {
    showInstruction('one');
  }, 3000);
};

// Make second instruction appear 3s after first meal selection
let secondInstructionShown = false;
// showInstruction('two') is called from dropdowns.js

// Hide instruction when clicking on close icon
d3.select('.instructions--container .close')
  .on('click', d => {
    hideInstructions();
  });

function showInstruction(instruction) {
  // Get position of the Dropdowns container
  const dropdowns = document.getElementsByClassName('dropdowns-container')[0];
  const dropdownsCoord = dropdowns.getBoundingClientRect();

  // Position the see through "hole"
  const screenWidth = window.innerWidth;
  const dropdownBreakfast = document.getElementsByClassName('dropdown-container--breakfast')[0];
  const dropdownWidth = dropdownBreakfast.offsetWidth;
  const holeOffset = instruction === 'one' ? (-1 * 15) : 84;
  const holeHeight = instruction === 'one' ? 117 : 85;
  d3.select('.instruction-hole')
    .style('left', -1 * screenWidth + dropdownsCoord.left + 'px')
    .style('top', -1 * screenWidth + dropdownsCoord.top + holeOffset + window.scrollY + 'px')
    .style('width', dropdownWidth + 30 +'px')
    .style('height', holeHeight +'px');

  // Show instruction
  const instructionOffset = instruction === 'one' ? 0 : 52;
  d3.select('.instructions--container')
    .classed('visible', true);
  d3.select('.instruction-' + instruction)
    .style('top', dropdownsCoord.bottom - 250 + instructionOffset + window.scrollY + 'px')
    .style('left', dropdownsCoord.left + 'px')
    .classed('visible', true);
}

function hideInstructions() {
  d3.select('.instructions--container')
    .classed('visible', false);
  d3.select('.instruction-box')
    .classed('visible', false);
}
