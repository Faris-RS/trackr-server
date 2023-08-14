import historyModel from "../../models/historyModel.js";

export const getAllOrders = async (req, res) => {
  try {
    const { month, year } = req.params;
    const orders = await historyModel
      .find({
        $and: [{ processedMonth: month }, { processedYear: year }],
      })
      .populate(
        "vehicle",
        "vehicleName vehicleYear insuranceExpiry registrationNumber rate rentedDate returnDate"
      )
      .populate("user", "firstName lastName email")
      .populate("processedBy", "firstName lastName");
    console.log(orders);
    res.status(200).json({
      status: 200,
      orders: orders,
      message: `Succefully retrieved order history for ${month} ${year}`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
