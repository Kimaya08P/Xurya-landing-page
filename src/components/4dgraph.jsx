import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import "../style/4dgraph.css";

const FourDGraph = () => {
  const data = [
    { Department: "Finance", Total_Headcount: 96, Male_Headcount: 58, Female_Headcount: 38, Year: "2014" },
    { Department: "HR", Total_Headcount: 471, Male_Headcount: 236, Female_Headcount: 235, Year: "2014" },
    { Department: "IT", Total_Headcount: 59, Male_Headcount: 41, Female_Headcount: 18, Year: "2014" },
    { Department: "Marketing", Total_Headcount: 133, Male_Headcount: 53, Female_Headcount: 80, Year: "2014" },
    { Department: "Sales", Total_Headcount: 32, Male_Headcount: 10, Female_Headcount: 22, Year: "2014" },
    { Department: "Finance", Total_Headcount: 129, Male_Headcount: 77, Female_Headcount: 52, Year: "2015" },
    { Department: "HR", Total_Headcount: 379, Male_Headcount: 190, Female_Headcount: 189, Year: "2015" },
    { Department: "IT", Total_Headcount: 204, Male_Headcount: 143, Female_Headcount: 61, Year: "2015" },
    { Department: "Marketing", Total_Headcount: 59, Male_Headcount: 24, Female_Headcount: 35, Year: "2015" },
    { Department: "Sales", Total_Headcount: 81, Male_Headcount: 24, Female_Headcount: 57, Year: "2015" },
    { Department: "Finance", Total_Headcount: 59, Male_Headcount: 35, Female_Headcount: 24, Year: "2016" },
    { Department: "HR", Total_Headcount: 511, Male_Headcount: 256, Female_Headcount: 255, Year: "2016" },
    { Department: "IT", Total_Headcount: 200, Male_Headcount: 140, Female_Headcount: 60, Year: "2016" },
    { Department: "Marketing", Total_Headcount: 68, Male_Headcount: 27, Female_Headcount: 41, Year: "2016" },
    { Department: "Sales", Total_Headcount: 49, Male_Headcount: 15, Female_Headcount: 34, Year: "2016" }
  ];

  const processedData = useMemo(() => {
    const departments = [...new Set(data.map(d => d.Department))];
    const years = [...new Set(data.map(d => d.Year))];

    const zValues = departments.map(dept => 
      years.map(year => {
        const entry = data.find(d => d.Department === dept && d.Year === year);
        return entry ? entry.Total_Headcount : 0;
      })
    );

    const colorValues = departments.map(dept =>
      years.map(year => {
        const entry = data.find(d => d.Department === dept && d.Year === year);
        return entry ? (entry.Female_Headcount / entry.Total_Headcount) * 100 : 0;
      })
    );

    return {
      x: years,
      y: departments,
      z: zValues,
      colors: colorValues
    };
  }, [data]);

  const plotData = [{
    type: 'surface',
    x: processedData.x,
    y: processedData.y,
    z: processedData.z,
    colorscale: 'Viridis',
    surfacecolor: processedData.colors,
    colorbar: {
      title: { 
        text: 'Female %',
        font: { color: '#ffffff' }
      },
      tickfont: { color: '#ffffff' },
      ticksuffix: '%'
    },
    hoverinfo: 'text',
    text: processedData.z.map((row, i) =>
      row.map((val, j) => `Department: ${processedData.y[i]}<br>Year: ${processedData.x[j]}<br>Total: ${val}<br>Female %: ${processedData.colors[i][j].toFixed(1)}%`)
    ),
  }];

  const layout = {
    title: {
      text: 'Department Headcount Analysis (2014-2016)',
      font: { color: '#ffffff' }
    },
    paper_bgcolor: '#1e1e1e',
    plot_bgcolor: '#1e1e1e',
    scene: {
      xaxis: { 
        title: 'Year',
        gridcolor: '#444444',
        tickfont: { color: '#ffffff' },
        titlefont: { color: '#ffffff' }
      },
      yaxis: { 
        title: 'Department',
        gridcolor: '#444444',
        tickfont: { color: '#ffffff' },
        titlefont: { color: '#ffffff' }
      },
      zaxis: { 
        title: 'Total Headcount',
        gridcolor: '#444444',
        tickfont: { color: '#ffffff' },
        titlefont: { color: '#ffffff' }
      },
      camera: {
        eye: { x: 1.5, y: 1.5, z: 1.5 }
      },
      bgcolor: '#1e1e1e'
    },
    width: 800,
    height: 600,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 40
    }
  };

  return (
    <div className="app-container">
      <h1 className="text-3xl font-bold text-center mb-6">Dynamic Data Visualization</h1>
      <div className="chart-container">
        <div className="chart">
          <h2 className="text-xl font-semibold text-center mb-4">4D Scatter Chart</h2>
          <Plot
            data={plotData}
            layout={layout}
            config={{ 
              responsive: true,
              displayModeBar: true,
              modeBarButtonsToRemove: ['toImage'],
              displaylogo: false
            }}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FourDGraph;
