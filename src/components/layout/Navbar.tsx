import Link from "next/link";
import { Search, ShoppingCart, User, Heart, Menu, X, Plus, Minus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { useRouter } from "next/router";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/calculator", label: "Calculator" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "Our Story" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, wishlist, updateQuantity, removeFromCart } = useStore();
  const router = useRouter();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-500 border-b ${
          scrolled
            ? "bg-brand-pearl shadow-sm border-brand-charcoal/10"
            : "bg-brand-pearl/80 backdrop-blur-xl border-brand-charcoal/5"
        }`}
      >
        <div className="mx-auto px-6 md:px-12 max-w-screen-xl">
          <div className="flex h-20 items-center justify-between">

            {/* Left - Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 w-[40%]">
              {NAV_LINKS.slice(0, 3).map(({ href, label }) => {
                const isActive = router.pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300 relative group ${
                      isActive ? "text-brand-gold" : "text-brand-charcoal hover:text-brand-gold"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-brand-gold transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Mobile - Menu Button */}
            <button
              className="md:hidden p-2 text-brand-charcoal"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Center - Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-serif font-black tracking-[0.15em] text-brand-charcoal hover:text-brand-gold transition-colors duration-300"
            >
              BANAYA
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-1 md:gap-2 w-auto md:w-[40%] justify-end">
              {NAV_LINKS.slice(3).map(({ href, label }) => {
                const isActive = router.pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`hidden md:inline-flex text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300 relative group mr-6 ${
                      isActive ? "text-brand-gold" : "text-brand-charcoal hover:text-brand-gold"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-brand-gold transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}

              <button className="hidden sm:flex p-2 text-brand-charcoal hover:text-brand-gold transition-colors duration-300">
                <Search className="h-5 w-5 stroke-[1.5]" />
              </button>

              <Link href="/wishlist" className="hidden sm:flex p-2 text-brand-charcoal hover:text-brand-gold transition-colors duration-300 relative">
                <Heart className="h-5 w-5 stroke-[1.5]" />
                <AnimatePresence>
                  {wishlist.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute top-1 right-1 h-4 w-4 bg-brand-gold text-brand-charcoal text-[9px] flex items-center justify-center rounded-full font-black"
                    >
                      {wishlist.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-brand-charcoal hover:text-brand-gold transition-colors duration-300 relative"
              >
                <ShoppingCart className="h-5 w-5 stroke-[1.5]" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute top-1 right-1 h-4 w-4 bg-brand-charcoal text-white text-[9px] flex items-center justify-center rounded-full font-bold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <Link href="/account" className="p-2 text-brand-charcoal hover:text-brand-gold transition-colors duration-300">
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
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-brand-pearl border-t border-brand-charcoal/5"
            >
              <div className="px-8 py-10 space-y-6">
                {NAV_LINKS.map(({ href, label }, i) => {
                  const isActive = router.pathname === href;
                  return (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={href}
                        className={`block text-2xl font-serif font-bold transition-colors ${
                          isActive ? "text-brand-gold" : "text-brand-charcoal hover:text-brand-gold"
                        }`}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="pt-6 border-t border-brand-charcoal/5 flex gap-8"
                >
                  <Link href="/wishlist" className="text-[10px] font-black uppercase tracking-widest text-brand-stone hover:text-brand-gold transition-colors">
                    Wishlist ({wishlist.length})
                  </Link>
                  <Link href="/account" className="text-[10px] font-black uppercase tracking-widest text-brand-stone hover:text-brand-gold transition-colors">
                    Account
                  </Link>
                  <button
                    onClick={() => { setIsMenuOpen(false); setIsCartOpen(true); }}
                    className="text-[10px] font-black uppercase tracking-widest text-brand-stone hover:text-brand-gold transition-colors"
                  >
                    Bag ({cartCount})
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-brand-charcoal/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-pearl z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-brand-charcoal/5 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-brand-charcoal">Your Bag</h3>
                  <p className="text-[10px] uppercase tracking-widest text-brand-stone font-bold mt-1">{cartCount} Items Selected</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:rotate-90 transition-transform duration-500">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-6 group">
                      <div className="relative h-32 w-24 bg-white rounded-xl overflow-hidden shrink-0 shadow-sm">
                        <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-[9px] uppercase tracking-widest text-brand-gold font-black">{item.category}</p>
                        <h4 className="font-serif font-bold text-brand-charcoal leading-tight">{item.name}</h4>
                        <p className="font-bold text-sm">₹{item.price.toLocaleString()}</p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-brand-charcoal/10 rounded-full px-2 bg-white">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-brand-gold"><Minus className="h-3 w-3" /></button>
                            <span className="px-3 text-[10px] font-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-brand-gold"><Plus className="h-3 w-3" /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-brand-stone hover:text-red-600 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    <div className="h-20 w-20 bg-brand-pearl rounded-full flex items-center justify-center border border-brand-charcoal/5">
                      <ShoppingCart className="h-8 w-8 text-brand-stone opacity-20" />
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold">Your bag is empty</h4>
                      <p className="text-sm text-brand-stone mt-2">Discover our iconic pieces and start your collection.</p>
                    </div>
                    <Link href="/shop" onClick={() => setIsCartOpen(false)} className="bg-brand-charcoal text-brand-pearl px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold transition-colors">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 bg-white border-t border-brand-charcoal/5 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-brand-stone font-bold">
                      <span>Subtotal</span>
                      <span className="text-brand-charcoal">₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-brand-stone font-bold">
                      <span>Shipping</span>
                      <span className="text-brand-gold">Complimentary</span>
                    </div>
                    <div className="flex justify-between items-end pt-4">
                      <span className="text-xs uppercase tracking-[0.2em] font-black">Total</span>
                      <span className="text-3xl font-serif font-black text-brand-charcoal">₹{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="block w-full bg-brand-charcoal text-brand-pearl py-6 rounded-full text-[10px] font-black uppercase tracking-widest text-center hover:bg-brand-gold transition-colors shadow-xl">
                    Checkout Now
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
