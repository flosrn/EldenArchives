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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { InlineTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Angry, Frown, Meh, SmilePlus } from "lucide-react";
import { useSession } from "next-auth/react";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { contactSupportAction } from "./contact-feedback.action";
import type { ContactFeedbackSchemaType } from "./contact-feedback.schema";
import { ContactFeedbackSchema } from "./contact-feedback.schema";

export type ContactFeedbackPopoverProps = PropsWithChildren<{}>;

export const ContactFeedbackPopover = (props: ContactFeedbackPopoverProps) => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const email = session.data?.user.email ?? "";
  const form = useZodForm({
    schema: ContactFeedbackSchema,
    defaultValues: {
      email: email,
    },
  });

  const onSubmit = async (values: ContactFeedbackSchemaType) => {
    const { data, serverError } = await contactSupportAction(values);

    if (!data) {
      toast.error(serverError);
      return;
    }

    toast.success("Your feedback has been sent. Thanks you.");
    form.reset();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={(v) => setOpen(v)}>
      <PopoverTrigger asChild>
        {props.children ? (
          props.children
        ) : (
          <Button variant="outline">Feedback</Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Form
          form={form}
          onSubmit={async (v) => onSubmit(v)}
          className="flex flex-col gap-4"
        >
          <div className="p-2">
            {email ? null : (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full items-center justify-between  border-t border-accent bg-accent/50 p-2">
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <ReviewInput
                    onChange={(v) => {
                      field.onChange(v);
                    }}
                    value={field.value}
                  />
                </FormItem>
              )}
            />
            <Button type="submit" variant="outline">
              Send
            </Button>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

const ReviewInputItems = [
  {
    value: "1",
    icon: Angry,
    tooltip: "Extremely Dissatisfied",
  },
  {
    value: "2",
    icon: Frown,
    tooltip: "Somewhat Dissatisfied",
  },
  {
    value: "3",
    icon: Meh,
    tooltip: "Neutral",
  },
  {
    value: "4",
    icon: SmilePlus,
    tooltip: "Satisfied",
  },
];

const ReviewInput = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value?: string;
}) => {
  return (
    <>
      {ReviewInputItems.map((item) => (
        <InlineTooltip key={item.value} title={item.tooltip}>
          <button
            type="button"
            onClick={() => {
              onChange(item.value);
            }}
            className={cn("hover:rotate-12 hover:scale-110 transition", {
              "text-primary scale-110": value === item.value,
            })}
          >
            <item.icon size={24} />
          </button>
        </InlineTooltip>
      ))}
    </>
  );
};
