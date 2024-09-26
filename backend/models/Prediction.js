const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  model: { type: String, required: true },  // Will store 'model2'
  outcome: { type: String, required: true },  // The diabetes prediction outcome
  features: {
    Pregnancies: { type: Number, required: true },
    Glucose: { type: Number, required: true },
    BloodPressure: { type: Number, required: true },
    SkinThickness: { type: Number, required: true },
    Insulin: { type: Number, required: true },
    BMI: { type: Number, required: true },
    DiabetesPedigreeFunction: { type: Number, required: true },
    Age: { type: Number, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Prediction', PredictionSchema);
