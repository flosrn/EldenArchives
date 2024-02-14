"use client";

import type { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { Loader } from "../../components/ui/loader";

export type ConfirmationDialogProps = {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void | Promise<void>;
  };
  cancel?: {
    label: string;
    onClick: () => void | Promise<void>;
  };
  loading?: boolean;
  children?: ReactNode;
};

export const ProviderConfirmationDialog = ({
  title,
  description,
  loading,
  action,
  cancel,
  children,
}: ConfirmationDialogProps) => {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        {children ? (
          children
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>{title ?? ""}</AlertDialogTitle>
              {description ? (
                <AlertDialogDescription>{description}</AlertDialogDescription>
              ) : null}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading} onClick={cancel?.onClick}>
                {cancel?.label ?? "Cancel"}
              </AlertDialogCancel>
              {action ? (
                <AlertDialogAction disabled={loading} onClick={action.onClick}>
                  {loading ? <Loader /> : action.label}
                </AlertDialogAction>
              ) : null}
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
