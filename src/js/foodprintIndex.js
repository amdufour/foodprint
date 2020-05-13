// Max foodprint in each category
const maxFoodprint = [110.48, 32.08, 1599.31, 109.51];

// Foodprint in each category
let currentFoodprint = [0, 0, 0, 0, 0];
let newFoodprint = [0, 0, 0, 0, 0];

// Update foodprint in each category
function updateFoodprint(foodprint) {
  currentFoodprint = newFoodprint;
  newFoodprint = foodprint;
}

// Calculate foodprint index
function getFoodprintIndex() {
  let index = 0;
  maxFoodprint.forEach((foodprint, i) => {
    index += newFoodprint[i] / maxFoodprint[i];
  });
  return (index * 5).toFixed(2);
}
