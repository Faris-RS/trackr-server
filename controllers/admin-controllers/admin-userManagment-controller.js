import userModel from "../../models/userModel.js";

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password -_id");
    res.status(200).json({
      users: users,
      message: "Retrieved user list succesfully",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
