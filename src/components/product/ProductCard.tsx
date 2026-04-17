import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  category: string;
  tag?: string;
}

const ProductCard = ({ id, name, price, image, hoverImage, category, tag }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();

  const isWishlisted = isInWishlist(id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart({ id, name, price, image, category });
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, image, category });
    }
  };

  return (
    <motion.div 
      className="group relative flex flex-col bg-transparent overflow-hidden perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      animate={{
        rotateY: mousePos.x * 20,
        rotateX: -mousePos.y * 20,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-brand-pearl shadow-xl group-hover:shadow-2xl transition-all duration-500">
        {tag && (
          <span className="absolute top-6 left-6 z-10 bg-brand-charcoal text-brand-pearl text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
            {tag}
          </span>
        )}
        <button 
          onClick={handleWishlist}
          className={`absolute top-6 right-6 z-10 p-3 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 ${
            isWishlisted 
              ? "bg-white text-red-500 shadow-lg scale-110" 
              : "bg-brand-pearl/90 backdrop-blur-sm text-brand-charcoal hover:bg-white hover:text-red-500"
          }`}
        >
          <motion.div
            animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`h-4 w-4 stroke-[1.5] ${isWishlisted ? "fill-red-500 stroke-red-500" : ""}`} />
          </motion.div>
        </button>
        
        <Link href={`/product/${id}`}>
          <Image
            src={isHovered && hoverImage ? hoverImage : image}
            alt={name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </Link>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-brand-charcoal/80 to-transparent pt-12">
          <button 
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="w-full bg-brand-pearl text-brand-charcoal py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-brand-gold transition-all shadow-2xl disabled:bg-brand-gold"
          >
            <AnimatePresence mode="wait">
              {isAdding ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 45 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-4 w-4" />
                  Added
                </motion.div>
              ) : (
                <motion.div
                  key="bag"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Quick Add
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-8 flex flex-col items-start space-y-2">
        <p className="text-[9px] text-brand-gold uppercase tracking-[0.3em] font-black">{category}</p>
        <Link href={`/product/${id}`} className="block group/link">
          <h3 className="text-xl font-serif font-bold text-brand-charcoal group-hover/link:text-brand-gold transition-colors duration-300">{name}</h3>
        </Link>
        <div className="flex items-center gap-4">
          <p className="text-brand-charcoal font-bold tracking-wider">₹{price.toLocaleString()}</p>
          <div className="h-px w-8 bg-brand-gold/30" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
