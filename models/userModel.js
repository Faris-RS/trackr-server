import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  blocked: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
