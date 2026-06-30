// import React, { useEffect, useState } from 'react';
// import SliderStyle from './slider.module.css'

// const PhotoSlider = ({ photos }) => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     if (photos.length > 0) {
//       // Generate random heights and alignments for each photo
//       const processedPhotos = photos.map(photo => ({
//         url: photo,
//         height: `${Math.floor(Math.random() * 60) + 40}%`, // Random height between 40-100%
//         align: ['start', 'center', 'end'][Math.floor(Math.random() * 3)] // Random alignment
//       }));
//       setItems(processedPhotos);
//     }
//   }, [photos]);

//   if (items.length === 0) return null;

//   return (
//     <div className={SliderStyle.sliderContainer}>
//       <div className={SliderStyle.sliderTrack}>
//         {/* Double the items for seamless looping */}
//         {[...items, ...items].map((item, index) => (
//           <div
//             key={index}
//             className={SliderStyle.sliderItem}
//             style={{
//               height: item.height,
//               alignSelf: item.align
//             }}
//           >
//             <img src={item.url} alt={`Slide ${index}`} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PhotoSlider;

import React, { useEffect, useRef } from "react";
import SliderStyle from "./slider.module.css";
import sliderImage from "../../../assets/ImageGallery.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function PhotoSlider() {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const isAnimating = useRef(false);

  const addToRefs = (el) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };

  useGSAP(() => {
    const images = imagesRef.current;
    if (images.length === 0) return;

    const slider = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      const firstImage = images[0];

      images.forEach((image, index) => {
        gsap.to(image, {
          x: "-=2202",
          duration: 10,
          ease: "none",
        });
      });

      gsap.to(firstImage, {
        // x: "+=4300",
        x: "+=4404",
        duration: "none",
        delay: 10,
        onComplete: () => {
          images.push(images.shift());
          isAnimating.current = false;
        },
      });
    };

    const interval = setInterval(slider, 1);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={SliderStyle.sliderContainer}>
      <img src={sliderImage} alt="Slider Images" ref={addToRefs} />
      <img src={sliderImage} alt="Slider Images" ref={addToRefs} />
    </div>
  );
}

export default PhotoSlider;
