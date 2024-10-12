import express from "express";
import router from "express";
import Model1 from "../models/Model1"; // Import the Model1 schema
import Prediction from "../models/Prediction"; // Import the Prediction schema

// GET /api/history - Fetch prediction history for both models
router.get("/history", async (req, res) => {
  try {
    const email = req.query.email; // Assume the email is passed as a query parameter
    if (!email) {
      return res.status(400).json({ error: "Email query parameter is required" });
    }

    // Fetch predictions from Model 1
    const model1History = await Model1.find({ email }).sort({ createdAt: -1 }); // Sorting by most recent first

    // Fetch predictions from Model 2
    const model2History = await Prediction.find({ email }).sort({ createdAt: -1 }); // Sorting by most recent first

    // Combine both histories
    const history = {
      model1History,
      model2History,
    };

    res.json(history);
  } catch (error) {
    console.error("Error fetching prediction history:", error);
    res.status(500).json({ error: "Failed to fetch prediction history" });
  }
});

// DELETE /api/history/:id - Delete a specific prediction by ID
router.delete("/history/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Try to delete from Model1 first
    const model1Deleted = await Model1.findByIdAndDelete(id);

    if (model1Deleted) {
      return res.status(200).json({ message: "Model1 prediction deleted successfully" });
    }

    // If not found in Model1, try deleting from Model2 (Prediction)
    const model2Deleted = await Prediction.findByIdAndDelete(id);
    if (model2Deleted) {
      return res.status(200).json({ message: "Model2 prediction deleted successfully" });
    }

    // If neither found, return a 404 error
    return res.status(404).json({ message: "Prediction not found" });
  } catch (error) {
    console.error("Error deleting prediction:", error);
    res.status(500).json({ message: "Failed to delete prediction" });
  }
});

module.exports = router;
