import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import chartData from '../data/data.json';

const TwoDGraph = () => {
  const { departments, yearlyData } = chartData;
  const years = yearlyData.map(item => item.year);

  // Green color palette from light to dark
  const greenPalette = [
    "#E5FFE5", // Lightest
    "#B3FFB3",
    "#80FF80",
    "#4DFF4D",
    "#1AFF1A",
    "#00E600",
    "#00B300",
    "#008000"  // Darkest
  ];

  const getColorForValue = (value, minValue, maxValue) => {
    const normalizedValue = (maxValue - minValue) === 0 
      ? 0.5 
      : (value - minValue) / (maxValue - minValue);
    const colorIndex = Math.floor(normalizedValue * (greenPalette.length - 1));
    return greenPalette[colorIndex];
  };

  const scatterData = useMemo(() => {
    const allHeadcounts = yearlyData.flatMap(item => item.headcounts);
    const minValue = Math.min(...allHeadcounts);
    const maxValue = Math.max(...allHeadcounts);

    return departments.map((dept, idx) => {
      const headcounts = yearlyData.map(item => item.headcounts[idx]);
      const maxDeptValue = Math.max(...headcounts);
      const color = getColorForValue(maxDeptValue, minValue, maxValue);

      return {
        x: years,
        y: headcounts,
        mode: 'lines+markers',
        type: 'scatter',
        marker: { size: 8, color },
        line: { width: 3, color },
        name: `${dept} (Max: ${maxDeptValue})`,
      };
    });
  }, [yearlyData, departments]);

  const barData = useMemo(() => {
    const allHeadcounts = yearlyData.flatMap(item => item.headcounts);
    const minValue = Math.min(...allHeadcounts);
    const maxValue = Math.max(...allHeadcounts);

    return departments.map((dept, idx) => {
      const headcounts = yearlyData.map(item => item.headcounts[idx]);
      const maxDeptValue = Math.max(...headcounts);
      const color = getColorForValue(maxDeptValue, minValue, maxValue);

      return {
        x: years,
        y: headcounts,
        type: 'bar',
        marker: { color },
        name: dept,
      };
    });
  }, [yearlyData, departments]);

  const pieData = useMemo(() => {
    const latestYearData = yearlyData[yearlyData.length - 1].headcounts;
    const minValue = Math.min(...latestYearData);
    const maxValue = Math.max(...latestYearData);

    const colors = latestYearData.map(value => 
      getColorForValue(value, minValue, maxValue)
    );

    return [{
      labels: departments,
      values: latestYearData,
      type: 'pie',
      marker: { colors },
    }];
  }, [yearlyData, departments]);

  const layout = {
    plot_bgcolor: '#1f1f1f',
    paper_bgcolor: '#1f1f1f',
    font: { family: 'Arial, sans-serif', size: 14, color: '#fff' },
    margin: { t: 50, b: 50, l: 50, r: 50 },
    grid: { rows: 2, columns: 2, pattern: 'independent' },
    xaxis: { gridcolor: '#444', zerolinecolor: '#444' },
    yaxis: { gridcolor: '#444', zerolinecolor: '#444' },
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-6 bg-gray-900">
      <div className="bg-gray-800 p-4 rounded-lg">
        <Plot 
          data={scatterData} 
          layout={{ ...layout, title: 'Department Growth Trends' }} 
          config={{ responsive: true }}
          className="w-full h-full" 
        />
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <Plot 
          data={barData} 
          layout={{ ...layout, title: 'Yearly Department Size' }} 
          config={{ responsive: true }}
          className="w-full h-full" 
        />
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <Plot 
          data={pieData} 
          layout={{ ...layout, title: 'Current Department Distribution' }} 
          config={{ responsive: true }}
          className="w-full h-full" 
        />
      </div>
    </div>
  );
};

export default TwoDGraph;