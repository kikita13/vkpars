"use client";

import { useEffect, useState } from "react";

export const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      };

      setScrollPosition(window.scrollY);

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return scrollPosition;
};
