import { asyncError } from "../middlewares/error.js";
import ErrorHandler from "./../utils/error.js";
import { User } from "../models/user.js";
import { Cars } from "../models/cars.js";
import { cookieOptions, getDataUri } from "../utils/features.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

import EmailToken from "../models/emailToken.js";
import crypto from "crypto";
import sendEmail from "./../utils/sendEmail.js";

// export const login = async (req, res, next) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email }).select("+password");

//     // if (!user) {
//     //   return next(new ErrorHandler("Incorrect Email or Password", 400));
//     // }
//     if (!user) {
//       const error = new Error("Incorrect Email or Password");
//       error.statusCode = 400;
//       console.error("Login error: No user found with this email");
//       return next(error);
//     }

//     if (!user.verified) {
//       return next(
//         new ErrorHandler("Please verify your email before logging in", 400)
//       );
//     }

//     const isMatched = await user.comparePassword(password);

//     if (!isMatched) {
//       return next(new ErrorHandler("Incorrect Email or Password", 400));
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     const cookieOptions = {
//       httpOnly: true,
//       expires: new Date(Date.now() + 24 * 3600000),
//       secure: process.env.NODE_ENV !== "development",
//       sameSite: "None",
//     };

//     res.cookie("token", token, cookieOptions);
//     res.status(200).json({
//       success: true,
//       message: "Welcome Back!",
//       user: { id: user._id, email: user.email, verified: user.verified },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     return next(new ErrorHandler("Internal Server Error", 500));
//   }
// };

export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Netačan email ili lozinka",
      });
    }

    if (!user.verified) {
      return res.status(400).json({
        success: false,
        message: "Verifikujte email pre prijavljivanja",
      });
    }

    const isMatched = await user.comparePassword(password);

    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Netačan email ili lozinka",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 3600000),
      secure: process.env.NODE_ENV !== "development",
      sameSite: "None",
    };

    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "Welcome Back!",
      user: { id: user._id, email: user.email, verified: user.verified },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export const signup = asyncError(async (req, res, next) => {
  const { email, password, repeatPassword } = req.body;

  if (!email || !password || !repeatPassword) {
    return res.status(400).json({
      success: false,
      message: "Unesite sva obavezna polja",
    });
  }

  if (password !== repeatPassword) {
    return res.status(400).json({
      success: false,
      message: "Lozinke se ne poklapaju",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Lozinka mora biti minimum 6 karaktera dugačka",
    });
  }

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      success: false,
      message: "Korisnik već postoji",
    });

  try {
    user = await User.create({ email, password, verified: false });

    // // Sending verification email
    const emailToken = await new EmailToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const emailUrl = `${process.env.BASE_URL}user/${user._id}/verify/${emailToken.token}`;

    console.log(`Verification URL: ${emailUrl}`);

    await sendEmail(
      user.email,
      "Verifikuj Email",
      `Kliknite na link da biste verifikovali Email: ${emailUrl}`
    );

    res.status(201).json({
      success: true,
      message: "Email poslat na vaš nalog, molimo potvrdite",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

export const logout = asyncError(async (req, res, next) => {
  res.cookie("token", "", {
    ...cookieOptions,
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

export const getMyProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("cars");

  res.status(200).json({
    success: true,
    user,
  });
};

export const verificationEmail = asyncError(async (req, res, next) => {
  try {
    const { id, emailToken } = req.params;

    // Find the user by id
    const user = await User.findById(id);

    if (!user) return next(new ErrorHandler("Invalid link", 400));

    // Find the email token associated with the user
    const token = await EmailToken.findOne({
      userId: user._id,
      token: emailToken,
    });

    if (!token) return next(new ErrorHandler("Invalid link", 400));

    // Update the user's verified field to true
    user.verified = true;
    await user.save();

    // Remove the email token
    await token.deleteOne({ _id: token._id });

    // Only redirect the user
    res.redirect("https://polovni-automobili.vercel.app/login");
  } catch (error) {
    console.error("Verification error:", error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

export const uploadProfilePhoto = asyncError(async (req, res, next) => {
  // Cloudinary
  const file = getDataUri(req.file);

  const myCloud = await cloudinary.v2.uploader.upload(file.content);
  console.log(myCloud);

  const newProfilePhoto = {
    public_id: myCloud.public_id,
    url: myCloud.url,
  };

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { profilePhoto: newProfilePhoto },
    { new: true }
  );

  res.status(200).json({
    success: true,
    user,
  });
});

export const postaviOglas = async (req, res, next) => {
  const {
    brand,
    model,
    godiste,
    karoserija,
    gorivo,
    kilometraza,
    snagaKS,
    snagaKW,
    boja,
    vrata,
    menjac,
    stanje,
    cena,
  } = req.body;

  const files = req.files;
  console.log("Files:", req.files);
  console.log("Body:", req.body);

  if (!files || files.length === 0) {
    return res.status(400).json({
      success: false,
      error: "Slika nije dodata (jpeg/jpg/png)",
    });
  }

  let images = [];

  try {
    for (const file of files) {
      const dataUri = getDataUri(file);
      const cloudResponse = await cloudinary.v2.uploader.upload(
        dataUri.content
      );

      images.push({
        public_id: cloudResponse.public_id,
        url: cloudResponse.url,
      });
    }

    const user = await User.findById(req.user.id);
    console.log(user);

    const cars = await Cars.create({
      brandName: brand,
      modelName: model,
      year: godiste,
      chassis: karoserija,
      fuelType: gorivo,
      mileage: kilometraza,
      snagaKS,
      power: snagaKW,
      color: boja,
      doornum: vrata,
      gearBox: menjac,
      stanje,
      price: cena,
      photoLink: images,
      owner: user._id,
    });

    user.cars.push(cars._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "successfull.",
      cars,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0].message;
      return res.status(400).json({
        success: false,
        error: firstError,
      });
    }
    return next(new ErrorHandler("Internal Server Error", 500));
  }

  console.log("Received data:");
  console.log("Brand:", brand);
  console.log("Model:", model);
  console.log("Godiste:", godiste);
  console.log("Karoserija:", karoserija);
  console.log("Gorivo:", gorivo);
  console.log("Kilometraza:", kilometraza);
  console.log("SnagaKS:", snagaKS);
  console.log("SnagaKW:", snagaKW);
  console.log("Boja:", boja);
  console.log("Vrata:", vrata);
  console.log("Menjac:", menjac);
  console.log("Stanje:", stanje);
  console.log("Cena:", cena);
  console.log("Images:", images);
};

export const getCarsFromDb = asyncError(async (req, res, next) => {
  try {
    const cars = await Cars.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    next(new ErrorHandler("Internal Server Error", 500));
  }
});

export const getMyCars = asyncError(async (req, res, next) => {
  try {
    const myCars = await Cars.find({ owner: req.user._id });
    res.status(200).json(myCars);
    // console.log(myCars);
  } catch (error) {
    console.error(error);
    next(new ErrorHandler("Internal Server Error", 500));
  }
});

export const deleteCar = asyncError(async (req, res, next) => {
  try {
    const adId = req.params.id;
    const userId = req.user._id;

    const car = await Cars.findOne({ AdID: adId });
    if (!car) {
      return next(new ErrorHandler("Car not found", 404));
    }

    if (car.owner.toString() !== userId.toString()) {
      return next(
        new ErrorHandler("You are not authorized to delete this car", 403)
      );
    }

    await car.deleteOne();

    await User.findByIdAndUpdate(userId, { $pull: { cars: car._id } });

    res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    console.error(error);
    next(new ErrorHandler("Internal Server Error", 500));
  }
});
