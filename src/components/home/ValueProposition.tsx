import { CheckCircle2, XCircle } from "lucide-react";

export function ValueProposition() {
  return (
    <section className="py-20 relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
          The <span className="text-primary">Difference</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Most developers sell time. I sell outcome certainty and asset value.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* The Freelancer Trap */}
        <div className="glass-panel p-8 rounded-2xl border-red-500/10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20" />
          <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2 text-muted-foreground">
            <XCircle className="w-5 h-5 text-red-500" />
            The Freelancer Trap
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-muted-foreground/80">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-2" />
              {' '}Focuses on closing tickets and hours
            </li>
            <li className="flex items-start gap-3 text-muted-foreground/80">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-2" />
              {' '}Requires constant management & oversight
            </li>
            <li className="flex items-start gap-3 text-muted-foreground/80">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-2" />
              {' '}Builds code that &quot;works&quot; but adds hidden technical debt
            </li>
            <li className="flex items-start gap-3 text-muted-foreground/80">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-2" />
              {' '}Passive implementation of requirements without audit
            </li>
          </ul>
        </div>

        {/* The Business Partner */}
        <div className="glass-panel p-8 rounded-2xl border-primary/20 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
          
          <h3 className="text-xl font-bold font-heading mb-6 flex items-center gap-2 text-foreground">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            The Business Partner
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              {' '}Focuses on Revenue, Retention, and Scalability
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              {' '}Active roadmap steering & risk mitigation
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              {' '}Builds technical assets that increase valuation
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              {' '}Strategic advisor for architectural due diligence
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
