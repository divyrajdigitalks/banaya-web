import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Search, Package, Truck, CheckCircle2, MapPin } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OrderTrackingPage = () => {
  const [orderId, setOrderId] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) setShowStatus(true);
  };

  return (
    <Layout title="Track Your Order">
      <section className="py-24 bg-brand-pearl min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">Delivery Status</p>
              <h1 className="text-5xl md:text-6xl font-serif font-black text-brand-charcoal">Track Your Order</h1>
              <p className="text-brand-stone font-light text-lg">Enter your order ID and email to check your furniture's journey.</p>
            </div>

            <div className="bg-white p-8 md:p-12 shadow-2xl border border-brand-charcoal/5 rounded-2xl mb-12">
              <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-6">
                <div className="flex-grow space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-brand-charcoal">Order ID</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="e.g. #BAN-987654" 
                      className="w-full bg-brand-pearl border-b-2 border-brand-charcoal/10 py-4 px-4 focus:border-brand-gold outline-none transition-all font-bold tracking-widest"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-grow space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-brand-charcoal">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="w-full bg-brand-pearl border-b-2 border-brand-charcoal/10 py-4 px-4 focus:border-brand-gold outline-none transition-all font-bold tracking-widest"
                  />
                </div>
                <div className="flex items-end">
                  <Button size="lg" className="w-full md:w-auto h-[60px]">Track Now</Button>
                </div>
              </form>
            </div>

            <AnimatePresence>
              {showStatus && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.7 }}
                  className="space-y-12"
                >
                  {/* Status Timeline */}
                <div className="bg-white p-12 shadow-xl rounded-2xl border border-brand-charcoal/5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                      <h3 className="text-2xl font-serif font-bold mb-2">Order #BAN-987654</h3>
                      <p className="text-sm text-brand-stone font-medium">Placed on April 15, 2026</p>
                    </div>
                    <div className="px-6 py-2 bg-brand-champagne/50 text-brand-gold rounded-full text-xs font-black uppercase tracking-widest">
                      In Transit
                    </div>
                  </div>

                  <div className="relative pt-8 pb-12">
                    {/* Progress Bar */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-brand-charcoal/5 -translate-y-1/2 hidden md:block" />
                    <div className="absolute top-1/2 left-0 w-2/3 h-1 bg-brand-gold -translate-y-1/2 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                      {[
                        { icon: CheckCircle2, label: "Confirmed", status: "completed" },
                        { icon: Package, label: "Processing", status: "completed" },
                        { icon: Truck, label: "Shipped", status: "active" },
                        { icon: MapPin, label: "Delivered", status: "pending" },
                      ].map((step, idx) => (
                        <div key={idx} className="flex flex-row md:flex-col items-center gap-6 md:gap-4 text-center">
                          <div className={`h-16 w-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                            step.status === "completed" ? "bg-brand-charcoal text-brand-pearl" : 
                            step.status === "active" ? "bg-brand-gold text-brand-charcoal scale-125 shadow-lg" : 
                            "bg-brand-pearl text-brand-stone border-2 border-brand-charcoal/5"
                          }`}>
                            <step.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <p className={`text-[10px] uppercase tracking-widest font-black ${step.status === "pending" ? "text-brand-stone" : "text-brand-charcoal"}`}>
                              {step.label}
                            </p>
                            {step.status === "active" && <p className="text-[10px] text-brand-gold font-bold mt-1">Today, 2:30 PM</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-10 shadow-lg rounded-2xl border border-brand-charcoal/5">
                    <h4 className="text-xl font-serif font-bold mb-6">Delivery Address</h4>
                    <p className="text-brand-stone font-light leading-relaxed">
                      Rahul Sharma <br />
                      Penthouse 4B, Skyview Towers <br />
                      Jubilee Hills, Hyderabad <br />
                      Telangana - 500033
                    </p>
                  </div>
                  <div className="bg-brand-charcoal p-10 shadow-lg rounded-2xl text-brand-pearl">
                    <h4 className="text-xl font-serif font-bold mb-6 text-brand-gold">Estimated Arrival</h4>
                    <p className="text-4xl font-serif font-black mb-4">April 22, 2026</p>
                    <p className="text-brand-pearl/60 text-sm font-light">Your items are being handled by our premium White-Glove delivery partner.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OrderTrackingPage;
