import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Download, CheckCircle2, ChevronRight, ChevronLeft, Plus, Minus, Home, LayoutGrid, Armchair, Layers, Building, Building2, Hotel, Warehouse, Sofa, Utensils, Bed, Baby, Coffee, Columns2, PanelLeft, Lamp, Frame, Square, Package, Paintbrush, Zap, Wind } from "lucide-react";
import { BHK_OPTIONS, ROOM_OPTIONS, FURNITURE_ITEMS, GENERAL_SERVICES, BRAND_OPTIONS, DETAILED_FURNITURE, BASIC_REQUIREMENTS } from "@/data/calculator";

const calculatorSchema = z.object({
  propertyType: z.string().optional(),
  requirementType: z.enum(["full_home", "specific_area"]).optional(),
  carpetArea: z.string().optional(),
  rooms: z.array(z.string()).optional(),
  material: z.string().optional(),
  finish: z.string().optional(),
  brand: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  city: z.string().min(2, "City is required"),
  serviceType: z.enum(["services", "interior", "homes"], { error: "Service type is required" }),
});

type CalculatorForm = z.infer<typeof calculatorSchema>;

const CalculatorPage = () => {
  const [step, setStep] = useState(0);
  const [estimate, setEstimate] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serviceType, setServiceType] = useState<"services" | "interior" | "homes" | null>(null);
  const [requirementType, setRequirementType] = useState<"full_home" | "specific_area">("full_home");
  const [selectedBHK, setSelectedBHK] = useState(BHK_OPTIONS[1].id);
  const [carpetArea, setCarpetArea] = useState("");
  const [selectedFurniture, setSelectedFurniture] = useState<string[]>([]); // For Stage 1 Homes
  const [selectedFurnitureOptions, setSelectedFurnitureOptions] = useState<{id: string, quantity: number}[]>([]); // For Stage 2 Homes
  const [selectedDetailedFurniture, setSelectedDetailedFurniture] = useState<{id: string, quantity: number}[]>([]); // For Stage 2 Interior
  const [selectedBasicRequirements, setSelectedBasicRequirements] = useState<string[]>([]); // For Stage 3 Interior
  const [selectedGeneralServices, setSelectedGeneralServices] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState(BRAND_OPTIONS[0].id);

  const toggleGeneralService = (id: string) => {
    setSelectedGeneralServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const serviceOptions = [
    {
      id: "services",
      title: "Services",
      description: [
        "Wall Paint",
        "Ceiling Work",
        "Electrical",
        "AC Piping",
      ],
      icon: Paintbrush,
      color: "blue",
    },
    {
      id: "interior",
      title: "Interior",
      description: [
        "Modular Kitchen",
        "Wardrobes",
        "TV Units",
        "Crockery Units",
        "Study Tables",
        "Shoe Racks",
        "Mandir Units",
      ],
      icon: LayoutGrid,
      color: "green",
    },
    {
      id: "homes",
      title: "Homes",
      description: [
        "Full Home Interiors",
        "Renovations",
        "New Home Setup",
        "Custom Designs",
      ],
      icon: Home,
      color: "orange",
    },
  ];

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CalculatorForm>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      material: "Solid Teak Wood",
      finish: "Premium",
      city: "",
      requirementType: "full_home",
    },}
  );

  const formData = watch();

  useEffect(() => {
    let total = 0;
    
    if (serviceType === "homes") {
      // Stage 2 Options calculation
      selectedFurnitureOptions.forEach(opt => {
        // Find the price from FURNITURE_ITEMS options
        let price = 0;
        FURNITURE_ITEMS.forEach(item => {
          if (item.options) {
            const found = item.options.find(o => o.id === opt.id);
            if (found) price = found.price;
          } else if (item.id === opt.id) {
            price = item.price || 0;
          }
        });
        total += price * opt.quantity;
      });

      const brandMultiplier = BRAND_OPTIONS.find(brand => brand.id === selectedBrand)?.multiplier || 1;
      setEstimate(total * brandMultiplier);

    } else if (serviceType === "interior") {
      // Stage 1: BHK Base Price only if Full Home
      if (requirementType === "full_home") {
        const bhk = BHK_OPTIONS.find(b => b.id === selectedBHK);
        if (bhk) total += bhk.price;
      }

      // Stage 2: Detailed Furniture
      selectedDetailedFurniture.forEach(item => {
        let price = 0;
        Object.values(DETAILED_FURNITURE).flat().forEach(f => {
          if (f.id === item.id) price = f.price;
        });
        total += price * item.quantity;
      });

      // Stage 3: Basic Requirements
      selectedBasicRequirements.forEach(reqId => {
        const req = BASIC_REQUIREMENTS.find(r => r.id === reqId);
        if (req) total += req.price;
      });

      // Carpet Area factor (simple heuristic)
      const area = parseInt(carpetArea) || 0;
      total += area * 100;

      const brandMultiplier = BRAND_OPTIONS.find(brand => brand.id === selectedBrand)?.multiplier || 1;
      setEstimate(total * brandMultiplier);

    } else if (serviceType === "services") {
      selectedGeneralServices.forEach(serviceId => {
        const service = GENERAL_SERVICES.find(s => s.id === serviceId);
        if (service) total += service.price;
      });
      
      const brandMultiplier = BRAND_OPTIONS.find(brand => brand.id === selectedBrand)?.multiplier || 1;
      setEstimate(total * brandMultiplier);
    }
  }, [selectedBHK, selectedFurnitureOptions, selectedDetailedFurniture, selectedBasicRequirements, carpetArea, serviceType, selectedGeneralServices, selectedBrand, requirementType]);

  const toggleFurniture = (id: string) => {
    setSelectedFurniture(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        // Also remove its options from selectedFurnitureOptions
        const furniture = FURNITURE_ITEMS.find(f => f.id === id);
        if (furniture) {
          const optionIds = furniture.options?.map(o => o.id) || [id];
          setSelectedFurnitureOptions(opts => opts.filter(o => !optionIds.includes(o.id)));
        }
        return prev.filter(f => f !== id);
      } else {
        // If it has no options, add it to selectedFurnitureOptions by default
        const furniture = FURNITURE_ITEMS.find(f => f.id === id);
        if (furniture && !furniture.options) {
          setSelectedFurnitureOptions(opts => [...opts, { id, quantity: 1 }]);
        }
        return [...prev, id];
      }
    });
  };

  const toggleFurnitureOption = (id: string) => {
    setSelectedFurnitureOptions(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) return prev.filter(item => item.id !== id);
      return [...prev, { id, quantity: 1 }];
    });
  };

  const updateFurnitureOptionQty = (id: string, delta: number) => {
    setSelectedFurnitureOptions(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const toggleDetailedFurniture = (id: string) => {
    setSelectedDetailedFurniture(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) return prev.filter(item => item.id !== id);
      return [...prev, { id, quantity: 1 }];
    });
  };

  const updateDetailedFurnitureQty = (id: string, delta: number) => {
    setSelectedDetailedFurniture(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const toggleBasicRequirement = (id: string) => {
    setSelectedBasicRequirements(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleDownload = () => {
    const bhk = BHK_OPTIONS.find(b => b.id === selectedBHK)?.name;
    const furniture = serviceType === "homes" 
      ? selectedFurnitureOptions.map(f => {
          let name = "";
          FURNITURE_ITEMS.forEach(item => {
            if (item.options) {
              const opt = item.options.find(o => o.id === f.id);
              if (opt) name = opt.name;
            } else if (item.id === f.id) {
              name = item.name;
            }
          });
          return `${name} (x${f.quantity})`;
        }).join(", ")
      : selectedDetailedFurniture.map(f => {
          let name = "";
          Object.values(DETAILED_FURNITURE).flat().forEach(item => {
            if (item.id === f.id) name = item.name;
          });
          return `${name} (x${f.quantity})`;
        }).join(", ");

    const generalServices = selectedGeneralServices.map(s => {
      const item = GENERAL_SERVICES.find(gs => gs.id === s);
      return item?.name;
    }).join(", ");

    const content = `
BANAYA - BESPOKE QUOTE
--------------------------------
Service Type: ${serviceType}
Requirement Type: ${requirementType === "full_home" ? "Full Home" : "Specific Area"}
Estimated Investment: ₹${Math.round(estimate).toLocaleString()}

SELECTION DETAILS:
${(serviceType === "interior" || serviceType === "homes") && requirementType === "full_home" ? `Base Space: ${bhk}` : ""}
${serviceType === "interior" || serviceType === "homes" ? `Bespoke Pieces: ${furniture || "None selected"}` : ""}
${serviceType === "services" ? `General Services: ${generalServices || "None selected"}` : ""}

MATERIALS & FINISH:
Brand: ${BRAND_OPTIONS.find(brand => brand.id === selectedBrand)?.name}
${serviceType === "interior" || serviceType === "homes" ? `Material: ${formData.material}` : ""}
${serviceType === "interior" || serviceType === "homes" ? `Finish: ${formData.finish}` : ""}

This is a preliminary estimate subject to artisanal curation.
Contact us at hello@banaya.com for a formal consultation.
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Banaya_Quote_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const onSubmit = (data: CalculatorForm) => {
    console.log({ ...data, selectedBHK, selectedFurniture, selectedFurnitureOptions, selectedDetailedFurniture, requirementType });
    setIsSubmitted(true);
  };

  const BHK_ICONS: Record<string, any> = {
    "1bhk": Home,
    "2bhk": Building,
    "3bhk": Building2,
    "4bhk": Hotel,
  };

  const ROOM_ICONS: Record<string, any> = {
    "living": Sofa,
    "kitchen": Utensils,
    "bedroom": Bed,
    "kids_bedroom": Baby,
    "dining": Coffee,
  };

  const FURNITURE_ICONS: Record<string, any> = {
    "bed": Bed,
    "wardrobe_2": Columns2,
    "wardrobe_5": PanelLeft,
    "modular_kitchen": Utensils,
    "kitchen_overhead": Layers,
    "mandir": Lamp,
    "mirror": Frame,
    "curtain": Square,
  };

  const SERVICE_ICONS: Record<string, any> = {
    "Wall Paint": Paintbrush,
    "Ceiling Work": Layers,
    "Electrical work with switch": Zap,
    "AC Piping": Wind,
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <Layout title="Bespoke Cost Calculator | Banaya">
      <div className="flex flex-row h-full">
        <section className="py-16 bg-brand-pearl h-full horizontal-scroll-section overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-7xl mx-auto">

              <div className="text-center mb-12 space-y-3">
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
                  className="text-5xl md:text-6xl font-serif font-black text-brand-charcoal"
                >
                  Interior <span className="italic font-light">Vision</span>
                </motion.h1>
              </div>

              <div className="flex flex-col lg:flex-row gap-10">
              {/* Left Side: Interactive Steps */}
              <div className="flex-grow space-y-12">
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div key="step0" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.6, ease: "easeOut" }} className="space-y-10">
                      <div className="text-center space-y-4">
                        <h2 className="text-4xl font-sans font-black uppercase tracking-tight">Our Services</h2>
                        <p className="text-brand-stone font-light">Choose the type of service you need.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {serviceOptions.map((option) => (
                          <button key={option.id} onClick={() => { setServiceType(option.id as "services" | "interior" | "homes"); nextStep(); }} className={`group p-8 rounded-3xl shadow-xl border-2 transition-all duration-300 ${option.color === "blue" ? "border-blue-500 hover:bg-blue-50" : ""} ${option.color === "green" ? "border-green-500 hover:bg-green-50" : ""} ${option.color === "orange" ? "border-orange-500 hover:bg-orange-50" : ""} bg-white space-y-6 text-left`}>
                            <div className="flex items-center gap-4">
                              <option.icon className={`h-8 w-8 ${option.color === "blue" ? "text-blue-500" : ""} ${option.color === "green" ? "text-green-500" : ""} ${option.color === "orange" ? "text-orange-500" : ""}`} />
                              <h3 className="text-xl font-sans font-black uppercase tracking-tight text-brand-charcoal">{option.title}</h3>
                            </div>
                            <ul className="list-disc list-inside text-brand-stone text-sm space-y-2">
                              {option.description.map((desc, i) => (<li key={i}>{desc}</li>))}
                            </ul>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step > 0 && step <= 4 && (
                    <>
                      {/* Progress Navigation */}
                      <div className="flex justify-between items-center bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-brand-charcoal/5">
                        {[
                          { s: 1, name: "Requirements" },
                          { s: 2, name: "Selection" },
                          { s: 3, name: "Brand" },
                          { s: 4, name: "Estimate" }
                        ].map((item) => (
                          <div key={item.s} className="flex items-center gap-2 md:gap-4 group">
                            <button 
                              onClick={() => item.s < step && setStep(item.s)}
                              className={`h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center font-black text-xs transition-all duration-500 shrink-0 ${
                                step === item.s ? "bg-brand-gold text-brand-charcoal scale-110 shadow-lg" : 
                                step > item.s ? "bg-brand-charcoal text-brand-pearl" : 
                                "bg-brand-pearl text-brand-stone/30 border border-brand-charcoal/5"
                              }`}
                            >
                              {item.s}
                            </button>
                            <div className="hidden sm:flex flex-col">
                              <span className={`text-[9px] uppercase tracking-widest font-black transition-colors ${step >= item.s ? "text-brand-charcoal" : "text-brand-stone/30"}`}>
                                {item.name}
                              </span>
                            </div>
                            {item.s < 4 && <div className={`h-px w-4 md:w-8 bg-brand-charcoal/10 mx-2 md:mx-4`} />}
                          </div>
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        {step === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="space-y-10"
                          >
                            <div className="space-y-4">
                              <h2 className="text-4xl font-sans font-black uppercase tracking-tight">Fill Your Requirements</h2>
                              <p className="text-brand-stone font-light">
                                {serviceType === "homes" ? "Select the furniture items you need." : "Select the scope and space of your project."}
                              </p>
                            </div>

                            {serviceType === "homes" ? (
                              <div className="space-y-6">
                                <h3 className="text-sm font-black uppercase tracking-widest text-brand-charcoal">Select Furniture</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                  {FURNITURE_ITEMS.map((item) => (
                                    <button
                                      key={item.id}
                                      onClick={() => toggleFurniture(item.id)}
                                      className={`group relative p-3 rounded-2xl transition-all duration-500 border-2 flex flex-col items-center gap-3 ${
                                        selectedFurniture.includes(item.id)
                                          ? "border-brand-gold bg-white shadow-xl scale-[1.02]"
                                          : "bg-white border-brand-charcoal/5 hover:border-brand-gold/30"
                                      }`}
                                    >
                                      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-1">
                                        <img src={item.image} alt={item.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                                        {selectedFurniture.includes(item.id) && (
                                          <div className="absolute inset-0 bg-brand-gold/20 flex items-center justify-center">
                                            <div className="bg-brand-gold text-brand-charcoal p-1.5 rounded-full shadow-lg">
                                              <CheckCircle2 className="h-4 w-4" />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <span className="font-sans font-black text-[10px] uppercase tracking-widest text-brand-charcoal text-center leading-tight">{item.name}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-8">
                                {/* Requirement Type Tabs */}
                                <div className="flex bg-brand-pearl p-2 rounded-2xl border border-brand-charcoal/5 w-fit">
                                  <button
                                    onClick={() => setRequirementType("full_home")}
                                    className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                                      requirementType === "full_home" ? "bg-brand-gold text-brand-charcoal shadow-lg" : "text-brand-stone/50 hover:text-brand-charcoal"
                                    }`}
                                  >
                                    Full Home
                                  </button>
                                  <button
                                    onClick={() => setRequirementType("specific_area")}
                                    className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                                      requirementType === "specific_area" ? "bg-brand-gold text-brand-charcoal shadow-lg" : "text-brand-stone/50 hover:text-brand-charcoal"
                                    }`}
                                  >
                                    Specific Area
                                  </button>
                                </div>

                                <div className="space-y-6">
                                  <h3 className="text-sm font-black uppercase tracking-widest text-brand-charcoal">Area</h3>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                    {BHK_OPTIONS.map((opt) => (
                                      <button
                                        key={opt.id}
                                        onClick={() => setSelectedBHK(opt.id)}
                                        className={`group relative p-4 rounded-3xl transition-all duration-500 border-2 flex flex-col items-center gap-4 ${
                                          selectedBHK === opt.id 
                                            ? "border-brand-gold bg-white shadow-2xl scale-[1.02]" 
                                            : "bg-white border-brand-charcoal/5 hover:border-brand-gold/30"
                                        }`}
                                      >
                                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-2">
                                          <img src={opt.image} alt={opt.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                                          {selectedBHK === opt.id && (
                                            <div className="absolute inset-0 bg-brand-gold/20 flex items-center justify-center">
                                              <div className="bg-brand-gold text-brand-charcoal p-2 rounded-full shadow-lg">
                                                <CheckCircle2 className="h-5 w-5" />
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <span className="font-sans font-black text-sm uppercase tracking-widest text-brand-charcoal">{opt.name}</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <label className="text-sm font-black uppercase tracking-widest text-brand-charcoal">Please Enter Carpet Area *</label>
                                  <input 
                                    type="text" 
                                    value={carpetArea}
                                    onChange={(e) => setCarpetArea(e.target.value)}
                                    placeholder="Enter carpet area"
                                    className="w-full bg-white border-2 border-brand-charcoal/5 p-5 rounded-2xl focus:border-brand-gold outline-none transition-all font-bold text-lg"
                                  />
                                </div>
                              </div>
                            )}
                            
                            <div className="flex gap-6">
                              <Button variant="outline" onClick={prevStep} className="rounded-full px-10">Back</Button>
                              <Button size="lg" onClick={nextStep} className="rounded-full px-16 group flex-grow">
                                Next Step <ChevronRight className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-2" />
                              </Button>
                            </div>
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
                              <h2 className="text-4xl font-sans font-black uppercase tracking-tight">
                                {serviceType === "services" ? "Select Services" : "Select Furnitures"}
                              </h2>
                              <p className="text-brand-stone font-light">
                                {serviceType === "services" ? "Choose the specialized services you need." : "Customize your selection with specific items and quantities."}
                              </p>
                            </div>

                            {serviceType === "homes" ? (
                              <div className="space-y-12">
                                {selectedFurniture.map(furnId => {
                                  const furniture = FURNITURE_ITEMS.find(f => f.id === furnId);
                                  if (!furniture) return null;
                                  return (
                                    <div key={furnId} className="space-y-6">
                                      <div className="flex items-center gap-4">
                                        <div className="h-1 bg-brand-gold w-12 rounded-full" />
                                        <h3 className="text-2xl font-sans font-black uppercase tracking-tight text-brand-charcoal">{furniture.name}</h3>
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {furniture.options ? furniture.options.map(opt => {
                                          const isSel = selectedFurnitureOptions.find(o => o.id === opt.id);
                                          return (
                                            <div key={opt.id} className={`bg-white border-2 rounded-[2rem] p-8 flex flex-col gap-6 transition-all duration-500 ${isSel ? "border-brand-gold shadow-2xl scale-[1.02]" : "border-brand-charcoal/5 shadow-sm hover:border-brand-gold/20"}`}>
                                              <div className="flex items-start justify-between">
                                                <div className="flex gap-4">
                                                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-brand-pearl shrink-0 border border-brand-charcoal/5">
                                                    <img src={furniture.image} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                                                  </div>
                                                  <div className="space-y-1">
                                                    <h4 className="font-sans font-black text-xs uppercase tracking-widest text-brand-charcoal leading-tight">{opt.name}</h4>
                                                    <p className="text-brand-gold font-black text-sm">₹{opt.price.toLocaleString()}</p>
                                                  </div>
                                                </div>
                                                <button 
                                                  onClick={() => toggleFurnitureOption(opt.id)}
                                                  className={`w-14 h-7 rounded-full relative transition-all duration-500 ${isSel ? "bg-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]" : "bg-brand-stone/20"}`}
                                                >
                                                  <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-500 ${isSel ? "translate-x-7" : ""}`} />
                                                </button>
                                              </div>
                                              
                                              {isSel && (
                                                <motion.div 
                                                  initial={{ opacity: 0, height: 0 }}
                                                  animate={{ opacity: 1, height: "auto" }}
                                                  className="flex items-center justify-between pt-4 border-t border-brand-charcoal/5"
                                                >
                                                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-stone">Quantity</span>
                                                  <div className="flex items-center bg-brand-pearl rounded-full p-1.5 border border-brand-charcoal/5 shadow-inner">
                                                    <button onClick={() => updateFurnitureOptionQty(opt.id, -1)} className="p-2 hover:text-brand-gold transition-colors"><Minus className="h-3 w-3" /></button>
                                                    <span className="px-5 font-black text-xs w-12 text-center text-brand-charcoal">{isSel.quantity}</span>
                                                    <button onClick={() => updateFurnitureOptionQty(opt.id, 1)} className="p-2 hover:text-brand-gold transition-colors"><Plus className="h-3 w-3" /></button>
                                                  </div>
                                                </motion.div>
                                              )}
                                            </div>
                                          );
                                        }) : (
                                          <div className="bg-white border-2 border-brand-gold rounded-[2rem] p-8 flex flex-col gap-6 shadow-2xl scale-[1.02]">
                                            <div className="flex items-start justify-between">
                                              <div className="flex gap-4">
                                                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-brand-pearl shrink-0 border border-brand-charcoal/5">
                                                  <img src={furniture.image} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                                                </div>
                                                <div className="space-y-1">
                                                  <h4 className="font-sans font-black text-xs uppercase tracking-widest text-brand-charcoal leading-tight">{furniture.name}</h4>
                                                  <p className="text-brand-gold font-black text-sm">₹{furniture.price?.toLocaleString()}</p>
                                                </div>
                                              </div>
                                              <div className="w-14 h-7 rounded-full bg-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-end px-1">
                                                <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                                              </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t border-brand-charcoal/5">
                                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-stone">Quantity</span>
                                              <div className="flex items-center bg-brand-pearl rounded-full p-1.5 border border-brand-charcoal/5 shadow-inner">
                                                <button onClick={() => updateFurnitureOptionQty(furniture.id, -1)} className="p-2 hover:text-brand-gold transition-colors"><Minus className="h-3 w-3" /></button>
                                                <span className="px-5 font-black text-xs w-12 text-center text-brand-charcoal">
                                                  {selectedFurnitureOptions.find(o => o.id === furniture.id)?.quantity || 1}
                                                </span>
                                                <button onClick={() => updateFurnitureOptionQty(furniture.id, 1)} className="p-2 hover:text-brand-gold transition-colors"><Plus className="h-3 w-3" /></button>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : serviceType === "interior" ? (
                              <div className="space-y-12">
                                {Object.entries(DETAILED_FURNITURE).map(([area, items]) => (
                                  <div key={area} className="space-y-8">
                                    <div className="flex items-center gap-6">
                                      <h3 className="text-sm font-black uppercase tracking-[0.4em] text-brand-stone whitespace-nowrap">{area}</h3>
                                      <div className="h-px bg-brand-charcoal/5 w-full" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                      {items.map(item => {
                                        const isSel = selectedDetailedFurniture.find(f => f.id === item.id);
                                        return (
                                          <div key={item.id} className={`bg-white border-2 transition-all duration-500 p-6 rounded-3xl flex flex-col gap-6 ${isSel ? "border-brand-gold shadow-xl scale-[1.02]" : "border-brand-charcoal/5 hover:border-brand-gold/20"}`}>
                                            <div className="flex items-center justify-between gap-4">
                                              <div className="flex items-center gap-4">
                                                <div className={`w-1.5 h-10 rounded-full transition-colors ${isSel ? "bg-brand-gold" : "bg-brand-pearl"}`} />
                                                <div className="space-y-0.5">
                                                  <h4 className="font-sans font-black text-[11px] uppercase tracking-widest text-brand-charcoal">{item.name}</h4>
                                                  <p className="text-brand-gold font-black text-[10px]">₹{item.price.toLocaleString()}</p>
                                                </div>
                                              </div>
                                              <button 
                                                onClick={() => toggleDetailedFurniture(item.id)}
                                                className={`w-12 h-6 rounded-full relative transition-all duration-500 ${isSel ? "bg-brand-gold shadow-lg" : "bg-brand-stone/20"}`}
                                              >
                                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-500 ${isSel ? "translate-x-6" : ""}`} />
                                              </button>
                                            </div>

                                            {isSel && (
                                              <motion.div 
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="flex items-center justify-between pt-4 border-t border-brand-charcoal/5"
                                              >
                                                <span className="text-[9px] font-black uppercase tracking-widest text-brand-stone">Quantity</span>
                                                <div className="flex items-center bg-brand-pearl rounded-full p-1 border border-brand-charcoal/5">
                                                  <button onClick={() => updateDetailedFurnitureQty(item.id, -1)} className="p-1.5 hover:text-brand-gold transition-colors"><Minus className="h-3 w-3" /></button>
                                                  <span className="px-3 font-black text-[10px] w-8 text-center text-brand-charcoal">{isSel.quantity}</span>
                                                  <button onClick={() => updateDetailedFurnitureQty(item.id, 1)} className="p-1.5 hover:text-brand-gold transition-colors"><Plus className="h-3 w-3" /></button>
                                                </div>
                                              </motion.div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {GENERAL_SERVICES.map((opt) => {
                                  const Icon = SERVICE_ICONS[opt.name] || Paintbrush;
                                  const isActive = selectedGeneralServices.includes(opt.id);
                                  return (
                                    <button
                                      key={opt.id}
                                      onClick={() => toggleGeneralService(opt.id)}
                                      className={`group relative p-8 rounded-3xl transition-all duration-500 border-2 flex items-center justify-between gap-6 ${
                                        isActive 
                                          ? "bg-white border-brand-gold shadow-xl scale-[0.98]" 
                                          : "bg-white border-brand-charcoal/5 hover:border-brand-gold/20"
                                      }`}
                                    >
                                      <div className="flex items-center gap-6">
                                        <div className={`p-4 rounded-2xl transition-colors duration-500 ${
                                          isActive ? "bg-brand-gold text-brand-charcoal" : "bg-brand-pearl text-brand-charcoal/40 group-hover:text-brand-gold"
                                        }`}>
                                          <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className={`text-sm font-sans font-black uppercase tracking-widest ${
                                          isActive ? "text-brand-charcoal" : "text-brand-charcoal/60"
                                        }`}>{opt.name}</h3>
                                      </div>
                                      
                                      <div className={`w-12 h-6 rounded-full relative transition-colors duration-500 ${isActive ? "bg-brand-gold" : "bg-brand-stone/20"}`}>
                                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-500 ${isActive ? "translate-x-6" : ""}`} />
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            <div className="flex gap-6">
                              <Button variant="outline" onClick={prevStep} className="rounded-full px-10">Back</Button>
                              <Button size="lg" onClick={nextStep} className="rounded-full px-16 group flex-grow">
                                Next Step <ChevronRight className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-2" />
                              </Button>
                            </div>
                          </motion.div>
                        )}

                        {step === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="space-y-10"
                          >
                            <div className="space-y-4">
                              <h2 className="text-4xl font-sans font-black uppercase tracking-tight">
                                Select Brand
                              </h2>
                              <p className="text-brand-stone font-light">
                                Choose your preferred brand for materials and finishes.
                              </p>
                            </div>

                            <div className="space-y-12">
                              {serviceType === "interior" && (
                                <div className="space-y-6">
                                  <h3 className="text-sm font-black uppercase tracking-widest text-brand-charcoal">Basic Requirement</h3>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                                    {BASIC_REQUIREMENTS.map(item => {
                                      const Icon = SERVICE_ICONS[item.name] || Layers;
                                      const isSel = selectedBasicRequirements.includes(item.id);
                                      return (
                                        <button
                                          key={item.id}
                                          onClick={() => toggleBasicRequirement(item.id)}
                                          className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${isSel ? "border-brand-gold bg-white shadow-md" : "border-brand-charcoal/5 bg-white"}`}
                                        >
                                          <div className={`p-3 rounded-xl ${isSel ? "bg-brand-gold text-brand-charcoal" : "bg-brand-pearl text-brand-stone"}`}>
                                            <Icon className="h-6 w-6" />
                                          </div>
                                          <span className="text-[10px] font-black uppercase tracking-tight text-center leading-tight">{item.name}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              <div className="space-y-6">
                                <h3 className="text-sm font-black uppercase tracking-widest text-brand-charcoal flex items-center gap-2">
                                  Select Brand <div className="h-4 w-4 bg-brand-gold text-white rounded-full flex items-center justify-center text-[10px]">i</div>
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                  {BRAND_OPTIONS.map((opt) => (
                                    <button
                                      key={opt.id}
                                      onClick={() => setSelectedBrand(opt.id)}
                                      className={`group relative p-4 rounded-3xl transition-all duration-500 border-2 flex flex-col items-center gap-6 ${
                                        selectedBrand === opt.id 
                                          ? "border-brand-gold bg-white shadow-2xl scale-[1.02]" 
                                          : "bg-white border-brand-charcoal/5 hover:border-brand-gold/30"
                                      }`}
                                    >
                                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                                        <img src={opt.image} alt={opt.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                                        {selectedBrand === opt.id && (
                                          <div className="absolute inset-0 bg-brand-gold/20 flex items-center justify-center">
                                            <div className="bg-brand-gold text-brand-charcoal p-2 rounded-full shadow-lg">
                                              <CheckCircle2 className="h-6 w-6" />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="text-center pb-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 block text-brand-stone">Brand Level</span>
                                        <h3 className="text-xl font-sans font-black uppercase tracking-tight text-brand-charcoal">{opt.name}</h3>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-6">
                              <Button variant="outline" onClick={prevStep} className="rounded-full px-10">Back</Button>
                              <Button size="lg" onClick={nextStep} className="rounded-full px-16 group flex-grow">
                                Final Estimate <ChevronRight className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-2" />
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
                              <h2 className="text-4xl font-sans font-black uppercase tracking-tight text-center">Get Your Estimate</h2>
                              <p className="text-brand-stone font-light text-center">Fill in your details to receive a bespoke proposal.</p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                              <div className="space-y-8 bg-white p-12 rounded-[2.5rem] shadow-2xl border border-brand-charcoal/5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                  <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest font-black text-brand-stone">Full Name*</label>
                                    <input placeholder="Enter your name" {...register("name")} className="w-full bg-brand-pearl border border-brand-charcoal/10 py-5 px-6 focus:border-brand-gold outline-none font-bold rounded-xl transition-all" />
                                    {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.name.message}</p>}
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest font-black text-brand-stone">Email Address*</label>
                                    <input placeholder="Enter your email" {...register("email")} className="w-full bg-brand-pearl border border-brand-charcoal/10 py-5 px-6 focus:border-brand-gold outline-none font-bold rounded-xl transition-all" />
                                    {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.email.message}</p>}
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest font-black text-brand-stone">Phone Number*</label>
                                    <input placeholder="Enter your phone number" {...register("phone")} className="w-full bg-brand-pearl border border-brand-charcoal/10 py-5 px-6 focus:border-brand-gold outline-none font-bold rounded-xl transition-all" />
                                    {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.phone.message}</p>}
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest font-black text-brand-stone">Your City*</label>
                                    <input placeholder="Enter your city" {...register("city")} className="w-full bg-brand-pearl border border-brand-charcoal/10 py-5 px-6 focus:border-brand-gold outline-none font-bold rounded-xl transition-all" />
                                    {errors.city && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.city.message}</p>}
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-6">
                                <Button variant="outline" onClick={prevStep} className="rounded-full px-10">Back</Button>
                                <Button type="submit" size="lg" className="rounded-full px-20 flex-grow shadow-2xl bg-brand-gold text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-pearl transition-all font-black uppercase tracking-[0.2em]">
                                  Submit & Get Proposal
                                </Button>
                              </div>
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Side: Immersive Summary */}
              <div className="w-full lg:w-[400px] shrink-0">
                <div className="bg-brand-charcoal text-brand-pearl p-10 md:p-12 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] sticky top-32 space-y-10 overflow-hidden border border-white/5">
                  <div className="relative z-10 space-y-8">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-black">Estimated Investment</p>
                      <div className="flex items-baseline gap-2 flex-wrap overflow-visible">
                        <span className="text-xl font-bold">₹</span>
                        <motion.span 
                          key={estimate}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black tracking-tighter leading-none"
                        >
                          {Math.round(estimate).toLocaleString()}
                        </motion.span>
                      </div>
                      <p className="text-[10px] text-brand-pearl/30 uppercase tracking-widest font-bold">*Subject to artisanal curation</p>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div className="space-y-6">
                      <div className="flex justify-between items-center group">
                        <div className="flex items-center gap-3">
                          <Layers className="h-4 w-4 text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                          <span className="text-[10px] uppercase tracking-widest text-brand-pearl/40 group-hover:text-brand-pearl transition-colors">Service Type</span>
                        </div>
                        <span className="font-sans font-black text-sm uppercase tracking-widest text-brand-gold">
                          {serviceType}
                        </span>
                      </div>

                      <div className="flex justify-between items-center group">
                        <div className="flex items-center gap-3">
                          <Home className="h-4 w-4 text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                          <span className="text-[10px] uppercase tracking-widest text-brand-pearl/40 group-hover:text-brand-pearl transition-colors">Requirements</span>
                        </div>
                        <span className="font-sans font-black text-xs uppercase tracking-widest">
                          {requirementType === "full_home" ? "Full Home" : "Specific Area"} ({BHK_OPTIONS.find(b => b.id === selectedBHK)?.name})
                        </span>
                      </div>

                      {serviceType === "services" ? (
                        <div className="space-y-4 pt-4 border-t border-white/5">
                          <div className="flex items-center gap-3">
                            <Paintbrush className="h-4 w-4 text-brand-gold/50" />
                            <span className="text-[10px] uppercase tracking-widest text-brand-pearl/40">Selected Services</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {selectedGeneralServices.map(sId => (
                              <span key={sId} className="px-3 py-1 bg-white/5 rounded-full text-[9px] uppercase tracking-widest font-black text-brand-gold">
                                {GENERAL_SERVICES.find(s => s.id === sId)?.name}
                              </span>
                            ))}
                            {selectedGeneralServices.length === 0 && <span className="text-[10px] text-white/20 italic">None selected</span>}
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-center group">
                        <div className="flex items-center gap-3">
                          <Armchair className="h-4 w-4 text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                          <span className="text-[10px] uppercase tracking-widest text-brand-pearl/40 group-hover:text-brand-pearl transition-colors">Bespoke Pieces</span>
                        </div>
                        <span className="font-sans font-black text-sm uppercase tracking-widest">
                          {serviceType === "homes" 
                            ? selectedFurnitureOptions.reduce((sum, i) => sum + i.quantity, 0)
                            : selectedDetailedFurniture.reduce((sum, i) => sum + i.quantity, 0)
                          } Items
                        </span>
                      </div>
                        </>
                      )}

                      <div className="flex justify-between items-center group pt-4 border-t border-white/5">
                        <div className="flex items-center gap-3">
                          <Layers className="h-4 w-4 text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                          <span className="text-[10px] uppercase tracking-widest text-brand-pearl/40 group-hover:text-brand-pearl transition-colors">Brand Level</span>
                        </div>
                        <span className="font-sans font-black text-xs uppercase tracking-widest text-brand-gold">
                          {BRAND_OPTIONS.find(brand => brand.id === selectedBrand)?.name}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-6 pt-6">
                      <Button 
                        variant="outline" 
                        onClick={handleDownload}
                        className="w-full border-white/10 text-brand-pearl hover:bg-brand-gold hover:text-brand-charcoal hover:border-brand-gold py-6 rounded-full flex gap-4 transition-all"
                      >
                        <Download className="h-4 w-4" /> Download Quote
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
                        <h2 className="text-5xl md:text-6xl font-sans font-black text-brand-charcoal leading-tight uppercase tracking-tighter">Vision <br /> <span className="text-brand-gold">Received.</span></h2>
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
        </section>
      </div>
    </Layout>
  );
};

export default CalculatorPage;
