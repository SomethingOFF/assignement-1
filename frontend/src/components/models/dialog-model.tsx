import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface DialogModelProps {
  open: boolean;
  onOpenChange: () => void;
  Content: React.ReactNode;
  label: string;
  description: string;
}

const DialogModel: React.FC<DialogModelProps> = ({
  open,
  onOpenChange,
  Content,
  label,
  description,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {Content}
      </DialogContent>
    </Dialog>
  );
};

export default DialogModel;
