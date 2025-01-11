import React, { useState } from 'react';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key

const FunctionComponent = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [tollFees, setTollFees] = useState([]);  // Initialize tollFees as an empty array
  const [loading, setLoading] = useState(false); // State for loading

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Show loader when the request is in progress
    setLoading(true);

    const options = {
      method: 'POST',
      url: 'http://localhost:5000/api',  // Backend API endpoint
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        from: { address: input1 },
        to: { address: input2 },
      },
    };

    try {
      const { data } = await axios.request(options);
      console.log('API Response:', data);

      const routesData = data.routes.map(route => ({
        maxTollCost: route.maxTollCost || 'N/A',
        minTollCost: route.minTollCost || 'N/A',
        distance: route.distance || 'N/A',  // Add distance
        estimatedTime: route.estimatedTime || 'N/A',  // Add estimated time
        mapUrl: route.mapUrl || '',
      }));

      setTollFees(routesData);
    } catch (error) {
      console.error(error);
    } finally {
      // Hide loader after the request completes
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="input1" className="block text-gray-700 font-bold mb-2">Starting Location</label>
            <input
              type="text"
              placeholder="District, State, Country"
              id="input1"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="input2" className="block text-gray-700 font-bold mb-2">Destination Location</label>
            <input
              type="text"
              placeholder="District, State, Country"
              id="input2"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>

      {/* {loading && (
        <div className=" justify-center mt-4">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 rounded-full" role="status">
          </div>
            <span className="visually-hidden mt-4">Loading...</span>
        </div>
      )} */}

      <div className="align-middle">
        {tollFees.length > 0 && (
          <div className="mt-4 p-4 bg-green-100 rounded-lg">
            <h2 className="font-bold text-xl text-red-800">Toll Fees for Each Route:</h2>
            <table className="w-full mt-4 border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">Route</th>
                  <th className="border p-2 text-left">Max Toll Fee (₹)</th>
                  <th className="border p-2 text-left">Min Toll Fee (₹)</th>
                  <th className="border p-2 text-left">Distance</th>
                  <th className="border p-2 text-left">Estimated Time</th>
                  <th className="border p-2 text-left">Map</th>
                </tr>
              </thead>
              <tbody>
                {tollFees.map((fee, index) => (
                  <tr key={index}>
                    <td className="border p-2">{`Route ${index + 1}`}</td>
                    <td className="border p-2">{fee.maxTollCost}</td>
                    <td className="border p-2">{fee.minTollCost}</td>
                    <td className="border p-2">{fee.distance}</td>
                    <td className="border p-2">{fee.estimatedTime}</td>
                    <td className="border p-2">
                      {fee.mapUrl && (
                        <a
                          href={fee.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline hover:text-blue-700"
                        >
                          Open Map
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default FunctionComponent;



// import React, { useState } from 'react';
// import axios from 'axios';


// const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key



// const FunctionComponent = () => {
//   const [input1, setInput1] = useState('');
//   const [input2, setInput2] = useState('');
//   const [tollFees, setTollFees] = useState([]);  // Initialize tollFees as an empty array

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const options = {
//       method: 'POST',
//       url: 'http://localhost:5000/api',  // Backend API endpoint
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       data: {
//         from: { address: input1 },
//         to: { address: input2 },
//       },
//     };

//     try {
//       const { data } = await axios.request(options);
//       console.log('API Response:', data);

//       const routesData = data.routes.map(route => ({
//         maxTollCost: route.maxTollCost || 'N/A',
//         minTollCost: route.minTollCost || 'N/A',
//         distance: route.distance || 'N/A',  // Add distance
//         estimatedTime: route.estimatedTime || 'N/A',  // Add estimated time
//         mapUrl: route.mapUrl || '',
//       }));

//       setTollFees(routesData);

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//     <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="input1" className="block text-gray-700 font-bold mb-2">Starting Location</label>
//           <input
//             type="text"
//             placeholder="District, State, Country"
//             id="input1"
//             value={input1}
//             onChange={(e) => setInput1(e.target.value)}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="input2" className="block text-gray-700 font-bold mb-2">Destination Location</label>
//           <input
//             type="text"
//             placeholder="District, State, Country"
//             id="input2"
//             value={input2}
//             onChange={(e) => setInput2(e.target.value)}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300" disabled={loading}>
//           {loading ? 'Loading...' : 'Submit'}
//         </button>
//       </form>
//     </div>

//     {loading && (
//         <div className="flex justify-center mt-4">
//           <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 rounded-full" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//     )}

//     <div className='align-middle' >
//     {tollFees.length > 0 && (
//         <div className="mt-4 p-4 bg-green-100 rounded-lg">
//           <h2 className="font-bold text-xl text-red-800">Toll Fees for Each Route:</h2>
//           <table className="w-full mt-4 border-collapse">
//             <thead>
//               <tr>
//                 <th className="border p-2 text-left">Route</th>
//                 <th className="border p-2 text-left">Max Toll Fee (₹)</th>
//                 <th className="border p-2 text-left">Min Toll Fee (₹)</th>
//                 <th className="border p-2 text-left">Distance</th>
//                 <th className="border p-2 text-left">Estimated Time</th>
//                 <th className="border p-2 text-left">Map</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tollFees.map((fee, index) => (
//                 <tr key={index}>
//                   <td className="border p-2">{`Route ${index + 1}`}</td>
//                   <td className="border p-2">{fee.maxTollCost}</td>
//                   <td className="border p-2">{fee.minTollCost}</td>
//                   <td className="border p-2">{fee.distance}</td>
//                   <td className="border p-2">{fee.estimatedTime}</td>
//                   <td className="border p-2">
//                     {fee.mapUrl && (
//                       <a
//                         href={fee.mapUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500 underline hover:text-blue-700"
//                       >
//                         Open Map
//                       </a>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default FunctionComponent;