import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Layout title="Your Selection Bag">
      <section className="py-24 bg-brand-pearl min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">Your Curated Bag</p>
              <h1 className="text-5xl md:text-6xl font-serif font-black text-brand-charcoal">The Selection</h1>
            </div>
            <p className="text-brand-stone text-sm uppercase tracking-widest font-bold">
              {cart.length} Exquisite Items
            </p>
          </div>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-8">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white p-8 flex flex-col sm:flex-row gap-10 items-center shadow-sm rounded-2xl border border-brand-charcoal/5 group">
                    <div className="relative h-48 w-40 bg-brand-pearl shrink-0 overflow-hidden rounded-xl">
                      <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="flex-grow text-center sm:text-left space-y-3">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-brand-gold font-black">{item.category}</p>
                      <h3 className="text-2xl font-serif font-bold text-brand-charcoal">{item.name}</h3>
                      <p className="text-brand-charcoal font-bold tracking-wider">₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center border border-brand-charcoal/10 rounded-full px-4 bg-brand-pearl">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-3 hover:text-brand-gold transition-colors"><Minus className="h-4 w-4" /></button>
                      <span className="px-6 font-black text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-3 hover:text-brand-gold transition-colors"><Plus className="h-4 w-4" /></button>
                    </div>
                    <div className="text-right min-w-[120px] space-y-4">
                      <p className="text-xl font-bold text-brand-charcoal">₹{(item.price * item.quantity).toLocaleString()}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-brand-stone hover:text-red-600 transition-colors uppercase text-[10px] font-black tracking-widest flex items-center gap-2 justify-end ml-auto">
                        <Trash2 className="h-4 w-4" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="pt-10">
                  <Link href="/shop" className="inline-flex items-center gap-4 group text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal">
                    <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-2" /> Continue Exploring
                  </Link>
                </div>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-brand-charcoal p-10 shadow-2xl sticky top-32 rounded-3xl text-brand-pearl">
                  <h3 className="text-3xl font-serif font-bold mb-10 text-brand-gold">Order Summary</h3>
                  <div className="space-y-6 mb-10">
                    <div className="flex justify-between text-xs uppercase tracking-widest text-brand-pearl/50">
                      <span>Subtotal</span>
                      <span className="text-brand-pearl font-bold">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs uppercase tracking-widest text-brand-pearl/50">
                      <span>Shipping</span>
                      <span className="text-brand-gold font-black">COMPLIMENTARY</span>
                    </div>
                    <div className="flex justify-between text-xs uppercase tracking-widest text-brand-pearl/50">
                      <span>GST (18%)</span>
                      <span className="text-brand-pearl font-bold">₹{(subtotal * 0.18).toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-brand-pearl/10 my-8" />
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-black">Grand Total</span>
                      <span className="text-3xl font-serif font-black text-brand-gold">₹{(subtotal * 1.18).toLocaleString()}</span>
                    </div>
                  </div>
                  <Link href="/checkout">
                    <Button size="lg" className="w-full mb-6 bg-brand-gold text-brand-charcoal hover:bg-brand-pearl rounded-full py-6">Proceed to Checkout</Button>
                  </Link>
                  <p className="text-[9px] text-center text-brand-pearl/30 uppercase tracking-[0.2em] font-bold">Fully Secure SSL Encryption</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-32 bg-white/50 border border-brand-charcoal/5 rounded-3xl shadow-sm">
              <ShoppingBag className="h-20 w-20 text-brand-gold/30 mx-auto mb-8 stroke-[1]" />
              <h2 className="text-4xl font-serif font-bold text-brand-charcoal mb-6">Your bag is empty</h2>
              <p className="text-brand-stone mb-12 max-w-sm mx-auto font-light text-lg">Your curated selection is waiting. Discover our iconic pieces today.</p>
              <Link href="/shop">
                <Button size="lg">Explore Shop</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CartPage;
