"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { enqueueDialog } from "@/features/dialogs-provider/DialogProvider";
import { toast } from "sonner";
import { deleteAccountAction } from "./delete-account.action";

export default function DeleteProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete your profile</CardTitle>
        <CardDescription>
          Deleting your account means that all your personal data will be
          permanently erased and your ongoing subscription will be terminated.
          Please be aware that this action is irreversible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="destructive"
          onClick={() => {
            enqueueDialog({
              title: "Delete your profile",
              description: "Are you sure you want to delete your profile?",
              action: {
                label: "Delete",
                onClick: async () => {
                  await deleteAccountAction(null);
                  toast.success("Your profile has been deleted.");
                },
              },
            });
          }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}
