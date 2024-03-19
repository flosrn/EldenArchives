export type Absorptions = {
  physical: number;
  strike: number;
  slash: number;
  pierce: number;
  magic: number;
  fire: number;
  lightning: number;
  holy: number;
};

export type Resistances = {
  immunity: number;
  robustness: number;
  focus: number;
  vitality: number;
  poise: number;
};

export type Location = {};

export type Item = {
  full_hex_id: string;
  id: number;
  name: string;
  summary: string;
  description?: string;
  is_tradable: boolean;
  price_sold: number;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  icon: number;
  max_held: number;
  max_stored: number;
  locations: Location[];
  remarks: string[];
  category: string;
  altered: string;
  weight: number;
  icon_fem: number;
  absorptions: Absorptions;
  resistances: Resistances;
  effects: never[];
};
