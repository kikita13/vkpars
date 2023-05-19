'use client'
import { useEffect, useState } from "react";


export const useResize = () => {
  const [width, setWidth] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return width;
};
