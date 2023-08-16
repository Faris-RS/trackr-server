import userModel from "../../models/userModel.js";

export const getProfileDetails = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    console.log(user);
    res
      .status(200)
      .json({
        status: 200,
        message: "Retrieved user data succesfully",
        user: user,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
