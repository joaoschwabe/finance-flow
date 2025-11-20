'use client';

import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './button';
import { Dialog as BaseDialog, DialogContent, DialogHeader } from './dialog';

type DialogProps = React.ComponentProps<typeof BaseDialog>;

type DialogState =
  | (DialogProps & { onConfirm: () => Promise<unknown>; title: string; description: string })
  | null;

let _setDialog: React.Dispatch<React.SetStateAction<DialogState>> | null = null;

export const DialogContainer: React.FC = () => {
  const [dialog, setDialog] = useState<DialogState>(null);

  useEffect(() => {
    _setDialog = setDialog;
    return () => {
      _setDialog = null;
    };
  }, []);

  if (!dialog?.open) return null;

  const handleClose = () => {
    dialog.onOpenChange?.(false);
    setDialog(null);
  };

  const handleConfirm = async () => {
    await dialog.onConfirm();
    handleClose();
  };

  return createPortal(
    <BaseDialog {...dialog} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">{dialog.title}</DialogTitle>
          <DialogDescription>{dialog.description}</DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() => dialog?.onOpenChange?.(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} className="flex-1">
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </BaseDialog>,
    document.body,
  );
};

export const Dialog = {
  open(
    props: Omit<DialogProps, 'open' | 'onClose'> & {
      onConfirm: () => Promise<unknown>;
      title: string;
      description: string;
    },
  ) {
    if (_setDialog) {
      _setDialog({
        ...props,
        open: true,
        onOpenChange: () => _setDialog?.(null),
      });
    } else {
      console.warn('DialogContainer ainda não foi montado.');
    }
  },
  close() {
    _setDialog?.(null);
  },
};
