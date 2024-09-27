// s1eb3vmf

const AsyncError = require("../middlewares/async-error");
const ErrorHandler = require("../utils/ErroHandler");
const FileModel = require("../models/file-model");
const cloudinary = require("cloudinary");
const userModel = require("../models/user-model");

exports.uploadFile = AsyncError(async (req, res, next) => {
  const file = req.file;
  console.log(file.mimetype);
  if (!file) {
    return next(new ErrorHandler(400, "file not found!"));
  }
  let myCloud;
  if (file.mimetype.startsWith("image/")) {
    myCloud = await cloudinary.v2.uploader.upload(file.path, {
      upload_preset: "s1eb3vmf",
      transformation: [{ width: 400, height: 400, crop: "fill" }],
    });
  } else {
    myCloud = await cloudinary.v2.uploader.upload(file.path, {
      upload_preset: "s1eb3vmf",
    });
  }

  const uploadedFile = await FileModel.create({
    filename: myCloud.original_filename,
    url: myCloud.secure_url,
    filetype: file.mimetype,
    public_id: myCloud.public_id,
    user: req.user._id,
  });

  await userModel.findByIdAndUpdate(req.user._id, {
    $push: { files: uploadedFile._id },
  });
  res.status(200).json({
    success: true,
    message: "file uploaded successfully",
    uploadedFile,
  });
});
