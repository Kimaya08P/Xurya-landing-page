import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import chartData from '../data/data.json';
import '../style/2dgraph.css';

const TwoDGraph = () => {
  const { departments, yearlyData } = chartData;
  const years = yearlyData.map(item => item.year);
  const colors = ["#8AFF8A", "#00FF00", "#00D100", "#00A300", "#007500"];

  const getDistinctColors = (values) => {
    const valuePairs = values.map((value, index) => ({ value, index }));
    valuePairs.sort((a, b) => b.value - a.value);
    const colorAssignments = new Array(values.length);
    valuePairs.forEach((pair, rank) => {
      const colorIndex = Math.floor((rank / (values.length - 1)) * (colors.length - 1));
      colorAssignments[pair.index] = colors[colorIndex];
    });
    return colorAssignments;
  };

  const scatterData = useMemo(() => {
    const maxValues = departments.map((_, index) => 
      Math.max(...yearlyData.map(d => d.headcounts[index]))
    );
    const distinctColors = getDistinctColors(maxValues);

    return departments.map((dept, idx) => {
      const headcounts = yearlyData.map(item => item.headcounts[idx]);
      return {
        x: years,
        y: headcounts,
        mode: 'markers+lines',
        type: 'scatter',
        marker: {
          size: 8,
          color: distinctColors[idx]
        },
        line: {
          width: 3,
          color: distinctColors[idx]
        },
        name: dept,
      };
    });
  }, [yearlyData, departments]);

  const barData = useMemo(() => {
    const distinctColors = getDistinctColors(departments.map((_, idx) => 
      Math.max(...yearlyData.map(d => d.headcounts[idx]))
    ));
    return departments.map((dept, idx) => {
      return {
        x: years,
        y: yearlyData.map(item => item.headcounts[idx]),
        type: 'bar',
        name: dept,
        marker: { color: distinctColors[idx] }
      };
    });
  }, [yearlyData, departments]);

  const pieData = useMemo(() => {
    const latestYearData = yearlyData[yearlyData.length - 1].headcounts;
    const distinctColors = getDistinctColors(latestYearData);
    return [{
      labels: departments,
      values: latestYearData,
      type: 'pie',
      marker: { colors: distinctColors }
    }];
  }, [yearlyData, departments]);

  const heatmapData = useMemo(() => {
    return [{
      z: yearlyData.map(item => item.headcounts),
      x: years,
      y: departments,
      type: 'heatmap',
      colorscale: colors.map((color, i) => [i / (colors.length - 1), color])
    }];
  }, [yearlyData, departments]);

  const layout = {
    plot_bgcolor: '#1f1f1f',
    paper_bgcolor: '#1f1f1f',
    font: { family: 'Arial, sans-serif', size: 14, color: '#fff' },
    margin: { t: 50, b: 50, l: 50, r: 50 },
  };

  return (
    <div className="app-container p-6">
      <h1 className="text-2xl text-center text-white mb-6">Dynamic Data Visualization</h1>
      <div className="chart-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="chart bg-gray-900 p-5 rounded-2xl shadow-lg">
          <Plot data={scatterData} layout={{ ...layout, title: '2D Scatter Plot' }} config={{ responsive: true }} />
        </div>
        <div className="chart bg-gray-900 p-5 rounded-2xl shadow-lg">
          <Plot data={barData} layout={{ ...layout, title: 'Bar Chart' }} config={{ responsive: true }} />
        </div>
        <div className="chart bg-gray-900 p-5 rounded-2xl shadow-lg">
          <Plot data={pieData} layout={{ ...layout, title: 'Pie Chart' }} config={{ responsive: true }} />
        </div>
        <div className="chart bg-gray-900 p-5 rounded-2xl shadow-lg">
          <Plot data={heatmapData} layout={{ ...layout, title: 'Heat Map' }} config={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default TwoDGraph;
