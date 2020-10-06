const windowWidth = window.innerWidth;
const container = 1200;
const padding = 30;
const paddingLeft = 0;
const width = document.getElementById('foodprint').offsetWidth;
const height = windowWidth > 576 ? 250 : (width / 2 + 25);
const paddingCircles = 1.5; // Separation between same-color nodes
const maxRadius = 15;
const radiusClustersCenters = 150; // Radius of the clusters centers

const colors = ['#EC1C4B', '#F16A43', '#56BFBF', '#A6206A', '#BF7222'];
const meals = ['breakfast', 'lunch', 'snack', 'dinner'];
const m = categories.length; // number of distinct clusters

const color = d3.scaleSequential(d3.interpolateRainbow)
  .domain(d3.range(m));

let currentBreakfast = '';
let currentLunch = '';
let currentSnack = '';
let currentDinner = '';
let updatedMeal = '';
let currentMenu = '';
let isSwap = false;
let instructionsShown = false;
let latestMeal = '';
let latestSwap = '';
let currentSwap = '';
let latestSwapedMeal = '';
let currentSwapedMeal = '';

// Generate clusters and initialize nodes arrays
let clusters = d3.range(m).map((category, i) => {
  let axisRadius = 0;
  let xTranslation = 0;
  let yTranslation = 0;

  switch (i) {
    case 0:
      axisRadius = height - 125;
      xTranslation = axisRadius;
      yTranslation = 2 * height - axisRadius;
      break;
    case 1:
      axisRadius = height - 150;
      xTranslation = 1.5 * width / 6;
      yTranslation = 2.8 * height / 5;
      break;
    case 2:
      axisRadius = height - 80;
      xTranslation = width / 2;
      yTranslation = height;
      break;
    case 3:
      axisRadius = height - 125;
      xTranslation = width - axisRadius - 10;
      yTranslation = 2 * height - axisRadius;
      break;
    case 4:
      axisRadius = height - 160;
      xTranslation = 4.5 * width / 6;
      yTranslation = 2.8 * height / 5;
      break;
  }
  
  const d = {
    cluster: i,
    radius: maxRadius,
    r: axisRadius, 
    x: xTranslation,
    y: yTranslation
  };
  return d;
});
let nodes = [];
let newNodes = [];

appendSelectors();
showLegend();

function appendSelectors() {
  // Append meal and swap selectors to the DOM
  meals.forEach(meal => {
    let selectionList = [];
    menusDetail[meal].forEach(selection => {
      const menu = {
        key: selection.key,
        label: selection.label
      };
      selectionList.push(menu);
    });
    appendDropdown(windowWidth, meal, selectionList);
  });
}

// Prep data for node generation
function addMeal(meal, currentSelection, newSelection) {
  // If meal instruction is still visible, hide it
  if (document.querySelector('.tip.visible') !== null && updatedMeal === '') {
    d3.select('.tip').classed('visible', false);
  }

  latestMeal = updatedMeal;
  updatedMeal = meal;
  currentMenu = newSelection;

  switch (meal) {
    case 'breakfast':
      currentBreakfast = newSelection;
      break;
    case 'lunch':
      currentLunch = newSelection;
      break;
    case 'snack':
      currentSnack = newSelection;
      break;
    case 'dinner':
      currentDinner = newSelection;
      break;
  }
  
  let removedIngredients = [];
  if (currentSelection !== '') {
    removedIngredients = getIngredients(meal, currentSelection);
  }
  const addedIngredients = getIngredients(meal, newSelection);

  updateNodes(meal, removedIngredients, addedIngredients);

  addMealImpact();

  // Show swap instruction
  setTimeout(function() {
    // Show instruction only if user is not currently hovering a node
    if (document.querySelectorAll('.node.active').length === 0 && !instructionsShown) {
      showSwapInstruction();
      instructionsShown = true;
    }
  }, 3000);
}

function swapIngredient(meal, swapId) {
  // Hide swap instruction
  hideSwapInstruction();

  let swap = {};
  menusDetail[meal].forEach(menu => {
    let obj = menu.swaps.find(obj => obj.key == swapId);
    if (obj !== undefined) {
      swap = obj;
    }
  });
  swapNodes(meal, swap);

  if (document.querySelector('#dropdown--swap--' + meal + ' .option.reset.hidden') !== null) {
    // If first swap selection, show reset option in dropdown
    d3.select('#dropdown--swap--' + meal + ' .option.reset.hidden')
      .classed('hidden', false);
  } else if (swapId === 'reset') {
    // If recipe reset, hide reset in options
    d3.select('#dropdown--swap--' + meal + ' .option.reset')
      .classed('hidden', true);
  }
  
}

function updateNodes(meal, removedIngredients, addedIngredients) {

  // Remove nodes related to ingredients that are not used anymore
  if (removedIngredients.length > 0) {
    let remainingNodes = nodes;
    removedIngredients.forEach(ingredient => {
      remainingNodes = remainingNodes.filter(item => {
        if (item.id === ingredient.id && item.meal === meal) {
          return false;
        } else {
          return true;
        }
      });
    });
    nodes = remainingNodes;
  }

  // Generate nodes for each added ingredient
  if (addedIngredients.length > 0) {

    addedIngredients.forEach(ingredient => {
      // Find ingredient foodprint in data
      const ingredientFoodprint = getFoodprint(ingredient.id);
      
      // Create a node for each category
      categories.forEach((category, i) => {
        const radius = Math.sqrt((parseFloat(ingredientFoodprint[category.label]) * parseFloat(ingredientFoodprint.portion_kg) * category.factor) / Math.PI);
        const d = {
          meal: meal,
          id: ingredient.id,
          label: ingredient.label,
          cluster: category.cluster,
          radius: ingredient.active ? radius : 0,
          x: (i+1) * (width/6) + paddingLeft + Math.random(),
          y: height + Math.random(),
          appear: false
        };
        nodes.push(d);
      });
    });
  }

  // Display the simulation with updated nodes
  isSwap = false;
  updateSimulation();
}

function swapNodes(meal, swap) {
  latestSwap = currentSwap;
  currentSwap = swap;
  latestSwapedMeal = currentSwapedMeal;
  currentSwapedMeal = meal;

  // Reset state of possible swaps
  let menu = '';
  switch (meal) {
    case 'breakfast':
      menu = currentBreakfast;
      break;
    case 'lunch':
      menu = currentLunch;
      break;
    case 'snack':
      menu = currentSnack;
      break;
    case 'dinner':
      menu = currentDinner;
      break;
  }
  const ingredients = menusDetail[meal].filter(obj => obj.key === menu)[0].ingredients;
  ingredients.forEach(ingredient => {
    const ingredientFoodprint = getFoodprint(ingredient.id);
    nodes.forEach(node => {
      if (node.meal === meal && node.id === ingredient.id) {
        if (!ingredient.active && node.radius !== 0) {
          node.radius = 0;
          node.appear = false;
        } else if (ingredient.active && node.radius === 0) {
          const category = categories.filter(category => category.cluster === node.cluster)[0];
          node.radius = Math.sqrt((parseFloat(ingredientFoodprint[category.label]) * parseFloat(ingredientFoodprint.portion_kg) * category.factor) / Math.PI);
          
          // If the new ingredient was not already present in the original recipe, change it's appear state
          if (swap.addedIngredients.some(addition => addition.id === ingredient.id)) {
            node.appear = true;
          }
        }
      }
    });
  });

  // Hide removed ingredients
  swap.removedIngredients.forEach(ingredient => {
    nodes.forEach(node => {
      if (node.meal === meal && node.id === ingredient.id) {
        node.radius = 0;
        node.appear = false;
      }
    });
  });

  // Show added ingredients
  swap.addedIngredients.forEach(ingredient => {
    const ingredientFoodprint = getFoodprint(ingredient.id);
    nodes.forEach(node => {
      if (node.meal === meal && node.id === ingredient.id) {
        const category = categories.filter(category => category.cluster === node.cluster)[0];
        node.radius = Math.sqrt((parseFloat(ingredientFoodprint[category.label]) * parseFloat(ingredientFoodprint.portion_kg) * category.factor) / Math.PI);
        node.appear = true;
      }
    });
  });

  isSwap = true;
  updateSimulation();
}

let svg = d3.select('#foodprint')
  .append('svg')
    .attr('id', 'foodprint')
    .attr('class', 'foodprint-container')
    .attr('height', height * 2);
if (windowWidth > 1024) {
  d3.select('.swap-impact--container')
    .style('height', height * 2 + 'px');
}

let arc = d3.arc();

// Append foodprint index circle
let circlesIndex = svg.append('g');
circlesIndex.append('circle')
  .attr('class', 'index-circle')
  .attr('cx', width/2 + paddingLeft)
  .attr('cy', height)
  .attr('r', 0);
circlesIndex.append('circle')
  .attr('class', 'index-circle--external')
  .attr('cx', width/2 + paddingLeft)
  .attr('cy', height)
  .attr('r', () => {
    return windowWidth > 576 ? (height - 25) : (windowWidth / 2 - 30);
  });

let circlesIndexTransformed = circlesIndex.append('g')
  .attr('class', 'transformed')
  .style('transform', 'translate(' + (width/2 + paddingLeft) + 'px, ' + height + 'px)');
circlesIndexTransformed.append('path')
  .attr('id', 'index-circle--path')
  .attr('d', d => {
    return arc({
      startAngle: degreeToRadian(-90),
      endAngle: degreeToRadian(90),
      innerRadius: height - 15,
      outerRadius: height - 15
    });
  });
circlesIndexTransformed.append('path')
  .attr('id', 'index-circle--path--result')
  .attr('d', d => {
    return arc({
      startAngle: degreeToRadian(90),
      endAngle: degreeToRadian(270),
      innerRadius: height - 5,
      outerRadius: height - 5
    });
  });
circlesIndexTransformed.append('text')
  .attr('class', 'foodprint-index--label')
  .style('text-anchor', 'middle')
  .append('textPath')
    .attr('xlink:href', '#index-circle--path')
    .attr('startOffset', '25%')
    .text('Foodprint Index')
  .on('mouseover', d => {
    d3.event.stopPropagation();
    d3.selectAll('.foodprint-index--label')
      .classed('active', true);
    d3.select('.index-circle--external')
      .classed('active', true);
  })
  .on('click', d => {
    d3.event.stopPropagation();
    // Maintain active style
      d3.select('.foodprint-index--label')
      .classed('active-tooltip', true);
    // Show the tooltip
    showCategoryTooltip('index');
  })
  .on('mouseout', d => {
    d3.event.stopPropagation();
    d3.selectAll('.foodprint-index--label')
      .classed('active', false);
    d3.select('.index-circle--external')
      .classed('active', false);
  });
circlesIndexTransformed.append('text')
  .attr('class', 'foodprint-index--label foodprint-index--label--result')
  .style('text-anchor', 'middle')
  .append('textPath')
    .attr('id', 'foodprint-result--number--index')
    .attr('class', 'foodprint-result--number--index hidden')
    .attr('xlink:href', '#index-circle--path--result')
    .attr('startOffset', '75%')
    .text(0);

if (windowWidth > 576) {
  svg.append('g')
    .attr('class', 'axis-circles--container')
    .selectAll('.axis-circles')
    .data(categories)
    .enter()
    .append('g')
      .attr('class', d => { return 'axis-circles axis-circles--' + d.class; });

  categories.forEach((category, i) => {// Append circles showing foodprint in each category
    d3.select('.axis-circles--' + category.class)
      .append('circle')
        .attr('class', 'axis axis-circle axis-circle--' + category.class)
        .attr('cx', clusters[category.cluster].x)
        .attr('cy', clusters[category.cluster].y)
        .attr('r', 0);

    // Append delimiter circles for each category
    d3.select('.axis-circles--' + category.class)
      .append('circle')
        .attr('class', 'axis axis-circle--delimiter axis-circle--delimiter--' + category.class)
        .attr('cx', clusters[category.cluster].x)
        .attr('cy', clusters[category.cluster].y)
        .attr('r', clusters[category.cluster].r);

    // Append path for category titles
    let textPaths = d3.select('.axis-circles--' + category.class).append('g')
      .attr('class', 'axis-paths-transformed')
      .style('transform', 'translate(' + clusters[category.cluster].x + 'px, ' + clusters[category.cluster].y + 'px)');


    textPaths.append('path')
        .attr('id', 'category-label--path--' + category.class)
        .attr('class', 'category-label--path')
        .attr('d', d => {
          return arc({
            startAngle: degreeToRadian(-120),
            endAngle: degreeToRadian(120),
            innerRadius: clusters[category.cluster].r + 10,
            outerRadius: clusters[category.cluster].r + 10
          });
        });

    // Append path for total foodprint in each category
    textPaths.append('path')
        .attr('id', 'category-label--path--result--' + category.class)
        .attr('class', 'category-label--path')
        .attr('d', d => {
          return arc({
            startAngle: degreeToRadian(90),
            endAngle: degreeToRadian(270),
            innerRadius: clusters[category.cluster].r - 10,
            outerRadius: clusters[category.cluster].r - 10
          });
        });
        
    // Path for superscript
    textPaths.append('path')
        .attr('id', 'category-label--path--result--sup--' + category.class)
        .attr('class', 'category-label--path')
        .attr('d', d => {
          return arc({
            startAngle: degreeToRadian(90),
            endAngle: degreeToRadian(270),
            innerRadius: clusters[category.cluster].r - 8,
            outerRadius: clusters[category.cluster].r - 8
          });
        });
      
    // Path for subscript
    textPaths.append('path')
        .attr('id', 'category-label--path--result--sub--' + category.class)
        .attr('class', 'category-label--path')
        .attr('d', d => {
          return arc({
            startAngle: degreeToRadian(90),
            endAngle: degreeToRadian(270),
            innerRadius: clusters[category.cluster].r - 13,
            outerRadius: clusters[category.cluster].r - 13
          });
        });
    
    // Append category titles
    textPaths.append('text')
      .attr('class', 'category-label')
      .style('text-anchor', 'middle')
      .append('textPath')
        .attr('xlink:href', '#category-label--path--' + category.class)
        .attr('startOffset', (d) => {
          switch (category.cluster) {
            case 0:
            case 1:
              return '18%';
            case 2:
              return '25%';
            case 3:
            case 4:
              return '32%';
          }
        })
        .text(category.title)
        .on('mouseover', d => {
          d3.event.stopPropagation();
          activeStyleCategory(category.class, true);
        })
        .on('click', d => {
          d3.event.stopPropagation();
          handleCategoryClick(category.class, category.fact, category.source);
        })
        .on('mouseout', d => activeStyleCategory(category.class, false));

    // Append total foodprint in each category
    let printResult = textPaths.append('g')
      .attr('class', 'axis-circles-text-container hidden')
      .on('mouseover', d => {
        d3.event.stopPropagation();
        activeStyleCategory(category.class, true);
      })
      .on('click', d => {
        d3.event.stopPropagation();
        handleCategoryClick(category.class, category.fact, category.source);
      })
      .on('mouseout', d => activeStyleCategory(category.class, false));
    printResult.append('text')
        .attr('class', 'foodprint-result')
        .style('text-anchor', 'end')
      .append('textPath')
        .attr('id', 'foodprint-result--number--' + category.class)
        .attr('class', 'foodprint-result--number')
        .attr('xlink:href', '#category-label--path--result--' + category.class)
        .attr('startOffset', '76%')
        .text(0);
    let resultDimension1 = printResult.append('text')
        .attr('class', 'foodprint-result--dimension')
        .style('text-anchor', 'start')
      .append('textPath')
        .attr('xlink:href', '#category-label--path--result--' + category.class)
        .attr('startOffset', '76.5%');
    let resultDimension2 = printResult.append('text')
      .attr('class', 'foodprint-result--dimension')
      .style('text-anchor', 'start');
    
    switch (category.class) {
      case 'land':
        resultDimension1.text(' m');
        resultDimension2.classed('superscript', true)
          .append('textPath')
            .attr('xlink:href', '#category-label--path--result--sup--' + category.class)
            .attr('startOffset', '578px')
            .attr('baseline-shift', 'super')
            .text('2');
        break;
      case 'gas':
        resultDimension1.text(' kgCO');
        resultDimension2.classed('subscript', true)
          .append('textPath')
            .attr('xlink:href', '#category-label--path--result--sub--' + category.class)
            .attr('startOffset', '454px')
            .attr('baseline-shift', 'sub')
            .text('2eq');
        break;
      case 'water':
        resultDimension1.text('L');
        break;
      case 'eutro':
        resultDimension1.text(' kgPO');
        resultDimension2.classed('subscript', true)
          .append('textPath')
            .attr('xlink:href', '#category-label--path--result--sub--' + category.class)
            .attr('startOffset', '574px')
            .attr('baseline-shift', 'sub')
            .text('4eq');
        break;
      case 'cost':
        resultDimension1.text('$');
        break;
    }
  });
}

let node = svg.append('g')
  .selectAll('circle')
  .attr('r', 0);

let simulation = d3.forceSimulation();
if (windowWidth <= 576) {
  simulation
    // Attract clusters toward the horizontal center
    .force('x', d3.forceX().x(width/2)
      .strength(1))
    // Attract clusters toward a specific y position
    .force('y', d3.forceY().y(width/2 + 30)
      .strength(1));
} else {
  simulation
    // Attract clusters toward specific x positions
    .force('x', d3.forceX().x(d => clusters[d.cluster].x)
      .strength(3))
    // Cluster nodes by section
    .force('cluster', d3.forceCluster()
      .centers(d => clusters[d.cluster])
      .strength(1))
    // Attract clusters toward a specific y position
    .force('y', d3.forceY().y(d => clusters[d.cluster].y)
      .strength(3));
}

simulation
  // Apply collision with padding
  .force('collide', d3.forceCollide(d => (d.radius + paddingCircles) ))
  .on('tick', layoutTick);

const counters = document.querySelectorAll('.foodprint-result--number');
const indexCounter = document.getElementById('foodprint-result--number--index');
let currentFoodprintIndex = 0;
function updateSimulation() {
  // Apply the general update pattern to the nodes
  node = node.data(nodes);
  node.exit().remove();
  node = node.enter().append('circle')
    .style('fill', d => colors[d.cluster])
    .merge(node)
    .on('mouseover', d => {
      if (windowWidth > 768) {
        handleShowNodeTooltip(d, true);
      }
    })
    .on('mouseout', d => {
      if (windowWidth > 768) {
        handleHideNodeTooltip(d);
      }
    })
    .on('click', d => {
      if (windowWidth <= 768) {
        // Remove blue stroke
        d3.selectAll('.node')
          .classed('active', false);

        handleShowNodeTooltip(d, false);
      }
    });

  function handleShowNodeTooltip(d, closeSwap) {
    d3.event.stopPropagation();
    // Close swap impact if open
    if (closeSwap) {
      closeSwapImpact();
    }

    // Hide swap instruction if visible
    if (document.querySelector('.tip.visible') !== null) {
      hideSwapInstruction();
    }

    // Add a blue stroke to the circles related to the hovered ingredient
    d3.selectAll('.node-' + d.meal + '-' + d.id)
      .classed('active', true);

    // Show the tooltip
    showTooltip(d);
  }

  function handleHideNodeTooltip(d) {
    // Remove blue stroke
    d3.selectAll('.node-' + d.meal + '-' + d.id)
    .classed('active', false);

    // Hide the tooltip
    hideTooltip();

    // Reopen swap impact if closed
    if (document.querySelector('#tooltip-swap-impact.visible') === null) {
    d3.select('#tooltip-swap-impact')
      .classed('visible', true);
    }
  }

  // Update and restart the simulation
  simulation.nodes(nodes);
  simulation.alpha(0.02)
    .restart(); // Re-heat the simulation

  // Calculate the areas for the axis circles
  let areas = [0, 0, 0, 0, 0];
  let foodprint = [0, 0, 0, 0, 0];
  nodes.forEach(node => {
    areas[node.cluster] += Math.PI * Math.pow(node.radius, 2);
    foodprint[node.cluster] += Math.PI * Math.pow(node.radius, 2) / categories[node.cluster].factor;
  });

  updateFoodprint(foodprint);

  if (!isSwap) {
    // Update foodprint for each meal
    let newFoodprint = [0, 0, 0, 0, 0];
    const menuIngredients = menusDetail[updatedMeal].find(meal => meal.key === currentMenu).ingredients.filter(ingredient => ingredient.active);
    menuIngredients.forEach(ingredient => {
      const ingredientFoodprint = getFoodprint(ingredient.id);
      newFoodprint.forEach((factor, i) => {
        newFoodprint[i] += +(ingredientFoodprint[categories[i].label] * ingredientFoodprint.portion_kg);
      });
    });

    switch (updatedMeal) {
      case 'breakfast':
        foodprintBreakfast = newFoodprint;
        break;
      case 'lunch':
        foodprintLunch = newFoodprint;
        break;
      case 'snack':
        foodprintSnack = newFoodprint;
        break;
      case 'dinner':
        foodprintDinner = newFoodprint;
        break;
    }
  }

  // Update foodprint index circle and text
  const foodprintAreaFactor = windowWidth > 576 ? 100 : windowWidth * 70 / 375;
  let foodprintIndex = parseFloat(getFoodprintIndex());
  let radiusIndex = Math.sqrt(foodprintIndex / Math.PI);
  d3.select('.index-circle')
    .attr('r', radiusIndex * foodprintAreaFactor * 0.4);
  animateNumber('foodprint-result--number--index', +indexCounter.innerHTML, foodprintIndex);

  // If swap, show swap impact tooltip
  if (isSwap && currentSwap.key !== 'reset') {
    calculateSwapImpact();
  } else if (isSwap && currentSwap.key === 'reset') {
    hideSwapImpact();
  }

  if (windowWidth > 576) {
    // Update radius of the axis circles
    d3.selectAll('.axis-circle')
      .attr('r', (d, i) => {
        return Math.sqrt(areas[i] / Math.PI);
      });

    // Update foodprint counters
    counters.forEach((counter, i) => {
      animateNumber(counter.id, +counter.innerHTML, +foodprint[i].toFixed(2));
    });
  }

  currentFoodprintIndex = foodprintIndex;
}

function layoutTick() {
  node
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.radius)
    .attr('class', d => {
      const actionClass = d.appear ? ' appear' : '';
      return 'node node-' + d.meal + '-' + d.id + actionClass; 
    });
}

// Get list of ingredients of a selected meal
function getIngredients(meal, selection) {
  return menusDetail[meal].find(meal => meal.key === selection).ingredients;
}

// Add active styles to a category circle
function activeStyleCategory(categoryClass, state) {
  d3.select('.axis-circles--' + categoryClass)
    .classed('active', state);
}

// Handle click on a category circle
function handleCategoryClick(categoryClass, categoryFact, categorySource) {
  // Maintain active style
  d3.select('.axis-circles--' + categoryClass)
    .classed('active-tooltip', true);
  // Show the tooltip
  showCategoryTooltip(categoryClass, categoryFact, categorySource);
}

// Helper function - convert degrees to radians
function degreeToRadian(angle) {
  return angle * Math.PI / 180;
}
