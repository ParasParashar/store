import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { parallaxScroll } from '@/lib/animations';
import { ShoppingBag } from 'lucide-react';

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      parallaxScroll(imageRef.current);
    }
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-black text-white"
    >
      <img
        ref={imageRef}
        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04"
        alt="Fashion Hero"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            Discover Your Style
          </h1>
          <p className="mb-8 text-lg md:text-xl">
            Explore our latest collection of premium fashion
          </p>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
}