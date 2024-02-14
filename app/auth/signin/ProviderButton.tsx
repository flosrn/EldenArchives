import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { getServerUrl } from "@/lib/server-url";
import { useMutation } from "@tanstack/react-query";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

// ℹ️ Update this object with the providers you want to support
const ProviderData: Record<string, { icon: ReactNode; name: string }> = {
  github: {
    icon: <Github size={16} />,
    name: "Github",
  },
};

type ProviderButtonProps = {
  providerId: string;
}

export const ProviderButton = (props: ProviderButtonProps) => {
  const searchParams = useSearchParams();

  const githubSignInMutation = useMutation({
    mutationFn: () =>
      signIn(props.providerId, {
        callbackUrl: searchParams.get("callbackUrl") ?? `${getServerUrl()}/`,
      }),
  });

  const data = ProviderData[props.providerId];

  return (
    <Button
      className="border-gray-500 bg-black text-white hover:bg-gray-950"
      size="lg"
      onClick={() => {
        githubSignInMutation.mutate();
      }}
    >
      {githubSignInMutation.isPending ? <Loader size={16} /> : data.icon}
      <span className="ml-2 text-base">Sign in with {data.name}</span>
    </Button>
  );
};
