// Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" />
            </svg>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              RoadToll Calculator
            </h1>
          </div>
        </div>
        <p className="mt-2 text-center text-white text-opacity-80 text-sm font-medium">
          Plan your journey with accurate toll costs across India
        </p>
      </div>
    </header>
  );
};

export default Header;

// // Header.js
// import React from 'react';

// const Header = () => {
//   return (
//     <header className='text-white font-black text-3xl bg-black px-10 py-5 text-center'>
//       <h1>Welcome to Toll Calculator</h1>
//       <nav>
       
//       </nav>
//     </header>
//   );
// };

// export default Header;