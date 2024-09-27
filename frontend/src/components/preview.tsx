const Preview = ({
  file,
  fileType,
  previewUrl,
}: {
  file?: File | null;
  fileType: string;
  previewUrl: string;
}) => {
  const renderItem = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return (
        <img
          src={previewUrl}
          alt="File preview"
          className="w-full h-full object-contain"
        />
      );
    } else if (fileType.startsWith("audio/")) {
      return (
        <audio controls src={previewUrl} className="w-full h-full ">
          Your browser does not support the audio element.
        </audio>
      );
    } else if (fileType.startsWith("video/")) {
      return (
        <video controls src={previewUrl} className="w-full h-full">
          Your browser does not support the video element.
        </video>
      );
    } else if (fileType === "application/pdf") {
      return (
        <iframe
          src={previewUrl}
          className="w-full h-full"
          style={{ height: "100%" }}
          title="PDF Preview"
        />
      );
    } else {
      console.log("Unsupported file type");
    }
  };
  return (
    <>
      <div className="py-4 w-full">
        <div className="flex flex-col justify-center gap-2">
          {file && (
            <>
              <p className="text-xs flex items-center gap-2">
                File Name: <span>{file.name}</span>
              </p>
              <p className="text-xs flex items-center gap-2">
                File Type: <span>{fileType}</span>
              </p>
              <p className="text-xs flex items-center gap-2">
                File Size:{" "}
                <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </p>
            </>
          )}
        </div>
        <div className="h-[400px]">{renderItem(fileType)}</div>
      </div>
    </>
  );
};

export default Preview;
