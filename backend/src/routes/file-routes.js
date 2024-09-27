const router = require("express").Router();

const { uploadFile } = require("../controllers/file-controller");

const { isAuthenticatedUser } = require("../middlewares/auth");
const upload = require("../middlewares/file-upload");

router
  .route("/upload-file")
  .post(isAuthenticatedUser, upload.single("file"), uploadFile);

module.exports = router;
