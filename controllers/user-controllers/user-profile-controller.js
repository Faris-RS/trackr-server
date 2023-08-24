import userModel from "../../models/userModel.js";
import vehicleModel from "../../models/vehicleModel.js";
import cloudinary from "../../utils/cloudinary.js";

export const getProfileDetails = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    const vehicles = await vehicleModel.find();
    const rentedVehicles = vehicles.filter(
      (vehicle) =>
        vehicle.rentedUserId &&
        vehicle.rentedUserId.toString() === user._id.toString()
    );
    const data = { user, rentedVehicles };
    res.status(200).json({
      status: 200,
      message: "Retrieved user data succesfully",
      user: data,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

export const updateProfilePhoto = async (req, res) => {
  try {
    await cloudinary.uploader
      .upload(req.body.imageData)
      .then(async (result, err) => {
        if (err) {
          console.error(err);
          response.status = false;
          res.json(response);
        } else {
          req.body.imageData = result.secure_url;
          await userModel
            .findOneAndUpdate(
              { _id: req.user._id },
              { image: req.body.imageData }
            )
            .then(() =>
              res.status(200).json({
                message: "Updated profile photo succesfully",
                status: 200,
              })
            )
            .catch(() =>
              res.status(201).json({
                message: "Could not update profile photo, please try again",
                status: 201,
              })
            );
        }
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
