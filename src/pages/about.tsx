import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const AboutPage = () => {
  return (
    <Layout title="Our Story">
      <div className="flex flex-row h-full">
        {/* Hero */}
        <section className="relative h-full w-screen flex items-center justify-center text-center text-white overflow-hidden horizontal-scroll-section">
        <Image
          src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=2000"
          alt="Our Workshop"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Our Story</h1>
          <p className="text-xl text-brand-beige max-w-2xl mx-auto uppercase tracking-widest">Crafting a legacy of luxury and nature.</p>
        </div>
      </section>

      {/* Philosophy */}
        <section className="py-16 bg-white horizontal-scroll-section">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-square h-[500px] lg:h-[600px]">
                <Image
                  src="https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=1200"
                  alt="Craftsmanship"
                  fill
                  className="object-cover rounded-3xl shadow-2xl"
                />
              </div>
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal">Design with Purpose, <br />Crafted by Hand.</h2>
                <p className="text-lg text-brand-charcoal/70 leading-relaxed">
                  Founded in 2018, Banaya was born out of a passion for the natural beauty of wood and a desire to bring timeless craftsmanship into the modern Indian home.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <h4 className="text-3xl font-serif font-bold text-brand-gold">100%</h4>
                    <p className="text-xs uppercase tracking-widest text-brand-neutral">Sustainable Wood</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-serif font-bold text-brand-gold">50+</h4>
                    <p className="text-xs uppercase tracking-widest text-brand-neutral">Master Artisans</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 bg-brand-walnut text-brand-ivory horizontal-scroll-section">
          <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Our Mission</h2>
            <p className="text-xl md:text-2xl font-serif italic text-brand-beige leading-relaxed mb-10">
              "To transform every house into a sanctuary of warmth and elegance through the timeless beauty of wood and superior modern design."
            </p>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-charcoal">
              Join Our Journey
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
