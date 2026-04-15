interface BlogHeroProps {
  title?: string;
  subtitle?: string;
}

export function BlogHero({
  title = "Technical Insights & Leadership",
  subtitle = "The latest updates on technology, architecture, and engineering leadership.",
}: BlogHeroProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-foreground">{title.split("&")[0]}</span>
          {title.includes("&") && (
            <>
              <span className="text-muted-foreground">&</span>{" "}
              <span className="italic text-muted-foreground/80">
                {title.split("&")[1]}
              </span>
            </>
          )}
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
      </div>
    </section>
  );
}
