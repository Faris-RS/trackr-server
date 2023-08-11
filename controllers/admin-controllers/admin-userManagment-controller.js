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

export const blockUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.mail });
    if (user) {
      if (user.blocked) {
        await userModel.findByIdAndUpdate(
          { _id: user._id },
          { blocked: false }
        );
        res.status(200).json({ status: 200, message: "User unblocked" });
      } else {
        await userModel.findByIdAndUpdate({ _id: user._id }, { blocked: true });
        res.status(200).json({ status: 200, message: "User blocked" });
      }
    } else res.status(201).json({ status: 404, message: "User not found" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
