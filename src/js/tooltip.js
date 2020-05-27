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
  const svgContainerTop = +svgContainer.top + +scrollTop;
  const svgContainerLeft = +svgContainer.left + +scrollLeft;
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
const swapIconsNeg = ['earth-sad_01', 'earth-sad_02'];
const swapTitleNeg = 'Womp Womp...';
function showSwapImpact(swap) {
  // Reset the swap impact tooltip
  d3.select('#tooltip-swap-impact .tooltip--fact').classed('hidden', true);
  d3.select('#tooltip-swap-impact .tooltip--recipe').classed('hidden', true);

  // Calculate the difference made by the swap
  let swapDiff = [0, 0, 0, 0, 0];
  let foodprintWithSwap = [0, 0, 0, 0, 0];
  let impacts = [0, 0, 0, 0, 0];
  currentSwap.removedIngredients.forEach(ingredient => {
    const ingredientFoodprint = getFoodprint(ingredient.id);
    swapDiff.forEach((diff, i) => {
      swapDiff[i] -= +(ingredientFoodprint[categories[i].label] * ingredientFoodprint.portion_kg);
    });
  });
  currentSwap.addedIngredients.forEach(ingredient => {
    const ingredientFoodprint = getFoodprint(ingredient.id);
    swapDiff.forEach((diff, i) => {
      swapDiff[i] += +(ingredientFoodprint[categories[i].label] * ingredientFoodprint.portion_kg);
    });
  });
  impacts.forEach((impact, i) => {
    foodprintWithSwap[i] = foodprintMeals[i] + swapDiff[i];
    impacts[i] = +(swapDiff[i] / foodprintMeals[i] * 100).toFixed(2);
    const sign = impacts[i] > 0 ? '+' : '-';
    d3.select('#tooltip-swap-impact .detail--' + categories[i].class + ' .detail-impact').text(sign + Math.abs(impacts[i]));
  });

  const funFactsSavings = getFunFacts(impacts);

  let FIMeals = 0;
  let FISwap = 0;
  let indexMeals = 0;
  let indexSwap = 0;
  maxFoodprint.forEach((foodprint, i) => {
   indexMeals += foodprintMeals[i] / maxFoodprint[i];
   indexSwap += foodprintWithSwap[i] / maxFoodprint[i];
  });
  FIMeals = (indexMeals * 5).toFixed(2);
  FISwap = (indexSwap * 5).toFixed(2);

  const impactIsReduced = FISwap < FIMeals ? true : false;
  let icon = '';
  const impactSummary = impactIsReduced ? 'decreases' : 'increases';

  if (impactIsReduced) {
    const funFactRandomNumber = Math.floor(Math.random() * funFactsSavings.length);
    const funFact = funFactsSavings[funFactRandomNumber];
    icon = funFact.icon;
    const textEmphasis = Math.abs(funFact.funFactNumber) + funFact.titleEmphasis;
    d3.select('#tooltip-swap-impact').classed('positive-impact', true);
    d3.select('#tooltip-swap-impact .swap-title--text').text(funFact.titleShort);
    d3.select('#tooltip-swap-impact .swap-title--subtext').text(funFact.title1);
    d3.select('#tooltip-swap-impact .swap-title--subtext').append('span')
      .attr('class', 'swap-title--subtext-emphasis')
      .text(textEmphasis);
    d3.select('#tooltip-swap-impact .swap-title--subtext').append('span')
      .attr('class', 'swap-title--subtext-end')
      .text(funFact.title2);

    d3.select('#tooltip-swap-impact .swap-title--subtext').classed('hidden', false);
    if (funFact.footnote !== '') {
      d3.select('.impact-footnote').classed('hidden', false);
      d3.select('.impact-footnote-text').text(funFact.footnote);
      d3.select('.impact-footnote-source').text(funFact.source);
    } else {
      d3.select('.impact-footnote').classed('hidden', true);
    }
  } else {
    const iconRandomNumber = Math.floor(Math.random() * 2);
    icon = swapIconsNeg[iconRandomNumber];
    d3.select('#tooltip-swap-impact').classed('positive-impact', false);
    d3.select('#tooltip-swap-impact .swap-title--text').text(swapTitleNeg);
    d3.select('.impact-footnote').classed('hidden', true);
    d3.select('#tooltip-swap-impact .swap-title--subtext').classed('hidden', true);
  }

  const FIDiff = Math.ceil((Math.abs(FIMeals -  FISwap) / FIMeals * 100));

  d3.select('#tooltip-swap-impact .swap-title--icon')
    .style('background-image', 'url(../svg/' + icon + '.svg)');
  d3.select('#tooltip-swap-impact .summary-swap').text(swap.impactLabel);
  d3.select('#tooltip-swap-impact .summary-impact').text(impactSummary);
  d3.select('#tooltip-swap-impact .summary-result').text(FIDiff);

  if (swap.funFact !== undefined) {
    d3.select('#tooltip-swap-impact .tooltip--fact').classed('hidden', false);
    d3.select('#tooltip-swap-impact .fact').text(swap.funFact);
    d3.select('#tooltip-swap-impact .source').text(swap.funFactSource);
  }

  if (swap.recipeLabel !== undefined) {
    d3.select('#tooltip-swap-impact .tooltip--recipe').classed('hidden', false);
    d3.select('#tooltip-swap-impact .recipe a').attr('href', swap.recipeUrl);
    d3.select('#tooltip-swap-impact .recipe a').text(swap.recipeLabel);
    d3.select('#tooltip-swap-impact .recipe-source a').attr('href', swap.recipeCreatorUrl);
    d3.select('#tooltip-swap-impact .recipe-source a').text(swap.recipeCreator);
  }

  // Make the tooltip appear
  d3.select('#tooltip-swap-impact')
    .classed('visible', true)
    .classed('show-content', true);
}

// Hide the swap impact tooltip
function hideSwapImpactTooltip() {
  d3.select('#tooltip-swap-impact')
    .classed('visible', false)
    .classed('show-content', false);
  d3.select('#tooltip-swap-impact .tooltip--fact')
    .classed('hidden', true);
  d3.select('#tooltip-swap-impact .tooltip--recipe')
    .classed('hidden', true);
}

// Calculate fun facts for swap impacts
function getFunFacts(impacts) {
  const funFactFactors = [16, 75, 261, (1/3984), 1];
  let funFactsSavings = [
    { 
      key: 'shower',
      icon: 'shower',
      funFactNumber: Math.round(impacts[2] / funFactFactors[0] * 52),
      titleShort: 'You made it look easy',
      title1: 'With this swap, you preserved the equivalent of ',
      titleEmphasis: ' showers',
      title2: ' in water.*',
      footnote: ' and assuming a 4 minutes shower with an average shower head delivering 4L per minute.',
      source: '7'
    },
    {
      key: 'bath',
      icon: 'bath',
      funFactNumber: Math.round(impacts[2] / funFactFactors[1] * 52),
      titleShort: 'Look at you !',
      title1: 'You just saved the water of ',
      titleEmphasis: ' luxurious baths',
      title2: '.*',
      footnote: ' and that the bath is filled with 75L of water.',
      source: '7'
    },
    {
      key: 'land',
      icon: 'tennis',
      funFactNumber: Math.round(impacts[0] / funFactFactors[2] * 52),
      titleShort: 'Go on rockstar !',
      title1: 'This swap helped you protect a land surface comparable to ',
      titleEmphasis: ' tennis courts',
      title2: '.*',
      footnote: ' and knowing that the dimensions of a tennis court are 23.77 x 11 meters.',
      source: ''
    },
    {
      key: 'car',
      icon: 'car',
      funFactNumber: Math.round(impacts[1] / funFactFactors[3] * 52),
      titleShort: 'Can you believe this?',
      title1: 'Your greenhouse gas emission reduction corresponds to a car traveling ',
      titleEmphasis: 'km',
      title2: '.*',
      footnote: ' and knowing that a typical passenger car vehicle has a fuel economy of 9.35 km/L and emits 2.348 grams of CO2 per Litre.',
      source: '8'
    },
    {
      key: 'money',
      icon: 'piggy-bank',
      funFactNumber: Math.round(impacts[4] / funFactFactors[4] * 52),
      titleShort: 'Double win',
      title1: 'This swap is not only good for the planet, it makes your wallet heavier with ',
      titleEmphasis: '$',
      title2: ' *',
      footnote: '.',
      source: ''
    },
  ];
  
  return funFactsSavings;
}
