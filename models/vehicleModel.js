import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Objectid = mongoose.Types.ObjectId;

const vehicleSchema = new Schema({
  vehicleName: {
    type: String,
  },
  vehicleYear: {
    type: Number,
  },
  insuranceExpiry: {
    type: Date,
  },
  registrationNumber: {
    type: String,
  },
  rate: {
    type: Number,
  },
  rented: {
    type: Boolean,
    default: false,
  },
  rentedDate: {
    type: Date,
  },
  returnDate: {
    type: Date,
  },
  rentedBy: {
    type: String,
  },
  rentedUserId: {
    type: Objectid,
    ref: "User",
  },
});

const vehicleModel = mongoose.model("Vehicle", vehicleSchema);
export default vehicleModel;
