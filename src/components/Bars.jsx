import React from "react";
import { motion } from "framer-motion";

const Bars = ({ array }) => {
  return (
    <div className="flex items-end space-x-2 mb-6">
      {array.map((value, index) => (
        <motion.div
          key={index}
          className="bg-blue-500 w-8"
          style={{ height: `${value * 3}px` }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
};

export default Bars;
