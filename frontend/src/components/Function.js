import React, { useState } from 'react';
import axios from 'axios';

const FunctionComponent = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [tollFees, setTollFees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    console.log('Submit button clicked');
    event.preventDefault();
    
    // Basic validation
    if (!input1.trim() || !input2.trim()) {
      setError('Please enter both starting location and destination');
      return;
    }
    
    setError('');
    setLoading(true);

    const options = {
      method: 'POST',
      url: 'https://toll-calculator.onrender.com/api',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        from: { address: input1 },
        to: { address: input2 },
      },
    };
    console.log('Options***:', options);

    try {
      console.log('Making API request...');
      const { data } = await axios.request(options);
      console.log('API Response:', data);

      const routesData = data.routes.map(route => ({
        maxTollCost: route.maxTollCost || 'N/A',
        minTollCost: route.minTollCost || 'N/A',
        distance: route.distance || 'N/A',
        estimatedTime: route.estimatedTime || 'N/A',
        mapUrl: route.mapUrl || '',
      }));

      setTollFees(routesData);
    } catch (error) {
      console.error(error);
      setError('Failed to calculate toll fees. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="md:flex h-screen max-h-[700px]">
          {/* Left side - Input form */}
          <div className="md:w-1/2 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculate Your Route Tolls</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="input1" className="block text-sm font-medium text-gray-700 mb-1">
                  Starting Location
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="input1"
                    placeholder="City, State, Country"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="input2" className="block text-sm font-medium text-gray-700 mb-1">
                  Destination Location
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="input2"
                    placeholder="City, State, Country"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Calculate Tolls
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tips for accurate results
              </h3>
              <ul className="mt-2 text-sm text-blue-700 space-y-1 list-disc pl-3">
                <li className="flex items-start ml-0">
                  <span className="block ml-[-4px]">Enter specific locations for better accuracy</span>
                </li>
                <li className="flex items-start ml-0">
                  <span className="block ml-[-4px]">Include district/city, state and country</span>
                </li>
                <li className="flex items-start ml-0">
                  <span className="block ml-[-4px]">For example: "Mumbai, Maharashtra, India"</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right side - Results - Now with scrolling */}
          <div className="md:w-1/2 bg-white flex flex-col h-full">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">Route Information</h2>
            </div>
            
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto p-8 pt-4">
              {loading && (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-600">Calculating your routes...</p>
                </div>
              )}
              
              {!loading && tollFees.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" />
                  </svg>
                  <p className="mt-4 text-gray-500">Enter your route details to calculate toll fees</p>
                </div>
              )}
              
              {!loading && tollFees.length > 0 && (
                <div className="space-y-4">
                  {tollFees.map((fee, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-bold text-blue-800">Route {index + 1}</h3>
                        {fee.mapUrl && (
                          <a
                            href={fee.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1 border border-blue-300 text-sm leading-5 font-medium rounded-full text-blue-700 bg-blue-50 hover:bg-blue-100 transition duration-150 ease-in-out"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Map
                          </a>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="text-xs text-gray-500 uppercase">Distance</p>
                          <p className="text-lg font-semibold text-gray-800">{fee.distance}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="text-xs text-gray-500 uppercase">Estimated Time</p>
                          <p className="text-lg font-semibold text-gray-800">{fee.estimatedTime}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="text-xs text-gray-500 uppercase">Min Toll Fee</p>
                          <p className="text-lg font-semibold text-green-600">₹{fee.minTollCost}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="text-xs text-gray-500 uppercase">Max Toll Fee</p>
                          <p className="text-lg font-semibold text-red-600">₹{fee.maxTollCost}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} RoadToll Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FunctionComponent;
