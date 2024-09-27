import FileUpload from "@/components/file/file-upload";
import { columns } from "@/components/filetable/file-column";
import { DataTable } from "@/components/filetable/file-table";
import DialogModel from "@/components/models/dialog-model";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useState } from "react";
import { useSelector } from "react-redux";

const FilePage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [active, setActive] = useState(false);
  const onCloseModel = () => {
    setActive(false);
  };

  return (
    <>
      <DialogModel
        open={active}
        onOpenChange={onCloseModel}
        label="Upload File"
        description="here we Go!"
        Content={<FileUpload onCloseModel={onCloseModel} />}
      />
      <div className="sm:p-10 h-full w-full">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-medium underline underline-offset-4">
            Your File Upload
          </div>
          <div className="px-4">
            <Button onClick={() => setActive(true)}>
              <div className="pl-2">Upload File</div>
            </Button>
          </div>
        </div>
        <div>
          {user?.files && <DataTable columns={columns} data={user.files} />}
        </div>
      </div>
    </>
  );
};

export default FilePage;
