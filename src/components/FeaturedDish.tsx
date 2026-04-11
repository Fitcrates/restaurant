"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FeaturedDish() {
  return (
    <section className="py-32 px-8 bg-muted/30">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-32">
        {/* Text Content */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-accent tracking-[.3em] uppercase text-xs mb-6 block font-medium">Signature Selection</span>
          <h2 className="text-5xl md:text-7xl font-serif text-foreground mb-8 leading-tight">Authentic Korean Bibimbap<br /><span className="italic">Redefined</span></h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-xl font-light">
            Our Bibimbap, served in a sizzling stone bowl (Dolsot), is a masterpiece of balance and texture. Featuring hand-selected organic seasonal vegetables, grain-fed Korean beef, and our house-aged Gochujang sauce.
          </p>
          
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <h4 className="text-foreground font-serif text-2xl mb-2 italic">Craftsmanship</h4>
              <p className="text-muted-foreground text-sm font-light">Each ingredient is prepared separately to preserve its essence.</p>
            </div>
            <div>
              <h4 className="text-foreground font-serif text-2xl mb-2 italic">Tradition</h4>
              <p className="text-muted-foreground text-sm font-light">Recipes passed through generations, perfected for the modern palate.</p>
            </div>
          </div>

          <button className="text-accent text-sm tracking-[.2em] uppercase font-bold border-b border-accent/30 pb-2 hover:border-accent transition-all duration-300">
            View the Menu Details
          </button>
        </motion.div>

        {/* Image Grid */}
        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
           className="relative aspect-[4/5] md:aspect-square"
        >
           <div className="absolute inset-0 border border-accent/20 -m-8 rounded-sm pointer-events-none" />
           <div className="absolute inset-0 bg-accent/5 -m-4 z-0" />
           <div className="relative z-10 w-full h-full overflow-hidden">
             <Image 
                src="/food.png" 
                alt="Bibimbap - Signature Dish" 
                fill 
                className="object-cover transition-transform duration-[3s] hover:scale-110"
             />
           </div>
           
           {/* Floating Info */}
           <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute bottom-8 -left-8 bg-background p-8 md:p-10 border border-border shadow-2xl max-w-xs"
           >
              <p className="text-accent font-serif text-3xl mb-1 italic">$42</p>
              <p className="text-foreground text-sm uppercase tracking-widest font-bold mb-3">Dolsot Bibimbap</p>
              <p className="text-muted-foreground text-[10px] leading-relaxed uppercase tracking-[.1em]">Wagyu Beef · Sizzling Stone · Heirloom Veg</p>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
