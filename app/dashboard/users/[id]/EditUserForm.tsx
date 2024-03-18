"use client";

import type { User } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SubmitButton } from "@/features/form/SubmitButton";
import { formatDate } from "@/lib/format/date";
import { displayName } from "@/lib/format/displayName";

import { UserFormSchema } from "./edit-user.schema";

export type EditUserFormProps = {
  defaultValues: User;
};

export const EditUserForm = ({ defaultValues }: EditUserFormProps) => {
  const form = useZodForm({
    schema: UserFormSchema,
    defaultValues: {
      emailVerified: defaultValues.emailVerified,
      role: defaultValues.role,
    },
  });
  const {
    id,
    email,
    image,
    createdAt,
    updatedAt,
    role,
    plan,
    emailVerified,
    stripeCustomerId,
    resendContactId,
  } = defaultValues;

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <>
      <Card className="col-span-4 py-6">
        <CardHeader className="space-y-3">
          <div className="flex justify-center">
            <Avatar className="size-28">
              {image ? <AvatarImage src={image} /> : null}
              <AvatarFallback>{email.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <Form
            form={form}
            onSubmit={async (v) => onSubmit(v)}
            className="flex flex-col items-center gap-6"
          >
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="emailVerified"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center justify-center space-x-2">
                        <Switch
                          id="emailVerified"
                          checked={Boolean(field.value)}
                          onCheckedChange={(value) => {
                            const date = new Date();
                            field.onChange(value ? date : null);
                          }}
                        />
                        <Label htmlFor="emailVerified">Email Verified</Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="w-full max-w-[150px]">
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USER">USER</SelectItem>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-center space-y-2 text-sm text-muted-foreground">
              <span className="">
                Created on{" "}
                {new Date(createdAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="">
                Updated on{" "}
                {new Date(updatedAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <SubmitButton
                size="sm"
                disabled={
                  !form.formState.isDirty || form.formState.isSubmitting
                }
              >
                Update
              </SubmitButton>
            </div>
          </Form>
        </CardContent>
      </Card>
      <Card className="col-span-8 py-6">
        <CardHeader>
          <CardTitle>{displayName(defaultValues)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <p>
              <span className="font-bold">Email: </span>
              <span className="text-lg text-muted-foreground">{email}</span>
            </p>

            <p>
              <span className="font-bold">Role: </span>
              <span className="text-lg text-muted-foreground">{role}</span>
            </p>

            <p>
              <span className="font-bold">Plan: </span>
              <span className="text-lg text-muted-foreground">{plan}</span>
            </p>

            <p>
              <span className="font-bold">Email Verified: </span>
              <span className="text-lg text-muted-foreground">
                {emailVerified ? formatDate(emailVerified) : "false"}
              </span>
            </p>

            <p>
              <span className="font-bold">ID: </span>
              <span className="text-lg text-muted-foreground">{id}</span>
            </p>

            <p>
              <span className="font-bold">Stripe Customer ID: </span>
              <span className="text-lg text-muted-foreground">
                {stripeCustomerId}
              </span>
            </p>

            <p>
              <span className="font-bold">Resend Contact ID: </span>
              <span className="text-lg text-muted-foreground">
                {resendContactId}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
