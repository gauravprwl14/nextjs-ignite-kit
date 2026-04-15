"use client";

export function TechStack() {
  const stack = [
    { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Go", "Python", "GraphQL", "gRPC"] },
    { category: "Cloud & Infra", items: ["AWS", "GCP", "Kubernetes", "Terraform", "Serverless"] },
    { category: "Architecture", items: ["Microservices", "Event-Driven", "Domain-Driven Design", "Hexagonal"] },
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold font-heading mb-2">Technical Arsenal</h2>
        <p className="text-muted-foreground text-sm">Tools I use to build enterprise-grade assets.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stack.map((group) => (
          <div key={group.category} className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-colors">
            <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="px-2 py-1 bg-white/5 rounded text-xs text-muted-foreground border border-white/5">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
