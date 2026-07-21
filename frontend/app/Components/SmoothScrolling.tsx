"use client";

import { ReactNode, useEffect } from 'react';

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Apply native smooth scrolling to the HTML element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Clean up when unmounted
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return <>{children}</>;
}
