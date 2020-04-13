const windowWidth = window.innerWidth;
const width = window.innerWidth > 1630 ? 1600 : window.innerWidth - 30;
const height = window.innerHeight - 500;
const padding = 1.5; // Separation between same-color nodes
const maxRadius = 15;
const radiusClustersCenters = 150; // Radius of the clusters centers

const n = 200; // total number of nodes

const colors = ['#8B572A', '#417505', '#4A90E2', '#D0021B', '#F5A623'];
const meals = ['breakfast', 'lunch', 'snack', 'dinner'];
const categories = [
    { cluster: 0, label: 'land_use_m2_per_kg', factor: 100 },
    { cluster: 1, label: 'gas_emissions_kgCO2eq_per_kg', factor: 100 },
    { cluster: 2, label: 'water_liters_per_kg', factor: 50 },
    { cluster: 3, label: 'eutrophying_emissions_kgPO4eq_per_kg', factor: 100 },
    { cluster: 4, label: 'cost_usd_per_kg', factor: 100 },
  ];
const m = categories.length; // number of distinct clusters

const color = d3.scaleSequential(d3.interpolateRainbow)
  .domain(d3.range(m));

// Generate clusters and initialize nodes arrays
let clusters = d3.range(m).map((category, i) => {
  const d = {
    cluster: i,
    radius: maxRadius,
    x: i * 200,
    y: height/2
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

  updateNodes(meal, swap.removedIngredients, swap.addedIngredients);
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
          radius: radius,
          // x: width/2,
          x: category.cluster * 200 + Math.random(),
          y: height/2 + Math.random()
        };
        nodes.push(d);
      });
    });
  }

  // Display the simulation with updated nodes
  updateSimulation();
}

let svg = d3.select('#foodprint')
  .append('svg')
    .attr('class', 'foodprint-container')
    .attr('width', '100vw')
    .attr('height', '100vh');

let node = svg.append('g')
  .selectAll('circle');

let simulation = d3.forceSimulation()
  // Keep entire simulation balenced around screen center
  .force('center', d3.forceCenter(width/2, height/2))
  // Attract clusters toward specific positions
  .force('x', d3.forceX().x(d => d.cluster * 200)
    .strength(0.8))
  .force('y', d3.forceY().y(height/2)
    .strength(0.8))
  // Cluster nodes by section
  .force('cluster', d3.forceCluster()
    .centers(d => clusters[d.cluster])
    .strength(0.5))
  // Apply collision with padding
  .force('collide', d3.forceCollide(d => (d.radius + padding) ))
  .on('tick', layoutTick);

function updateSimulation() {
  // Apply the general update pattern to the nodes
  node = node.data(nodes);
  node.exit().remove();
  node = node.enter().append('circle')
    .attr('class', d => { return 'node node-' + d.meal + '-' + d.id; })
    .style('fill', d => colors[d.cluster])
    .merge(node)
    .on('mouseover', d => {
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
  simulation.alpha(0.2)
    .restart(); // Re-heat the simulation
}

function layoutTick() {
  node
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.radius)
    .attr('class', d => { return 'node node-' + d.meal + '-' + d.id; });
}

// Get list of ingredients of a selected meal
function getIngredients(meal, selection) {
  return menusDetail[meal].find(meal => meal.key === selection).ingredients;
}

// Get detailed foodprint of an ingredient
function getFoodprint(ingredient) {
  return dataFoodprint.find(item => item.id === ingredient);
}
