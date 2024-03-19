import Image from "next/image";

export type ItemsLinksIconProps = {
  id: number;
  category: string;
};

export const ItemsLinksIcon = ({ id, category }: ItemsLinksIconProps) => {
  return (
    <Image
      src={`https://assets.erdb.workers.dev/icons/${category}/${id}/low`}
      width={28}
      height={28}
      alt={category}
      style={{ width: "28px", height: "28px" }}
    />
  );
};
