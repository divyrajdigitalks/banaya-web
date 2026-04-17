import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import { StoreProvider } from "@/context/StoreContext";

const sans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <div className={`${sans.variable} ${serif.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </StoreProvider>
  );
}
