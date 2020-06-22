// Make first instruction appear once the visualization is in viewport
let firstTipShown = false;
const dropdownsContainer = document.querySelector('.dropdowns-container');
window.addEventListener('scroll', function (event) {
	if (isInViewport(dropdownsContainer) && !firstTipShown) {
    d3.select('.tip').classed('visible', true);
    firstTipShown = true;
	}
}, false);

const swapInstructions = [
  'Wanna become a superhero? Try swaping an ingredient.',
  'Time to help the planet! Swap an ingredient.',
  'Now, let\'s reduce your foodprint by selecting a swap!'
];

function showSwapInstruction() {
  const instruction = Math.floor(Math.random() * swapInstructions.length);
  d3.select('.tip')
    .text(swapInstructions[instruction])
    .classed('visible', true);
}

function hideSwapInstruction() {
  d3.select('.tip').classed('visible', false);
}
