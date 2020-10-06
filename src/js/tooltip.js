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
  const svgContainer = document.getElementById('foodprint').getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const svgContainerTop = parseInt(svgContainer.top) + parseInt(scrollTop);
  const svgContainerLeft = parseInt(svgContainer.left) + parseInt(scrollLeft);
  let cx;
  let cy;

  // Ensure to empty info from previously selected categories
  const detailsElements = document.querySelectorAll('.category-detail');
  detailsElements.forEach(detail => {
    if (!detail.classList.contains('hidden')) {
      detail.classList.add('hidden');
    }
  });

  // Add text to the existing tooltip markup
  d3.select('#tooltip-category .category-title .' + category).classed('hidden', false);
  d3.select('#tooltip-category .quote').attr('class', 'tooltip quote');

  if (category === 'index') {
    cx = +d3.select('.index-circle--external').attr('cx');
    cy = +d3.select('.index-circle--external').attr('cy');
    d3.select('#tooltip-category .tooltip--fact').classed('fact-index', true);
    d3.select('#tooltip-category .tooltip--fact').append('span').text(indexDefinition1);
    d3.select('#tooltip-category .tooltip--fact').append('span').text(indexDefinition2);
    d3.select('#tooltip-category .tooltip--source').text('');
  } else {
    cx = +d3.select('.axis-circle--delimiter--' + category).attr('cx');
    cy = +d3.select('.axis-circle--delimiter--' + category).attr('cy');
    d3.select('#tooltip-category .tooltip--fact').classed('fact-index', false);
    d3.select('#tooltip-category .tooltip--fact').text(fact);
    d3.select('#tooltip-category .tooltip--source').text(source);
  }

  let tooltipHeight = d3.select('#tooltip-category .tooltip--container').style('height');
  tooltipHeight = +tooltipHeight.substring(0, tooltipHeight.length - 2);

  // Make the tooltip appear at the right location
  d3.select('#tooltip-category')
    .classed('visible', true)
    .style('top', svgContainerTop + cy + tooltipHeight/2 + 'px')
    .style('left', svgContainerLeft + cx + 'px')
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
  category = '';
  document.querySelectorAll('#tooltip-category .category-detail').forEach(detail => {
    if (!detail.classList.contains('hidden')) {
      category = detail.classList[1];
    }
  });
  
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

// Handle open/close of nodes tooltip on mobile
d3.select('#tooltip .tooltip--toggle')
  .on('click', () => {
    tooltipToggle = document.querySelector('#tooltip .tooltip--toggle');
    tooltipContent = document.querySelector('#tooltip .tooltip--content');
    if (tooltipContent.classList.contains('close')) {
      tooltipToggle.classList.remove('closed');
      tooltipContent.classList.remove('close');
    } else {
      tooltipToggle.classList.add('closed');
      tooltipContent.classList.add('close');
    }
  });
// Handle open/close of nodes tooltip-impact on mobile
d3.select('#tooltip-swap-impact .tooltip--toggle')
  .on('click', () => {
    tooltipToggle = document.querySelector('#tooltip-swap-impact .tooltip--toggle');
    tooltipContent = document.querySelector('#tooltip-swap-impact .tooltip--content');
    if (tooltipContent.classList.contains('close')) {
      tooltipToggle.classList.remove('closed');
      tooltipContent.classList.remove('close');
    } else {
      tooltipToggle.classList.add('closed');
      tooltipContent.classList.add('close');
    }
  });


// Hide the mobile warning on click
d3.select('.mobile-warning .close')
  .on('click', () => {
    d3.select('.mobile-warning')
      .classed('closed', true);
  });
