import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const router = useRouter();
  const isShopPage = router.pathname === "/shop" || router.pathname.startsWith("/product/");
  const scrollRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    if (isShopPage) return;

    const calculateScrollRange = () => {
      if (scrollRef.current) {
        setScrollRange(scrollRef.current.scrollWidth);
        setViewportWidth(window.innerWidth);
      }
    };

    calculateScrollRange();
    window.addEventListener("resize", calculateScrollRange);
    return () => window.removeEventListener("resize", calculateScrollRange);
  }, [children, isShopPage]);

  const { scrollYProgress } = useScroll();
  const transform = useTransform(scrollYProgress, [0, 1], [0, -(scrollRange - viewportWidth)]);
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const springTransform = useSpring(transform, physics);

  return (
    <div className="flex flex-col min-h-screen selection:bg-brand-gold selection:text-brand-charcoal">
      <Navbar />
      <AnimatePresence mode="wait">
        {!isShopPage ? (
          <div key="horizontal-wrapper" className="flex-grow relative">
            <div
              style={{ height: `${scrollRange}px` }}
              className="w-full"
              ref={ghostRef}
            />
            <div className="fixed top-20 left-0 right-0 bottom-0 overflow-hidden">
              <motion.main
                key={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="flex flex-row h-full w-max will-change-transform"
                style={{ x: springTransform }}
                ref={scrollRef}
              >
                {children}
                <Footer />
              </motion.main>
            </div>
          </div>
        ) : (
          <motion.main
            key={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="flex-grow overflow-y-auto pt-20"
          >
            {children}
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
