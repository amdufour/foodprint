// Make first instruction appear 2s after page load
window.onload = function() {
  setTimeout(function() {
    d3.select('.tip').classed('visible', true);
  }, 2000);
};

const swapInstructions = [
  'Wanna become a superhero? Try swaping an ingredient',
  'Time to help the planet. Swap an ingredient!',
  'Now, let\'s reduce your foodprint! Select a swap.'
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
