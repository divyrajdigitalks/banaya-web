import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen selection:bg-brand-gold selection:text-brand-charcoal">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main 
          key={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="flex-grow"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;
