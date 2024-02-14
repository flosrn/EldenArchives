"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { signUpAction } from "./signup.action";
import type { LoginCredentialsFormType } from "./signup.schema";
import { LoginCredentialsFormScheme } from "./signup.schema";

export const SignUpCredentialsForm = () => {
  const form = useZodForm({
    schema: LoginCredentialsFormScheme,
  });

  const submitMutation = useMutation({
    mutationFn: async (values: LoginCredentialsFormType) => {
      const { serverError } = await signUpAction(values);

      if (serverError) {
        toast.error(serverError);
        return;
      }

      await signIn("credentials", {
        email: values.email,
        password: values.password,

        callbackUrl: `${window.location.origin}/`,
      });
    },
  });

  async function onSubmit(values: LoginCredentialsFormType) {
    if (values.password !== values.verifyPassword) {
      form.setError("verifyPassword", {
        message: "Password does not match",
      });
      return;
    }

    return submitMutation.mutateAsync(values);
  }

  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        return onSubmit(values);
      }}
      className="max-w-lg space-y-4"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="john@doe.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="verifyPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Verify Password</FormLabel>
            <FormControl>
              <Input type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </Form>
  );
};
