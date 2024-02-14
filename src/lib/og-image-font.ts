import { getServerUrl } from "@/lib/server-url";
import type { SatoriOptions } from "next/dist/compiled/@vercel/og/satori";

export const getOgImageFont = async () => {
  const interSemiBold = fetch(
    `${getServerUrl()}/fonts/Geist-SemiBold.otf`,
  ).then(async (res) => res.arrayBuffer());
  const interBold = fetch(`${getServerUrl()}/fonts/Geist-Black.otf`).then(
    async (res) => res.arrayBuffer(),
  );
  return [
    {
      name: "Geist",
      data: await interSemiBold,
      style: "normal",
      weight: 400,
    },
    {
      name: "Geist",
      data: await interBold,
      style: "normal",
      weight: 700,
    },
  ] satisfies SatoriOptions["fonts"];
};
