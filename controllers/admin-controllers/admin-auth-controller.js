import adminModel from "../../models/adminModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateJWT.js";

export const doLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await adminModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = generateToken({ userId: user._id });
          const response = {
            token,
            name: user.firstName + " " + user.lastName,
            message: "login successfull",
          };
          res.status(200).json(response);
        } else {
          res
            .status(201)
            .json({ message: "Incorrect password. Please try again." });
        }
      });
    } else {
      res
        .status(201)
        .json({ message: "No admin account found with associated email." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
