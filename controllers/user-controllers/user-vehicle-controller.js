import vehicleModel from "../../models/vehicleModel.js";

export const getAllVehicles = async (req, res) => {
  try {
    const vehicle = await vehicleModel.find({ rented: false });
    res.status(200).json({
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

export const rentVehicle = async (req, res) => {
  try {
    const { reg, rentDate, returnDate } = req.body;
    const user = req.user;
    if (user) {
      const updatedVehicleDetails = await vehicleModel.findOneAndUpdate(
        { registrationNumber: reg },
        {
          rented: true,
          rentedDate: rentDate,
          returnDate: returnDate,
          rentedBy: user.firstName + " " + user.lastName,
          rentedUserId: user._id,
        },
        { new: true }
      );
      if (updatedVehicleDetails) {
        res
          .status(200)
          .json({
            status: 200,
            message:
              "Rent request recieved. Please check mail for confirmation",
          });
      } else {
        res
          .status(200)
          .json({ status: 204, message: "Error while requesting for a rent" });
      }
    } else
      res.status(201).json({
        status: 404,
        message: "Please login to start renting",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
