import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Download, CheckCircle2, ChevronRight, ChevronLeft, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { BHK_OPTIONS, ROOM_OPTIONS, FURNITURE_ITEMS } from "@/data/calculator";

const calculatorSchema = z.object({
  propertyType: z.string(),
  rooms: z.array(z.string()),
  furniture: z.array(z.object({
    id: z.string(),
    quantity: z.number()
  })),
  material: z.string(),
  finish: z.string(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
});

type CalculatorForm = z.infer<typeof calculatorSchema>;

const CalculatorPage = () => {
  const [step, setStep] = useState(1);
  const [estimate, setEstimate] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedBHK, setSelectedBHK] = useState(BHK_OPTIONS[1].id);
  const [selectedRooms, setSelectedRooms] = useState<string[]>(["living", "kitchen"]);
  const [selectedFurniture, setSelectedFurniture] = useState<{id: string, quantity: number}[]>([]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CalculatorForm>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      material: "Solid Teak Wood",
      finish: "Premium",
    }
  });

  const formData = watch();

  useEffect(() => {
    let total = 0;
    
    // BHK Base Price
    const bhk = BHK_OPTIONS.find(b => b.id === selectedBHK);
    if (bhk) total += bhk.price;

    // Rooms
    selectedRooms.forEach(roomId => {
      const room = ROOM_OPTIONS.find(r => r.id === roomId);
      if (room) total += room.basePrice;
    });

    // Furniture
    selectedFurniture.forEach(item => {
      const furniture = FURNITURE_ITEMS.find(f => f.id === item.id);
      if (furniture) total += furniture.price * item.quantity;
    });

    // Multipliers
    const materialMultiplier = ({
      "Engineering Wood": 0.8,
      "Premium Plywood": 1,
      "Solid Teak Wood": 1.6,
      "American Walnut": 2.0,
    } as Record<string, number>)[formData.material] || 1;

    const finishMultiplier = ({
      "Standard": 1,
      "Premium": 1.3,
      "Ultra Luxury": 1.8,
    } as Record<string, number>)[formData.finish] || 1;

    setEstimate(total * materialMultiplier * finishMultiplier);
  }, [selectedBHK, selectedRooms, selectedFurniture, formData.material, formData.finish]);

  const toggleRoom = (id: string) => {
    setSelectedRooms(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const updateFurniture = (id: string, delta: number) => {
    setSelectedFurniture(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) return prev.filter(item => item.id !== id);
        return prev.map(item => item.id === id ? { ...item, quantity: newQty } : item);
      }
      if (delta > 0) return [...prev, { id, quantity: 1 }];
      return prev;
    });
  };

  const onSubmit = (data: CalculatorForm) => {
    console.log({ ...data, selectedBHK, selectedRooms, selectedFurniture });
    setIsSubmitted(true);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <Layout title="Bespoke Cost Calculator | Banaya">
      <section className="py-24 bg-brand-pearl min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-20 space-y-4">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-black"
              >
                Precision Craftsmanship
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-serif font-black text-brand-charcoal"
              >
                Interior <span className="italic font-light">Vision</span>
              </motion.h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left Side: Interactive Steps */}
              <div className="flex-grow space-y-12">
                
                {/* Progress Navigation */}
                <div className="flex justify-between items-center bg-white p-6 rounded-full shadow-xl border border-brand-charcoal/5">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center gap-4">
                      <button 
                        onClick={() => s < step && setStep(s)}
                        className={`h-12 w-12 rounded-full flex items-center justify-center font-black text-xs transition-all duration-500 ${
                          step === s ? "bg-brand-gold text-brand-charcoal scale-110 shadow-lg" : 
                          step > s ? "bg-brand-charcoal text-brand-pearl" : 
                          "bg-brand-pearl text-brand-stone/30 border border-brand-charcoal/5"
                        }`}
                      >
                        {s}
                      </button>
                      {s < 4 && <div className={`h-px w-8 md:w-16 bg-brand-charcoal/10`} />}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50, rotateY: 10 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      exit={{ opacity: 0, x: -50, rotateY: -10 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="space-y-10 perspective-1000"
                    >
                      <div className="space-y-4">
                        <h2 className="text-4xl font-serif font-black">Select Your Space</h2>
                        <p className="text-brand-stone font-light">Choose the property type that matches your requirement.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {BHK_OPTIONS.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedBHK(opt.id)}
                            className={`group relative aspect-[16/9] overflow-hidden rounded-3xl transition-all duration-700 ${
                              selectedBHK === opt.id ? "ring-4 ring-brand-gold ring-offset-8 scale-95 shadow-2xl" : "grayscale-[50%] hover:grayscale-0"
                            }`}
                          >
                            <Image src={opt.image} alt={opt.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 text-left">
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-2 block">Property Type</span>
                              <h3 className="text-3xl font-serif font-black text-brand-pearl">{opt.name}</h3>
                            </div>
                            {selectedBHK === opt.id && (
                              <div className="absolute top-8 right-8 bg-brand-gold text-brand-charcoal p-2 rounded-full">
                                <CheckCircle2 className="h-6 w-6" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      <Button size="lg" onClick={nextStep} className="rounded-full px-16 group">
                        Next Chapter <ChevronRight className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-2" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-10"
                    >
                      <div className="space-y-4">
                        <h2 className="text-4xl font-serif font-black">Define the Scope</h2>
                        <p className="text-brand-stone font-light">Select the rooms you want us to transform.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {ROOM_OPTIONS.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => toggleRoom(opt.id)}
                            className={`group relative aspect-square overflow-hidden rounded-3xl transition-all duration-700 ${
                              selectedRooms.includes(opt.id) ? "ring-4 ring-brand-gold ring-offset-8 scale-95" : "grayscale hover:grayscale-0"
                            }`}
                          >
                            <Image src={opt.image} alt={opt.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-brand-charcoal/40 group-hover:bg-transparent transition-all duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center border-4 border-white/0 group-hover:border-white/20 transition-all m-6 rounded-2xl">
                              <h3 className="text-3xl font-serif font-black text-brand-pearl drop-shadow-2xl">{opt.name}</h3>
                            </div>
                            {selectedRooms.includes(opt.id) && (
                              <div className="absolute top-8 right-8 bg-brand-gold text-brand-charcoal p-2 rounded-full">
                                <CheckCircle2 className="h-6 w-6" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-6">
                        <Button variant="outline" onClick={prevStep} className="rounded-full px-10">Back</Button>
                        <Button size="lg" onClick={nextStep} className="rounded-full px-16 group flex-grow">
                          Choose Furniture <ChevronRight className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      className="space-y-10"
                    >
                      <div className="space-y-4">
                        <h2 className="text-4xl font-serif font-black">Iconic Pieces</h2>
                        <p className="text-brand-stone font-light">Add individual handcrafted items to your selection.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {FURNITURE_ITEMS.map((item) => {
                          const qty = selectedFurniture.find(f => f.id === item.id)?.quantity || 0;
                          return (
                            <div key={item.id} className="group bg-white rounded-3xl overflow-hidden border border-brand-charcoal/5 hover:shadow-2xl transition-all duration-500">
                              <div className="relative aspect-square overflow-hidden">
                                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-brand-charcoal/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <div className="p-8 space-y-4">
                                <h3 className="text-xl font-serif font-bold text-brand-charcoal">{item.name}</h3>
                                <div className="flex items-center justify-between">
                                  <span className="text-brand-gold font-bold">₹{item.price.toLocaleString()}</span>
                                  <div className="flex items-center bg-brand-pearl rounded-full p-1 border border-brand-charcoal/5">
                                    <button onClick={() => updateFurniture(item.id, -1)} className="p-2 hover:text-brand-gold transition-colors"><Minus className="h-4 w-4" /></button>
                                    <span className="px-4 font-black text-sm w-10 text-center">{qty}</span>
                                    <button onClick={() => updateFurniture(item.id, 1)} className="p-2 hover:text-brand-gold transition-colors"><Plus className="h-4 w-4" /></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-6">
                        <Button variant="outline" onClick={prevStep} className="rounded-full px-10">Back</Button>
                        <Button size="lg" onClick={nextStep} className="rounded-full px-16 group flex-grow">
                          Final Customization <ChevronRight className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-12"
                    >
                      <div className="space-y-4">
                        <h2 className="text-4xl font-serif font-black">Luxe Materials</h2>
                        <p className="text-brand-stone font-light">Select the finish that defines your signature style.</p>
                      </div>

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-charcoal">Wood Curation</label>
                            <select {...register("material")} className="w-full bg-white border-b-2 border-brand-charcoal/10 py-6 px-8 rounded-2xl focus:border-brand-gold outline-none transition-all font-bold text-sm uppercase tracking-widest shadow-lg appearance-none">
                              <option>Engineering Wood</option>
                              <option>Premium Plywood</option>
                              <option>Solid Teak Wood</option>
                              <option>American Walnut</option>
                            </select>
                          </div>
                          <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-charcoal">Artisanal Finish</label>
                            <select {...register("finish")} className="w-full bg-white border-b-2 border-brand-charcoal/10 py-6 px-8 rounded-2xl focus:border-brand-gold outline-none transition-all font-bold text-sm uppercase tracking-widest shadow-lg appearance-none">
                              <option>Standard</option>
                              <option>Premium</option>
                              <option>Ultra Luxury</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-8 bg-white p-12 rounded-[2.5rem] shadow-2xl border border-brand-charcoal/5">
                          <h3 className="text-2xl font-serif font-bold">Personal Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <input placeholder="Your Name" {...register("name")} className="bg-brand-pearl border-b-2 border-brand-charcoal/10 py-5 px-6 focus:border-brand-gold outline-none font-bold rounded-xl" />
                            <input placeholder="Email Address" {...register("email")} className="bg-brand-pearl border-b-2 border-brand-charcoal/10 py-5 px-6 focus:border-brand-gold outline-none font-bold rounded-xl" />
                            <input placeholder="Phone Number" {...register("phone")} className="bg-brand-pearl border-b-2 border-brand-charcoal/10 py-5 px-6 focus:border-brand-gold outline-none font-bold rounded-xl" />
                          </div>
                        </div>

                        <div className="flex gap-6">
                          <Button variant="outline" onClick={prevStep} className="rounded-full px-10">Back</Button>
                          <Button type="submit" size="lg" className="rounded-full px-20 flex-grow shadow-2xl bg-brand-gold text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-pearl transition-all">
                            Receive Bespoke Proposal
                          </Button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Side: Immersive Summary */}
              <div className="w-full lg:w-[450px]">
                <div className="bg-brand-charcoal text-brand-pearl p-12 md:p-16 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] sticky top-32 space-y-12 overflow-hidden border border-white/5">
                  <div className="relative z-10 space-y-8">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-black">Estimated Investment</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold">₹</span>
                        <motion.span 
                          key={estimate}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-7xl md:text-8xl font-serif font-black tracking-tighter"
                        >
                          {Math.round(estimate).toLocaleString()}
                        </motion.span>
                      </div>
                      <p className="text-[10px] text-brand-pearl/30 uppercase tracking-widest font-bold">*Subject to artisanal curation</p>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div className="space-y-6">
                      <div className="flex justify-between items-center group">
                        <span className="text-[10px] uppercase tracking-widest text-brand-pearl/40 group-hover:text-brand-gold transition-colors">Base Space</span>
                        <span className="font-serif font-bold text-xl tracking-wider italic">
                          {BHK_OPTIONS.find(b => b.id === selectedBHK)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center group">
                        <span className="text-[10px] uppercase tracking-widest text-brand-pearl/40 group-hover:text-brand-gold transition-colors">Rooms</span>
                        <span className="font-serif font-bold text-xl tracking-wider italic">{selectedRooms.length} Areas</span>
                      </div>
                      <div className="flex justify-between items-center group">
                        <span className="text-[10px] uppercase tracking-widest text-brand-pearl/40 group-hover:text-brand-gold transition-colors">Bespoke Pieces</span>
                        <span className="font-serif font-bold text-xl tracking-wider italic">
                          {selectedFurniture.reduce((sum, i) => sum + i.quantity, 0)} Items
                        </span>
                      </div>
                    </div>

                    <div className="space-y-6 pt-12">
                      <Button variant="outline" className="w-full border-white/10 text-brand-pearl hover:bg-brand-gold hover:text-brand-charcoal hover:border-brand-gold py-6 rounded-full flex gap-4 transition-all">
                        <Download className="h-4 w-4" /> Download PDF Quote
                      </Button>
                    </div>
                  </div>

                  {/* Decorative 3D-like Element */}
                  <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none rotate-12">
                    <Calculator className="h-96 w-96 text-brand-gold" />
                  </div>
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 opacity-[0.02] pointer-events-none">
                    <span className="text-[300px] font-serif font-black italic">BANAYA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submitted Success State */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-charcoal/95 backdrop-blur-2xl"
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="max-w-2xl w-full bg-brand-pearl p-16 rounded-[4rem] text-center space-y-10 shadow-2xl relative overflow-hidden"
                  >
                    <div className="relative z-10 space-y-10">
                      <div className="h-32 w-32 bg-brand-gold rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(212,175,55,0.4)] animate-pulse">
                        <CheckCircle2 className="h-16 w-16 text-brand-charcoal" />
                      </div>
                      <div className="space-y-4">
                        <h2 className="text-5xl md:text-6xl font-serif font-black text-brand-charcoal leading-tight">Vision <br /> <span className="italic font-light">Received.</span></h2>
                        <p className="text-brand-stone text-xl font-light max-w-sm mx-auto leading-relaxed">Our master designer will curate a bespoke portfolio for your space within 24 hours.</p>
                      </div>
                      <Button size="lg" onClick={() => setIsSubmitted(false)} className="rounded-full px-16 shadow-xl">New Consultation</Button>
                    </div>
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                      <span className="text-[200px] font-serif italic font-black text-brand-charcoal">B</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CalculatorPage;
