const categories = [
  {
    cluster: 0,
    class: 'land',
    label: 'land_use_m2_per_kg',
    unit: 'm2',
    title: 'Land use',
    fact: '"Half of the world\'s habitable land is used for agriculture."',
    source: '1',
    factor: 100
  },
  {
    cluster: 1,
    class: 'gas',
    label: 'gas_emissions_kgCO2eq_per_kg',
    unit: 'kgCO2eq',
    title: 'Greenhouse gas emissions',
    fact: '"Food production is responsible for one-quarter of the world\’s greenhouse gas emissions."',
    source: '1',
    factor: 100
  },
  {
    cluster: 2,
    class: 'water',
    label: 'water_liters_per_kg',
    unit: 'L',
    title: 'Water use',
    fact: '"Agriculture is by far the largest consumer of the Earth\’s available freshwater: 70% of “blue water” withdrawals from watercourses and groundwater are for agricultural usage, three times more than 50 years ago."',
    source: '2',
    factor: 20
  },
  {
    cluster: 3,
    class: 'eutro',
    label: 'eutrophying_emissions_kgPO4eq_per_kg',
    unit: 'kgPO4eq',
    title: 'Eutrophication',
    fact: '"Eutrophication is the pollution of water bodies and ecosystems with excess nutrients. It is a major environmental problem from which the runoff of nitrogen and other nutrients from agricultural production systems is a leading contributor."',
    source: '1',
    factor: 100
  },
  {
    cluster: 4,
    class: 'cost',
    label: 'cost_usd_per_kg',
    unit: 'USD',
    title: 'Average cost',
    fact: 'Meat production is expensive. Adding more vegetables, grains and legumes to our diet is an easy way to lower your food cost!',
    source: '',
    factor: 100 },
];

const indexDefinition1 = 'The Foodprint index was created for the purpose of this visualization, to give a better overview of how the food selections impact the overall foodprint.';
const indexDefinition2 = 'The index is calculated by making the sum of the ratios between the of impact a category and the maximum impact possible in that category (in the context of this simulation). The result is spread on a scale between 0 and 100.';
