import userModel from "../../models/userModel.js";
import vehicleModel from "../../models/vehicleModel.js";

export const addVehicle = async (req, res) => {
  try {
    const { vehicleName, insuranceExpiry, registrationNumber, rate } =
      req.body.data;
    const vehicleYear = Number(req.body.data.vehicleYear);
    const vehicle = await vehicleModel.findOne({
      registrationNumber: registrationNumber,
    });
    if (vehicle) {
      res.status(201).json({ status: 201, message: "Vehicle already added" });
    } else {
      const newVehicle = new vehicleModel({
        vehicleName,
        vehicleYear: Number(vehicleYear),
        insuranceExpiry,
        registrationNumber,
        rate,
      });
      await newVehicle
        .save()
        .then(() => {
          res
            .status(200)
            .json({ status: 200, message: "Vehicle added succesfully" });
        })
        .catch((err) => {
          console.error(err);
          res.status(302).json({ message: "Error while saving new vehicle" });
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const fetchAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleModel.find();
    res.status(200).json({
      vehicles: vehicles,
      message: "Retrieved vehicle list succesfully",
      status: 200,
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
    const { rentedDate, returnDate, email, selectedVehicle } = req.body;
    console.log(req.body);
    const userDetails = await userModel.findOne({ email: email });
    const vehicleDetails = await vehicleModel.findOne({
      registrationNumber: selectedVehicle,
    });
    if (userDetails) {
      if (vehicleDetails) {
        const updatedVehicleDetails = await vehicleModel.findOneAndUpdate(
          { _id: vehicleDetails._id },
          {
            rented: true,
            rentedDate: rentedDate,
            returnDate: returnDate,
            rentedBy: userDetails.firstName + " " + userDetails.lastName,
            rentedUserId: userDetails._id,
          },
          { new: true }
        );

        if (updatedVehicleDetails) {
          res
            .status(200)
            .json({ status: 200, message: "Rent details added successfully" });
        } else {
          res
            .status(200)
            .json({ status: 204, message: "Failed to update vehicle details" });
        }
      } else {
        res.status(204).json({
          status: 204,
          message: "Could not get vehicle details, please try again",
        });
      }
    } else {
      res.status(204).json({
        status: 204,
        message: "Could not get user details, please try again",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const getSelectedVehicleDetails = async (req, res) => {
  try {
    const vehicle = req.params.vehicle;
    if (vehicle) {
      const vehicleData = await vehicleModel.findOne({
        registrationNumber: vehicle,
      });
      if (vehicleData) {
        res
          .status(200)
          .json({ status: 200, message: "Hi", vehicle: vehicleData });
      } else {
        res.status(201).json({
          status: 404,
          message: "Cannot find given vehicle in database",
        });
      }
    } else {
      res.status(201).json({
        status: 404,
        message: "Could not resolve selected vehicle, please try again",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const doEditVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleModel.findOne({ _id: req.body._id });
    if (vehicle) {
      console.log(req.body);
      const {
        vehicleName,
        insuranceExpiry,
        registrationNumber,
        vehicleYear,
        rate,
        rented,
        rentedBy,
        rentedDate,
        rentedUserId,
        returnDate,
      } = req.body;
      // if (
      //   vehicle.vehicleName === vehicleName &&
      //   vehicle.insuranceExpiry === insuranceExpiry &&
      //   vehicle.registrationNumber === registrationNumber &&
      //   vehicle.vehicleYear === vehicleYear &&
      //   vehicle.rate === rate &&
      //   vehicle.rented === rented &&
      //   vehicle.rentedBy === rentedBy &&
      //   vehicle.rentedDate === rentedDate &&
      //   vehicle.rentedUserId === rentedUserId &&
      //   vehicle.returnDate === returnDate &&
      //   vehicle.returnDate === returnDate
      // ) {
      //   res.status(200).json({ message: "No changes, eh?" });
      // }
      const editedVehicle = await vehicleModel.findOneAndUpdate(
        { _id: vehicle._id },
        {
          vehicleName,
          insuranceExpiry,
          registrationNumber,
          vehicleYear,
          rate,
          rented,
          rentedBy,
          rentedDate,
          rentedUserId,
          returnDate,
        },
        { new: true }
      );
      if (editedVehicle) {
        res.status(200).json({
          status: 200,
          message: `Vehicle details of ${registrationNumber} edited successfully`,
        });
      } else {
        res
          .status(200)
          .json({ status: 204, message: "Failed to update vehicle details" });
      }
    } else {
      res.status(204).json({
        status: 204,
        message: "Could not get vehicle details, please try again",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
