import mongoose, { Schema, Document, Model } from "mongoose";

// Define the TypeScript interface for the Vendor document
export interface IVendor extends Document {
  name: string;
  email: string;
  website?: string;
  phone_number: Number;
  address: string;
  cod_available: Boolean;
  registration_date: string;
}

// Define the Mongoose schema
const vendorSchema: Schema<IVendor> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    phone_number: {
      type: Number,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    cod_available: {
      type: Boolean,
      default: false,
      // required: true,
    },
    registration_date: {
      type: String,
      default: Date.now.toString(),
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

// to convert first character into uppercase and check special character
vendorSchema.pre("save", function (next) {
  this.name =
    this.name[0].toUpperCase() +
    this.name
      .substring(1)
      .toLowerCase()
      .replace(/\s{2,}/g, " ");
  next();
});

// Export the model
const Vendor: Model<IVendor> = mongoose.model<IVendor>("Vendor", vendorSchema);
export default Vendor;
