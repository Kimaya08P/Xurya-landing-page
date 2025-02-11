import React, { useState } from "react";
import TwoDGraph from './components/2dgraph';
import ThreeDGraph from './components/3dgraph';
import FourDGraph from './components/4dgraph';

const App = () => {
  const [graphType, setGraphType] = useState('2D');

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-100">
          Department Headcount Analysis Dashboard
        </h1>
        
        <div className="flex justify-center gap-4 mb-8">
          <button 
            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200
              ${graphType === '2D' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
            onClick={() => setGraphType('2D')} 
          >
            2D View
          </button>
          <button 
            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200
              ${graphType === '3D' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
            onClick={() => setGraphType('3D')}
          >
            3D View
          </button>
          <button 
            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200
              ${graphType === '4D' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
            onClick={() => setGraphType('4D')}
          >
            4D View
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-lg p-6">
          {graphType === '2D' && <TwoDGraph />}
          {graphType === '3D' && <ThreeDGraph />}
          {graphType === '4D' && <FourDGraph />}
        </div>
      </div>
    </div>
  );
};

export default App;