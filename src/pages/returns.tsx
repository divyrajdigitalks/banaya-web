import Layout from "@/components/layout/Layout";
import { RefreshCcw, Truck, ShieldCheck, Clock } from "lucide-react";

const ReturnsPage = () => {
  return (
    <Layout title="Shipping & Returns">
      <section className="py-24 bg-brand-pearl min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4 mb-16">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">Policy Guide</p>
              <h1 className="text-5xl md:text-6xl font-serif font-black text-brand-charcoal">Shipping & Returns</h1>
              <p className="text-brand-stone font-light text-lg">Everything you need to know about receiving and returning your Banaya pieces.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-charcoal/5 space-y-6">
                <div className="h-16 w-16 bg-brand-champagne/30 rounded-2xl flex items-center justify-center">
                  <Truck className="h-8 w-8 text-brand-gold" />
                </div>
                <h2 className="text-3xl font-serif font-bold">Shipping Policy</h2>
                <div className="space-y-4 text-brand-stone font-light leading-relaxed">
                  <p>We provide White-Glove delivery for all furniture orders. Our professional team will handle the transportation, assembly, and cleanup.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>In-Stock Items:</strong> Delivered within 5-7 business days.</li>
                    <li><strong>Custom Orders:</strong> Handcrafted and delivered within 4-6 weeks.</li>
                    <li><strong>Tracking:</strong> Real-time tracking is available for all shipments.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-charcoal/5 space-y-6">
                <div className="h-16 w-16 bg-brand-champagne/30 rounded-2xl flex items-center justify-center">
                  <RefreshCcw className="h-8 w-8 text-brand-gold" />
                </div>
                <h2 className="text-3xl font-serif font-bold">Returns Policy</h2>
                <div className="space-y-4 text-brand-stone font-light leading-relaxed">
                  <p>Your satisfaction is our priority. If you're not completely happy with your purchase, we're here to help.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>30-Day Returns:</strong> Standard items can be returned within 30 days of delivery.</li>
                    <li><strong>Condition:</strong> Items must be in their original condition.</li>
                    <li><strong>Exclusions:</strong> Custom-made or personalized pieces cannot be returned.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-brand-charcoal text-brand-pearl p-12 rounded-[2.5rem] relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="space-y-4">
                  <ShieldCheck className="h-10 w-10 text-brand-gold" />
                  <h3 className="text-xl font-serif font-bold">10-Year Warranty</h3>
                  <p className="text-brand-pearl/60 font-light text-sm">We stand by our craftsmanship. Every wooden piece is covered for structural integrity.</p>
                </div>
                <div className="space-y-4">
                  <Clock className="h-10 w-10 text-brand-gold" />
                  <h3 className="text-xl font-serif font-bold">Easy Scheduling</h3>
                  <p className="text-brand-pearl/60 font-light text-sm">Pick a delivery date that works for you. Our concierge team will coordinate everything.</p>
                </div>
                <div className="space-y-4">
                  <RefreshCcw className="h-10 w-10 text-brand-gold" />
                  <h3 className="text-xl font-serif font-bold">Hassle-Free Process</h3>
                  <p className="text-brand-pearl/60 font-light text-sm">Returns are picked up directly from your home. No need to worry about packaging.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReturnsPage;
