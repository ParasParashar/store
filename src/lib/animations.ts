import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



export const parallaxScroll = (element: Element) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
    },
    y: (_, target) => -target.offsetHeight * 0.2,
    ease: 'none',
  });
};

export const staggerFadeIn = (elements: Element[]) => {
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 60,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    }
  );
};



export const fadeInUp = (element: Element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }
  );
};

export const imageTransition = (element: Element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.9,
      x: 50
    },
    {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 0.6,
      ease: "power3.out",
    }
  );
};
