// Show the nodes tooltip
function showTooltip(d) {
  // Get the foodprint detail of the hovered ingredient
  const ingredientFoodprint = getFoodprint(d.id);

  // Add text to the existing tooltip markup
  d3.select('#tooltip .tooltip--meal span').text(d.meal);
  d3.select('#tooltip .tooltip--portion span').text(ingredientFoodprint.portion_kg * 1000);
  d3.select('#tooltip .tooltip--ingredient').text(d.label);
  d3.select('#tooltip .detail--land span').text(parseFloat(ingredientFoodprint.land_use_m2_per_kg).toFixed(2));
  d3.select('#tooltip .detail--gas span').text(parseFloat(ingredientFoodprint.gas_emissions_kgCO2eq_per_kg).toFixed(2));
  d3.select('#tooltip .detail--water span').text(parseFloat(ingredientFoodprint.water_liters_per_kg).toFixed(2));
  d3.select('#tooltip .detail--eutro span').text(parseFloat(ingredientFoodprint.eutrophying_emissions_kgPO4eq_per_kg).toFixed(2));
  d3.select('#tooltip .detail--cost span').text(parseFloat(ingredientFoodprint.cost_usd_per_kg).toFixed(2));

  // Make the tooltip appear at the right location
  d3.select('#tooltip')
    .classed('visible', true);
}

// Hide the nodes tooltip
function hideTooltip() {
  d3.select('#tooltip')
    .classed('visible', false);
}

// Show the category tooltip
function showCategoryTooltip(category, fact, source) {
  const xpos = d3.event.pageX;
  const ypos = d3.event.pageY + 150;

  // Add text to the existing tooltip markup
  d3.select('#tooltip-category .category-title .' + category).classed('hidden', false);
  d3.select('#tooltip-category .quote').attr('class', 'tooltip quote');
  d3.select('#tooltip-category .quote').classed(category, true);
  d3.select('#tooltip-category .tooltip--fact').text(fact);
  d3.select('#tooltip-category .tooltip--source').text(source);

  // Make the tooltip appear at the right location
  d3.select('#tooltip-category')
    .classed('visible', true)
    .style('top', ypos + 'px')
    .style('left', () => {
      switch (category) {
        case 'land':
          return xpos + 50 + 'px';
        case 'cost':
          return xpos - 50 + 'px';
        default:
          return xpos + 'px';
      }
    })
    .transition()
    .duration(0)
    .style('opacity', 1);
}

// Hide the category tooltip
d3.select('#tooltip-category .close')
  .on('click', d => {
    hideCategoryTooltip();
  });
function hideCategoryTooltip() {
  const category = d3.select('#tooltip-category .quote').attr('class').substring(14);
  // Hide the tooltip
  d3.select('#tooltip-category')
    .classed('visible', false)
    .style('top', '-1000px')
    .style('left', '-1000px')
    .transition()
    .duration(100)
    .style('opacity', 0);

  // Hide back the title
  d3.select('#tooltip-category .category-title .' + category).classed('hidden', true);

  // Remove hover styles from the circle axis and label
  d3.select('.axis-circles--' + category)
    .classed('active-tooltip', false);
}

// Show swap impact
const swapIconsPos = ['earth-happy_01', 'earth-happy_02', 'earth-happy_03'];
const swapIconsNeg = ['earth-sad_01', 'earth-sad_02'];
const swapTitlePos = ['Good job!', 'Way to go!', 'You made it look easy!'];
const swapTitleNeg = ['Womp Womp...', 'Let\'s take a deeper look'];
function showSwapImpact(currentFoodprint, newFoodprint, currentFI, newFI, swap) {
  console.log(swap);
  console.log(currentFoodprint, newFoodprint, currentFI, newFI);

  let impactIsReduced;
  newFI < currentFI ? impactIsReduced = true : impactIsReduced = false;
  const iconMax = impactIsReduced ? swapIconsPos.length : swapIconsNeg.length;
  const iconRandomNumber = Math.floor(Math.random() * (iconMax));
  const titleRandomNumber = Math.floor(Math.random() * (iconMax));
  const icon = impactIsReduced ? swapIconsPos[iconRandomNumber] : swapIconsNeg[iconRandomNumber];
  const title = impactIsReduced ? swapTitlePos[titleRandomNumber] : swapTitleNeg[titleRandomNumber];
  const impactSummary = impactIsReduced ? 'reduces' : 'increases';

  const FIDiff = Math.ceil((Math.abs(currentFI -  newFI) / currentFI * 100));

  d3.select('#tooltip-swap-impact .swap-title--icon')
    .style('background-image', 'url(../svg/' + icon + '.svg)');
  d3.select('#tooltip-swap-impact .swap-title--text').text(title);
  d3.select('#tooltip-swap-impact .summary-swap').text(swap);
  d3.select('#tooltip-swap-impact .summary-impact').text(impactSummary);
  d3.select('#tooltip-swap-impact .summary-result').text(FIDiff);

  currentFoodprint.forEach((foodprint, index) => {
    const diff = (Math.abs(newFoodprint[index] - foodprint) / foodprint * 100).toFixed(2);
    const sign = (newFoodprint[index] - foodprint) > 0 ? '+' : '-';
    d3.select('#tooltip-swap-impact .detail--' + categories[index].class + ' .detail-impact').text(sign + diff);
  });

  // Make the tooltip appear
  d3.select('#tooltip-swap-impact')
    .classed('visible', true);
}

// Hide the swap impact tooltip
d3.select('#tooltip-swap-impact .close')
  .on('click', d => {
    hideSwapImpactTooltip();
  });
function hideSwapImpactTooltip() {
  // Hide the tooltip
  d3.select('#tooltip-swap-impact')
    .classed('visible', false);
}
