"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-24 px-8 border-y border-border/10">
      <div className="container mx-auto text-center max-w-4xl">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="text-accent/60 text-sm tracking-[.5em] uppercase mb-12 block font-light">Rooted in Tradition</span>
          <h2 className="text-5xl md:text-7xl font-serif text-foreground mb-12 leading-tight">The Philosophy <br /><span className="italic">of Han Ok</span></h2>
          <div className="w-16 h-[1px] bg-accent/40 mx-auto mb-16" />
          <p className="text-muted-foreground text-xl md:text-2xl font-light leading-relaxed mb-12 italic">
            &quot;We believe that dining is more than just a meal; it&apos;s a sacred ritual of connection and harmony. Our name, &apos;Han Ok&apos;, refers to the traditional Korean house, reflecting our commitment to hospitality, authenticity, and the natural flow of life.&quot;
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 py-12 border-t border-border/10">
            <div>
              <p className="text-2xl font-serif text-foreground mb-4">Gochujang</p>
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Aged 5 Years</p>
            </div>
            <div>
              <p className="text-2xl font-serif text-foreground mb-4">Rice</p>
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Artisanal Sourcing</p>
            </div>
            <div>
              <p className="text-2xl font-serif text-foreground mb-4">Omusubi</p>
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Hand-Crafted</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
