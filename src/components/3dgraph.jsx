  // import React, { useMemo } from 'react';
  // import Plot from 'react-plotly.js';
  // import chartData from '../data/data.json';
  // import '../style/3dgraph.css';

  // const ThreeDGraph = () => {
  //   const { departments, yearlyData } = chartData;
  //   const years = yearlyData.map(item => item.year);
  //   const colors = [
  //     "#E5FFE5", "#B3FFB3", "#80FF80", "#4DFF4D", "#1AFF1A",
  //     "#00E600", "#00B300", "#008000"
  //   ];

  //   const getDistinctColors = (values) => {
  //     const valuePairs = values.map((value, index) => ({ value, index }));
  //     valuePairs.sort((a, b) => b.value - a.value);
  //     return valuePairs.map((pair, rank) => ({
  //       index: pair.index,
  //       color: colors[Math.floor((rank / (values.length - 1)) * (colors.length - 1))],
  //     })).reduce((acc, { index, color }) => { acc[index] = color; return acc; }, []);
  //   };

  //   const scatterData = useMemo(() => {
  //     const maxValues = departments.map((_, index) =>
  //       Math.max(...yearlyData.map(d => d.headcounts[index]))
  //     );
  //     const distinctColors = getDistinctColors(maxValues);

  //     return departments.map((dept, idx) => ({
  //       x: years,
  //       y: yearlyData.map(item => item.headcounts[idx]),
  //       z: yearlyData.map(item => item.headcounts[idx]),
  //       mode: 'markers+lines',
  //       type: 'scatter3d',
  //       marker: { size: 8, color: distinctColors[idx] },
  //       line: { width: 3, color: distinctColors[idx] },
  //       name: dept,
  //     }));
  //   }, [yearlyData, departments]);

  //   const radarData = useMemo(() => {
  //     const latestYearData = yearlyData[yearlyData.length - 1].headcounts;
  //     const distinctColors = getDistinctColors(latestYearData);

  //     return departments.map((dept, deptIndex) => ({
  //       type: 'scatterpolar',
  //       mode: 'lines+markers',
  //       name: dept,
  //       r: yearlyData.map(item => item.headcounts[deptIndex]),
  //       theta: years.map(String),
  //       line: { color: distinctColors[deptIndex] },
  //       marker: { size: 12, color: distinctColors[deptIndex] },
  //     }));
  //   }, [yearlyData, departments]);

  //   const heatmapData = useMemo(() => {
  //     return [{
  //       z: yearlyData.map(item => item.headcounts),
  //       x: years,
  //       y: departments,
  //       type: 'heatmap',
  //       colorscale: colors.map((color, i) => [i / (colors.length - 1), color]),
  //       hoverongaps: false,
  //     }];
  //   }, [yearlyData, departments]);

  //   return (
  //     <div className="bg-gray-900 text-white p-6">
  //       <h1 className="text-center text-2xl font-bold mb-6">3D Data Visualization</h1>
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         <div className="container bg-gray-800 p-4 rounded-lg w-full h-[400px]">
  //           <Plot
  //             data={scatterData}
  //             layout={{
  //               title: '3D Scatter Plot',
  //               autosize: true,
  //               paper_bgcolor: '#1f1f1f',
  //               plot_bgcolor: '#1f1f1f',
  //               font: { color: '#fff' },
  //             }}
  //             config={{ responsive: true, displayModeBar: true, modeBarButtonsToAdd: ['toImage'] }}
  //             className="w-full h-full"
  //           />
  //         </div>
  //         <div className="bg-gray-800 p-4 rounded-lg w-full h-[400px]">
  //           <Plot
  //             data={radarData}
  //             layout={{
  //               title: 'Radar Chart',
  //               autosize: true,
  //               paper_bgcolor: '#1f1f1f',
  //               plot_bgcolor: '#1f1f1f',
  //               font: { color: '#fff' },
  //               polar: { radialaxis: { visible: true } }
  //             }}
  //             config={{ responsive: true, displayModeBar: true, modeBarButtonsToAdd: ['toImage'] }}
  //             className="w-full h-full"
  //           />
  //         </div>
  //         <div className="bg-gray-800 p-4 rounded-lg w-full h-[400px]">
  //           <Plot
  //             data={heatmapData}
  //             layout={{
  //               title: 'Heat Map',
  //               autosize: true,
  //               paper_bgcolor: '#1f1f1f',
  //               plot_bgcolor: '#1f1f1f',
  //               font: { color: '#fff' },
  //               xaxis: { title: 'Year' },
  //               yaxis: { title: 'Departments' }
  //             }}
  //             config={{ responsive: true, displayModeBar: true, modeBarButtonsToAdd: ['toImage'] }}
  //             className="w-full h-full"
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default ThreeDGraph;



import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import chartData from '../data/data.json';

const ThreeDGraph = () => {
  const { departments, yearlyData } = chartData;
  const years = yearlyData.map(item => item.year);
  const colors = ["#E5FFE5", "#B3FFB3", "#80FF80", "#4DFF4D", "#1AFF1A", "#00E600", "#00B300", "#008000"];

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
    const maxValues = departments.map((_, index) => Math.max(...yearlyData.map(d => d.headcounts[index])));
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

  const heatmapData = useMemo(() => [{
    z: yearlyData.map(item => item.headcounts),
    x: years,
    y: departments,
    type: 'heatmap',
    colorscale: colors.map((color, i) => [i / (colors.length - 1), color]),
  }], [yearlyData, departments]);

  const layout = {
    plot_bgcolor: '#1f1f1f',
    paper_bgcolor: '#1f1f1f',
    font: { family: 'Arial, sans-serif', size: 14, color: '#fff' },
    margin: { t: 50, b: 50, l: 50, r: 50 },
  };

  return (
    <div className="bg-gray-900 text-white p-6">
      <h1 className="text-center text-2xl font-bold mb-6">3D Data Visualization</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-5 rounded-2xl shadow-lg w-full h-[400px]">
          <Plot data={scatterData} layout={{ ...layout, title: '3D Scatter Plot' }} config={{ responsive: true }} className="w-full h-full" />
        </div>
        <div className="bg-gray-800 p-5 rounded-2xl shadow-lg w-full h-[400px]">
          <Plot data={radarData} layout={{ ...layout, title: 'Radar Chart', polar: { radialaxis: { visible: true } } }} config={{ responsive: true }} className="w-full h-full" />
        </div>
        <div className="bg-gray-800 p-5 rounded-2xl shadow-lg w-full h-[400px]">
          <Plot data={heatmapData} layout={{ ...layout, title: 'Heat Map', xaxis: { title: 'Year' }, yaxis: { title: 'Departments' } }} config={{ responsive: true }} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default ThreeDGraph;
