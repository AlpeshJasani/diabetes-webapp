import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Model2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Pregnancies: "2",
    Glucose: "140",
    BloodPressure: "120",
    SkinThickness: "4",
    Insulin: "40",
    BMI: "25",
    DiabetesPedigreeFunction: "0.9",
    Age: "24",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("authEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!formData.Pregnancies || formData.Pregnancies < 0) {
      errors.Pregnancies = "Pregnancies must be a positive number.";
    }
    if (!formData.Glucose || formData.Glucose <= 0) {
      errors.Glucose = "Glucose must be a positive number.";
    }
    if (!formData.BloodPressure || formData.BloodPressure <= 0) {
      errors.BloodPressure = "Blood Pressure must be a positive number.";
    }
    if (!formData.SkinThickness || formData.SkinThickness <= 0) {
      errors.SkinThickness = "Skin Thickness must be a positive number.";
    }
    if (!formData.Insulin || formData.Insulin <= 0) {
      errors.Insulin = "Insulin must be a positive number.";
    }
    if (!formData.BMI || formData.BMI <= 0 || formData.BMI > 100) {
      errors.BMI = "BMI must be a positive number less than 100.";
    }
    if (!formData.DiabetesPedigreeFunction || formData.DiabetesPedigreeFunction <= 0) {
      errors.DiabetesPedigreeFunction = "Diabetes Pedigree Function must be a positive number.";
    }
    if (!formData.Age || formData.Age <= 0 || formData.Age > 120) {
      errors.Age = "Age must be a positive number less than 120.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop if form is invalid
    }

    setLoading(true);
    setError(null);

    try {
      // const response = await axios.post('http://localhost:5000/api/predict/model2', { ...formData, email });
      const response = await axios.post("https://diabetes-webapp.onrender.com/api/predict/model2", { ...formData, email });
      const outcome = response.data.outcome;
      setPrediction(outcome);

      navigate("/Suggestions2", { state: { formData, prediction: outcome } });
    } catch (err) {
      setError("Error in prediction. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold mb-6'>Diabetes Prediction</h1>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='font-bold text-gray-700'>Pregnancies:</label>
              <input
                type='number'
                name='Pregnancies'
                value={formData.Pregnancies}
                onChange={handleChange}
                className={`mt-1 p-2 border w-full rounded-lg ${validationErrors.Pregnancies ? "border-red-500" : "border-gray-300"}`}
              />
              {validationErrors.Pregnancies && <p className='text-red-500'>{validationErrors.Pregnancies}</p>}
            </div>
            <div>
              <label className='font-bold text-gray-700'>Glucose:</label>
              <input
                type='number'
                name='Glucose'
                value={formData.Glucose}
                onChange={handleChange}
                className={`mt-1 p-2 border w-full rounded-lg ${validationErrors.Glucose ? "border-red-500" : "border-gray-300"}`}
              />
              {validationErrors.Glucose && <p className='text-red-500'>{validationErrors.Glucose}</p>}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='font-bold text-gray-700'>Blood Pressure:</label>
              <input
                type='number'
                name='BloodPressure'
                value={formData.BloodPressure}
                onChange={handleChange}
                className={`mt-1 p-2 border w-full rounded-lg ${validationErrors.BloodPressure ? "border-red-500" : "border-gray-300"}`}
              />
              {validationErrors.BloodPressure && <p className='text-red-500'>{validationErrors.BloodPressure}</p>}
            </div>
            <div>
              <label className='font-bold text-gray-700'>Skin Thickness:</label>
              <input
                type='number'
                name='SkinThickness'
                value={formData.SkinThickness}
                onChange={handleChange}
                className={`mt-1 p-2 border w-full rounded-lg ${validationErrors.SkinThickness ? "border-red-500" : "border-gray-300"}`}
              />
              {validationErrors.SkinThickness && <p className='text-red-500'>{validationErrors.SkinThickness}</p>}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='font-bold text-gray-700'>Insulin:</label>
              <input
                type='number'
                name='Insulin'
                value={formData.Insulin}
                onChange={handleChange}
                className={`mt-1 p-2 border w-full rounded-lg ${validationErrors.Insulin ? "border-red-500" : "border-gray-300"}`}
              />
              {validationErrors.Insulin && <p className='text-red-500'>{validationErrors.Insulin}</p>}
            </div>
            <div>
              <label className='font-bold text-gray-700'>BMI:</label>
              <input
                type='number'
                name='BMI'
                value={formData.BMI}
                onChange={handleChange}
                className={`mt-1 p-2 border w-full rounded-lg ${validationErrors.BMI ? "border-red-500" : "border-gray-300"}`}
              />
              {validationErrors.BMI && <p className='text-red-500'>{validationErrors.BMI}</p>}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='font-bold text-gray-700'>Diabetes Pedigree Function:</label>
              <input
                type='number'
                name='DiabetesPedigreeFunction'
                value={formData.DiabetesPedigreeFunction}
                step='0.01'
                onChange={handleChange}
                className={`mt-1 p-2 border w-full rounded-lg ${validationErrors.DiabetesPedigreeFunction ? "border-red-500" : "border-gray-300"}`}
              />
              {validationErrors.DiabetesPedigreeFunction && <p className='text-red-500'>{validationErrors.DiabetesPedigreeFunction}</p>}
            </div>
            <div>
              <label className='font-bold text-gray-700'>Age:</label>
              <input
                type='number'
                name='Age'
                value={formData.Age}
                onChange={handleChange}
                className={`mt-1 p-2 border w-full rounded-lg ${validationErrors.Age ? "border-red-500" : "border-gray-300"}`}
              />
              {validationErrors.Age && <p className='text-red-500'>{validationErrors.Age}</p>}
            </div>
          </div>
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg w-full'>
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {error && <p className='text-red-500 mt-4'>{error}</p>}
      </div>
    </div>
  );
};

export default Model2;
