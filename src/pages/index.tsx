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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <Layout title="Modern Wooden Luxury">
      <div ref={containerRef}>
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden sticky top-0 z-0">
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
        <div className="relative z-10 bg-brand-pearl shadow-[0_-50px_100px_rgba(0,0,0,0.2)] rounded-t-[5rem]">
          
          {/* Brand Ethos */}
          <section className="py-32">
            <div className="container mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-12"
                >
                  <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-black">Our Philosophy</p>
                  <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-charcoal leading-tight">
                    Designed for <br /> <span className="italic">Generations.</span>
                  </h2>
                  <p className="text-brand-stone text-xl font-light leading-relaxed max-w-xl">
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
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_50px_100px_rgba(0,0,0,0.15)] perspective-1000"
                >
                  <Image 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000" 
                    alt="Crafting Process" 
                    fill 
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* 3D Grid Reveal: Category Highlights */}
          <section className="py-32 bg-white">
            <div className="container mx-auto px-6 md:px-12">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="max-w-xl space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-black">Curated Spaces</p>
                  <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-charcoal">The Collection</h2>
                </div>
                <Link href="/collections" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal">
                  View All Series <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
                        <p className="text-[10px] uppercase tracking-[0.3em] mb-4 text-brand-gold font-bold">0{index + 1}</p>
                        <h3 className="text-4xl font-serif font-bold text-brand-pearl mb-6">{category.name}</h3>
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
          <section className="py-32 bg-brand-pearl">
            <div className="container mx-auto px-6 md:px-12">
              <div className="text-center mb-24 space-y-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-black">Signature Pieces</p>
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-charcoal">Iconic Design</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
                {FEATURED_PRODUCTS.map((product, idx) => (
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

              <div className="mt-24 text-center">
                <Button variant="outline" size="lg" className="rounded-full px-12 border-brand-charcoal/10 hover:bg-brand-charcoal hover:text-brand-pearl transition-all duration-500">
                  Discover All Pieces
                </Button>
              </div>
            </div>
          </section>

          {/* Trust Section: High Luxury Layout */}
          <section className="py-32 bg-brand-charcoal text-brand-pearl overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 relative z-10">
                {[
                  { icon: Truck, title: "White Glove", desc: "Professional placement in your room of choice" },
                  { icon: ShieldCheck, title: "10Y Warranty", desc: "Built to last generations with structural guarantee" },
                  { icon: RefreshCcw, title: "30-Day Return", desc: "Complete peace of mind for every investment" },
                  { icon: Clock, title: "Concierge", desc: "Dedicated support for your design journey" },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="space-y-6 text-center lg:text-left"
                  >
                    <div className="h-16 w-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 border border-brand-gold/20">
                      <item.icon className="h-8 w-8 text-brand-gold stroke-[1.5]" />
                    </div>
                    <h4 className="text-xl font-serif font-bold text-brand-gold uppercase tracking-widest">{item.title}</h4>
                    <p className="text-brand-pearl/50 font-light text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none">
                <span className="text-[300px] font-serif font-black italic">TRUST</span>
              </div>
            </div>
          </section>

          {/* Testimonials: Premium Layout */}
          <section className="py-32 bg-brand-pearl">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-5xl mx-auto space-y-24">
                <div className="text-center space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-black">Testimonials</p>
                  <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-charcoal">Voice of Curation</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {TESTIMONIALS.map((testimonial, idx) => (
                    <motion.div 
                      key={testimonial.id} 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.2 }}
                      className="bg-white p-12 rounded-[2.5rem] shadow-2xl space-y-8 relative group hover:-translate-y-4 transition-transform duration-500"
                    >
                      <div className="flex text-brand-gold">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-brand-gold stroke-none" />
                        ))}
                      </div>
                      <p className="text-brand-charcoal text-lg font-serif italic leading-relaxed">"{testimonial.content}"</p>
                      <div className="pt-8 border-t border-brand-charcoal/5">
                        <p className="font-black text-[10px] uppercase tracking-widest text-brand-charcoal">{testimonial.name}</p>
                        <p className="text-[9px] text-brand-stone uppercase tracking-widest mt-1">{testimonial.role}</p>
                      </div>
                      <div className="absolute top-10 right-10 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                        <Star className="h-12 w-12 text-brand-charcoal" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Social Proof: Immersive Slider */}
         <section className="py-32 bg-white overflow-hidden">
  <div className="container mx-auto px-6 md:px-12 mb-20 text-center">
    <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-black mb-4">
      #BanayaLifestyle
    </p>
    <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal">
      Immersive Living
    </h2>
  </div>

  <div className="flex gap-8 overflow-hidden px-6">
    <motion.div
      animate={{ x: [0, -2000] }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="flex gap-8 shrink-0"
    >
      <div className="relative aspect-square w-80 md:w-[450px] shrink-0 overflow-hidden rounded-[3rem] shadow-xl group">
        <Image
          src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8THV4dXJ5JTIwTGl2aW5nJTIwUm9vbXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Luxury Living Room"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      </div>

      <div className="relative aspect-square w-80 md:w-[450px] shrink-0 overflow-hidden rounded-[3rem] shadow-xl group">
        <Image
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800"
          alt="Modern Sofa"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      </div>

      <div className="relative aspect-square w-80 md:w-[450px] shrink-0 overflow-hidden rounded-[3rem] shadow-xl group">
        <Image
          src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800"
          alt="Dining Set"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      </div>

      <div className="relative aspect-square w-80 md:w-[450px] shrink-0 overflow-hidden rounded-[3rem] shadow-xl group">
        <Image
          src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Bedroom"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      </div>

      <div className="relative aspect-square w-80 md:w-[450px] shrink-0 overflow-hidden rounded-[3rem] shadow-xl group">
        <Image
          src="https://images.unsplash.com/photo-1535957998253-26ae1ef29506?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V29ya3NwYWNlfGVufDB8fDB8fHww"
          alt="Workspace"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      </div>
    </motion.div>
  </div>
</section>

        </div>
      </div>
    </Layout>
  );
}
