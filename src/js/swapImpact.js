// Add the impact of a meal
function addMealImpact() {
  if (currentSwapedMeal !== '' && !lastestSwapIsSet) {
    // Set latest swap
    setLatestSwap(currentSwap, currentSwapedMeal);
    lastestSwapIsSet = true;
  }

  // Update Foodprint detail
  updateMeal();

  // Update the global foodprint & foodprint index
  getCurrentGlobalFoodprint();
  getCurrentGlobalFI();
}

// Add meal in currentFoodprintDetail
function updateMeal() {
  currentFoodprintDetail.forEach(detail => {
    if (detail.mealId === updatedMeal) {
      // Reset Meal
      detail.setSwapFoodprint = [0, 0, 0, 0, 0];
      detail.newSwapFoodprint = [0, 0, 0, 0, 0];

      // Update Meal foodprint
      detail.mealFoodprint = getMealFoodprint(updatedMeal, currentMenu);
    }
  });
}

// Calculate the impact of a swap
function calculateSwapImpact() {
  if (currentSwapedMeal !== updatedMeal && !lastestSwapIsSet) {
    // Set latest swap
    setLatestSwap(latestSwap, updatedMeal);
    lastestSwapIsSet = true;
  }

  // Add new swap to Foodprint detail
  newSwapImpact = addNewSwap();
  lastestSwapIsSet = false;

  // Calculate impact of the new swap
  getCurrentGlobalFoodprint();
  const impacts = getSwapImpact(newSwapImpact);

  // Get the new foodprint index
  getCurrentGlobalFI();
  let newFI = getNewFI(newSwapImpact);
  let impactFI = (newFI - currentGlobalFI) / currentGlobalFI * 100;
  lastestSwapIsSet = false;

  showSwapImpact(impacts, newSwapImpact, impactFI);
}

// Show the swap impact details
function showSwapImpact(impacts, newSwapImpact, impactFI) {
  // Reset the swap impact tooltip
  d3.select('#tooltip-swap-impact .tooltip--fact').classed('hidden', true);
  d3.select('#tooltip-swap-impact .tooltip--recipe').classed('hidden', true);

  let icon = '';
  let swapTitle = '';

  if (impactFI < 0) {
    // Impact is reduced

    // Append fun fact info
    const funFacts = getFunFacts(newSwapImpact);
    const funFactRandomNumber = getfunfactRandomNumber(funFacts);
    const funFact = funFacts[funFactRandomNumber];
    icon = funFact.icon;
    swapTitle = funFact.titleShort;
    d3.select('#tooltip-swap-impact').classed('positive-impact', true);
    d3.select('#tooltip-swap-impact .swap-title--subtext').text(funFact.title1);
    d3.select('#tooltip-swap-impact .swap-title--subtext').append('span')
      .attr('class', 'swap-title--subtext-emphasis')
      .text(Math.abs(funFact.funFactNumber) + funFact.titleEmphasis);
    d3.select('#tooltip-swap-impact .swap-title--subtext').append('span')
      .attr('class', 'swap-title--subtext-end')
      .text(funFact.title2);
    d3.select('#tooltip-swap-impact .swap-title--subtext').classed('hidden', false);

    // Append footnote
    if (funFact.footnote !== '') {
      d3.select('.impact-footnote').classed('hidden', false);
      d3.select('.impact-footnote-text').text(funFact.footnote);
      d3.select('.impact-footnote-source').text(funFact.source);
    } else {
      d3.select('.impact-footnote').classed('hidden', true);
    }

    // Append link to recipe
    if (currentSwap.recipeLabel !== undefined) {
      d3.select('#tooltip-swap-impact .tooltip--recipe').classed('hidden', false);
      d3.select('#tooltip-swap-impact .recipe a').attr('href', currentSwap.recipeUrl);
      d3.select('#tooltip-swap-impact .recipe a').text(currentSwap.recipeLabel);
      d3.select('#tooltip-swap-impact .recipe-source a').attr('href', currentSwap.recipeCreatorUrl);
      d3.select('#tooltip-swap-impact .recipe-source a').text(currentSwap.recipeCreator);
    }
  } else {
    // Impact is increased
    icon = 'earth-sad';
    swapTitle = 'Womp Womp...';
    d3.select('#tooltip-swap-impact').classed('positive-impact', false);
    d3.select('.impact-footnote').classed('hidden', true);
    d3.select('#tooltip-swap-impact .swap-title--subtext').classed('hidden', true);
  }

  // Append swap impact info
  const impactSummary = impactFI < 0 ? 'decreases' : 'increases';
  d3.select('#tooltip-swap-impact .swap-title--icon')
    .attr('class', 'swap-title--icon ' + icon);
  d3.select('#tooltip-swap-impact .swap-title--text').text(swapTitle);
  d3.select('#tooltip-swap-impact .summary-swap').text(currentSwap.impactLabel);
  d3.select('#tooltip-swap-impact .summary-impact').text(impactSummary);
  d3.select('#tooltip-swap-impact .summary-result').text(Math.abs(impactFI).toFixed(0));
  impacts.forEach((impact, i) => {
    const sign = impact > 0 ? '+' : '-';
    d3.select('#tooltip-swap-impact .detail--' + categories[i].class + ' .detail-impact').text(sign + Math.abs(impact.toFixed(0)));
  });

  // Append extra fact
  if (currentSwap.funFact !== undefined) {
    d3.select('#tooltip-swap-impact .tooltip--fact').classed('hidden', false);
    d3.select('#tooltip-swap-impact .fact').text(currentSwap.funFact);
    d3.select('#tooltip-swap-impact .source').text(currentSwap.funFactSource);
  }

  // Make the impact info appear
  d3.select('#tooltip-swap-impact')
    .classed('visible', true)
    .classed('show-content', true);
}

function getfunfactRandomNumber(funFacts) {
  let funFactRandomNumber = Math.floor(Math.random() * funFacts.length);

  while (funFacts[funFactRandomNumber].funFactNumber < funFacts[funFactRandomNumber].minNumber) {
    funFactRandomNumber = Math.floor(Math.random() * funFacts.length);
  }

  return funFactRandomNumber;
}

// Add new swap in currentFoodprintDetail
function addNewSwap() {
  let newSwap = [0, 0, 0, 0, 0];

  currentFoodprintDetail.forEach(detail => {
    if (detail.mealId === currentSwapedMeal) {
      detail.newSwapFoodprint = getSwapFoodprint(currentSwap);
      newSwap = detail.newSwapFoodprint;
    }
  });

  return newSwap;
}

// Calculate the impact of a swap
function getSwapImpact(newSwapImpact) {
  let impacts = [0, 0, 0, 0, 0];

  impacts.forEach((impact, i) => {
    impacts[i] = newSwapImpact[i] / currentGlobalFoodprint[i] * 100;
  });

  return impacts;
}

// Hide the swap impact details
function hideSwapImpact() {
  d3.select('#tooltip-swap-impact')
    .classed('visible', false)
    .classed('show-content', false);
  d3.select('#tooltip-swap-impact .tooltip--fact')
    .classed('hidden', true);
  d3.select('#tooltip-swap-impact .tooltip--recipe')
    .classed('hidden', true);
}

// Swap impact fun facts detail
let funFactsSavings = [
  { 
    key: 'shower',
    icon: 'shower',
    funFactFactor: 16,
    impactIndex: 2,
    funFactNumber: 0,
    minNumber: 10,
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
    funFactFactor: 75,
    impactIndex: 2,
    funFactNumber: 0,
    minNumber: 10,
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
    funFactFactor: 261,
    impactIndex: 0,
    funFactNumber: 0,
    minNumber: 3,
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
    funFactFactor: 3940 / 3984,
    impactIndex: 1,
    funFactNumber: 0,
    minNumber: 10,
    titleShort: 'Can you believe this?',
    title1: 'Your greenhouse gas emission reduction corresponds to ',
    titleEmphasis: '',
    title2: ' car trips between New York and Los Angeles.*',
    footnote: ' and knowing that a typical passenger car vehicle has a fuel economy of 9.35 km/L and emits 2.348 grams of CO2 per Litre.',
    source: '8'
  },
  {
    key: 'money',
    icon: 'piggy-bank',
    funFactFactor: 1,
    impactIndex: 4,
    funFactNumber: 0,
    minNumber: 20,
    titleShort: 'Double win',
    title1: 'This swap is not only good for the planet, it makes your wallet heavier with ',
    titleEmphasis: '$',
    title2: ' *',
    footnote: '.',
    source: ''
  },
];

// Calculate fun facts for swap impacts
function getFunFacts(impacts) {
  funFactsSavings.forEach(funFact => {
    funFact.funFactNumber = Math.round(Math.abs(impacts[funFact.impactIndex]) / funFact.funFactFactor * 52);
  });
  
  return funFactsSavings;
}