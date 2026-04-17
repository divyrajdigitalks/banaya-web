import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { FEATURED_PRODUCTS } from "@/data/mock";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Truck, Shield, RefreshCw, Heart, Share2, Plus, Minus, ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  const product = FEATURED_PRODUCTS.find(p => p.id === id) || FEATURED_PRODUCTS[0];

  const images = [
    product.image,
    product.hoverImage || product.image,
    "https://images.unsplash.com/photo-1554295405-abb8fd54f153?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&q=80&w=800",
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <Layout title={`${product.name} | Banaya`}>
      <section className="py-12 md:py-24 bg-brand-pearl">
        <div className="container mx-auto px-6 md:px-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] text-brand-stone mb-12">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span className="h-px w-4 bg-brand-charcoal/10" />
            <Link href="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
            <span className="h-px w-4 bg-brand-charcoal/10" />
            <span className="text-brand-charcoal">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Gallery */}
            <div className="space-y-6">
              <div className="relative aspect-[4/5] bg-white overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-700"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setMainImage(img)}
                    className={`relative aspect-square bg-white overflow-hidden rounded-xl border-2 transition-all duration-300 ${mainImage === img ? "border-brand-gold scale-95" : "border-transparent grayscale hover:grayscale-0"}`}
                  >
                    <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col pt-8 lg:pt-0">
              <div className="mb-10 space-y-4">
                <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-black">{product.category}</p>
                <h1 className="text-5xl md:text-6xl font-serif font-black text-brand-charcoal leading-tight">{product.name}</h1>
                <div className="flex items-center gap-6">
                  <div className="flex text-brand-gold">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-brand-gold stroke-none" />)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-stone border-l border-brand-charcoal/10 pl-6">48 Verified Reviews</span>
                </div>
                <p className="text-4xl font-serif font-bold text-brand-charcoal pt-4">₹{product.price.toLocaleString()}</p>
              </div>

              <p className="text-brand-stone text-lg font-light leading-relaxed mb-10">
                A masterpiece of modern joinery. Expertly hand-rubbed with natural oils, this {product.name} embodies our commitment to sustainable luxury and structural perfection.
              </p>

              {/* Selection */}
              <div className="space-y-10 mb-12">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-charcoal">Quantity</label>
                  <div className="flex items-center border border-brand-charcoal/10 w-fit bg-white rounded-full px-4">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-4 hover:text-brand-gold transition-colors"><Minus className="h-4 w-4" /></button>
                    <span className="px-8 font-black text-sm">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="p-4 hover:text-brand-gold transition-colors"><Plus className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="flex-grow rounded-full shadow-xl">Add to Selection</Button>
                <Button variant="outline" size="lg" className="flex-grow rounded-full border-brand-charcoal/10 bg-white hover:bg-brand-charcoal hover:text-brand-pearl">
                  Buy Now
                </Button>
                <button className="h-[60px] w-[60px] flex items-center justify-center rounded-full border border-brand-charcoal/10 hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-500 shadow-sm">
                  <Heart className="h-6 w-6 stroke-[1.5]" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-t border-brand-charcoal/5">
                <div className="flex items-center gap-4">
                  <Truck className="h-6 w-6 text-brand-gold stroke-[1.5]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-stone">White-Glove Delivery</span>
                </div>
                <div className="flex items-center gap-4">
                  <Shield className="h-6 w-6 text-brand-gold stroke-[1.5]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-stone">10Y Warranty</span>
                </div>
                <div className="flex items-center gap-4">
                  <RefreshCw className="h-6 w-6 text-brand-gold stroke-[1.5]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-stone">Easy Returns</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-8">
                <div className="flex border-b border-brand-charcoal/5">
                  {["details", "shipping", "reviews"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-black transition-all relative ${activeTab === tab ? "text-brand-charcoal" : "text-brand-stone hover:text-brand-charcoal"}`}
                    >
                      {tab}
                      {activeTab === tab && <motion.div layoutId="prod-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold" />}
                    </button>
                  ))}
                </div>
                <div className="py-10 text-brand-stone font-light leading-relaxed text-lg">
                  {activeTab === "details" && (
                    <ul className="space-y-4 list-none">
                      <li className="flex justify-between border-b border-brand-charcoal/5 pb-2">
                        <span className="font-bold text-brand-charcoal uppercase tracking-widest text-[10px]">Material</span>
                        <span>Premium Walnut Hardwood</span>
                      </li>
                      <li className="flex justify-between border-b border-brand-charcoal/5 pb-2">
                        <span className="font-bold text-brand-charcoal uppercase tracking-widest text-[10px]">Finish</span>
                        <span>Hand-Rubbed Natural Oil</span>
                      </li>
                      <li className="flex justify-between border-b border-brand-charcoal/5 pb-2">
                        <span className="font-bold text-brand-charcoal uppercase tracking-widest text-[10px]">Assembly</span>
                        <span>Full Concierge Assembly</span>
                      </li>
                    </ul>
                  )}
                  {activeTab === "shipping" && (
                    <p>Complimentary White-Glove shipping on all orders. Our team will unbox, assemble, and place the piece in your desired room.</p>
                  )}
                  {activeTab === "reviews" && (
                    <p>4.9/5 Average based on 48 verified customer testimonials.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal">Complete the Aesthetic</h2>
            <Link href="/shop" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em]">
              View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_PRODUCTS.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
