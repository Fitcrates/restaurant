"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero.png" 
          alt="Premium Korean Restaurant Interior" 
          fill
          className="object-cover scale-110 brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
           initial={{ y: 30, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <span className="text-accent tracking-[.4em] uppercase text-sm mb-6 block font-light">
             The Art of Authentic Korean Cuisine
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-foreground leading-[1.1] mb-8">
            Elevating the Soul <br />
            <span className="italic opacity-90">of Modern Dining</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
            Experience Han Ok, where centuries-old traditions meet modern culinary innovation in an atmosphere of refined elegance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-accent text-background text-sm tracking-widest uppercase font-medium hover:bg-accent/90 transition-all duration-300"
            >
              Explore Menu
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border border-accent/40 text-accent text-sm tracking-widest uppercase hover:bg-accent/10 transition-all duration-300"
            >
              Our Story
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-accent/60 to-transparent" />
        <span className="text-[10px] tracking-widest uppercase text-accent/60 mix-blend-difference">Scroll</span>
      </motion.div>
    </section>
  );
}
