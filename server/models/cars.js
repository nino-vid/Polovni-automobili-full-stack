import mongoose from "mongoose";

// Function to generate a random 8-digit number
const generateAdID = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const schema = new mongoose.Schema({
  brandName: {
    type: String,
    required: [true, "Marka automobila je obavezna"],
    validate: {
      validator: function (value) {
        return value !== "Sve marke";
      },
      message: "Marka automobila je obavezna",
    },
  },
  modelName: {
    type: String,
    required: [true, "Model automobila je obavezan"],
    validate: {
      validator: function (value) {
        return value !== "Svi modeli";
      },
      message: "Model automobila je obavezan",
    },
  },
  year: {
    type: Number,
    cast: "Godište mora biti broj",
    required: [true, "Godište je obavezno"],
    min: [1950, "Godište mora biti 1950 ili kasnije"],
    max: [2024, "Godište mora biti 2024 ili ranije"],
  },
  chassis: {
    type: String,
    required: [true, "Karoserija je obavezna"],
  },
  fuelType: {
    type: String,
    required: [true, "Gorivo je obavezno"],
  },
  mileage: {
    type: Number,
    cast: "Kilometraža mora biti broj",
    required: [true, "Kilometraža je obavezna"],
    min: [0, "Kilometraža ne može biti negativna"],
  },
  snagaKS: {
    type: Number,
    cast: "Snaga (KS) mora biti broj",
    required: [true, "Snaga (KS) je obavezna"],
    min: [0, "Snaga (KS) ne može biti negativna"],
  },
  power: {
    type: Number,
    cast: "Snaga (kW)",
    required: [true, "Snaga (kW) je obavezna"],
    min: [0, "Snaga (kW) ne može biti negativna"],
  },
  color: {
    type: String,
    required: [true, "Boja je obavezna"],
  },
  doornum: {
    type: String,
    required: [true, "Broj vrata je obavezan"],
  },
  gearBox: {
    type: String,
    required: [true, "Menjač je obavezan"],
  },
  stanje: {
    type: String,
    required: [true, "Stanje je obavezno"],
  },
  price: {
    type: Number,
    cast: "Cena mora biti broj",
    required: [true, "Cena je obavezna"],
    min: [0, "Cena ne može biti negativna"],
  },
  photoLink: [
    {
      public_id: String,
      url: String,
    },
  ],
  AdID: {
    type: Number,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to generate and assign a unique AdID
schema.pre("save", async function (next) {
  if (!this.AdID) {
    let isUnique = false;
    while (!isUnique) {
      const newAdID = generateAdID();
      const existingCar = await mongoose.models.Cars.findOne({ AdID: newAdID });
      if (!existingCar) {
        this.AdID = newAdID;
        isUnique = true;
      }
    }
  }
  next();
});

export const Cars = mongoose.model("Cars", schema);
