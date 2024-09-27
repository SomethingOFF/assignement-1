"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import DialogModel from "../models/dialog-model";
import { useState } from "react";
import Preview from "../preview";
export type File = {
  url: string;
  filetype: string;
  uploadedAt: string;
};

export const columns: ColumnDef<File>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      return <>{row.id}</>;
    },
  },
  {
    accessorKey: "url",
    header: "Url",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const onOpenChange = () => {
        setOpen(false);
      };
      console.log(row.getAllCells());
      const dateValue = String(row.getValue("url"));
      return (
        <>
          <DialogModel
            open={open}
            onOpenChange={onOpenChange}
            label={`preview id:${row.id}`}
            description="have a fun!"
            Content={
              <Preview
                fileType={row.getValue("filetype")}
                previewUrl={row.getValue("url")}
              />
            }
          />
          <div
            className="w-1/2 hover:text-blue-500 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            {dateValue}
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "filetype",
    header: "filetype",
  },
  {
    accessorKey: "uploadedAt",
    header: "UploadedTime",
    cell: ({ row }) => {
      const dateValue = new Date(row.getValue("uploadedAt"));
      return <>{format(dateValue, "yyyy-MM-dd")}</>;
    },
  },
];
