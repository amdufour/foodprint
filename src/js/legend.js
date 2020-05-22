function showLegend() {
  const legendMaxDiameter = 92;
  const axisLength = 60;

  // Append legend for the water circles
  let svgLegendWater = d3.select('.legend-item.water .legend-item-graphe')
    .append('svg')
    .attr('width', legendMaxDiameter/2 + axisLength + 22)
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

  appendLegendCircles(svgLegendWater, rWaterOuter, 'water', 'outer');
  appendLegendCircles(svgLegendWater, rWaterMiddle, 'water', 'middle');
  appendLegendCircles(svgLegendWater, rWaterInner, 'water', 'inner');

  appendLegendAxis(svgLegendWater, rWaterOuter, rWaterOuter);
  appendLegendAxis(svgLegendWater, rWaterOuter, rWaterMiddle);
  appendLegendAxis(svgLegendWater, rWaterOuter, rWaterInner);

  appendLegendLabels(svgLegendWater, rWaterOuter, rWaterOuter, waterLegendConsumption[0]);
  appendLegendLabels(svgLegendWater, rWaterOuter, rWaterMiddle, waterLegendConsumption[1]);
  appendLegendLabels(svgLegendWater, rWaterOuter, rWaterInner, waterLegendConsumption[2]);

  // Append legend for the other circles
  let svgLegendOther = d3.select('.legend-item.others .legend-item-graphe')
    .append('svg')
    .attr('width', legendMaxDiameter/2 + axisLength + 22)
    .attr('height', legendMaxDiameter);

  const otherLegendConsumption = [60, 40, 20];
  let rOtherOuter = getRadius(otherLegendConsumption[0], categories[0].factor);
  let rOtherMiddle = getRadius(otherLegendConsumption[1], categories[0].factor);
  let rOtherInner = getRadius(otherLegendConsumption[2], categories[0].factor);

  appendLegendCircles(svgLegendOther, rOtherOuter, 'other', 'outer');
  appendLegendCircles(svgLegendOther, rOtherMiddle, 'other', 'middle');
  appendLegendCircles(svgLegendOther, rOtherInner, 'other', 'inner');

  appendLegendAxis(svgLegendOther, rOtherOuter, rOtherOuter);
  appendLegendAxis(svgLegendOther, rOtherOuter, rOtherMiddle);
  appendLegendAxis(svgLegendOther, rOtherOuter, rOtherInner);

  appendLegendLabels(svgLegendOther, rOtherOuter, rOtherOuter, otherLegendConsumption[0]);
  appendLegendLabels(svgLegendOther, rOtherOuter, rOtherMiddle, otherLegendConsumption[1]);
  appendLegendLabels(svgLegendOther, rOtherOuter, rOtherInner, otherLegendConsumption[2]);

  function appendLegendCircles(legend, radius, legendClass, circleClass) {
    legend.append('circle')
      .attr('r', radius)
      .attr('cx', legendMaxDiameter / 2)
      .attr('cy', legendMaxDiameter - radius)
      .attr('class', 'lengend-circle ' + legendClass + ' ' + circleClass);
  }

  function appendLegendAxis(legend, radiusMax, radiusCircle) {
    legend.append('line')
      .attr('class', 'legend-axis')
      .attr('x1', radiusMax)
      .attr('x2', radiusMax + axisLength)
      .attr('y1', legendMaxDiameter - (radiusCircle * 2))
      .attr('y2', legendMaxDiameter - (radiusCircle * 2))
      .attr('stroke-dasharray', '6 4');
  }

  function appendLegendLabels(legend, radiusMax, radiusCircle, consumption) {
    legend.append('text')
      .attr('class', 'legend-label')
      .attr('x', radiusMax + axisLength + 3)
      .attr('y', legendMaxDiameter - (radiusCircle * 2) + 4)
      .text(consumption);
  }

  function getRadius(consumption, factor) {
    return Math.sqrt(consumption * factor / Math.PI);
  }
}