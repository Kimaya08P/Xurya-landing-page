import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import chartData from '../data/data.json';
import '../style/3dgraph.css';

const ThreeDGraph = () => {
  const { departments, yearlyData } = chartData;
  const years = yearlyData.map(item => item.year);
  const colors = ["#8AFF8A", "#00FF00", "#00D100", "#00A300", "#007500"];

  const getDistinctColors = (values) => {
    const valuePairs = values.map((value, index) => ({ value, index }));
    valuePairs.sort((a, b) => b.value - a.value);
    return valuePairs.map((pair, rank) => ({
      index: pair.index,
      color: colors[Math.floor((rank / (values.length - 1)) * (colors.length - 1))],
    })).reduce((acc, { index, color }) => { acc[index] = color; return acc; }, []);
  };

  const scatterData = useMemo(() => {
    const maxValues = departments.map((_, index) =>
      Math.max(...yearlyData.map(d => d.headcounts[index]))
    );
    const distinctColors = getDistinctColors(maxValues);

    return departments.map((dept, idx) => ({
      x: years,
      y: yearlyData.map(item => item.headcounts[idx]),
      z: yearlyData.map(item => item.headcounts[idx]),
      mode: 'markers+lines',
      type: 'scatter3d',
      marker: { size: 8, color: distinctColors[idx] },
      line: { width: 3, color: distinctColors[idx] },
      name: dept,
    }));
  }, [yearlyData, departments]);

  const radarData = useMemo(() => {
    const latestYearData = yearlyData[yearlyData.length - 1].headcounts;
    const distinctColors = getDistinctColors(latestYearData);

    return departments.map((dept, deptIndex) => ({
      type: 'scatterpolar',
      mode: 'lines+markers',
      name: dept,
      r: yearlyData.map(item => item.headcounts[deptIndex]),
      theta: years.map(String),
      line: { color: distinctColors[deptIndex] },
      marker: { size: 12, color: distinctColors[deptIndex] },
    }));
  }, [yearlyData, departments]);

  const heatmapData = useMemo(() => {
    return [{
      z: yearlyData.map(item => item.headcounts),
      x: years,
      y: departments,
      type: 'heatmap',
      colorscale: colors.map((color, i) => [i / (colors.length - 1), color]),
      hoverongaps: false,
    }];
  }, [yearlyData, departments]);

  return (
    <div className="app-container">
      <h1>3D Data Visualization</h1>
      <div className="chart-container">
        <div className="chart">
          <Plot
            data={scatterData}
            layout={{ title: '3D Scatter Plot', autosize: true }}
            config={{ responsive: true }}
            className="js-plotly-plot"
          />
        </div>
        <div className="chart">
          <Plot
            data={radarData}
            layout={{
              title: 'Radar Chart',
              autosize: true,
              polar: { radialaxis: { visible: true } }
            }}
            config={{ responsive: true }}
            className="js-plotly-plot"
          />
        </div>
        <div className="chart">
          <Plot
            data={heatmapData}
            layout={{
              title: 'Heat Map',
              autosize: true,
              xaxis: { title: 'Year' },
              yaxis: { title: 'Departments' }
            }}
            config={{ responsive: true }}
            className="js-plotly-plot"
          />
        </div>
      </div>
    </div>
  );
};

export default ThreeDGraph;
