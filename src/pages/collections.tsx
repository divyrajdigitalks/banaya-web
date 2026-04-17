import Layout from "@/components/layout/Layout";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/mock";

const CollectionsPage = () => {
  return (
    <Layout title="Our Collections">
      {/* Header */}
      <section className="bg-brand-pearl py-24 border-b border-brand-charcoal/5">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-4">Curated Spaces</p>
          <h1 className="text-5xl md:text-7xl font-serif font-black text-brand-charcoal mb-6">The Collections</h1>
          <p className="text-brand-stone max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Explore our meticulously designed furniture series, each telling a unique story of craftsmanship and modern luxury.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="space-y-32">
            {CATEGORIES.map((category, index) => (
              <div 
                key={category.id} 
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-24 items-center`}
              >
                {/* Image side */}
                <div className="w-full lg:w-3/5 group relative overflow-hidden aspect-[16/10]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-brand-charcoal/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Text side */}
                <div className="w-full lg:w-2/5 space-y-8">
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">0{index + 1} / {CATEGORIES.length}</p>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal">{category.name}</h2>
                    <p className="text-brand-stone leading-relaxed text-lg font-light">
                      Elevate your home with our signature {category.name} series. Each piece is handcrafted from premium sustainable wood, blending organic textures with contemporary silhouettes.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-6 pt-4">
                    <div className="flex items-center gap-4 text-sm text-brand-stone">
                      <span className="w-12 h-px bg-brand-gold" />
                      <span>{category.count}+ Exquisite Pieces</span>
                    </div>
                    <Link 
                      href={`/shop?category=${category.name}`}
                      className="inline-flex items-center gap-4 group text-sm font-black uppercase tracking-[0.2em] text-brand-charcoal hover:text-brand-gold transition-colors"
                    >
                      Explore Collection 
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Section */}
      <section className="py-32 bg-brand-charcoal text-brand-pearl overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-serif font-black mb-12 leading-tight">
              Bespoke <br /> <span className="text-brand-gold italic">Craftsmanship</span>
            </h2>
            <p className="text-xl text-brand-pearl/60 font-light mb-12 leading-relaxed">
              Can't find exactly what you're looking for? Our master artisans specialize in custom furniture tailored to your specific vision and space requirements.
            </p>
            <Link href="/contact">
              <button className="px-12 py-6 bg-brand-gold text-brand-charcoal font-black uppercase tracking-[0.3em] text-sm hover:bg-brand-pearl transition-all duration-500">
                Book Consultation
              </button>
            </Link>
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-10 pointer-events-none hidden xl:block">
            <span className="text-[300px] font-serif italic font-black text-brand-gold">BANAYA</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CollectionsPage;
