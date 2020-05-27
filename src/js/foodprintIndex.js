// Max foodprint in each category
const maxFoodprint = [108.7, 32.36, 1412.66, 113.22];

// Foodprint in each category
let currentFoodprint = [0, 0, 0, 0, 0];
let newFoodprint = [0, 0, 0, 0, 0];

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
  return (index * 25).toFixed(0);
}
