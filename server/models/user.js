import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter Email"],
    unique: [true, "Email Already Exist"],
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minLength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  profilePhoto: {
    public_id: String,
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dxvgnurez/image/upload/v1716498353/profile-pic_bafye4.jpg",
    },
  },
  otp: Number,
  otp_expire: Date,
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cars",
    },
  ],
});

schema.pre("save", async function (next) {
  // avoid re-hashing pass if its not changed (exp. verified updated)
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

schema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

export const User = mongoose.model("User", schema);
