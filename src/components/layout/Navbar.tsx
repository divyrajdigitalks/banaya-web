import Link from "next/link";
import { Search, ShoppingCart, User, Heart, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-pearl/90 backdrop-blur-xl border-b border-brand-charcoal/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex h-24 items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-brand-charcoal"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop Left - Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/shop" className="text-[11px] font-bold uppercase tracking-[0.25em] hover:text-brand-gold transition-all duration-300">Shop</Link>
            <Link href="/collections" className="text-[11px] font-bold uppercase tracking-[0.25em] hover:text-brand-gold transition-all duration-300">Collections</Link>
            <Link href="/calculator" className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-gold hover:opacity-70 transition-all duration-300">Calculator</Link>
          </div>

          {/* Center - Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-3xl font-serif font-black tracking-[0.15em] text-brand-charcoal">
            BANAYA
          </Link>

          {/* Desktop Right - Icons */}
          <div className="flex items-center space-x-6">
            <button className="hidden sm:block p-2 text-brand-charcoal hover:text-brand-gold transition-all duration-300">
              <Search className="h-5 w-5 stroke-[1.5]" />
            </button>
            <Link href="/wishlist" className="hidden sm:block p-2 text-brand-charcoal hover:text-brand-gold transition-all duration-300 relative">
              <Heart className="h-5 w-5 stroke-[1.5]" />
            </Link>
            <Link href="/cart" className="p-2 text-brand-charcoal hover:text-brand-gold transition-all duration-300 relative">
              <ShoppingCart className="h-5 w-5 stroke-[1.5]" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-brand-charcoal text-white text-[9px] flex items-center justify-center rounded-full font-bold">
                0
              </span>
            </Link>
            <Link href="/account" className="p-2 text-brand-charcoal hover:text-brand-gold transition-all duration-300">
              <User className="h-5 w-5 stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-pearl border-b border-brand-charcoal/5 px-8 py-12 space-y-8"
          >
            <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-serif font-bold text-brand-charcoal">The Shop</Link>
            <Link href="/collections" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-serif font-bold text-brand-charcoal">Collections</Link>
            <Link href="/calculator" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-serif font-bold text-brand-gold">Cost Calculator</Link>
            <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-serif font-bold text-brand-charcoal">The Journal</Link>
            <Link href="/order-tracking" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-serif font-bold text-brand-charcoal">Track Order</Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-serif font-bold text-brand-charcoal">Our Story</Link>
            
            <div className="pt-8 border-t border-brand-charcoal/5 flex gap-8">
              <Link href="/wishlist" onClick={() => setIsMenuOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-brand-stone">Wishlist</Link>
              <Link href="/account" onClick={() => setIsMenuOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-brand-stone">Account</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
