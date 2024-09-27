import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import axios from "axios";
import Preview from "../preview";

const FileUpload = ({ onCloseModel }: { onCloseModel: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState("");

  const onFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      const mimeType: string = selectedFile.type;
      setFileType(mimeType);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const uploadFile = async () => {
    if (!file) return; // Prevents uploading if no file is selected

    const formData = new FormData();
    formData.append("file", file); // Append the file to the FormData object

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/upload-file`,
        formData,
        config
      );
      onCloseModel(); // Close the model after successful upload
    } catch (error) {
      console.error("Error uploading file:", error); // Handle upload errors
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Input type="file" onChange={onFileChange} />
      </div>
      <Preview file={file} fileType={fileType} previewUrl={previewUrl} />
      <div className="flex items-center justify-between">
        <DialogClose asChild>
          <Button>Cancle</Button>
        </DialogClose>
        <Button onClick={uploadFile}>Upload Now</Button>
      </div>
    </div>
  );
};

export default FileUpload;
