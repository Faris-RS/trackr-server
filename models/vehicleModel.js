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
  photo: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeJPwIba3Un9Vvkf1LgBUmRcN4PWHzQdzTH-Ab5fnF&s",
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
