import {
  Compass,
  Feather,
  HeartHandshake,
  Layers,
  ListChecks,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface BrandItem {
  icon: LucideIcon;
  title: string;
  body: string;
}

export const focusAreas: BrandItem[] = [
  { icon: Sparkles, title: "AI experiences", body: "Making useful AI capabilities easier to access, without the jargon." },
  { icon: ListChecks, title: "Productivity tools", body: "Helping people organise their work and get things done." },
  { icon: Wrench, title: "Everyday utilities", body: "Small, focused tools that do one specific job well." },
  {
    icon: Layers,
    title: "Connected experiences",
    body: "Software that helps devices or people work together, where supported.",
  },
];

export const principles: BrandItem[] = [
  {
    icon: Compass,
    title: "Usefulness first",
    body: "Every product should solve a real problem. If it doesn’t make something easier, we don’t ship it.",
  },
  {
    icon: Feather,
    title: "Simplicity",
    body: "Fewer steps, clearer screens, sensible defaults. Complexity is our job to absorb, not yours.",
  },
  {
    icon: HeartHandshake,
    title: "Thoughtful design",
    body: "Considered details, accessible interfaces and calm visuals that respect your attention.",
  },
  {
    icon: ShieldCheck,
    title: "User trust",
    body: "Honest descriptions, collecting only what’s needed, and being clear about what our products do.",
  },
  {
    icon: RefreshCw,
    title: "Continuous improvement",
    body: "We listen to feedback and keep refining — small, steady improvements over big promises.",
  },
];
