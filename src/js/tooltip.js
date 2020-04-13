// Show the tooltip
function showTooltip(d) {
  // Get position of the tooltip based on position of the mouse 
  // on the page and the size of the hovered circle
  const ypos = d3.event.pageY + 300;

  // Get the foodprint detail of the hovered ingredient
  const ingredientFoodprint = getFoodprint(d.id);

  // Add text to the existing tooltip markup
  d3.select('#tooltip .tooltip--meal span').text(d.meal);
  d3.select('#tooltip .tooltip--ingredient').text(d.label);
  d3.select('#tooltip .detail--land span').text(parseFloat(ingredientFoodprint.land_use_m2_per_kg).toFixed(2));
  d3.select('#tooltip .detail--gas span').text(parseFloat(ingredientFoodprint.gas_emissions_kgCO2eq_per_kg).toFixed(2));
  d3.select('#tooltip .detail--water span').text(parseFloat(ingredientFoodprint.water_liters_per_kg).toFixed(2));
  d3.select('#tooltip .detail--eutro span').text(parseFloat(ingredientFoodprint.eutrophying_emissions_kgPO4eq_per_kg).toFixed(2));
  d3.select('#tooltip .detail--cost span').text(parseFloat(ingredientFoodprint.cost_usd_per_kg).toFixed(2));

  // Make the tooltip appear at the right location
  d3.select('#tooltip')
    .style('top', ypos + 'px')
    .style('left', '50%')
    .style('transform', 'translateX(50%)')
    .transition()
    .duration(0)
    .style('opacity', 1);
}

// Hide the tooltip
function hideTooltip() {
  d3.select('#tooltip')
    .style('top', '-1000px')
    .style('left', '-1000px')
    .transition()
    .duration(100)
    .style('opacity', 0);
}