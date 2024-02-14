import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getServerUrl } from "@/lib/server-url";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string(),
});

export const MagicLinkForm = () => {
  const form = useZodForm({
    schema: FormSchema,
  });
  const searchParams = useSearchParams();
  const emailSignInMutation = useMutation({
    mutationFn: async (email: string) => {
      await signIn("resend", {
        callbackUrl: searchParams.get("callbackUrl") ?? `${getServerUrl()}/`,
        redirect: true,
        email,
      });
    },
  });

  return (
    <>
      <Form
        form={form}
        onSubmit={async (values) => {
          await emailSignInMutation.mutateAsync(values.email);
        }}
        className="flex w-full items-center gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl className="w-full">
                <Input className="w-full" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm">
          Sign in
        </Button>
      </Form>
    </>
  );
};
