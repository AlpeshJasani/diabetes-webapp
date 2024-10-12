const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv"); // Import dotenv for environment variables
const Prediction = require("../models/Prediction"); // Import the Prediction model
const Model1 = require("../models/Model1"); // Import the Prediction model
const router = express.Router();

// Load environment variables
dotenv.config(); // Load variables from .env file

// POST /api/predict/model2 - Endpoint for model 2 predictions
router.post("/model2", async (req, res) => {
    const { email, Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age } = req.body;

    // Prepare the data to send to the prediction model
    const dataToPredict = {
        Pregnancies,
        Glucose,
        BloodPressure,
        SkinThickness,
        Insulin,
        BMI,
        DiabetesPedigreeFunction,
        Age,
    };

    try {
        // Send data to the model prediction API
        // const response = await axios.post('http://127.0.0.1:5000/predict2', dataToPredict);
        const response = await axios.post(`${process.env.DIABETES_API_URL}/predict2`, dataToPredict);

        // Get the diabetes prediction result from the model's response
        const outcome = response.data.diabetes;

        // Only save to database if the email exists (user is logged in)
        if (email) {
            const newPrediction = new Prediction({
                email,
                model: "model2", // Save it as Model 2 prediction
                outcome, // The diabetes prediction outcome (0 or 1)
                features: {
                    Pregnancies,
                    Glucose,
                    BloodPressure,
                    SkinThickness,
                    Insulin,
                    BMI,
                    DiabetesPedigreeFunction,
                    Age,
                },
            });

            // Save to the database
            await newPrediction.save();
            console.log("Prediction saved to the database");
        } else {
            console.log("User not logged in, prediction not saved");
        }

        // Return the prediction outcome to the frontend
        res.json({ outcome });
        // res.json(response.data);
    } catch (error) {
        console.error("Error in model 2 prediction:", error);
        res.status(500).json({ error: "Something went wrong with the prediction or database save." });
    }
});

// POST /api/predict/model1 - Endpoint for model 1 predictions
router.post("/model1", async (req, res) => {
    try {
        const { email, features, ...data } = req.body;
        console.log("Received Request:", req.body); // Log incoming request

        const dataToPredict = Object.keys(data)
            .sort((a, b) => a - b) // Sort keys to ensure correct order
            .map((key) => data[key]); // Convert to array of values

        console.log("Data to Predict:", dataToPredict); // Log the data sent for prediction

        // const response = await axios.post('http://127.0.0.1:5000/predict_percentage', { data: dataToPredict });
        const response = await axios.post(`${process.env.DIABETES_API_URL}/predict_percentage`, {
            data: dataToPredict,
        });

        console.log("Response from prediction API:", response.data); // Log the API response

        const outcome = response.data.diabetes_percentage;
        console.log("Outcome:", outcome); // Log the outcome

        // Save to the database if the user is logged in (i.e., if email is provided)
        if (email) {
            const newPrediction = new Model1({
                email,
                model: "model1", // Model 1 prediction
                outcome, // The predicted diabetes percentage
                features, // The raw features from req.body
            });

            // Save to the database
            await newPrediction.save();
            console.log("Prediction saved to the database");
        } else {
            console.log("User not logged in, prediction not saved");
        }

        res.json({ outcome });
    } catch (error) {
        console.error("Error in model 1 prediction:", error); // Log the error details
        res.status(500).json({ error: error.message }); // Send the error message in response
    }
});

module.exports = router;
