const width = 960;
const height = 500;
const padding = 1.5; // Separation between same-color nodes
const maxRadius = 15;
const radiusClustersCenters = 150; // Radius of the clusters centers

const n = 200; // total number of nodes

const colors = ['#8B572A', '#417505', '#4A90E2', '#D0021B', '#F5A623'];
const categories = [
    { cluster: 0, label: 'land_use_m2_per_kg', factor: 100 },
    { cluster: 1, label: 'gas_emissions_kgCO2eq_per_kg', factor: 100 },
    { cluster: 2, label: 'water_liters_per_kg', factor: 100 },
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
    y: 250
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
  showActions();
});

function showActions() {
  let buttons = document.getElementsByClassName('hide');
  while (buttons.length > 0) {
    buttons[0].classList.remove("hide");
  }
}

function addBreakfast() {
  let meal = "breakfast";
  let selection = "eggs_and_bacon";
  generateNodes(meal, selection);
}

function addLunch() {
  let meal = "lunch";
  let selection = "chicken_salad";
  generateNodes(meal, selection);
}

function generateNodes(meal, selection) {
  const mealDetail = menusDetail[meal].find(meal => meal.name === selection);
  const ingredients = mealDetail.ingredients;

  // Generate nodes for each ingredient
  ingredients.forEach(ingredient => {
    // Find ingredient foodprint in data
    const ingredientFoodprint = dataFoodprint.find(item => item.id === ingredient.id);
    
    // Create a node for each category
    categories.forEach((category, i) => {
      const radius = Math.sqrt((parseFloat(ingredientFoodprint[category.label]) * parseFloat(ingredientFoodprint.portion_kg) * category.factor) / Math.PI);
      const d = {
        label: ingredient.id,
        cluster: category.cluster,
        radius: radius,
        x: category.cluster * 250 + Math.random(),
        y: 250 + Math.random()
      }
      nodes.push(d);
    });
  });

  // Display the simulation with updated nodes
  updateSimulation();
}

let svg = d3.select('#foodprint')
  .append('svg')
    .attr('width', width)
    .attr('height', height);

let node = svg.append('g')
  .selectAll('circle');

let simulation = d3.forceSimulation()
  // Keep entire simulation balenced around screen center
  .force('center', d3.forceCenter(width/2, height/2))
  // Attract clusters toward specific positions
  .force('x', d3.forceX().x(d => d.cluster * 200))
  .force('y', d3.forceY().y(250))
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
    .style('fill', d => colors[d.cluster])
    .merge(node);

  // Update and restart the simulation
  simulation.nodes(nodes);
  simulation.alpha(0.2)
    .restart(); // Re-heat the simulation
}

function layoutTick() {
  node
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.radius);
}
