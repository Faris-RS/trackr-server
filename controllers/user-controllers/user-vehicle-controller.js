import vehicleModel from "../../models/vehicleModel.js";

export const getAllVehicles = async (req, res) => {
  try {
    const vehicle = await vehicleModel.find();
    res
      .status(200)
      .json({
        status: 200,
        message: "Retrieved vehicle data succesfully",
        vehicle: vehicle,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
