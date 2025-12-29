/**
 * Hero Section Index
 *
 * @description Central export point for all hero section variants.
 * Change the ACTIVE_HERO constant to switch between different hero designs.
 * Only one hero section is active at a time.
 *
 * Available Hero Variants:
 * 1. HeroCinematicTerminal - Command-driven, terminal-inspired aesthetic
 * 2. HeroOrbitalNetwork - Constellation/satellite visualization
 * 3. HeroLiquidMetal - Fluid morphing shapes with metallic sheens
 * 4. HeroBrutalistMonolith - Bold typography, editorial magazine feel
 * 5. HeroCircuitCathedral - Architectural circuit board visualization
 * 6. HeroVelocityGrid - Speed lines, motion blur, rapid delivery
 * 7. HeroChronicleScroll - Timeline journey through a decade of expertise
 * 8. HeroEtherealMesh - 3D wireframe, otherworldly feel
 * 9. HeroSignalTower - Broadcast/transmission aesthetic
 * 10. HeroForgeFlame - Craftsman/artisan, precision engineering
 *
 * @example
 * // To change the active hero, update this value:
 * export const ACTIVE_HERO = 'cinematic-terminal';
 */

export type HeroVariant =
  | "cinematic-terminal"
  | "orbital-network"
  | "liquid-metal"
  | "brutalist-monolith"
  | "circuit-cathedral"
  | "velocity-grid"
  | "chronicle-scroll"
  | "ethereal-mesh"
  | "signal-tower"
  | "forge-flame";

/**
 * Current active hero variant.
 * Change this value to switch between hero designs.
 */
export const ACTIVE_HERO: HeroVariant = "cinematic-terminal";
// export const ACTIVE_HERO: HeroVariant = "brutalist-monolith";
// export const ACTIVE_HERO: HeroVariant = "chronicle-scroll";
// export const ACTIVE_HERO: HeroVariant = "ethereal-mesh"; => GOOD with the TITLE
// export const ACTIVE_HERO: HeroVariant = "signal-tower";
// export const ACTIVE_HERO: HeroVariant = "forge-flame";

// Export all hero components
export { HeroCinematicTerminal } from "./HeroCinematicTerminal";
export { HeroOrbitalNetwork } from "./HeroOrbitalNetwork";
export { HeroLiquidMetal } from "./HeroLiquidMetal";
export { HeroBrutalistMonolith } from "./HeroBrutalistMonolith";
export { HeroCircuitCathedral } from "./HeroCircuitCathedral";
export { HeroVelocityGrid } from "./HeroVelocityGrid";
export { HeroChronicleScroll } from "./HeroChronicleScroll";
export { HeroEtherealMesh } from "./HeroEtherealMesh";
export { HeroSignalTower } from "./HeroSignalTower";
export { HeroForgeFlame } from "./HeroForgeFlame";

// Export the HeroSelector component for dynamic rendering
export { HeroSelector } from "./HeroSelector";


