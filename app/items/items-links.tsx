import type { NavigationLinkGroups } from "@/features/navigation/navigation.type";

import { ItemsLinksIcon } from "./items-links-icon";

export const ITEMS_LINKS: NavigationLinkGroups[] = [
  // {
  //   links: [
  //     {
  //       title: "Home",
  //       icon: <LayoutDashboard />,
  //       url: "/home",
  //     },
  //   ],
  // },
  {
    title: "Items",
    links: [
      {
        title: "Armes",
        icon: <ItemsLinksIcon id={10089} category="armaments" />,
        url: "/items?type=armaments",
      },
      {
        title: "Armures",
        icon: <ItemsLinksIcon id={14371} category="armor" />,
        url: "/items?type=armor",
      },
      {
        title: "Talismans",
        icon: <ItemsLinksIcon id={18000} category="talismans" />,
        url: "/items?type=talismans",
      },
      {
        title: "Sorcellerie",
        icon: <ItemsLinksIcon id={6015} category="spells" />,
        url: "/items?type=spells&category=Sorcery",
      },
      {
        title: "Incantations",
        icon: <ItemsLinksIcon id={6302} category="spells" />,
        url: "/items?type=spells&category=Incantation",
      },
      {
        title: "Items clé",
        icon: <ItemsLinksIcon id={228} category="keys" />,
        url: "/items?type=keys",
      },
      {
        title: "Cendres de guerre",
        icon: <ItemsLinksIcon id={8421} category="ashes-of-war" />,
        url: "/items?type=ashes-of-war",
      },
      {
        title: "Cendres d'esprit",
        icon: <ItemsLinksIcon id={474} category="spirit-ashes" />,
        url: "/items?type=spirit-ashes",
      },
      {
        title: "Souvenirs",
        icon: <ItemsLinksIcon id={172} category="tools" />,
        url: "/items?type=tools&category=Rememberance",
      },
      {
        title: "Grande runes",
        icon: <ItemsLinksIcon id={3201} category="tools" />,
        url: "/items?type=tools&category=Great Rune",
      },
      {
        title: "Matériaux de fabrication",
        icon: <ItemsLinksIcon id={531} category="crafting-materials" />,
        url: "/items?type=crafting-materials",
      },
      {
        title: "Matériaux de renforcement",
        icon: <ItemsLinksIcon id={383} category="bolstering-materials" />,
        url: "/items?type=bolstering-materials",
      },
      {
        title: "Larmes de cristal",
        icon: <ItemsLinksIcon id={428} category="tools" />,
        url: "/items?type=tools&category=Crystal Tear",
      },
      {
        title: "Outils",
        icon: <ItemsLinksIcon id={213} category="tools" />,
        url: "/items?type=tools",
      },
      {
        title: "Livre de sorts",
        icon: <ItemsLinksIcon id={316} category="shop" />,
        url: "/items?type=shop&category=Spellbook",
      },
      {
        title: "Indices",
        icon: <ItemsLinksIcon id={3280} category="info" />,
        url: "/items?type=info&category=Clue",
      },
      {
        title: "Perles cinéraires",
        icon: <ItemsLinksIcon id={3145} category="shop" />,
        url: "/items?type=shop&category=Bell Bearing",
      },
      {
        title: "Livre de recettes",
        icon: <ItemsLinksIcon id={3119} category="shop" />,
        url: "/items?type=shop&category=Cookbook",
      },
      {
        title: "Munitions",
        icon: <ItemsLinksIcon id={17000} category="ammo" />,
        url: "/items?type=ammo",
      },
      {
        title: "Gestures",
        icon: <ItemsLinksIcon id={7049} category="gestures" />,
        url: "/items?type=gestures",
      },
    ],
  },
];
