"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { SubmitButton } from "@/features/form/SubmitButton";
import { toast } from "sonner";
import { editPasswordAction } from "./edit-profile.action";
import type { EditPasswordFormType } from "./edit-profile.schema";
import { EditPasswordFormSchema } from "./edit-profile.schema";

export const EditPasswordForm = () => {
  const form = useZodForm({
    schema: EditPasswordFormSchema,
  });

  const onSubmit = async (values: EditPasswordFormType) => {
    const { serverError } = await editPasswordAction(values);
    if (serverError) {
      toast.error(serverError);
      return;
    }
    toast.success("Password updated");
  };

  return (
    <Accordion type="multiple">
      <AccordionItem value="1">
        <AccordionTrigger>Change password</AccordionTrigger>
        <AccordionContent className="px-4">
          <Form
            form={form}
            onSubmit={async (v) => onSubmit(v)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton>Save</SubmitButton>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
