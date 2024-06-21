import DataUriParser from "datauri/parser.js";
import path from "path";

// export const sendToken = (user, res, message, statusCode) => {
//   const token = user.generateToken();

//   res
//     .status(statusCode)
//     .cookie("token", token, {
//       ...cookieOptions,
//       expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//     })
//     .json({
//       success: true,
//       message: message,
//       user,
//       token,
//     });

//   console.log("Set-Cookie Header:", res.getHeader("Set-Cookie"));
// };

export const cookieOptions = {
  secure: process.env.NODE_ENV === "development" ? false : true,
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "development" ? false : "none",
};

export const getDataUri = (file) => {
  if (!file || !file.originalname) {
    console.log("File object type:", typeof file);
    console.log("File object:", file);
    if (Buffer.isBuffer(file)) {
      console.log("The file is a Buffer");
    }
    throw new Error(
      "Invalid file input. The file or file.originalname is undefined."
    );
  }

  const parser = new DataUriParser();
  const extensionName = path.extname(file.originalname).toString();

  return parser.format(extensionName, file.buffer);
};
