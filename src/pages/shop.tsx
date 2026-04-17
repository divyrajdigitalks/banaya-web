import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { FEATURED_PRODUCTS, CATEGORIES } from "@/data/mock";
import { useState } from "react";
import { Filter, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");

  const filteredProducts = selectedCategory === "All" 
    ? FEATURED_PRODUCTS 
    : FEATURED_PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <Layout title="Shop All Collections">
      {/* Page Header */}
      <section className="bg-brand-pearl py-24 border-b border-brand-charcoal/5">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-4">Curated Pieces</p>
          <h1 className="text-5xl md:text-7xl font-serif font-black text-brand-charcoal mb-6">The Shop</h1>
          <p className="text-brand-stone max-w-2xl mx-auto text-lg font-light">
            Discover our complete range of masterfully crafted furniture and lifestyle objects.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 pb-8 border-b border-brand-charcoal/5 gap-8">
            <div className="flex items-center gap-10 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide">
              {["All", ...CATEGORIES.map(c => c.name)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] uppercase tracking-[0.25em] whitespace-nowrap font-black transition-all duration-300 relative ${selectedCategory === cat ? "text-brand-gold" : "text-brand-stone hover:text-brand-charcoal"}`}
                >
                  {cat}
                  {selectedCategory === cat && <motion.div layoutId="shop-cat" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-brand-gold" />}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-8 w-full md:w-auto justify-between">
              <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] hover:text-brand-gold transition-colors">
                <SlidersHorizontal className="h-4 w-4" /> Filter
              </button>
              <div className="relative group">
                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] hover:text-brand-gold transition-colors">
                  Sort: {sortBy} <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-32 text-center space-y-12">
            <div className="max-w-xs mx-auto space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-stone">Showing {filteredProducts.length} of 120 Treasures</p>
              <div className="w-full h-px bg-brand-charcoal/5 relative">
                <div className="absolute top-0 left-0 h-full bg-brand-gold w-1/4"></div>
              </div>
            </div>
            <Button variant="outline" size="lg">Load More Products</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShopPage;
