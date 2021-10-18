const multer = require("multer");

exports.upload = multer({
  limits: {
    fileSize: 8000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg|bmp)$/))
      return cb(new Error("file must be jpg,png or bmp"));
    cb(undefined, true);
  },
});
