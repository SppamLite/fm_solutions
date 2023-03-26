export const availableAddons = [
  "online-service",
  "large-storage",
  "customizable-profile",
] as const;
export type AddOn = typeof availableAddons[number];

export const availablePlans = ["Arcade", "Advanced", "Pro"] as const;
export type Plan = typeof availablePlans[number];

type AddOnDetail = {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
};

type PlanDetail = {
  icon: string;
  monthlyPrice: number;
  yearlyPrice: number;
};

export const plans: { [key in Plan]: PlanDetail } = {
  "Arcade": {
    icon: "icon-arcade.svg",
    monthlyPrice: 9,
    yearlyPrice: 90,
  },
  "Advanced": {
    icon: "icon-advanced.svg",
    monthlyPrice: 12,
    yearlyPrice: 120,
  },
  "Pro": {
    icon: "icon-pro.svg",
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
};

export const addons: { [key in AddOn]: AddOnDetail } = {
  "online-service": {
    name: "Online service",
    description: "Access to multiplayer games",
    yearlyPrice: 10,
    monthlyPrice: 1,
  },
  "large-storage": {
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    yearlyPrice: 20,
    monthlyPrice: 2,
  },
  "customizable-profile": {
    name: "Customizable profile",
    description: "Custom theme on your profile",
    yearlyPrice: 20,
    monthlyPrice: 2,
  },
};
