const Fuel = require("../modal/fuel");
const mongoose = require("mongoose");

exports.getFuelData = async (req, res) => {
  try {
    const fuelData = await Fuel.find();
    res.json(fuelData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addFuelData = async (req, res) => {
  const { Measurement, fuelID, fuelType } = req.body;

  try {
    if (!Measurement || !fuelID || !fuelType) {
      res.json({
        error: "Measurement, fuelID (must be a number), fuelType required.",
      });
    }
    const newFuelData = new Fuel({
      Measurement,
      fuelID,
      fuelType,
    });

    await newFuelData.save();
    res.status(201).json(newFuelData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update Fuel Data
exports.updateFuelData = async (req, res) => {
  const { fuelID } = req.params; // Extract fuelID from request parameters
  const updatedData = req.body; // Extract updated fields from request body
  // console.log("fuelID===>",fuelID);
  try {
    // Find the fuel data by fuelID
    let fuelData = await Fuel.findOne({fuelID:fuelID});

    // If fuel data not found, return error
    if (!fuelData) {
      return res.status(404).json({ error: "Fuel data not found." });
    }

    // Update fuel data with new values
    fuelData = await Fuel.findOneAndUpdate({ fuelID }, updatedData, {
      new: true,
    });

    // Return the updated fuel data
    return res.json(fuelData);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ error: error.message });
  }
};

// Delete Fuel Data
exports.deleteFuelData = async (req, res) => {
  const { fuelID } = req.params; // Extract fuelID from request parameters

  try {
    // Find the fuel data by fuelID and delete it
    const deletedFuelData = await Fuel.findOneAndDelete({ fuelID });

    // If fuel data not found, return error
    if (!deletedFuelData) {
      return res.status(404).json({ error: "Fuel data not found." });
    }

    // Return the deleted fuel data
    return res.json(deletedFuelData);
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ error: error.message });
  }
};
