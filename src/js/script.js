const windowWidth = window.innerWidth;
const container = 1200;
const padding = 30;
const paddingLeft = windowWidth > container ? (windowWidth - container + padding * 2)/2 : padding;
const width = windowWidth > container ? container - padding * 2 : windowWidth - padding * 2;
const maxHeight = (window.innerHeight - 326) / 2;
const height = maxHeight > 250 ? 250 : maxHeight;
const paddingCircles = 1.5; // Separation between same-color nodes
const maxRadius = 15;
const radiusClustersCenters = 150; // Radius of the clusters centers

const colors = ['#597322', '#BFA72C', '#CEDEF2', '#D97E8E', '#A68549'];
const meals = ['breakfast', 'lunch', 'snack', 'dinner'];
const m = categories.length; // number of distinct clusters

const color = d3.scaleSequential(d3.interpolateRainbow)
  .domain(d3.range(m));

let currentBreakfast = '';
let currentLunch = '';
let currentSnack = '';
let currentDinner = '';

// Generate clusters and initialize nodes arrays
let clusters = d3.range(m).map((category, i) => {
  const d = {
    cluster: i,
    radius: maxRadius,
    x: (i+1) * (width/6) + paddingLeft,
    y: height
  };
  return d;
});
let nodes = [];
let newNodes = [];

// Import data
let dataFoodprint = [];
let menusDetail = {};
let promises = [];
promises.push(d3.csv('/data/data_foodprint.csv'));
promises.push(d3.json('/data/menus.json'));
Promise.all(promises).then(data => {
  dataFoodprint = data[0];
  menusDetail = data[1];

  // Now that the data is imported, allow user to interact with them
  // showActions();
  appendSelectors();
});

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
}

function swapIngredient(meal, swapId) {
  let swap = {};
  menusDetail[meal].forEach(menu => {
    let obj = menu.swaps.find(obj => obj.key == swapId);
    if (obj !== undefined) {
      swap = obj;
    }
  });
  swapNodes(meal, swap);
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

  console.log(nodes);

  // Display the simulation with updated nodes
  updateSimulation();
}

function swapNodes(meal, swap) {
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
          node.appear = true;
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

  console.log(nodes);
  updateSimulation();
}

let svg = d3.select('#foodprint')
  .append('svg')
    .attr('class', 'foodprint-container')
    .attr('height', height * 2);

let horizontalAxis = svg.append('line')
  .attr('x1', paddingLeft)
  .attr('y1', height)
  .attr('x2', paddingLeft + width)
  .attr('y2', height)
  .attr('class', 'axis');

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
  .attr('r', height - 25);
circlesIndex.append('path')
  .attr('id', 'index-circle--path')
  .attr('d', d => {
    return arc({
      startAngle: degreeToRadian(-90),
      endAngle: degreeToRadian(90),
      innerRadius: height - 15,
      outerRadius: height - 15
    });
  })
  // .style('stroke', 'black')
  .style('transform', 'translate(' + (width/2 + paddingLeft) + 'px, ' + height + 'px)');
circlesIndex.append('path')
  .attr('id', 'index-circle--path--result')
  .attr('d', d => {
    return arc({
      startAngle: degreeToRadian(90),
      endAngle: degreeToRadian(270),
      innerRadius: height - 5,
      outerRadius: height - 5
    });
  })
  // .style('stroke', 'black')
  .style('transform', 'translate(' + (width/2 + paddingLeft) + 'px, ' + height + 'px)');
circlesIndex.append('text')
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
    // Keep the hover styles
    // d3.select('.axis-circles--' + category.class)
    //   .classed('active-tooltip', true);
    // Show the tooltip
    // showCategoryTooltip(category.class, category.fact, category.source);
  })
  .on('mouseout', d => {
    d3.event.stopPropagation();
    d3.selectAll('.foodprint-index--label')
      .classed('active', false);
    d3.select('.index-circle--external')
      .classed('active', false);
  });
circlesIndex.append('text')
  .attr('class', 'foodprint-index--label foodprint-index--label--result')
  .style('text-anchor', 'middle')
  .append('textPath')
    .attr('xlink:href', '#index-circle--path--result')
    .attr('startOffset', '75%')
    .text(0);

if (windowWidth > 768) {
  svg.append('g')
    .attr('class', 'axis-circles--container')
    .selectAll('.axis-circles')
    .data(categories)
    .enter()
    .append('g')
      .attr('class', d => { return 'axis-circles axis-circles--' + d.class; });

  categories.forEach(category => {
    let xTranslation = (category.cluster + 1) * (width/6) + paddingLeft;
    let axisRadius;
    switch (category.cluster) {
      case 0:
        axisRadius = height - 115;
        break;
      case 1:
        axisRadius = height - 150;
        break;
      case 2:
        axisRadius = height - 70;
        break;
      case 3:
        axisRadius = height - 120;
        break;
      case 4:
        axisRadius = height - 150;
        break;
    }

    // Append circles shwing foodprint in each category
    d3.select('.axis-circles--' + category.class)
      .append('circle')
        .attr('class', 'axis axis-circle axis-circle--' + category.class)
        .attr('cx', xTranslation)
        .attr('cy', height)
        .attr('r', 0);

    // Append delimiter circles for each category
    d3.select('.axis-circles--' + category.class)
      .append('circle')
        .attr('class', 'axis axis-circle--delimiter axis-circle--delimiter--' + category.class)
        .attr('cx', xTranslation)
        .attr('cy', height)
        .attr('r', axisRadius)
        .attr('stroke-dasharray', '6 8');

    // Append path for category titles
    d3.select('.axis-circles--' + category.class)
      .append('path')
        .attr('id', 'category-label--path--' + category.class)
        .attr('class', 'category-label--path')
        .attr('d', d => {
          return arc({
            startAngle: degreeToRadian(-90),
            endAngle: degreeToRadian(90),
            innerRadius: axisRadius + 10,
            outerRadius: axisRadius + 10
          });
        })
        // .style('stroke', 'black')
        .style('transform', 'translate(' + xTranslation + 'px, ' + height + 'px)');

    // Append path for total foodprint in each category
    d3.select('.axis-circles--' + category.class)
      .append('path')
        .attr('id', 'category-label--path--result--' + category.class)
        .attr('class', 'category-label--path')
        .attr('d', d => {
          return arc({
            startAngle: degreeToRadian(90),
            endAngle: degreeToRadian(270),
            innerRadius: axisRadius - 10,
            outerRadius: axisRadius - 10
          });
        })
        // .style('stroke', 'black')
        .style('transform', 'translate(' + xTranslation + 'px, ' + height + 'px)');

    // Append category titles
    d3.select('.axis-circles--' + category.class)
        .append('text')
          .style('text-anchor', 'middle')
          .append('textPath')
            .attr('xlink:href', '#category-label--path--' + category.class)
            .attr('startOffset', '25%')
            .text(category.title)
            .on('mouseover', d => {
              d3.event.stopPropagation();
              d3.select('.axis-circles--' + category.class)
                .classed('active', true);
            })
            .on('click', d => {
              d3.event.stopPropagation();
              // Keep the hover styles
              d3.select('.axis-circles--' + category.class)
                .classed('active-tooltip', true);
              // Show the tooltip
              showCategoryTooltip(category.class, category.fact, category.source);
            })
            .on('mouseout', d => {
              d3.event.stopPropagation();
              d3.select('.axis-circles--' + category.class)
                .classed('active', false);
            });

    // Append total foodprint in each category
    d3.select('.axis-circles--' + category.class)
    .append('text')
      .attr('class', 'foodprint-result')
      .style('text-anchor', 'middle')
      .append('textPath')
        .attr('xlink:href', '#category-label--path--result--' + category.class)
        .attr('startOffset', '75%')
        .text(0);
  });
}

let node = svg.append('g')
  .selectAll('circle')
  .attr('r', 0);

let simulation = d3.forceSimulation();
if (windowWidth <= 768) {
  simulation
    // Attract clusters toward the horizontal center
    .force('x', d3.forceX().x(width/2 + paddingLeft)
    .strength(0.8));
} else {
  simulation
    // Attract clusters toward specific x positions
    .force('x', d3.forceX().x(d => (d.cluster+1) * (width/6) + paddingLeft)
      .strength(0.8))
    // Cluster nodes by section
    .force('cluster', d3.forceCluster()
      .centers(d => clusters[d.cluster])
      .strength(0.5));
}

simulation
  // Attract clusters toward a specific y position
  .force('y', d3.forceY().y(height)
    .strength(0.8))
  // Apply collision with padding
  .force('collide', d3.forceCollide(d => (d.radius + paddingCircles) ))
  .on('tick', layoutTick);

function updateSimulation() {
  // Apply the general update pattern to the nodes
  node = node.data(nodes);
  node.exit().remove();
  node = node.enter().append('circle')
    .style('fill', d => colors[d.cluster])
    .merge(node)
    .on('mouseover', d => {
      d3.event.stopPropagation();
      // Add a blue stroke to the circles related to the hovered ingredient
      d3.selectAll('.node-' + d.meal + '-' + d.id)
        .classed('active', true);

      // Show the tooltip
      showTooltip(d);
    })
    .on('mouseout', d => {
      // Remove blue stroke
      d3.selectAll('.node-' + d.meal + '-' + d.id)
        .classed('active', false);

      // Hide the tooltip
      hideTooltip();
    });

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

  // Update foodprint index circle and text
  const foodprintAreaFactor = 100;
  let foodprintIndex = parseFloat(getFoodprintIndex());
  let radiusIndex = Math.sqrt(foodprintIndex / Math.PI);
  d3.select('.index-circle')
    .attr('r', radiusIndex * foodprintAreaFactor * 0.9);
  d3.select('.foodprint-index--label--result textPath')
    .text(foodprintIndex);

  if (windowWidth > 768) {
    // Update radius of the axis circles
    d3.selectAll('.axis-circle')
      .attr('r', (d, i) => {
        return Math.sqrt(areas[i] / Math.PI);
      });
    d3.selectAll('.foodprint-result textPath')
      .text((d, i) => {
        return foodprint[i].toFixed(2);
      });
  }
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

// Get detailed foodprint of an ingredient
function getFoodprint(ingredient) {
  return dataFoodprint.find(item => item.id === ingredient);
}

// Helper function - convert degress to radians
function degreeToRadian(angle) {
  return angle * Math.PI / 180;
}
