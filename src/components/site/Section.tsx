import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  variant?: "default" | "sand" | "dark";
  filigree?: boolean;
}

export default function Section({ id, eyebrow, title, intro, children, variant = "default", filigree = false }: Props) {
  const bg = variant === "sand" ? "bg-gradient-sand" : variant === "dark" ? "bg-charcoal text-ivory" : "bg-background";
  return (
    <section id={id} className={`relative py-20 md:py-28 ${bg} overflow-hidden`}>
      {filigree && <div className="absolute inset-0 filigree-bg pointer-events-none" aria-hidden />}
      <div className="container relative">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          {eyebrow && <span className="eyebrow mb-5">{eyebrow}</span>}
          <h2 className={`font-display text-3xl md:text-5xl font-semibold tracking-tight text-balance ${variant === "dark" ? "text-ivory" : "text-charcoal"}`}>
            {title}
          </h2>
          {intro && <p className={`mt-5 text-base md:text-lg leading-relaxed ${variant === "dark" ? "text-ivory/75" : "text-muted-foreground"}`}>{intro}</p>}
        </motion.header>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
