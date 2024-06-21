export const errorMiddleware = (err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;

  // if (err.code === 11000) {
  //   err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
  //   err.statusCode = 400;
  // }

  res.status(statusCode).json({ success: false, message: message });
};

// export const errorMiddleware = (err, req, res, next) => {
//   console.error("Error middleware caught an error:", err); // Log the error for debugging

//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";

//   res.status(statusCode).json({ success: false, message });
// };

export const asyncError = (passedFunc) => (req, res, next) => {
  Promise.resolve(passedFunc(req, res, next)).catch(next);
};
