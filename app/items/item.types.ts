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

export type Location = {
  // Définissez les propriétés de l'objet Location selon vos besoins
};

export type Item = {
  full_hex_id: string;
  id: number;
  name: string;
  summary: string;
  description?: string;
  is_tradable: boolean;
  price_sold: number;
  rarity: "Common" | "Rare" | "Epic" | "Legendary"; // Ajustez selon les valeurs possibles
  icon: number;
  max_held: number;
  max_stored: number;
  locations: Location[]; // Supposant que vous avez une structure définie pour Location
  remarks: string[]; // Ou le type approprié pour les remarques
  category: string; // Ou un union type si les catégories sont limitées
  altered: string;
  weight: number;
  icon_fem: number;
  absorptions: Absorptions;
  resistances: Resistances;
  effects: any[]; // Remplacez `any` par le type approprié si possible
};
