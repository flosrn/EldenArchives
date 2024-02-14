"use client";

import { toast } from "sonner";
import { create } from "zustand";
import type { ConfirmationDialogProps } from "./DialogProviderDialog";
import { ProviderConfirmationDialog } from "./DialogProviderDialog";

type DialogType = ConfirmationDialogProps & {
  id: string;
};

type DialogStore = {
  dialogs: DialogType[];
  addDialog: (dialog: ConfirmationDialogProps) => void;
  removeDialog: (dialogId: string) => void;
};

const useDialogStore = create<DialogStore>((set, get) => ({
  dialogs: [],
  addDialog: (dialog) => {
    const id = Math.random().toString(36).slice(2, 9);
    const { removeDialog } = get();

    const newDialog: DialogType = {
      ...dialog,
      cancel: {
        label: dialog.cancel?.label ?? "Cancel",
        onClick: () => {
          removeDialog(id);
          dialog.cancel?.onClick();
        },
      },
      action: {
        label: dialog.action?.label ?? "",
        onClick: () => {
          // check if it's a promise
          const onClickReturn = dialog.action?.onClick();
          if (onClickReturn instanceof Promise) {
            set((state) => {
              const dialog = state.dialogs.find((dialog) => dialog.id === id);

              if (dialog) {
                dialog.loading = true;
              }

              return { dialogs: [...state.dialogs] };
            });

            onClickReturn
              .then(() => {
                removeDialog(id);
              })
              .catch((e) => {
                toast.error("Some error occurred", {
                  description: e.message,
                });
              });
          } else {
            dialog.action?.onClick();
            removeDialog(id);
          }
        },
      },
      loading: false,
      id,
    };

    set((state) => ({ dialogs: [...state.dialogs, newDialog] }));

    return id;
  },
  removeDialog: (dialogId) =>
    set((state) => ({
      dialogs: state.dialogs.filter((dialog) => dialog.id !== dialogId),
    })),
}));

export const DialogRenderer = () => {
  const dialogs = useDialogStore((state) => state.dialogs);

  const dialog = dialogs[0] as DialogType | undefined;

  if (dialog) {
    return <ProviderConfirmationDialog {...dialog} />;
  }

  return null;
};

export const enqueueDialog = (dialog: ConfirmationDialogProps) =>
  useDialogStore.getState().addDialog(dialog);
