const dataFoodprint = [
  {
    "id": "apples",
    "land_use_m2_per_kg": "0.63",
    "gas_emissions_kgCO2eq_per_kg": "0.46583333316",
    "water_liters_per_kg": "180.1",
    "eutrophying_emissions_kgPO4eq_per_kg": "1.45",
    "cost_usd_per_kg": "2.85",
    "portion_kg": "0.15"
  },
  {
    "id": "bananas",
    "land_use_m2_per_kg": "1.93",
    "gas_emissions_kgCO2eq_per_kg": "1.27566666637",
    "water_liters_per_kg": "114.5",
    "eutrophying_emissions_kgPO4eq_per_kg": "3.29",
    "cost_usd_per_kg": "1.26",
    "portion_kg": "0.15"
  },
  {
    "id": "barley",
    "land_use_m2_per_kg": "1.11",
    "gas_emissions_kgCO2eq_per_kg": "0.83544",
    "water_liters_per_kg": "17.1",
    "eutrophying_emissions_kgPO4eq_per_kg": "2.33",
    "cost_usd_per_kg": "13.19",
    "portion_kg": "0.12"
  },
  {
    "id": "beef_beef_herd",
    "land_use_m2_per_kg": "326.21",
    "gas_emissions_kgCO2eq_per_kg": "91.0989011",
    "water_liters_per_kg": "1451.2",
    "eutrophying_emissions_kgPO4eq_per_kg": "301.41",
    "cost_usd_per_kg": "11.98",
    "portion_kg": "0.1"
  },
  {
    "id": "beef_dairy_herd",
    "land_use_m2_per_kg": "43.24",
    "gas_emissions_kgCO2eq_per_kg": "30.4945055",
    "water_liters_per_kg": "2714.3",
    "eutrophying_emissions_kgPO4eq_per_kg": "365.29",
    "cost_usd_per_kg": "9.30",
    "portion_kg": "0.1"
  },
  {
    "id": "berries_and_grapes",
    "land_use_m2_per_kg": "2.41",
    "gas_emissions_kgCO2eq_per_kg": "1.52999999982",
    "water_liters_per_kg": "419.6",
    "eutrophying_emissions_kgPO4eq_per_kg": "6.12",
    "cost_usd_per_kg": "5.42",
    "portion_kg": "0.15"
  },
  {
    "id": "butter",
    "land_use_m2_per_kg": "17",
    "gas_emissions_kgCO2eq_per_kg": "9.39987",
    "water_liters_per_kg": "5550",
    "eutrophying_emissions_kgPO4eq_per_kg": "0.0493333333333333",
    "cost_usd_per_kg": "7.92",
    "portion_kg": "0.01"
  },
  {
    "id": "cruciferous_vegetables_and_cabbages",
    "land_use_m2_per_kg": "0.55",
    "gas_emissions_kgCO2eq_per_kg": "1.05",
    "water_liters_per_kg": "119.4",
    "eutrophying_emissions_kgPO4eq_per_kg": "5.01",
    "cost_usd_per_kg": "4.39",
    "portion_kg": "0.075"
  },
  {
    "id": "cheese",
    "land_use_m2_per_kg": "87.79",
    "gas_emissions_kgCO2eq_per_kg": "24.18852713312",
    "water_liters_per_kg": "5605.2",
    "eutrophying_emissions_kgPO4eq_per_kg": "98.37",
    "cost_usd_per_kg": "11.68",
    "portion_kg": "0.04"
  },
  {
    "id": "citrus_fruit",
    "land_use_m2_per_kg": "0.86",
    "gas_emissions_kgCO2eq_per_kg": "0.4558125",
    "water_liters_per_kg": "82.7",
    "eutrophying_emissions_kgPO4eq_per_kg": "2.24",
    "cost_usd_per_kg": "3.01",
    "portion_kg": "0.15"
  },
  {
    "id": "coffee",
    "land_use_m2_per_kg": "21.62",
    "gas_emissions_kgCO2eq_per_kg": "0",
    "water_liters_per_kg": "25.9",
    "eutrophying_emissions_kgPO4eq_per_kg": "110.52",
    "cost_usd_per_kg": "9.80",
    "portion_kg": "0"
  },
  {
    "id": "chocolate_dark",
    "land_use_m2_per_kg": "68.96",
    "gas_emissions_kgCO2eq_per_kg": "54.50019342528",
    "water_liters_per_kg": "540.6",
    "eutrophying_emissions_kgPO4eq_per_kg": "87.08",
    "cost_usd_per_kg": "40.00",
    "portion_kg": "0.06"
  },
  {
    "id": "eggs",
    "land_use_m2_per_kg": "6.27",
    "gas_emissions_kgCO2eq_per_kg": "4.63756944508",
    "water_liters_per_kg": "577.7",
    "eutrophying_emissions_kgPO4eq_per_kg": "21.76",
    "cost_usd_per_kg": "1.94",
    "portion_kg": "0.12"
  },
  {
    "id": "fish_farmed",
    "land_use_m2_per_kg": "8.41",
    "gas_emissions_kgCO2eq_per_kg": "15.0767597772",
    "water_liters_per_kg": "3691.3",
    "eutrophying_emissions_kgPO4eq_per_kg": "235.12",
    "cost_usd_per_kg": "12.50",
    "portion_kg": "0.1"
  },
  {
    "id": "lamb_and_mutton",
    "land_use_m2_per_kg": "369.81",
    "gas_emissions_kgCO2eq_per_kg": "36.838107243",
    "water_liters_per_kg": "1802.8",
    "eutrophying_emissions_kgPO4eq_per_kg": "97.13",
    "cost_usd_per_kg": "13.67",
    "portion_kg": "0.1"
  },
  {
    "id": "corn",
    "land_use_m2_per_kg": "2.94",
    "gas_emissions_kgCO2eq_per_kg": "1.3720287439",
    "water_liters_per_kg": "215.7",
    "eutrophying_emissions_kgPO4eq_per_kg": "4.03",
    "cost_usd_per_kg": "6.40",
    "portion_kg": "0.09"
  },
  {
    "id": "groundnuts",
    "land_use_m2_per_kg": "9.11",
    "gas_emissions_kgCO2eq_per_kg": "19.6584482856",
    "water_liters_per_kg": "1852.3",
    "eutrophying_emissions_kgPO4eq_per_kg": "14.14",
    "cost_usd_per_kg": "4.33",
    "portion_kg": "0.0304"
  },
  {
    "id": "margarine",
    "land_use_m2_per_kg": "2.04",
    "gas_emissions_kgCO2eq_per_kg": "0.96",
    "water_liters_per_kg": "3144",
    "eutrophying_emissions_kgPO4eq_per_kg": "0.0146",
    "cost_usd_per_kg": "3.60",
    "portion_kg": "0.01"
  },
  {
    "id": "milk",
    "land_use_m2_per_kg": "8.95",
    "gas_emissions_kgCO2eq_per_kg": "2.205",
    "water_liters_per_kg": "628.2",
    "eutrophying_emissions_kgPO4eq_per_kg": "10.65",
    "cost_usd_per_kg": "0.78",
    "portion_kg": "0.25"
  },
  {
    "id": "nuts",
    "land_use_m2_per_kg": "12.96",
    "gas_emissions_kgCO2eq_per_kg": "0.419512194",
    "water_liters_per_kg": "4133.8",
    "eutrophying_emissions_kgPO4eq_per_kg": "19.15",
    "cost_usd_per_kg": "19.22",
    "portion_kg": "0.028"
  },
  {
    "id": "oatmeal",
    "land_use_m2_per_kg": "7.6",
    "gas_emissions_kgCO2eq_per_kg": "0.64292794496",
    "water_liters_per_kg": "482.4",
    "eutrophying_emissions_kgPO4eq_per_kg": "11.23",
    "cost_usd_per_kg": "5.47",
    "portion_kg": "0.05"
  },
  {
    "id": "oil_olive",
    "land_use_m2_per_kg": "26.31",
    "gas_emissions_kgCO2eq_per_kg": "5.42000000048",
    "water_liters_per_kg": "2141.8",
    "eutrophying_emissions_kgPO4eq_per_kg": "37.26",
    "cost_usd_per_kg": "10.93",
    "portion_kg": "0.01"
  },
  {
    "id": "onions_and_leeks",
    "land_use_m2_per_kg": "0.39",
    "gas_emissions_kgCO2eq_per_kg": "0.5405405404",
    "water_liters_per_kg": "14.3",
    "eutrophying_emissions_kgPO4eq_per_kg": "3.24",
    "cost_usd_per_kg": "1.42",
    "portion_kg": "0.075"
  },
  {
    "id": "fruits_other",
    "land_use_m2_per_kg": "0.89",
    "gas_emissions_kgCO2eq_per_kg": "0",
    "water_liters_per_kg": "153.5",
    "eutrophying_emissions_kgPO4eq_per_kg": "2.43",
    "cost_usd_per_kg": "4.14",
    "portion_kg": "0.15"
  },
  {
    "id": "legumes_other",
    "land_use_m2_per_kg": "15.57",
    "gas_emissions_kgCO2eq_per_kg": "1.21520527809",
    "water_liters_per_kg": "435.7",
    "eutrophying_emissions_kgPO4eq_per_kg": "17.08",
    "cost_usd_per_kg": "7.49",
    "portion_kg": "0.15"
  },
  {
    "id": "vegetables_other",
    "land_use_m2_per_kg": "0.38",
    "gas_emissions_kgCO2eq_per_kg": "0",
    "water_liters_per_kg": "102.5",
    "eutrophying_emissions_kgPO4eq_per_kg": "2.27",
    "cost_usd_per_kg": "3.01",
    "portion_kg": "0.075"
  },
  {
    "id": "oil_palm",
    "land_use_m2_per_kg": "2.42",
    "gas_emissions_kgCO2eq_per_kg": "7.32000000316",
    "water_liters_per_kg": "6.4",
    "eutrophying_emissions_kgPO4eq_per_kg": "10.67",
    "cost_usd_per_kg": "2.00",
    "portion_kg": "0.01"
  },
  {
    "id": "peas",
    "land_use_m2_per_kg": "7.46",
    "gas_emissions_kgCO2eq_per_kg": "0.22942196514",
    "water_liters_per_kg": "396.6",
    "eutrophying_emissions_kgPO4eq_per_kg": "7.52",
    "cost_usd_per_kg": "10.38",
    "portion_kg": "0.15"
  },
  {
    "id": "pig_meat",
    "land_use_m2_per_kg": "17.36",
    "gas_emissions_kgCO2eq_per_kg": "12.4645188283",
    "water_liters_per_kg": "1795.8",
    "eutrophying_emissions_kgPO4eq_per_kg": "76.38",
    "cost_usd_per_kg": "5.87",
    "portion_kg": "0.1"
  },
  {
    "id": "potatoes",
    "land_use_m2_per_kg": "0.88",
    "gas_emissions_kgCO2eq_per_kg": "1.41393442725",
    "water_liters_per_kg": "59.1",
    "eutrophying_emissions_kgPO4eq_per_kg": "3.48",
    "cost_usd_per_kg": "1.69",
    "portion_kg": "0.114"
  },
  {
    "id": "poultry_meat",
    "land_use_m2_per_kg": "12.22",
    "gas_emissions_kgCO2eq_per_kg": "14.5115675672",
    "water_liters_per_kg": "660",
    "eutrophying_emissions_kgPO4eq_per_kg": "48.7",
    "cost_usd_per_kg": "10.92",
    "portion_kg": "0.1"
  },
  {
    "id": "prawns_farmed",
    "land_use_m2_per_kg": "2.97",
    "gas_emissions_kgCO2eq_per_kg": "30.000485436",
    "water_liters_per_kg": "3515.4",
    "eutrophying_emissions_kgPO4eq_per_kg": "227.22",
    "cost_usd_per_kg": "84.70",
    "portion_kg": "0.1"
  },
  {
    "id": "oil_rapeseed",
    "land_use_m2_per_kg": "10.63",
    "gas_emissions_kgCO2eq_per_kg": "3.76999999792",
    "water_liters_per_kg": "237.7",
    "eutrophying_emissions_kgPO4eq_per_kg": "19.19",
    "cost_usd_per_kg": "2.00",
    "portion_kg": "0.01"
  },
  {
    "id": "rice",
    "land_use_m2_per_kg": "2.8",
    "gas_emissions_kgCO2eq_per_kg": "1.5694519802",
    "water_liters_per_kg": "2248.4",
    "eutrophying_emissions_kgPO4eq_per_kg": "35.07",
    "cost_usd_per_kg": "1.68",
    "portion_kg": "0.075"
  },
  {
    "id": "root_vegetables",
    "land_use_m2_per_kg": "0.33",
    "gas_emissions_kgCO2eq_per_kg": "0.55783783776",
    "water_liters_per_kg": "28.4",
    "eutrophying_emissions_kgPO4eq_per_kg": "1.61",
    "cost_usd_per_kg": "3.01",
    "portion_kg": "0.075"
  },
  {
    "id": "oil_soybean",
    "land_use_m2_per_kg": "10.52",
    "gas_emissions_kgCO2eq_per_kg": "0",
    "water_liters_per_kg": "414.6",
    "eutrophying_emissions_kgPO4eq_per_kg": "11.69",
    "cost_usd_per_kg": "2.00",
    "portion_kg": "0.01"
  },
  {
    "id": "soymilk",
    "land_use_m2_per_kg": "0.66",
    "gas_emissions_kgCO2eq_per_kg": "0",
    "water_liters_per_kg": "27.8",
    "eutrophying_emissions_kgPO4eq_per_kg": "1.06",
    "cost_usd_per_kg": "1.75",
    "portion_kg": "0.25"
  },
  {
    "id": "oil_sunflower",
    "land_use_m2_per_kg": "17.66",
    "gas_emissions_kgCO2eq_per_kg": "3.59999999996",
    "water_liters_per_kg": "1007.9",
    "eutrophying_emissions_kgPO4eq_per_kg": "50.66",
    "cost_usd_per_kg": "2.00",
    "portion_kg": "0.01"
  },
  {
    "id": "tofu",
    "land_use_m2_per_kg": "3.52",
    "gas_emissions_kgCO2eq_per_kg": "0.88619926236",
    "water_liters_per_kg": "148.6",
    "eutrophying_emissions_kgPO4eq_per_kg": "6.16",
    "cost_usd_per_kg": "4.95",
    "portion_kg": "0.17"
  },
  {
    "id": "tomatoes",
    "land_use_m2_per_kg": "0.8",
    "gas_emissions_kgCO2eq_per_kg": "1.98",
    "water_liters_per_kg": "369.8",
    "eutrophying_emissions_kgPO4eq_per_kg": "7.51",
    "cost_usd_per_kg": "4.25",
    "portion_kg": "0.15"
  },
  {
    "id": "wheat_and_rye",
    "land_use_m2_per_kg": "3.85",
    "gas_emissions_kgCO2eq_per_kg": "1.9952678728",
    "water_liters_per_kg": "647.5",
    "eutrophying_emissions_kgPO4eq_per_kg": "7.16",
    "cost_usd_per_kg": "4.28",
    "portion_kg": "0.083"
  },
  {
    "id": "wine",
    "land_use_m2_per_kg": "1.78",
    "gas_emissions_kgCO2eq_per_kg": "0",
    "water_liters_per_kg": "78.9",
    "eutrophying_emissions_kgPO4eq_per_kg": "4.57",
    "cost_usd_per_kg": "12.06",
    "portion_kg": "0"
  }
]

const menusDetail = {
  "breakfast": [
    {
      "key": "eggs_and_bacon",
      "label": "Eggs & Bacon with Toats",
      "ingredients": [
        {
          "id": "eggs",
          "label": "Eggs",
          "active": true
        },
        {
          "id": "pig_meat",
          "label": "Bacon",
          "active": true
        },
        {
          "id": "wheat_and_rye",
          "label": "Toats",
          "active": true
        },
        {
          "id": "tomatoes",
          "label": "Slices of tomatoe",
          "active": true
        },
        {
          "id": "cheese",
          "label": "Cheese",
          "active": false
        },
        {
          "id": "nuts",
          "label": "Nuts",
          "active": false
        },
        {
          "id": "margarine",
          "label": "Margarine",
          "active": false
        },
        {
          "id": "oil_olive",
          "label": "Olive oil",
          "active": false
        }
      ],
      "swaps": [
        {
          "key": "reset",
          "label": "Reset to original recipe",
          "impactLabel": "Going back to the original recipe",
          "removedIngredients": [],
          "addedIngredients": []
        },
        {
          "key": "bacon_to_cheese",
          "label1": "Bacon",
          "label2": "Cheese",
          "impactLabel": "Swaping bacon for cheese",
          "removedIngredients": [
            {
              "id": "pig_meat",
              "label": "Bacon"
            }
          ],
          "addedIngredients": [
            {
              "id": "cheese",
              "label": "Cheese"
            }
          ]
        },
        {
          "key": "bacon_to_nuts",
          "label1": "Bacon",
          "label2": "Nuts",
          "impactLabel": "Swaping bacon for nuts",
          "removedIngredients": [
            {
              "id": "pig_meat",
              "label": "Bacon"
            }
          ],
          "addedIngredients": [
            {
              "id": "nuts",
              "label": "Nuts"
            }
          ]
        }
      ]
    },
    {
      "key": "oatmeal_with_berries_and_nuts",
      "label": "Oatmeal with Berries and Nuts",
      "ingredients": [
        {
          "id": "oatmeal",
          "label": "Oatmeal",
          "active": true
        },
        {
          "id": "milk",
          "label": "Milk",
          "active": true
        },
        {
          "id": "berries_and_grapes",
          "label": "Berries",
          "active": true
        },
        {
          "id": "nuts",
          "label": "Nuts",
          "active": true
        },
        {
          "id": "soymilk",
          "label": "Soy milk",
          "active": false
        },
        {
          "id": "bananas",
          "label": "Bananas",
          "active": false
        }
      ],
      "swaps": [
        {
          "key": "reset",
          "label": "Reset to original recipe",
          "impactLabel": "Going back to the original recipe",
          "removedIngredients": [],
          "addedIngredients": []
        },
        {
          "key": "milk_to_soy_milk_oatmeal",
          "label1": "Milk",
          "label2": "Soy milk",
          "impactLabel": "Swaping milk for soy milk",
          "removedIngredients": [
            {
              "id": "milk",
              "label": "milk"
            }
          ],
          "addedIngredients": [
            {
              "id": "soymilk",
              "label": "Soy milk"
            }
          ]
        },
        {
          "key": "berries_to_bananas",
          "label1": "Berries",
          "label2": "Bananas",
          "impactLabel": "Swaping berries for bananas",
          "removedIngredients": [
            {
              "id": "berries_and_grapes",
              "label": "Berries"
            }
          ],
          "addedIngredients": [
            {
              "id": "bananas",
              "label": "Bananas"
            }
          ]
        }
      ]
    },
    {
      "key": "omelette_with_cheese_and_vegetables",
      "label": "Omelette with Cheese and Vegetables",
      "ingredients": [
        {
          "id": "eggs",
          "label": "Eggs",
          "active": true
        },
        {
          "id": "milk",
          "label": "Milk",
          "active": true
        },
        {
          "id": "cheese",
          "label": "Cheese",
          "active": true
        },
        {
          "id": "vegetables_other",
          "label": "Mixed vegetables",
          "active": true
        },
        {
          "id": "wheat_and_rye",
          "label": "Bread",
          "active": true
        },
        {
          "id": "soymilk",
          "label": "Soy milk",
          "active": false
        },
        {
          "id": "tofu",
          "label": "Tofu",
          "active": false
        },
        {
          "id": "root_vegetables",
          "label": "Sweet potatoes",
          "active": false
        },
        {
          "id": "peas",
          "label": "Peas",
          "active": false
        }
      ],
      "swaps": [
        {
          "key": "reset",
          "label": "Reset to original recipe",
          "impactLabel": "Going back to the original recipe",
          "removedIngredients": [],
          "addedIngredients": []
        },
        {
          "key": "milk_to_soy_milk_omelette",
          "label1": "Milk",
          "label2": "Soy milk",
          "impactLabel": "Swaping milk for soy milk",
          "removedIngredients": [
            {
              "id": "milk",
              "label": "milk"
            }
          ],
          "addedIngredients": [
            {
              "id": "soymilk",
              "label": "Soy milk"
            }
          ]
        },
        {
          "key": "remove_cheese",
          "label": "Omit cheese",
          "impactLabel": "Omitting cheese in your omelette",
          "funFact": "There are several reasons for the relatively large carbon footprint of cheese. First, one kilogram of cheese requires up to 10 kilograms of milk due to the maturing process that cheese usually undergoes. The milk, in turn, comes from a dairy cow. Cows are ruminants that emit large amounts of methane which is about 25 times more damaging to the climate than carbon dioxide and mainly responsible for the comparatively high GHG emissions associated with producing cheese.",
          "funFactSource": "3",
          "removedIngredients": [
            {
              "id": "cheese",
              "label": "cheese"
            }
          ],
          "addedIngredients": []
        },
        {
          "key": "omelette_to_tofu_scramble",
          "label": "Try a Country Tofu Scamble",
          "impactLabel": "Making a Country Tofu Scramble instead of a traditional omelette",
          "recipeLabel": "Samosa Sweet Potatoes Breakfast Wraps with Tofu Scramble",
          "recipeUrl": "https://www.pickuplimes.com/single-post/2019/05/08/Samosa-Sweet-Potatoes-Breakfast-Wraps-With-Tofu-Scramble",
          "recipeCreator": "Pick Up Limes",
          "recipeCreatorUrl": "https://www.pickuplimes.com",
          "removedIngredients": [
            {
              "id": "eggs",
              "label": "Eggs"
            },
            {
              "id": "milk",
              "label": "Milk"
            },
            {
              "id": "cheese",
              "label": "Cheese"
            }
          ],
          "addedIngredients": [
            {
              "id": "tofu",
              "label": "Tofu"
            },
            {
              "id": "root_vegetables",
              "label": "Sweet potatoes"
            },
            {
              "id": "peas",
              "label": "Peas"
            }
          ]
        }
      ]
    }
  ],
  "lunch": [
    {
      "key": "hamburger_and_potatoes",
      "label": "Cheeseburger with Potatoes",
      "ingredients": [
        {
          "id": "beef_beef_herd",
          "label": "Beef (from beef herd)",
          "active": true
        },
        {
          "id": "wheat_and_rye",
          "label": "Bread",
          "active": true
        },
        {
          "id": "cheese",
          "label": "Cheese",
          "active": true
        },
        {
          "id": "potatoes",
          "label": "Potatoes",
          "active": true
        },
        {
          "id": "poultry_meat",
          "label": "Chicken",
          "active": false
        },
        {
          "id": "legumes_other",
          "label": "Chickpeas",
          "active": false
        },
        {
          "id": "vegetables_other",
          "label": "Vegetables",
          "active": false
        },
        {
          "id": "nuts",
          "label": "Sunflower seeds & Cashew",
          "active": false
        },
        {
          "id": "tofu",
          "label": "Tofu",
          "active": false
        }
      ],
      "swaps": [
        {
          "key": "reset",
          "label": "Reset to original recipe",
          "impactLabel": "Going back to the original recipe",
          "removedIngredients": [],
          "addedIngredients": []
        },
        {
          "key": "beef_to_chicken",
          "label1": "Beef",
          "label2": "Chicken",
          "impactLabel": "Swaping beef for chicken",
          "funFact": "The greenhouse gas production per serving of chicken or pork is about 20 percent that of a serving of beef.",
          "funFactSource": "6",
          "removedIngredients": [
            {
              "id": "beef_beef_herd",
              "label": "Beef"
            }
          ],
          "addedIngredients": [
            {
              "id": "poultry_meat",
              "label": "Chicken"
            }
          ]
        },
        {
          "key": "beef_to_mushrooms_lentils",
          "label": "Make a Wild Mushroom Lentil burger",
          "impactLabel": "Making a Wild Mushroom Lentil burger",
          "recipeLabel": "Wild Mushroom Lentil Burgers with Cashew Garlic Sauce",
          "recipeUrl": "https://www.mynewroots.org/site/2012/11/wild-mushroom-lentil-burgers-with-cashew-garlic-sauce-at-whole-living/",
          "recipeCreator": "My New Roots",
          "recipeCreatorUrl": "https://www.mynewroots.org",
          "removedIngredients": [
            {
              "id": "beef_beef_herd",
              "label": "Beef"
            },
            {
              "id": "cheese",
              "label": "Cheese"
            }
          ],
          "addedIngredients": [
            {
              "id": "legumes_other",
              "label": "Chickpeas"
            },
            {
              "id": "vegetables_other",
              "label": "Vegetables"
            },
            {
              "id": "nuts",
              "label": "Sunflower seeds & Cashew"
            }
          ]
        },
        {
          "key": "beef_to_tofu_vietnamese",
          "label": "Make a Tofu vietnamese sub",
          "impactLabel": "Making a tofu vietnamese sub",
          "recipeLabel": "Tofu Vietnamese Sub (Bánh Mì)",
          "recipeUrl": "https://www.pickuplimes.com/single-post/2020/01/23/TOFU-VIETNAMESE-SUB-B%C3%81NH-M%C3%8C",
          "recipeCreator": "Pick Up Limes",
          "recipeCreatorUrl": "https://www.pickuplimes.com",
          "removedIngredients": [
            {
              "id": "beef_beef_herd",
              "label": "Beef"
            },
            {
              "id": "cheese",
              "label": "Cheese"
            }
          ],
          "addedIngredients": [
            {
              "id": "tofu",
              "label": "Tofu"
            }
          ]
        },
        {
          "key": "omit_cheese",
          "label": "Omit cheese",
          "impactLabel": "Omitting cheese in your burger",
          "funFact": "One kilogram of cheese requires up to 10 kilograms of milk due to the maturing process that cheese usually undergoes. The milk, in turn, comes from a dairy cow. Cows are ruminants that emit large amounts of methane which is about 25 times more damaging to the climate than carbon dioxide and mainly responsible for the comparatively high GHG emissions associated with producing cheese.",
          "funFactSource": "3",
          "removedIngredients": [
            {
              "id": "cheese",
              "label": "Cheese"
            }
          ],
          "addedIngredients": []
        }
      ]
    },
    {
      "key": "chicken_salad",
      "label": "Chicken salad with Cheese",
      "ingredients": [
        {
          "id": "poultry_meat",
          "label": "Chicken",
          "active": true
        },
        {
          "id": "vegetables_other",
          "label": "Lettuce and other vegetables",
          "active": true
        },
        {
          "id": "cheese",
          "label": "Cheese",
          "active": true
        },
        {
          "id": "oil_rapeseed",
          "label": "Rapeseed oil based dressing",
          "active": true
        },
        {
          "id": "eggs",
          "label": "Eggs",
          "active": false
        },
        {
          "id": "legumes_other",
          "label": "Lentils",
          "active": false
        },
        {
          "id": "nuts",
          "label": "Nuts",
          "active": false
        },
        {
          "id": "oil_olive",
          "label": "Olive oil",
          "active": false
        }
      ],
      "swaps": [
        {
          "key": "reset",
          "label": "Reset to original recipe",
          "impactLabel": "Going back to the original recipe",
          "removedIngredients": [],
          "addedIngredients": []
        },
        {
          "key": "chicken_to_eggs",
          "label1": "Chicken",
          "label2": "Eggs",
          "removedIngredients": [
            {
              "id": "poultry_meat",
              "label": "Chicken"
            }
          ],
          "addedIngredients": [
            {
              "id": "eggs",
              "label": "Eggs"
            }
          ]
        },
        {
          "key": "chicken_to_lentils",
          "label": "Make the best lentils salad ever",
          "impactLabel": "Making the best lentils salad ever",
          "recipeLabel": "The Best Lentil Salad, Ever",
          "recipeUrl": "https://www.mynewroots.org/site/2010/06/the-best-lentil-salad-ever-2/",
          "recipeCreator": "My New Roots",
          "recipeCreatorUrl": "https://www.mynewroots.org",
          "removedIngredients": [
            {
              "id": "poultry_meat",
              "label": "Chicken"
            },
            {
              "id": "cheese",
              "label": "Cheese",
              "active": true
            }
          ],
          "addedIngredients": [
            {
              "id": "legumes_other",
              "label": "Lentils"
            }
          ]
        },
        {
          "key": "cheese_to_nuts",
          "label1": "Cheese",
          "label2": "Nuts",
          "impactLabel": "Swaping cheese for nuts",
          "removedIngredients": [
            {
              "id": "cheese",
              "label": "Cheese"
            }
          ],
          "addedIngredients": [
            {
              "id": "nuts",
              "label": "Nuts"
            }
          ]
        }
      ]
    },
    {
      "key": "shimps_saute",
      "label": "Fish sautéed with Rice noodles and Broccoli",
      "ingredients": [
        {
          "id": "fish_farmed",
          "label": "Fish (farmed)",
          "active": true
        },
        {
          "id": "rice",
          "label": "Rice",
          "active": true
        },
        {
          "id": "cruciferous_vegetables_and_cabbages",
          "label": "Broccoli",
          "active": true
        },
        {
          "id": "onions_and_leeks",
          "label": "Onions",
          "active": true
        },
        {
          "id": "peas",
          "label": "Green peas",
          "active": false
        },
        {
          "id": "prawns_farmed",
          "label": "Shrimps",
          "active": false
        },
        {
          "id": "tofu",
          "label": "Tofu",
          "active": false
        },
        {
          "id": "legumes_other",
          "label": "Chickpeas",
          "active": false
        },
        {
          "id": "groundnuts",
          "label": "PB sauce",
          "active": false
        },
        {
          "id": "wheat_and_rye",
          "label": "Wheat noodles",
          "active": false
        }
      ],
      "swaps": [
        {
          "key": "reset",
          "label": "Reset to original recipe",
          "impactLabel": "Going back to the original recipe",
          "removedIngredients": [],
          "addedIngredients": []
        },
        {
          "key": "fish_to_shrimps",
          "label1": "Fish",
          "label2": "Shrimps",
          "impactLabel": "Swaping fish for shrimps",
          "funFact": "There are significant environmental problems associated with the current farming methods of shrimps: deforestation, erosion, rapid land subsidence, and rising salinity levels are threatening the stability of the entire Mekong region (Vietnam), and while shrimp farming does not take the blame alone for these issues, it is a substantial part of the problem.",
          "funFactSource": "4",
          "removedIngredients": [
            {
              "id": "fish_farmed",
              "label": "Fish (farmed)"
            }
          ],
          "addedIngredients": [
            {
              "id": "prawns_farmed",
              "label": "Shrimps"
            }
          ]
        },
        {
          "key": "fish_to_peas",
          "label1": "Fish",
          "label2": "Green peas",
          "impactLabel": "Swaping fish for green peas",
          "removedIngredients": [
            {
              "id": "fish_farmed",
              "label": "Fish (farmed)"
            }
          ],
          "addedIngredients": [
            {
              "id": "peas",
              "label": "Green peas"
            }
          ]
        },
        {
          "key": "fish_to_tofu_chickpeas",
          "label": "Try a high protein lettuce wrap with creamy PB sauce",
          "impactLabel": "Making a high protein lettuce wrap with creamy PB sauce",
          "recipeLabel": "High Protein Lettuce Wraps with Creamy Peanut Sauce",
          "recipeUrl": "https://www.pickuplimes.com/single-post/2020/03/02/High-Protein-Lettuce-Wraps-with-Creamy-Peanut-Sauce",
          "recipeCreator": "Pick Up Limes",
          "recipeCreatorUrl": "https://www.pickuplimes.com",
          "removedIngredients": [
            {
              "id": "fish_farmed",
              "label": "Fish (farmed)"
            }
          ],
          "addedIngredients": [
            {
              "id": "tofu",
              "label": "Tofu"
            },
            {
              "id": "legumes_other",
              "label": "Chickpeas"
            },
            {
              "id": "groundnuts",
              "label": "PB sauce"
            }
          ]
        },
        {
          "key": "rice_to_wheat_noodles",
          "label1": "Rice noodles",
          "label2": "Wheat pasta",
          "impactLabel": "Swaping rice for wheat",
          "funFact": "Rice is a key cereal and provides more calories to people around the world than any other crop. However, cultivation of rice requires a large amount of land and water and has the highest climate impact of any crop per unit calorie, according to an analysis released by the Environmental Defense Fund.",
          "funFactSource": "5",
          "removedIngredients": [
            {
              "id": "rice",
              "label": "Rice"
            }
          ],
          "addedIngredients": [
            {
              "id": "wheat_and_rye",
              "label": "Wheat noodles"
            }
          ]
        }
      ]
    }
  ],
  "snack": [
    {
      "key": "beef_jerky",
      "label": "Beef jerky",
      "ingredients": [
        {
          "id": "beef_beef_herd",
          "label": "Beef (from beef herd)",
          "active": true
        },
        {
          "id": "eggs",
          "label": "Eggs",
          "active": false
        }
      ],
      "swaps": [
        {
          "key": "reset",
          "label": "Reset to original recipe",
          "impactLabel": "Going back to the original recipe",
          "removedIngredients": [],
          "addedIngredients": []
        },
        {
          "key": "beef_jerky_to_eggs",
          "label1": "Beef",
          "label2": "2 boiled eggs",
          "impactLabel": "Swaping beef for eggs",
          "funFact": "Almost 30 percent of the world’s ice-free land is used to raise livestock. We grow a lot of crops to feed animals, and we cut down a lot of forests to do that. But beef, far more than pork or chicken, contributes to environmental harm, in part because it requires much more land.",
          "funFactSource": "6",
          "removedIngredients": [
            {
              "id": "beef_beef_herd",
              "label": "Beef (from beef herd)"
            }
          ],
          "addedIngredients": [
            {
              "id": "eggs",
              "label": "Eggs"
            }
          ]
        }
      ]
    },
    {
      "key": "cheese_and_grapes",
      "label": "Cheese and Grapes",
      "ingredients": [
        {
          "id": "cheese",
          "label": "Cheese",
          "active": true
        },
        {
          "id": "berries_and_grapes",
          "label": "Grapes",
          "active": true
        },
        {
          "id": "tofu",
          "label": "Edamames",
          "active": false
        },
        {
          "id": "citrus_fruit",
          "label": "Oranges",
          "active": false
        }
      ],
      "swaps": [
        {
          "key": "reset",
          "label": "Reset to original recipe",
          "impactLabel": "Going back to the original recipe",
          "removedIngredients": [],
          "addedIngredients": []
        },
        {
          "key": "cheese_to_edamame",
          "label1": "Cheese",
          "label2": "Edamame",
          "impactLabel": "Swaping cheese for edamame",
          "removedIngredients": [
            {
              "id": "cheese",
              "label": "Cheese"
            }
          ],
          "addedIngredients": [
            {
              "id": "tofu",
              "label": "Edamames"
            }
          ]
        },
        {
          "key": "grapes_to_citrus",
          "label1": "Grapes",
          "label2": "Oranges",
          "impactLabel": "Swaping grapes for oranges",
          "removedIngredients": [
            {
              "id": "berries_and_grapes",
              "label": "Grapes"
            }
          ],
          "addedIngredients": [
            {
              "id": "citrus_fruit",
              "label": "Oranges"
            }
          ]
        }
      ]
    },
    {
      "key": "pb_banana_chocolate",
      "label": "PB & Banana with Dark chocolate",
      "ingredients": [
        {
          "id": "bananas",
          "label": "Bananas",
          "active": true
        },
        {
          "id": "groundnuts",
          "label": "Peanut butter",
          "active": true
        },
        {
          "id": "chocolate_dark",
          "label": "Dark chocolate",
          "active": true
        },
        {
          "id": "nuts",
          "label": "Nuts",
          "active": false
        },
        {
          "id": "apples",
          "label": "Apples",
          "active": false
        }
      ],
      "swaps": [
        {
          "key": "reset",
          "label": "Reset to original recipe",
          "impactLabel": "Going back to the original recipe",
          "removedIngredients": [],
          "addedIngredients": []
        },
        {
          "key": "pb_to_onb",
          "label1": "Peanut butter",
          "label2": "Other nut butter",
          "impactLabel": "Swaping peanuts for another nut butter",
          "removedIngredients": [
            {
              "id": "groundnuts",
              "label": "Peanuts"
            }
          ],
          "addedIngredients": [
            {
              "id": "nuts",
              "label": "Nuts"
            }
          ]
        },
        {
          "key": "bananas_to_apples",
          "label1": "Bananas",
          "label2": "Apples",
          "impactLabel": "Swaping bananas for apples",
          "removedIngredients": [
            {
              "id": "bananas",
              "label": "Bananas"
            }
          ],
          "addedIngredients": [
            {
              "id": "apples",
              "label": "Apples"
            }
          ]
        }
      ]
    }
  ],
  "dinner": [
    {
      "key": "spaghetti_bolognese",
      "label": "Spaghetti Bolognese",
      "ingredients": [
        {
          "id": "beef_beef_herd",
          "label": "Beef (from beef herd)",
          "active": true
        },
        {
          "id": "wheat_and_rye",
          "label": "Wheat pasta",
          "active": true
        },
        {
          "id": "tomatoes",
          "label": "Tomatoes",
          "active": true
        },
        {
          "id": "onions_and_leeks",
          "label": "Onions",
          "active": true
        },
        {
          "id": "cheese",
          "label": "Cheese",
          "active": true
        },
        {
          "id": "pig_meat",
          "label": "Pork",
          "active": false
        },
        {
          "id": "legumes_other",
          "label": "Black beans",
          "active": false
        },
        {
          "id": "peas",
          "label": "Peas",
          "active": false
        },
        {
          "id": "vegetables_other",
          "label": "Vegetables",
          "active": false
        }
      ],
      "swaps": [
        {
          "key": "reset",
          "label": "Reset to original recipe",
          "impactLabel": "Going back to the original recipe",
          "removedIngredients": [],
          "addedIngredients": []
        },
        {
          "key": "beef_to_pork",
          "label1": "Beef",
          "label2": "Pork",
          "impactLabel": "Swaping beef for pork",
          "funFact": "The greenhouse gas production per serving of chicken or pork is about 20 percent that of a serving of beef. Cows also put out an enormous amount of methane, causing almost 10 percent of anthropogenic greenhouse gas emissions and contributing to climate change.",
          "funFactSource": "6",
          "removedIngredients": [
            {
              "id": "beef_beef_herd",
              "label": "Beef (from beef herd)"
            }
          ],
          "addedIngredients": [
            {
              "id": "pig_meat",
              "label": "Pork"
            }
          ]
        },
        {
          "key": "beef_to_macaroni_chili",
          "label": "Make a Macaroni chili",
          "impactLabel": "Making a Macaroni chili",
          "recipeLabel": "Macaroni Chili",
          "recipeUrl": "https://www.pickuplimes.com/single-post/2020/01/23/Macaroni-Chili",
          "recipeCreator": "Pick Up Limes",
          "recipeCreatorUrl": "https://www.pickuplimes.com",
          "removedIngredients": [
            {
              "id": "beef_beef_herd",
              "label": "Beef (from beef herd)"
            }
          ],
          "addedIngredients": [
            {
              "id": "legumes_other",
              "label": "Black beans"
            }
          ]
        },
        {
          "key": "beef_to_one_pot",
          "label": "Make a Sanity saving One pot Pasta",
          "impactLabel": "Making a Sanity saving One pot Pasta",
          "recipeLabel": "Sanity-Saving One Pot Pasta",
          "recipeUrl": "https://www.mynewroots.org/site/2016/05/sanity-saving-one-pot-pasta/",
          "recipeCreator": "My New Roots",
          "recipeCreatorUrl": "https://www.mynewroots.org",
          "removedIngredients": [
            {
              "id": "beef_beef_herd",
              "label": "Beef (from beef herd)"
            },
            {
              "id": "tomatoes",
              "label": "Tomatoes"
            },
            {
              "id": "cheese",
              "label": "cheese"
            }
          ],
          "addedIngredients": [
            {
              "id": "peas",
              "label": "Peas"
            },
            {
              "id": "vegetables_other",
              "label": "Vegetables"
            }
          ]
        },
        {
          "key": "remove_cheese",
          "label": "Omit cheese",
          "impactLabel": "Omitting cheese",
          "removedIngredients": [
            {
              "id": "cheese",
              "label": "cheese"
            }
          ],
          "addedIngredients": []
        }
      ]
    },
    {
      "key": "chicken_curry",
      "label": "Chicken Curry with Rice and Vegetables",
      "ingredients": [
        {
          "id": "poultry_meat",
          "label": "Chicken",
          "active": true
        },
        {
          "id": "onions_and_leeks",
          "label": "Onions",
          "active": true
        },
        {
          "id": "vegetables_other",
          "label": "Vegetables",
          "active": true
        },
        {
          "id": "rice",
          "label": "Rice",
          "active": true
        },
        {
          "id": "barley",
          "label": "Barley",
          "active": false
        },
        {
          "id": "legumes_other",
          "label": "Lentils",
          "active": false
        },
        {
          "id": "peas",
          "label": "Peas",
          "active": false
        },
        {
          "id": "potatoes",
          "label": "Potatoes",
          "active": false
        }
      ],
      "swaps": [
        {
          "key": "reset",
          "label": "Reset to original recipe",
          "impactLabel": "Going back to the original recipe",
          "removedIngredients": [],
          "addedIngredients": []
        },
        {
          "key": "rice_to_barley",
          "label1": "Rice",
          "label2": "Barley",
          "impactLabel": "Swaping rice for barley",
          "removedIngredients": [
            {
              "id": "rice",
              "label": "Rice"
            }
          ],
          "addedIngredients": [
            {
              "id": "barley",
              "label": "Barley"
            }
          ]
        },
        {
          "key": "chicken_to_lentils",
          "label": "Make a Red Lentils soup",
          "impactLabel": "Making a Red Lentils soup",
          "recipeLabel": "Four Corners Lentil Soup",
          "recipeUrl": "https://www.mynewroots.org/site/2009/10/reader-request-my-favorite-recipe-four-corners-lentil-soup-2/",
          "recipeCreator": "My New Roots",
          "recipeCreatorUrl": "https://www.mynewroots.org",
          "removedIngredients": [
            {
              "id": "poultry_meat",
              "label": "Chicken"
            }
          ],
          "addedIngredients": [
            {
              "id": "legumes_other",
              "label": "Lentils"
            }
          ]
        },
        {
          "key": "chicken_to_peas",
          "label": "Make a Potatoes & Peas curry",
          "impactLabel": "Making a Potatoes & Peas curry",
          "recipeLabel": "Potato & Green Pea Curry",
          "recipeUrl": "https://www.pickuplimes.com/single-post/2020/03/30/Potato-Green-Pea-Curry",
          "recipeCreator": "Pick Up Limes",
          "recipeCreatorUrl": "https://www.pickuplimes.com",
          "removedIngredients": [
            {
              "id": "poultry_meat",
              "label": "Chicken"
            }
          ],
          "addedIngredients": [
            {
              "id": "peas",
              "label": "Peas"
            },
            {
              "id": "potatoes",
              "label": "Potatoes"
            }
          ]
        }
      ]
    },
    {
      "key": "grilled_fish",
      "label": "Grilled Fish with Corn and Vegetables",
      "ingredients": [
        {
          "id": "fish_farmed",
          "label": "Fish (farmed)",
          "active": true
        },
        {
          "id": "vegetables_other",
          "label": "Vegetables",
          "active": true
        },
        {
          "id": "corn",
          "label": "Corn",
          "active": true
        },
        {
          "id": "tofu",
          "label": "Edamame",
          "active": false
        },
        {
          "id": "root_vegetables",
          "label": "Root vegetables",
          "active": false
        },
        {
          "id": "tofu",
          "label": "Edamame",
          "active": false
        },
        {
          "id": "root_vegetables",
          "label": "Root vegetables",
          "active": false
        },
        {
          "id": "tomatoes",
          "label": "tomatoes",
          "active": false
        },
        {
          "id": "rice",
          "label": "Rice",
          "active": false
        }
      ],
      "swaps": [
        {
          "key": "reset",
          "label": "Reset to original recipe",
          "impactLabel": "Going back to the original recipe",
          "removedIngredients": [],
          "addedIngredients": []
        },
        {
          "key": "fish_to_poke",
          "label": "Make a Poke-inspired beet bowl",
          "impactLabel": "Making a Poke-inspired beet bowl",
          "recipeLabel": "Poke-Inspired Beet Bowl",
          "recipeUrl": "https://www.mynewroots.org/site/2017/03/poke-inspired-beet-bowl/",
          "recipeCreator": "My New Roots",
          "recipeCreatorUrl": "https://www.mynewroots.org",
          "removedIngredients": [
            {
              "id": "fish_farmed",
              "label": "Fish (farmed)"
            }
          ],
          "addedIngredients": [
            {
              "id": "tofu",
              "label": "Edamame"
            },
            {
              "id": "root_vegetables",
              "label": "Root vegetables"
            }
          ]
        },
        {
          "key": "fish_to_sweet_potatoe",
          "label": "Make a Big comfy Sweet Potato",
          "impactabel": "Making a Big comfy Sweet Potato",
          "recipeLabel": "Big Comfy Sweet Potato",
          "recipeUrl": "https://www.mynewroots.org/site/2014/01/big-comfy-sweet-potato/",
          "recipeCreator": "My New Roots",
          "recipeCreatorUrl": "https://www.mynewroots.org",
          "removedIngredients": [
            {
              "id": "fish_farmed",
              "label": "Fish (farmed)"
            },
            {
              "id": "rice",
              "label": "Rice"
            }
          ],
          "addedIngredients": [
            {
              "id": "tofu",
              "label": "Edamame"
            },
            {
              "id": "root_vegetables",
              "label": "Root vegetables"
            },
            {
              "id": "tomatoes",
              "label": "tomatoes"
            }
          ]
        },
        {
          "key": "corn_to_rice",
          "label1": "Corn",
          "label2": "Rice",
          "impactLabel": "Swaping corn for rice",
          "removedIngredients": [
            {
              "id": "corn",
              "label": "Corn"
            }
          ],
          "addedIngredients": [
            {
              "id": "rice",
              "label": "Rice"
            }
          ]
        }
      ]
    }
  ]
}