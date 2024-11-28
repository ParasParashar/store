import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { staggerFadeIn } from '@/lib/animations';

const collections = [
  {
    id: 1,
    title: 'Summer Collection',
    image: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5',
    description: 'Light and breezy pieces for the perfect summer look',
  },
  {
    id: 2,
    title: 'Autumn Essentials',
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3',
    description: 'Cozy and stylish pieces for the fall season',
  },
  {
    id: 3,
    title: 'Winter Wardrobe',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    description: 'Stay warm and fashionable with our winter collection',
  },
];

export function FeaturedCollections() {
  const collectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (collectionsRef.current) {
      const elements = collectionsRef.current.querySelectorAll('.collection-card');
      staggerFadeIn(Array.from(elements));
    }
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Featured Collections
        </h2>
        <div
          ref={collectionsRef}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {collections.map((collection) => (
            <Link key={collection.id} to={`/collections/${collection.id}`}>
              <Card className="collection-card overflow-hidden transition-transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="h-[300px] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 p-6 text-white">
                      <h3 className="mb-2 text-xl font-semibold">
                        {collection.title}
                      </h3>
                      <p className="text-sm text-white/80">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}