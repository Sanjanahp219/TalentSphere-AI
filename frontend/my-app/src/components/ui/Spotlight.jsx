import React from 'react';
import { motion } from 'framer-motion';

export const Spotlight = ({ className, fill = "white" }) => {
  return (
    <motion.svg
      className={`pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      initial={{ opacity: 0, x: -100, y: -100, rotate: -15 }}
      animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.57"
          cy="273.89"
          rx="1924.57"
          ry="273.89"
          transform="matrix(-0.822377 -0.568943 0.568943 -0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="-408.989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </motion.svg>
  );
};
