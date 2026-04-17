import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

const ContactPage = () => {
  return (
    <Layout title="Contact Us">
      <section className="py-24 bg-brand-ivory">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-serif font-bold text-brand-charcoal mb-4">Get in Touch</h1>
              <p className="text-brand-charcoal/60">We'd love to hear from you. Whether you have a question about our collections or need design advice.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
              <div className="bg-white p-10 text-center shadow-sm">
                <div className="bg-brand-beige/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-6 w-6 text-brand-walnut" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">Call Us</h3>
                <p className="text-brand-charcoal/60 text-sm mb-4">Mon-Sat, 10am-7pm</p>
                <p className="font-bold">+91 98765 43210</p>
              </div>
              <div className="bg-white p-10 text-center shadow-sm">
                <div className="bg-brand-beige/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-6 w-6 text-brand-walnut" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">Email Us</h3>
                <p className="text-brand-charcoal/60 text-sm mb-4">We reply within 24 hours</p>
                <p className="font-bold">hello@banaya.com</p>
              </div>
              <div className="bg-white p-10 text-center shadow-sm">
                <div className="bg-brand-beige/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-6 w-6 text-brand-walnut" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">WhatsApp</h3>
                <p className="text-brand-charcoal/60 text-sm mb-4">For instant support</p>
                <p className="font-bold">+91 98765 00000</p>
              </div>
            </div>

            <div className="bg-white shadow-xl flex flex-col md:flex-row overflow-hidden">
              <div className="p-10 md:p-16 flex-grow">
                <h2 className="text-3xl font-serif font-bold mb-8">Send a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold">Full Name</label>
                      <input type="text" className="w-full border-b border-brand-neutral/20 py-3 focus:border-brand-gold outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold">Email Address</label>
                      <input type="email" className="w-full border-b border-brand-neutral/20 py-3 focus:border-brand-gold outline-none transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">Subject</label>
                    <input type="text" className="w-full border-b border-brand-neutral/20 py-3 focus:border-brand-gold outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold">Message</label>
                    <textarea rows={4} className="w-full border-b border-brand-neutral/20 py-3 focus:border-brand-gold outline-none transition-colors resize-none"></textarea>
                  </div>
                  <Button size="lg" className="w-full md:w-auto">Send Message</Button>
                </form>
              </div>
              <div className="bg-brand-charcoal p-10 md:p-16 text-brand-ivory w-full md:w-[400px]">
                <h2 className="text-3xl font-serif font-bold mb-8 text-brand-gold">Visit Our Studio</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <MapPin className="h-6 w-6 text-brand-gold shrink-0" />
                    <p className="text-brand-neutral/70 leading-relaxed">
                      123 Design District, Furniture Lane, <br />
                      Phase 1, Okhla Industrial Estate, <br />
                      New Delhi, 110020
                    </p>
                  </div>
                  <div className="h-64 bg-brand-neutral/10 w-full rounded">
                    {/* Placeholder for Map */}
                    <div className="w-full h-full flex items-center justify-center text-xs text-brand-neutral/30 uppercase tracking-widest">Map View</div>
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

export default ContactPage;
