import Layout from "@/components/layout/Layout";
import { Plus, Minus, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    category: "Product & Quality",
    questions: [
      { q: "What kind of wood do you use?", a: "We exclusively use sustainably sourced premium hardwoods, primarily Solid Walnut, Teak, and Oak. Every piece is seasoned and treated for longevity." },
      { q: "Are your furniture pieces handmade?", a: "Yes, every Banaya piece is handcrafted by our master artisans in our dedicated studios, blending traditional joinery with modern design." },
      { q: "Do you offer customization?", a: "We do! We offer customization on dimensions, wood finishes, and upholstery for most of our collections. Contact our design concierge for more details." },
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "What is White-Glove delivery?", a: "Our premium delivery service includes professional transportation, unboxing, assembly, and placement of the furniture in your desired room, followed by removal of all packaging materials." },
      { q: "How long does delivery take?", a: "Standard in-stock items ship within 5-7 business days. Custom or made-to-order pieces typically take 4-6 weeks for crafting and delivery." },
      { q: "Do you ship internationally?", a: "Currently, we ship across all major cities in India. International shipping can be arranged upon special request via our support team." },
    ]
  },
  {
    category: "Warranty & Returns",
    questions: [
      { q: "What is your warranty policy?", a: "We offer a comprehensive 10-year warranty on structural integrity for all our wooden furniture pieces." },
      { q: "Can I return a product?", a: "We offer a 30-day return policy for standard items if they are in their original condition. Please note that custom-made pieces are non-returnable." },
    ]
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  return (
    <Layout title="Frequently Asked Questions">
      <section className="py-24 bg-brand-pearl min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">Help Center</p>
              <h1 className="text-5xl md:text-6xl font-serif font-black text-brand-charcoal">How Can We Help?</h1>
            </div>

            {/* Search Bar */}
            <div className="relative mb-20 max-w-2xl mx-auto">
              <input 
                type="text" 
                placeholder="Search for questions..." 
                className="w-full bg-white border border-brand-charcoal/10 rounded-full py-6 px-12 focus:border-brand-gold outline-none shadow-lg text-lg font-light"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-stone" />
            </div>

            <div className="space-y-20">
              {FAQS.map((section, sIdx) => (
                <div key={sIdx} className="space-y-8">
                  <h2 className="text-2xl font-serif font-bold text-brand-charcoal border-b-2 border-brand-gold w-fit pb-2">
                    {section.category}
                  </h2>
                  <div className="space-y-4">
                    {section.questions.map((faq, qIdx) => {
                      const id = `${sIdx}-${qIdx}`;
                      const isOpen = openIndex === id;
                      return (
                        <div key={qIdx} className="bg-white border border-brand-charcoal/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <button 
                            onClick={() => setOpenIndex(isOpen ? null : id)}
                            className="w-full flex items-center justify-between p-8 text-left group"
                          >
                            <span className={`text-lg font-bold transition-colors ${isOpen ? "text-brand-gold" : "text-brand-charcoal group-hover:text-brand-gold"}`}>
                              {faq.q}
                            </span>
                            {isOpen ? <Minus className="h-5 w-5 text-brand-gold" /> : <Plus className="h-5 w-5 text-brand-stone" />}
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              >
                                <div className="px-8 pb-8 text-brand-stone font-light leading-relaxed text-lg border-t border-brand-charcoal/5 pt-4">
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Support CTA */}
            <div className="mt-32 p-12 bg-brand-charcoal rounded-3xl text-center text-brand-pearl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-serif font-bold mb-4">Still have questions?</h3>
                <p className="text-brand-pearl/60 mb-8 max-w-md mx-auto">Our dedicated design concierge team is available 24/7 to assist you.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <button className="px-10 py-4 bg-brand-gold text-brand-charcoal font-black uppercase tracking-widest text-xs hover:bg-brand-pearl transition-all">Live Chat</button>
                  <button className="px-10 py-4 border border-brand-pearl text-brand-pearl font-black uppercase tracking-widest text-xs hover:bg-brand-pearl hover:text-brand-charcoal transition-all">Email Us</button>
                </div>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Plus className="h-64 w-64 rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;
