import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTrendingProducts } from '@/hooks/useProducts';
import { staggerFadeIn } from '@/lib/animations';

export function TrendingProducts() {
  const { data, isLoading } = useTrendingProducts();
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (productsRef.current && !isLoading) {
      const elements = productsRef.current.querySelectorAll('.product-card');
      staggerFadeIn(Array.from(elements));
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const products = data?.pages[0]?.products || [];

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Trending Now
        </h2>
        <div ref={productsRef}>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Link to={`/products/${product.id}`}>
                    <Card className="product-card">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-[400px] w-full object-cover"
                          />
                          {!product.inStock && (
                            <Badge
                              variant="destructive"
                              className="absolute right-4 top-4"
                            >
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start gap-2 p-4">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-xl font-bold">
                          ${product.price.toFixed(2)}
                        </p>
                      </CardFooter>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}