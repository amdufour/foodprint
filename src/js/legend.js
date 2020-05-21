function showLegend() {
  const legendMaxDiameter = 100;

  // Append legend for the water circles
  let svgLegendWater = d3.select('.legend-item.water .legend-item-graphe')
    .append('svg')
    .attr('width', legendMaxDiameter)
    .attr('height', legendMaxDiameter);

  const waterLegendConsumption = [300, 200, 100];
  let rWaterOuter = getRadius(waterLegendConsumption[0], categories[2].factor);
  let rWaterMiddle = getRadius(waterLegendConsumption[1], categories[2].factor);
  let rWaterInner = getRadius(waterLegendConsumption[2], categories[2].factor);

  svgLegendWater.append('circle')
    .attr('r', rWaterOuter)
    .attr('cx', legendMaxDiameter / 2)
    .attr('cy', legendMaxDiameter - rWaterOuter)
    .attr('class', 'lengend-circle water outer');
  svgLegendWater.append('circle')
    .attr('r', rWaterMiddle)
    .attr('cx', legendMaxDiameter / 2)
    .attr('cy', legendMaxDiameter - rWaterMiddle)
    .attr('class', 'lengend-circle water middle');
  svgLegendWater.append('circle')
    .attr('r', rWaterInner)
    .attr('cx', legendMaxDiameter / 2)
    .attr('cy', legendMaxDiameter - rWaterInner)
    .attr('class', 'lengend-circle water inner');

  // Append legend for the other circles
  let svgLegendOther = d3.select('.legend-item.others .legend-item-graphe')
    .append('svg')
    .attr('width', legendMaxDiameter)
    .attr('height', legendMaxDiameter);

  const otherLegendConsumption = [60, 40, 20];
  let rOtherOuter = getRadius(otherLegendConsumption[0], categories[0].factor);
  let rOtherMiddle = getRadius(otherLegendConsumption[1], categories[0].factor);
  let rOtherInner = getRadius(otherLegendConsumption[2], categories[0].factor);

  svgLegendOther.append('circle')
    .attr('r', rOtherOuter)
    .attr('cx', legendMaxDiameter / 2)
    .attr('cy', legendMaxDiameter - rOtherOuter)
    .attr('class', 'lengend-circle others outer');
  svgLegendOther.append('circle')
    .attr('r', rOtherMiddle)
    .attr('cx', legendMaxDiameter / 2)
    .attr('cy', legendMaxDiameter - rOtherMiddle)
    .attr('class', 'lengend-circle others middle');
  svgLegendOther.append('circle')
    .attr('r', rOtherInner)
    .attr('cx', legendMaxDiameter / 2)
    .attr('cy', legendMaxDiameter - rOtherInner)
    .attr('class', 'lengend-circle others middle');

  function getRadius(consumption, factor) {
    return Math.sqrt(consumption * factor / Math.PI);
  }
}