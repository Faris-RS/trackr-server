import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const adminModel = mongoose.model("Admin", adminSchema);
export default adminModel;
