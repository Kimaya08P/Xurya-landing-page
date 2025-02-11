// import React, { useMemo } from 'react';
// import Plot from 'react-plotly.js';
// import chartData from '../data/data.json';

// const TwoDGraph = () => {
//   const { departments, yearlyData } = chartData;
//   const years = yearlyData.map(item => item.year);

//   // Green color palette from light to dark
//   const greenPalette = [
//     "#E5FFE5", // Lightest
//     "#B3FFB3",
//     "#80FF80",
//     "#4DFF4D",
//     "#1AFF1A",
//     "#00E600",
//     "#00B300",
//     "#008000"  // Darkest
//   ];

//   const getColorForValue = (value, minValue, maxValue) => {
//     const normalizedValue = (maxValue - minValue) === 0 
//       ? 0.5 
//       : (value - minValue) / (maxValue - minValue);
//     const colorIndex = Math.floor(normalizedValue * (greenPalette.length - 1));
//     return greenPalette[colorIndex];
//   };

//   const scatterData = useMemo(() => {
//     const allHeadcounts = yearlyData.flatMap(item => item.headcounts);
//     const minValue = Math.min(...allHeadcounts);
//     const maxValue = Math.max(...allHeadcounts);

//     return departments.map((dept, idx) => {
//       const headcounts = yearlyData.map(item => item.headcounts[idx]);
//       const maxDeptValue = Math.max(...headcounts);
//       const color = getColorForValue(maxDeptValue, minValue, maxValue);

//       return {
//         x: years,
//         y: headcounts,
//         mode: 'lines+markers',
//         type: 'scatter',
//         marker: { size: 8, color },
//         line: { width: 3, color },
//         name: `${dept} (Max: ${maxDeptValue})`,
//       };
//     });
//   }, [yearlyData, departments]);

//   const barData = useMemo(() => {
//     const allHeadcounts = yearlyData.flatMap(item => item.headcounts);
//     const minValue = Math.min(...allHeadcounts);
//     const maxValue = Math.max(...allHeadcounts);

//     return departments.map((dept, idx) => {
//       const headcounts = yearlyData.map(item => item.headcounts[idx]);
//       const maxDeptValue = Math.max(...headcounts);
//       const color = getColorForValue(maxDeptValue, minValue, maxValue);

//       return {
//         x: years,
//         y: headcounts,
//         type: 'bar',
//         marker: { color },
//         name: dept,
//       };
//     });
//   }, [yearlyData, departments]);

//   const pieData = useMemo(() => {
//     const latestYearData = yearlyData[yearlyData.length - 1].headcounts;
//     const minValue = Math.min(...latestYearData);
//     const maxValue = Math.max(...latestYearData);

//     const colors = latestYearData.map(value => 
//       getColorForValue(value, minValue, maxValue)
//     );

//     return [{
//       labels: departments,
//       values: latestYearData,
//       type: 'pie',
//       marker: { colors },
//     }];
//   }, [yearlyData, departments]);

//   const layout = {
//     plot_bgcolor: '#1f1f1f',
//     paper_bgcolor: '#1f1f1f',
//     font: { family: 'Arial, sans-serif', size: 14, color: '#fff' },
//     margin: { t: 50, b: 50, l: 50, r: 50 },
//     grid: { rows: 2, columns: 2, pattern: 'independent' },
//     xaxis: { gridcolor: '#444', zerolinecolor: '#444' },
//     yaxis: { gridcolor: '#444', zerolinecolor: '#444' },
//   };

//   return (
//     <div className="grid grid-cols-2 gap-6 p-6 bg-gray-900">
//       <div className="bg-gray-800 p-4 rounded-lg">
//         <Plot 
//           data={scatterData} 
//           layout={{ ...layout, title: 'Department Growth Trends' }} 
//           config={{ responsive: true }}
//           className="w-full h-full" 
//         />
//       </div>
//       <div className="bg-gray-800 p-4 rounded-lg">
//         <Plot 
//           data={barData} 
//           layout={{ ...layout, title: 'Yearly Department Size' }} 
//           config={{ responsive: true }}
//           className="w-full h-full" 
//         />
//       </div>
//       <div className="bg-gray-800 p-4 rounded-lg">
//         <Plot 
//           data={pieData} 
//           layout={{ ...layout, title: 'Current Department Distribution' }} 
//           config={{ responsive: true }}
//           className="w-full h-full" 
//         />
//       </div>
//     </div>
//   );
// };

// export default TwoDGraph;

import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import chartData from '../data/data.json';
// import '../style/2dchart.css';

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
