// import multer from "multer";

// const storage = multer.memoryStorage();

// export const singleUpload = multer({
//   storage,
// }).single("file");

// export const multipleUpload = multer({
//   storage,
// }).array("files");

import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;

  const extname = fileTypes.test(file.originalname.toLowerCase());

  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        "Error: File upload only supports the following filetypes - " +
          fileTypes
      )
    );
  }
};

export const singleUpload = multer({
  storage,
  fileFilter,
}).single("file");

export const multipleUpload = multer({
  storage,
  fileFilter,
}).array("files");
