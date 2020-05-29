// Max foodprint in each category
const maxFoodprint = [108.7, 32.36, 1412.66, 113.22];

// Foodprint in each category
let currentFoodprint = [0, 0, 0, 0, 0];
let newFoodprint = [0, 0, 0, 0, 0];
let currentGlobalFoodprint = [0, 0, 0, 0, 0]; // Excludes new swaps
let currentGlobalFI = 0; // Excludes new swaps
let FIMeals = 0;
let FISwap = 0;
let lastestSwapIsSet = true;
let currentFoodprintDetail = [
  {
    mealId: 'breakfast',
    mealFoodprint: [0, 0, 0, 0, 0],
    setSwapFoodprint: [0, 0, 0, 0, 0],
    newSwapFoodprint: [0, 0, 0, 0, 0]
  },
  {
    mealId: 'lunch',
    mealFoodprint: [0, 0, 0, 0, 0],
    setSwapFoodprint: [0, 0, 0, 0, 0],
    newSwapFoodprint: [0, 0, 0, 0, 0]
  },
  {
    mealId: 'snack',
    mealFoodprint: [0, 0, 0, 0, 0],
    setSwapFoodprint: [0, 0, 0, 0, 0],
    newSwapFoodprint: [0, 0, 0, 0, 0]
  },
  {
    mealId: 'dinner',
    mealFoodprint: [0, 0, 0, 0, 0],
    setSwapFoodprint: [0, 0, 0, 0, 0],
    newSwapFoodprint: [0, 0, 0, 0, 0]
  }
];

// Get detailed foodprint of an ingredient
function getFoodprint(ingredient) {
  return dataFoodprint.find(item => item.id === ingredient);
}

// Get impact array of an ingredient
function getImpactArray(ingredient) {
  let impactArray = [0, 0, 0, 0, 0];

  impactArray[0] = parseFloat(ingredient.land_use_m2_per_kg) * parseFloat(ingredient.portion_kg);
  impactArray[1] = parseFloat(ingredient.gas_emissions_kgCO2eq_per_kg) * parseFloat(ingredient.portion_kg);
  impactArray[2] = parseFloat(ingredient.water_liters_per_kg) * parseFloat(ingredient.portion_kg);
  impactArray[3] = parseFloat(ingredient.eutrophying_emissions_kgPO4eq_per_kg) * parseFloat(ingredient.portion_kg);
  impactArray[4] = parseFloat(ingredient.cost_usd_per_kg) * parseFloat(ingredient.portion_kg);

  return impactArray;
}

// Get foodprint of a menu
function getMealFoodprint(meal, menu) {
  const ingredients = menusDetail[meal].find(item => item.key === menu).ingredients.filter(ingredient => ingredient.active === true);
  let mealFoodprint = [0, 0, 0, 0, 0];

  ingredients.forEach(ingredient => {
    const ingredientImpactArray = getImpactArray(getFoodprint(ingredient.id));
    mealFoodprint.forEach((foodprint, i) => {
      mealFoodprint[i] += ingredientImpactArray[i];
    });
  });

  return mealFoodprint;
}

// Get foodprint of a swap
function getSwapFoodprint(swap) {
  let swapFoodprint = [0, 0, 0, 0, 0];

  swap.addedIngredients.forEach(ingredient => {
    const ingredientImpactArray = getImpactArray(getFoodprint(ingredient.id));
    swapFoodprint.forEach((foodprint, i) => {
      swapFoodprint[i] += ingredientImpactArray[i];
    });
  });
  swap.removedIngredients.forEach(ingredient => {
    const ingredientImpactArray = getImpactArray(getFoodprint(ingredient.id));
    swapFoodprint.forEach((foodprint, i) => {
      swapFoodprint[i] -= ingredientImpactArray[i];
    });
  });

  return swapFoodprint;
}

// Set the latest swap
function setLatestSwap(swap, meal) {
  currentFoodprintDetail.forEach(detail => {
    if (detail.mealId === meal) {
      detail.setSwapFoodprint = detail.newSwapFoodprint;
      detail.newSwapFoodprint = [0, 0, 0, 0, 0];
    }
  });
}

// Calculate the current global foodprint
function getCurrentGlobalFoodprint() {
  currentGlobalFoodprint = [0, 0, 0, 0, 0];

  currentFoodprintDetail.forEach(detail => {
    currentGlobalFoodprint.forEach((foodprint, i) => {
      currentGlobalFoodprint[i] += detail.mealFoodprint[i] + detail.setSwapFoodprint[i];
    });
  });
}

// Update foodprint in each category
function updateFoodprint(foodprint) {
  currentFoodprint = newFoodprint;
  newFoodprint = foodprint;

  foodprintMeals.forEach((meal, i) => {
    foodprintMeals[i] = foodprintBreakfast[i] + foodprintLunch[i] + foodprintSnack[i] + foodprintDinner[i];
  });
}

// Calculate foodprint index
function getFoodprintIndex() {
  let index = 0;
  maxFoodprint.forEach((foodprint, i) => {
    index += newFoodprint[i] / maxFoodprint[i];
  });
  let FI = index * 25;

  if (isSwap) {
    FISwap = FI;
  } else {
    FIMeals = FI;
  }

  return FI.toFixed(0);
}

function getCurrentGlobalFI() {
  let index = 0;

  currentGlobalFoodprint.forEach((foodprint, i) => {
    if (i != 4) {
      index += currentGlobalFoodprint[i] / maxFoodprint[i];
    }
  });

  currentGlobalFI = index * 25;
}

function getNewFI(newSwapImpact) {
  let index = 0;

  currentGlobalFoodprint.forEach((foodprint, i) => {
    if (i != 4) {
      index += (currentGlobalFoodprint[i] + newSwapImpact[i]) / maxFoodprint[i];
    }
  });

  return index * 25;
}
