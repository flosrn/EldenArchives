import type { ComponentPropsWithoutRef } from "react";

export type LogoSvgProps = ComponentPropsWithoutRef<"svg"> & { size?: number };

export const LogoSvg = ({ size = 32, ...props }: LogoSvgProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M112.448 91.7993L80.0827 80.3244L66.4131 11.9822L112.448 91.7993ZM39.9175 80.3244L7.55176 91.7993L53.5872 11.9822L39.9175 80.3244ZM73.7228 78.6076H46.2774L60.0001 9.99994L73.7228 78.6076Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M73.7225 78.6076H46.2771L59.9998 9.99994L73.7225 78.6076Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45.7581 84.5074H74.2419L111.032 97.5576L82.9734 110H37.0265L8.96753 97.5576L45.7581 84.5074Z"
        fill="currentColor"
      />
    </svg>
  );
};
