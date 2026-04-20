import Layout from "@/components/layout/Layout";
import { Button, cn } from "@/components/ui/Button";
import ProductCard from "@/components/product/ProductCard";
import { CATEGORIES, FEATURED_PRODUCTS, TESTIMONIALS } from "@/data/mock";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Truck, ShieldCheck, Clock, RefreshCcw } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({
    target: containerRef,
    axis: "x",
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollXProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollXProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollXProgress, [0, 0.2], [0, 100]);

  return (
    <Layout title="Modern Wooden Luxury">
      <div ref={containerRef} className="flex flex-row h-full">
        {/* Hero Section */}
        <section className="relative h-full w-screen overflow-hidden shrink-0 horizontal-scroll-section">
          <motion.div 
            style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000"
              alt="Premium Furniture Hero"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-charcoal/40" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center text-center text-brand-pearl">
            <div className="container px-6">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mb-8 text-brand-gold"
              >
                The Essence of Craftsmanship
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-black mb-12 leading-[0.9] tracking-tighter"
              >
                Timeless <br /> <span className="italic font-light">Elegance.</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-8"
              >
                <Button size="lg" className="min-w-[240px] bg-brand-gold text-brand-charcoal hover:bg-brand-pearl shadow-[0_20px_50px_rgba(212,175,55,0.3)]">
                  Explore Collection
                </Button>
                <Link href="/calculator">
                  <Button variant="outline" size="lg" className="min-w-[240px] border-brand-pearl text-brand-pearl hover:bg-brand-pearl hover:text-brand-charcoal transition-all duration-500">
                    Interior Calculator
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            style={{ opacity: heroOpacity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-pearl/60 font-bold">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-brand-gold to-transparent" />
          </motion.div>
        </section>

        {/* Parallax Content Container */}
        <div className="relative flex flex-row h-full">
          
          {/* Brand Ethos */}
          <section className="py-16 shrink-0 w-screen horizontal-scroll-section">
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-black">Our Philosophy</p>
                  <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-charcoal leading-tight">
                    Designed for <br /> <span className="italic">Generations.</span>
                  </h2>
                  <p className="text-brand-stone text-lg font-light leading-relaxed max-w-xl">
                    We believe that furniture is more than just utility. It's an investment in your legacy. Every piece we craft is a testament to the enduring beauty of natural wood and the precision of master artisans.
                  </p>
                  <Link href="/about" className="inline-flex items-center gap-4 group text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal">
                    Learn Our Story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </Link>
                </motion.div>

              <motion.div
  initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
  className="relative w-full h-[500px] lg:h-[650px] overflow-hidden rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.2)]"
>
  <Image
    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200"
    alt="Crafting Process"
    fill
    className="object-cover"
  />
</motion.div>
              </div>
            </div>
          </section>

          {/* 3D Grid Reveal: Category Highlights */}
          <section className="py-16 horizontal-scroll-section">
            <div className="container mx-auto px-6 md:px-12">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-xl space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-black">Curated Spaces</p>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal">The Collection</h2>
                </div>
                <Link href="/collections" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal">
                  View All Series <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {CATEGORIES.slice(0, 3).map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 50, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <Link
                      href={`/shop?category=${category.name}`}
                      className="group relative aspect-[3/4] overflow-hidden rounded-3xl block shadow-2xl"
                    >
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute bottom-10 left-10 right-10">
                        <p className="text-[10px] uppercase tracking-[0.3em] mb-3 text-brand-gold font-bold">0{index + 1}</p>
                        <h3 className="text-3xl font-serif font-bold text-brand-pearl mb-4">{category.name}</h3>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-brand-pearl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                          Explore <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Iconic Design: Featured Products */}
          <section className="py-16 bg-brand-pearl horizontal-scroll-section">
            <div className="container mx-auto px-6 md:px-12">
              <div className="text-center mb-12 space-y-3">
                <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-black">Signature Pieces</p>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal">Iconic Design</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {FEATURED_PRODUCTS.slice(0, 4).map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button variant="outline" size="lg" className="rounded-full px-10 border-brand-charcoal/10 hover:bg-brand-charcoal hover:text-brand-pearl transition-all duration-500">
                  Discover All Pieces
                </Button>
              </div>
            </div>
          </section>

          {/* Trust Section: High Luxury Layout */}
   <section className="min-h-screen flex items-center py-20 bg-brand-charcoal text-brand-pearl overflow-hidden horizontal-scroll-section">
  <div className="container mx-auto px-6 md:px-12 relative w-full">
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 relative z-10">
      {[
        { icon: Truck, title: "White Glove", desc: "Professional placement at your doorstep with premium care and setup service." },
        { icon: ShieldCheck, title: "10Y Warranty", desc: "Crafted for durability and backed by a long-term trusted warranty." },
        { icon: RefreshCcw, title: "30-Day Return", desc: "Try with confidence and return easily within 30 days." },
        { icon: Clock, title: "Concierge", desc: "Dedicated support team ready to assist whenever needed." },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.15 }}
          className="text-center lg:text-left space-y-5 p-6 rounded-2xl border border-brand-gold/10 bg-white/[0.02] backdrop-blur-sm"
        >
          <div className="h-14 w-14 bg-brand-gold/10 rounded-xl flex items-center justify-center mx-auto lg:mx-0 border border-brand-gold/20">
            <item.icon className="h-7 w-7 text-brand-gold stroke-[1.5]" />
          </div>

          <h4 className="text-lg md:text-xl font-serif font-bold text-brand-gold uppercase tracking-[0.2em]">
            {item.title}
          </h4>

          <p className="text-sm md:text-base text-brand-pearl/75 leading-relaxed font-light">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>

    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
      <span className="text-[120px] md:text-[180px] lg:text-[240px] font-serif font-black italic whitespace-nowrap">
        TRUST
      </span>
    </div>

  </div>
</section>

          {/* Testimonials: Premium Layout */}
          <section className="py-16 bg-brand-pearl horizontal-scroll-section">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-black">Testimonials</p>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal">Voice of Curation</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {TESTIMONIALS.map((testimonial, idx) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.2 }}
                      className="bg-white p-10 rounded-3xl shadow-2xl space-y-6 relative group hover:-translate-y-4 transition-transform duration-500"
                    >
                      <div className="flex text-brand-gold">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-brand-gold stroke-none" />
                        ))}
                      </div>
                      <p className="text-brand-charcoal text-lg font-serif italic leading-relaxed">"{testimonial.content}"</p>
                      <div className="pt-6 border-t border-brand-charcoal/5">
                        <p className="font-black text-[10px] uppercase tracking-widest text-brand-charcoal">{testimonial.name}</p>
                        <p className="text-[9px] text-brand-stone uppercase tracking-widest mt-1">{testimonial.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Social Proof: Immersive Slider */}
          <section className="py-16 overflow-hidden horizontal-scroll-section">
            <div className="container mx-auto px-6 md:px-12 mb-12 text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-black mb-3">
                #BanayaLifestyle
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal">
                Immersive Living
              </h2>
            </div>

            <div className="flex gap-6 overflow-hidden px-6">
              <motion.div
                animate={{ x: [0, -1200] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-6 shrink-0"
              >
                {[
                  "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800",
                  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
                  "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
                  "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800",
                  "https://images.unsplash.com/photo-1535957998253-26ae1ef29506?w=800"
                ].map((src, i) => (
                  <div key={i} className="relative aspect-square w-72 md:w-80 shrink-0 overflow-hidden rounded-3xl shadow-xl group">
                    <Image
                      src={src}
                      alt={`Social ${i}`}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
}
