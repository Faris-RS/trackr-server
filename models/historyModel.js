import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Objectid = mongoose.Types.ObjectId;

const historySchema = new Schema({
  vehicle: {
    type: Objectid,
    ref: "Vehicle",
  },
  user: {
    type: Objectid,
    ref: "User",
  },
  rentedDate: {
    type: Date,
  },
  returnDate: {
    type: Date,
  },
  returnedDate: {
    type: Date,
  },
  weeks: {
    type: Number,
  },
  fines: {
    type: Number,
  },
  total: {
    type: Number,
  },
  processedBy: {
    type: Objectid,
    ref: "Admin",
  },
  processedMonth: {
    type: String,
    default: () => new Date().toLocaleString("en-US", { month: "long" }),
  },
  processedYear: {
    type: Number,
    default: () => new Date().getFullYear(),
  },
});

const historyModel = mongoose.model("History", historySchema);
export default historyModel;
