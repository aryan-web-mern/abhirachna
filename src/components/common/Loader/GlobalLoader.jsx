// Loader.js
import React from 'react';
import Lottie from 'lottie-react';
import LoaderLayout from './Loader.json'; 

const Loader = () => {
	return (
	   <div >
      <Lottie animationData={LoaderLayout} loop={true} />
    </div>
	);
};

export default Loader;