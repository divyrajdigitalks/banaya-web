import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import ProductCard from "@/components/product/ProductCard";
import { FEATURED_PRODUCTS } from "@/data/mock";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useState } from "react";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(FEATURED_PRODUCTS.slice(0, 2));

  return (
    <Layout title="Your Wishlist">
      <section className="py-24 bg-brand-pearl min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">Your Selection</p>
              <h1 className="text-5xl md:text-6xl font-serif font-black text-brand-charcoal">The Wishlist</h1>
            </div>
            {wishlistItems.length > 0 && (
              <p className="text-brand-stone text-sm uppercase tracking-widest font-bold">
                {wishlistItems.length} Saved Treasures
              </p>
            )}
          </div>

          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {wishlistItems.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard {...product} />
                  <button 
                    onClick={() => setWishlistItems(items => items.filter(i => i.id !== product.id))}
                    className="absolute top-4 left-4 z-20 bg-brand-charcoal text-brand-pearl p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <span className="text-[10px] uppercase font-bold px-2">Remove</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white/50 border border-brand-charcoal/5 rounded-2xl">
              <Heart className="h-16 w-16 text-brand-gold mx-auto mb-8 stroke-[1]" />
              <h2 className="text-3xl font-serif font-bold text-brand-charcoal mb-4">Your Wishlist is Empty</h2>
              <p className="text-brand-stone mb-12 max-w-md mx-auto font-light">
                Discover our latest collections and save your favorite pieces here for later.
              </p>
              <Link href="/shop">
                <Button size="lg">Explore Shop</Button>
              </Link>
            </div>
          )}

          {/* Recommended Section */}
          {wishlistItems.length > 0 && (
            <div className="mt-32">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-serif font-bold">Complete Your Space</h2>
                <Link href="/shop" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em]">
                  Shop New Arrivals <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {FEATURED_PRODUCTS.slice(2, 6).map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default WishlistPage;
