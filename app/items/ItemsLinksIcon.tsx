import Image from "next/image";

export type ItemsLinksIconProps = {
  id: number;
  category: string;
  size?: number;
};

export const ItemsLinksIcon = ({
  id,
  category,
  size = 28,
}: ItemsLinksIconProps) => {
  return (
    <Image
      src={`https://assets.erdb.workers.dev/icons/${category}/${id}/low`}
      width={size}
      height={size}
      alt={category}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};
