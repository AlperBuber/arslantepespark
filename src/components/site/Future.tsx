import Section from "./Section";
import { TrendingUp, Users2 } from "lucide-react";

export default function Future() {
  return (
    <Section
      id="future"
      eyebrow="Future Opportunities"
      title={<>Beyond the cohort: a <span className="text-bronze">permanent capital flywheel.</span></>}
      intro="Arslantepe Spark is the founding layer. Two adjacent vehicles will follow — designed to keep capital flowing into Anatolian ventures long after demo day."
      filigree
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative bg-card border border-border rounded-3xl p-8 md:p-10 overflow-hidden group">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-bronze/10 blur-3xl" />
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-bronze flex items-center justify-center shadow-bronze mb-6">
              <Users2 className="w-6 h-6 text-charcoal" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-bronze font-medium">Phase II</span>
            <h3 className="font-display text-3xl md:text-4xl text-charcoal mt-2 font-semibold">Anatolia Angel Network</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A curated syndicate of Anatolian and Istanbul-based angels co-investing in alumni startups — with diligence and deal flow powered by the Spark cohorts.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-charcoal/80">
              <li>• Ticket sizes from $25K to $250K</li>
              <li>• Quarterly deal showcases in Istanbul</li>
              <li>• Shared diligence and warm intros</li>
            </ul>
          </div>
        </div>

        <div className="relative bg-charcoal text-ivory rounded-3xl p-8 md:p-10 overflow-hidden group">
          <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-bronze/20 blur-3xl" />
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-bronze flex items-center justify-center shadow-bronze mb-6">
              <TrendingUp className="w-6 h-6 text-charcoal" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-bronze-glow font-medium">Phase III</span>
            <h3 className="font-display text-3xl md:text-4xl mt-2 font-semibold">Arslantepe VC Fund</h3>
            <p className="mt-4 text-ivory/75 leading-relaxed">
              An institutional fund anchored by regional and Istanbul LPs, deploying seed and Series-A capital into the most promising graduates of the program.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ivory/85">
              <li>• Seed and Series-A focus</li>
              <li>• Anatolia-first thesis, global ambition</li>
              <li>• Co-invest rights for alumni angels</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
