import historyModel from "../../models/historyModel.js";

export const getAllOrders = async (req, res) => {
  try {
    const user = req.user;
    const orders = await historyModel
      .find({ user: user._id })
      .populate("vehicle", "vehicleName vehicleYear registrationNumber rate");
    res.status(200).json({
      status: 200,
      message: `Retrieved orders of ${user.firstName} ${user.lastName} successfully`,
      orders: orders,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
