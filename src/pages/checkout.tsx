import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { FEATURED_PRODUCTS } from "@/data/mock";
import { ShieldCheck, CreditCard, Truck, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const items = [FEATURED_PRODUCTS[0]];
  const subtotal = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <Layout title="Secure Checkout | Banaya">
      <section className="py-24 bg-brand-pearl min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Main Checkout Flow */}
              <div className="flex-grow space-y-12">
                <div className="flex items-center gap-6 mb-12">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= s ? "bg-brand-charcoal text-brand-pearl" : "bg-brand-charcoal/5 text-brand-stone"}`}>
                        {s}
                      </div>
                      {s < 3 && <ChevronRight className="h-4 w-4 text-brand-stone/30" />}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-12"
                    >
                      <h2 className="text-4xl font-serif font-black">Shipping Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-widest font-black text-brand-stone">Email Address</label>
                          <input className="w-full bg-white border-b-2 border-brand-charcoal/10 py-4 px-6 focus:border-brand-gold outline-none font-bold" />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-widest font-black text-brand-stone">Phone Number</label>
                          <input className="w-full bg-white border-b-2 border-brand-charcoal/10 py-4 px-6 focus:border-brand-gold outline-none font-bold" />
                        </div>
                        <div className="md:col-span-2 space-y-4">
                          <label className="text-[10px] uppercase tracking-widest font-black text-brand-stone">Delivery Address</label>
                          <textarea rows={3} className="w-full bg-white border-b-2 border-brand-charcoal/10 py-4 px-6 focus:border-brand-gold outline-none font-bold resize-none" />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-widest font-black text-brand-stone">City</label>
                          <input className="w-full bg-white border-b-2 border-brand-charcoal/10 py-4 px-6 focus:border-brand-gold outline-none font-bold" />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] uppercase tracking-widest font-black text-brand-stone">Pincode</label>
                          <input className="w-full bg-white border-b-2 border-brand-charcoal/10 py-4 px-6 focus:border-brand-gold outline-none font-bold" />
                        </div>
                      </div>
                      <Button size="lg" onClick={() => setStep(2)} className="w-full md:w-auto px-16 rounded-full">Continue to Payment</Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-12"
                    >
                      <h2 className="text-4xl font-serif font-black">Payment Method</h2>
                      <div className="space-y-6">
                        {[
                          { id: "card", label: "Credit / Debit Card", icon: CreditCard },
                          { id: "upi", label: "UPI / Net Banking", icon: ShieldCheck },
                          { id: "cod", label: "Cash on Delivery", icon: Truck },
                        ].map((method) => (
                          <div key={method.id} className="p-8 border border-brand-charcoal/10 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-brand-gold transition-all">
                            <div className="flex items-center gap-6">
                              <method.icon className="h-6 w-6 text-brand-gold" />
                              <span className="text-lg font-bold uppercase tracking-widest text-brand-charcoal">{method.label}</span>
                            </div>
                            <div className="h-6 w-6 rounded-full border-2 border-brand-charcoal/10 group-hover:border-brand-gold flex items-center justify-center">
                              <div className="h-3 w-3 rounded-full bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-4 pt-8">
                        <Button variant="outline" onClick={() => setStep(1)} className="rounded-full px-12">Back</Button>
                        <Button size="lg" onClick={() => setStep(3)} className="flex-grow rounded-full">Complete Purchase</Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7 }}
                      className="text-center py-20 space-y-8"
                    >
                      <div className="h-32 w-32 bg-brand-gold rounded-full flex items-center justify-center mx-auto shadow-2xl">
                        <ShieldCheck className="h-16 w-16 text-brand-charcoal" />
                      </div>
                      <div className="space-y-4">
                        <h2 className="text-5xl font-serif font-black">Order Confirmed</h2>
                        <p className="text-brand-stone font-light text-lg">Thank you for your investment in Banaya. <br /> Your order #BAN-987654 is being processed.</p>
                      </div>
                      <Button size="lg" onClick={() => window.location.href = "/"} className="rounded-full px-16">Return to Home</Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Order Summary Sidebar */}
              <div className="w-full lg:w-[450px]">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-brand-charcoal/5 sticky top-32 space-y-10">
                  <h3 className="text-2xl font-serif font-bold border-b border-brand-charcoal/5 pb-6">Your Selection</h3>
                  <div className="space-y-8">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-6 items-center">
                        <div className="relative h-24 w-20 bg-brand-pearl rounded-xl overflow-hidden shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-serif font-bold text-lg leading-tight">{item.name}</h4>
                          <p className="text-[10px] uppercase tracking-widest text-brand-stone font-black mt-1">{item.category}</p>
                        </div>
                        <p className="font-bold">₹{item.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-10 border-t border-brand-charcoal/5">
                    <div className="flex justify-between text-xs uppercase tracking-widest text-brand-stone">
                      <span>Subtotal</span>
                      <span className="text-brand-charcoal font-bold">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs uppercase tracking-widest text-brand-stone">
                      <span>White-Glove Delivery</span>
                      <span className="text-brand-gold font-black">FREE</span>
                    </div>
                    <div className="h-px bg-brand-charcoal/5 my-6" />
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-black">Grand Total</span>
                      <span className="text-3xl font-serif font-black text-brand-charcoal">₹{(subtotal * 1.18).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-brand-pearl p-6 rounded-2xl flex items-start gap-4">
                    <ShieldCheck className="h-5 w-5 text-brand-gold shrink-0 mt-1" />
                    <p className="text-[10px] text-brand-stone leading-relaxed font-medium uppercase tracking-widest">
                      Your purchase is protected by our 10-Year structural warranty and 30-day return policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
