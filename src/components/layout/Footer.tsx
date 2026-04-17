import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-charcoal text-brand-pearl pt-32 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Info */}
          <div className="space-y-8">
            <h3 className="text-3xl font-serif font-black tracking-[0.2em]">BANAYA</h3>
            <p className="text-brand-pearl/50 font-light leading-relaxed text-sm">
              Crafting luxury wooden lifestyle pieces that bring warmth, elegance, and timeless craftsmanship to your modern home.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-brand-pearl/50 hover:text-brand-gold transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-brand-pearl/50 hover:text-brand-gold transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="text-brand-pearl/50 hover:text-brand-gold transition-colors"><Twitter className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Curations</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/shop" className="text-brand-pearl/60 hover:text-brand-pearl transition-colors">Shop All</Link></li>
              <li><Link href="/collections" className="text-brand-pearl/60 hover:text-brand-pearl transition-colors">The Collections</Link></li>
              <li><Link href="/calculator" className="text-brand-gold font-bold hover:opacity-80 transition-opacity">Cost Calculator</Link></li>
              <li><Link href="/about" className="text-brand-pearl/60 hover:text-brand-pearl transition-colors">Our Story</Link></li>
              <li><Link href="/blog" className="text-brand-pearl/60 hover:text-brand-pearl transition-colors">The Journal</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Concierge</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/contact" className="text-brand-pearl/60 hover:text-brand-pearl transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-brand-pearl/60 hover:text-brand-pearl transition-colors">FAQs</Link></li>
              <li><Link href="/order-tracking" className="text-brand-pearl/60 hover:text-brand-pearl transition-colors">Track Order</Link></li>
              <li><Link href="/returns" className="text-brand-pearl/60 hover:text-brand-pearl transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy-policy" className="text-brand-pearl/60 hover:text-brand-pearl transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Visit Us</h4>
            <ul className="space-y-6 text-sm font-light">
              <li className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-1" />
                <span className="text-brand-pearl/60 leading-relaxed">
                  123 Design District, Furniture Lane, <br />
                  New Delhi, India 110020
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-brand-pearl/60">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-brand-pearl/60 underline decoration-brand-gold/30 underline-offset-8">hello@banaya.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-y border-brand-pearl/10 py-20 mb-12 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h4 className="text-4xl font-serif font-bold mb-6">Join the Banaya Circle</h4>
            <p className="text-brand-pearl/50 mb-10 font-light text-lg">Subscribe for early access to collection drops and design insights.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-grow bg-white/5 border border-brand-pearl/10 px-8 py-5 rounded-full outline-none focus:border-brand-gold transition-all text-brand-pearl font-light"
              />
              <button className="bg-brand-gold text-brand-charcoal px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-brand-pearl transition-all">
                Join Now
              </button>
            </form>
          </div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-5 pointer-events-none">
            <span className="text-[150px] font-serif italic font-black text-brand-gold">B</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-brand-pearl/30 text-[10px] font-bold uppercase tracking-[0.2em] gap-6">
          <p>© {new Date().getFullYear()} Banaya Lifestyle. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/terms" className="hover:text-brand-pearl transition-colors">Terms</Link>
            <Link href="/privacy-policy" className="hover:text-brand-pearl transition-colors">Privacy</Link>
            <Link href="/returns" className="hover:text-brand-pearl transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
