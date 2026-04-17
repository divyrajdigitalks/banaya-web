import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { User, Package, MapPin, Settings, LogOut, CreditCard } from "lucide-react";
import { useState } from "react";

const AccountPage = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <Layout title="Your Account | Banaya">
      <section className="py-24 bg-brand-pearl min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16">
              {/* Sidebar */}
              <div className="w-full md:w-1/4 space-y-12">
                <div className="space-y-4">
                  <div className="h-20 w-20 bg-brand-gold rounded-full flex items-center justify-center text-brand-charcoal text-2xl font-black">
                    AS
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold">Ananya Sharma</h2>
                    <p className="text-[10px] uppercase tracking-widest text-brand-stone font-black">Member since 2024</p>
                  </div>
                </div>

                <nav className="flex flex-col space-y-2">
                  {[
                    { id: "profile", label: "Profile Details", icon: User },
                    { id: "orders", label: "Order History", icon: Package },
                    { id: "addresses", label: "Saved Addresses", icon: MapPin },
                    { id: "payments", label: "Payment Methods", icon: CreditCard },
                    { id: "settings", label: "Account Settings", icon: Settings },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === item.id ? "bg-brand-charcoal text-brand-pearl shadow-lg" : "text-brand-stone hover:bg-brand-charcoal/5"}`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  ))}
                  <button className="flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all mt-8">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </nav>
              </div>

              {/* Content Area */}
              <div className="flex-grow bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-brand-charcoal/5">
                {activeSection === "profile" && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-3xl font-serif font-bold border-b border-brand-charcoal/5 pb-6">Profile Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-brand-stone">First Name</label>
                        <p className="text-lg font-light py-2 border-b border-brand-charcoal/10">Ananya</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-brand-stone">Last Name</label>
                        <p className="text-lg font-light py-2 border-b border-brand-charcoal/10">Sharma</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-brand-stone">Email Address</label>
                        <p className="text-lg font-light py-2 border-b border-brand-charcoal/10">ananya.s@example.com</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-brand-stone">Phone Number</label>
                        <p className="text-lg font-light py-2 border-b border-brand-charcoal/10">+91 98765 43210</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit Profile</Button>
                  </div>
                )}

                {activeSection === "orders" && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-3xl font-serif font-bold border-b border-brand-charcoal/5 pb-6">Order History</h3>
                    <div className="space-y-6">
                      {[1, 2].map((i) => (
                        <div key={i} className="p-8 border border-brand-charcoal/5 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8 hover:shadow-lg transition-shadow">
                          <div className="flex gap-6 items-center">
                            <div className="h-20 w-16 bg-brand-pearl rounded-lg" />
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-1">Delivered</p>
                              <h4 className="font-serif font-bold text-xl">Walnut Coffee Table</h4>
                              <p className="text-xs text-brand-stone mt-1">Order #BAN-98765{i} • April 0{i}, 2026</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg mb-4">₹18,500</p>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === "addresses" && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-500">
                    <h3 className="text-3xl font-serif font-bold border-b border-brand-charcoal/5 pb-6">Saved Addresses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-8 border-2 border-brand-gold rounded-2xl relative">
                        <span className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest text-brand-gold bg-brand-champagne/30 px-3 py-1 rounded-full">Primary</span>
                        <h4 className="font-bold mb-4 uppercase text-[10px] tracking-widest">Home</h4>
                        <p className="text-brand-stone font-light leading-relaxed">
                          Penthouse 4B, Skyview Towers <br />
                          Jubilee Hills, Hyderabad <br />
                          Telangana - 500033
                        </p>
                      </div>
                      <button className="p-8 border-2 border-dashed border-brand-charcoal/10 rounded-2xl flex flex-col items-center justify-center gap-4 text-brand-stone hover:border-brand-gold hover:text-brand-gold transition-all">
                        <Plus className="h-6 w-6" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Add New Address</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

export default AccountPage;
