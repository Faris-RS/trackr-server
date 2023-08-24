import historyModel from "../../models/historyModel.js";
import userModel from "../../models/userModel.js";
import vehicleModel from "../../models/vehicleModel.js";
import cloudinary from "../../utils/cloudinary.js";

export const addVehicle = async (req, res) => {
  try {
    const {
      vehicleName,
      insuranceExpiry,
      vehicleYear,
      registrationNumber,
      rate,
      photo,
    } = req.body.data;
    const vehicle = await vehicleModel.findOne({
      registrationNumber: registrationNumber,
    });
    if (vehicle) {
      res.status(201).json({ status: 201, message: "Vehicle already added" });
    } else {
      await cloudinary.uploader.upload(photo).then(async (result, err) => {
        if (err) {
          console.error(err);
          response.status = false;
          res.json(response);
        } else {
          const image = result.secure_url;
          const newVehicle = new vehicleModel({
            vehicleName,
            vehicleYear: Number(vehicleYear),
            insuranceExpiry,
            registrationNumber,
            rate,
            photo: image,
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
              res
                .status(302)
                .json({ message: "Error while saving new vehicle" });
            });
        }
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

export const returnVehicle = async (req, res) => {
  try {
    const { returnedDate, weeks, fines, total } = req.body;
    const admin = req.user;
    const vehicle = await vehicleModel.findOne({ _id: req.body.vehicle._id });
    if (vehicle) {
      const newHistory = new historyModel({
        vehicle: vehicle._id,
        user: vehicle.rentedUserId,
        rentedDate: vehicle.rentedDate,
        returnDate: vehicle.returnDate,
        returnedDate,
        weeks,
        fines,
        total,
        processedBy: admin._id,
      });
      await newHistory.save().then(async () => {
        vehicle.rented = false;
        vehicle.rentedDate = undefined;
        vehicle.returnDate = undefined;
        vehicle.rentedBy = undefined;
        vehicle.rentedUserId = undefined;
        await vehicle.save().then(() => {
          res
            .status(200)
            .json({ status: 200, message: "Vehicle return data added" });
        });
      });

      // await Promise.all([newHistory.save(), vehicle.save()]);
    } else {
      res.status(201).json({
        status: 404,
        message: "Could not get vehicle details. Please try again later",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const doDeleteVehicle = async (req, res) => {
  try {
    const vehicle = req.params.vehicle;
    if (vehicle) {
      await vehicleModel
        .deleteOne({ registrationNumber: vehicle })
        .then(() => {
          res
            .status(200)
            .json({ status: 200, message: "Vehicle deleted succesfully" });
        })
        .catch((err) => {
          console.error(err);
          res.status(302).json({ message: "Error while deleting vehicle" });
        });
    } else {
      res.status(201).json({
        status: 404,
        message: "Could not get vehicle details. Please try again later",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
