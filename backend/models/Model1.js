const mongoose = require("mongoose");

const Model1Schema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        model: { type: String, required: true }, // Will store 'model1'
        outcome: { type: String, required: true }, // The outcome of the prediction
        features: {
            age: { type: Number, required: true },
            gender: { type: String, required: true },
            height: { type: Number, required: true },
            weight: { type: Number, required: true },
            workIntensity: { type: String, required: true },
            exerciseFrequency: { type: String, required: true },
            physicalActivity: { type: [String], required: true },
            fastFoodFrequency: { type: String, required: true },
            sugaryFoodFrequency: { type: String, required: true },
            sugaryDrinkFrequency: { type: String, required: true },
            smoking: { type: String, required: true },
            alcohol: { type: String, required: true },
            sleepDuration: { type: String, required: true },
            sleepQuality: { type: String, required: true },
            sleepIssues: { type: [String], required: true },
            stressLevels: { type: String, required: true },
            highBloodPressure: { type: String, required: true },
            symptoms: { type: [String], required: true },
            familyHistory: { type: Number, required: true },
            otherMedicalConditions: { type: [String], required: true },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Model1", Model1Schema);
