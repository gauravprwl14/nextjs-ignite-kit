"use client";

/**
 * Hero Selector Component
 *
 * @description Dynamically renders the currently active hero section based on ACTIVE_HERO config.
 * This allows for easy switching between hero variants without modifying the main page.
 *
 * @example
 * import { HeroSelector } from '@/components/hero';
 * // In your page:
 * <HeroSelector />
 */

import { ACTIVE_HERO, HeroVariant } from "./index";
import { HeroCinematicTerminal } from "./HeroCinematicTerminal";
import { HeroOrbitalNetwork } from "./HeroOrbitalNetwork";
import { HeroLiquidMetal } from "./HeroLiquidMetal";
import { HeroBrutalistMonolith } from "./HeroBrutalistMonolith";
import { HeroCircuitCathedral } from "./HeroCircuitCathedral";
import { HeroVelocityGrid } from "./HeroVelocityGrid";
import { HeroChronicleScroll } from "./HeroChronicleScroll";
import { HeroEtherealMesh } from "./HeroEtherealMesh";
import { HeroSignalTower } from "./HeroSignalTower";
import { HeroForgeFlame } from "./HeroForgeFlame";

/**
 * Maps hero variant identifiers to their corresponding components.
 */
const heroComponents: Record<HeroVariant, React.ComponentType> = {
  "cinematic-terminal": HeroCinematicTerminal,
  "orbital-network": HeroOrbitalNetwork,
  "liquid-metal": HeroLiquidMetal,
  "brutalist-monolith": HeroBrutalistMonolith,
  "circuit-cathedral": HeroCircuitCathedral,
  "velocity-grid": HeroVelocityGrid,
  "chronicle-scroll": HeroChronicleScroll,
  "ethereal-mesh": HeroEtherealMesh,
  "signal-tower": HeroSignalTower,
  "forge-flame": HeroForgeFlame,
};

/**
 * Renders the currently active hero section.
 *
 * @returns The active hero component based on ACTIVE_HERO configuration
 */
export function HeroSelector() {
  const ActiveHero = heroComponents[ACTIVE_HERO];

  if (!ActiveHero) {
    console.warn(
      `Hero variant "${ACTIVE_HERO}" not found. Falling back to default.`
    );
    return <HeroCinematicTerminal />;
  }

  return <ActiveHero />;
}


