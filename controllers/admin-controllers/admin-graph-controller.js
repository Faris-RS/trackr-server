import historyModel from "../../models/historyModel.js";

export const heatmap = async (req, res) => {
  try {
    const rentalHistory = await historyModel
      .find()
      .populate("vehicle", "vehicleName registrationNumber");
    const heatmapData = rentalHistory.map((history) => {
      return {
        vehicleNo: history.vehicle.registrationNumber,
        vehicleName: history.vehicle.vehicleName,
        week: history.processedMonth,
        activity: history.total,
      };
    });
    console.log(heatmapData);
    res
      .status(200)
      .json({
        message: "Retrieved heatmap succesfully",
        data: heatmapData,
        status: 200,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
