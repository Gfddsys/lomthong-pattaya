'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimation() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if IntersectionObserver is supported (modern browsers)
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15, // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Stop observing once it's visible so it doesn't animate out and in repeatedly
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Timeout ensures DOM is fully painted after route change before querying elements
    const timeoutId = setTimeout(() => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-scale-up');
      animatedElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}
