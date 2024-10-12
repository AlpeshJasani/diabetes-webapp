import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Mappings for binary and ordinal values
const binary_mappings = {
  gender: { Male: 0, Female: 1 },
  smoking_habits: { Yes: 1, No: 0 },
  alcohol_consumption: { Never: 0, Rarely: 1, Occasionally: 2, Frequently: 3, Daily: 4 },
  high_blood_pressure: { Yes: 1, No: 0 },
  diabetes_status: { Yes: 1, No: 0 },
};

const ordinal_mappings = {
  sleep_duration: { "Less than 4 hours": 0, "4-5 hours": 1, "6-7 hours": 2, "More than 9 hours": 3 },
  age: { "20-25": 0, "25-30": 1, "30-35": 2, "35-40": 3, "40-45": 4, "45-50": 5, "50-55": 6, "55-60": 7, "60-65": 8, "65+": 9 },
  physical_intensity_work: {
    "Not physically intensive": 0,
    "Lightly physically intensive": 1,
    "Moderately physically intensive": 2,
    "Very physically intensive": 3,
  },
  physical_exercise_frequency: { Never: 0, Rarely: 1, Monthly: 2, Weekly: 3, Daily: 4 },
  fast_food_frequency: { Rarely: 0, Occasionally: 1, Frequently: 2, Daily: 3 },
  sugary_food_frequency: { Rarely: 0, Occasionally: 1, Frequently: 2, Daily: 3 },
  sugary_drink_frequency: { Rarely: 0, Occasionally: 1, Frequently: 2, Daily: 3 },
  sleep_quality: { "Very Poor (Very inconsistent)": 0, "Poor (Inconsistent)": 1, "Good (Somewhat consistent)": 2, "Excellent (Very consistent)": 3 },
  stress_levels: { Low: 0, Medium: 1, High: 2 },
};

// Function to encode user data
const encodeUserData = (userData) => {
  // Age categorization
  let ageCategory;
  const age = parseInt(userData.age);
  if (age < 25) ageCategory = "20-25";
  else if (age < 30) ageCategory = "25-30";
  else if (age < 35) ageCategory = "30-35";
  else if (age < 40) ageCategory = "35-40";
  else if (age < 45) ageCategory = "40-45";
  else if (age < 50) ageCategory = "45-50";
  else if (age < 55) ageCategory = "50-55";
  else if (age < 60) ageCategory = "55-60";
  else if (age < 65) ageCategory = "60-65";
  else ageCategory = "65+";

  // BMI calculation
  const height = parseInt(userData.height);
  const weight = parseInt(userData.weight);
  const bmi = weight / (height / 100) ** 2;

  // BMI categories
  const bmi_bins = [0, 18.5, 24.9, 29.9, 34.9, 39.9, Infinity];
  const weightStatusLabels = ["Underweight", "Normal weight", "Overweight", "Obesity class I", "Obesity class II", "Obesity class III"];
  const weightStatus = bmi_bins.findIndex((bin, index) => bmi >= bin && (index === bmi_bins.length - 1 || bmi < bmi_bins[index + 1]));

  // Count sleep issues, symptoms, and other conditions
  const sleepIssuesCount = userData.sleepIssues.includes("None") ? 0 : userData.sleepIssues.length;
  const symptomsCount = userData.symptoms.includes("None") ? 0 : userData.symptoms.length;
  const otherConditionsCount = userData.otherMedicalConditions.includes("None") ? 0 : userData.otherMedicalConditions.length;

  // Prepare encoding array
  const encodingArray = [
    ordinal_mappings.age[ageCategory],
    binary_mappings.gender[userData.gender],
    weightStatus,
    ordinal_mappings.physical_intensity_work[userData.workIntensity],
    ordinal_mappings.physical_exercise_frequency[userData.exerciseFrequency],
    ordinal_mappings.fast_food_frequency[userData.fastFoodFrequency],
    ordinal_mappings.sugary_food_frequency[userData.sugaryFoodFrequency],
    ordinal_mappings.sugary_drink_frequency[userData.sugaryDrinkFrequency],
    binary_mappings.smoking_habits[userData.smoking],
    binary_mappings.alcohol_consumption[userData.alcohol],
    ordinal_mappings.sleep_duration[userData.sleepDuration],
    ordinal_mappings.sleep_quality[userData.sleepQuality],
    sleepIssuesCount,
    ordinal_mappings.stress_levels[userData.stressLevels],
    binary_mappings.high_blood_pressure[userData.highBloodPressure],
    parseInt(userData.familyHistory),
    ...["Gym", "None", "Running", "Sports", "Walking"].map((activity) => (userData.physicalActivity.includes(activity) ? 1 : 0)),
    otherConditionsCount,
    symptomsCount,
  ];

  return encodingArray;
};

const Model1 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [email, setEmail] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState({
    // email: "",
    age: "75",
    gender: "Male",
    height: "174",
    weight: "80",
    workIntensity: "Not physically intensive",
    exerciseFrequency: "Never",
    physicalActivity: ["Other"],
    fastFoodFrequency: "Daily",
    sugaryFoodFrequency: "Daily",
    sugaryDrinkFrequency: "Daily",
    smoking: "Yes",
    alcohol: "Daily",
    sleepDuration: "Less than 4 hours",
    sleepQuality: "Very Poor (Very inconsistent)",
    sleepIssues: ["Difficulty falling asleep"],
    stressLevels: "High",
    highBloodPressure: "Yes",
    symptoms: ["None"],
    familyHistory: "3",
    otherMedicalConditions: ["High cholesterol"],
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("authEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (["physicalActivity", "sleepIssues", "symptoms", "otherMedicalConditions"].includes(name)) {
      let updatedValues;

      if (value === "None") {
        // If "None" is selected, clear other selections
        updatedValues = checked ? ["None"] : [];
      } else {
        // If any other option is selected, unselect "None"
        updatedValues = checked ? formData[name].filter((item) => item !== "None").concat(value) : formData[name].filter((item) => item !== value);
      }

      setFormData({ ...formData, [name]: updatedValues });
    } else if (type === "checkbox") {
      // General checkbox handling for other fields
      const newValues = checked ? [...formData[name], value] : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: newValues });
    } else {
      // General handling for other input types
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const errors = {};

    // Parse the numeric fields to make sure comparisons work correctly
    const age = parseFloat(formData.age);
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);
    const familyHistory = parseInt(formData.familyHistory, 10);

    // Age validation: between 1 and 120
    if (isNaN(age) || age <= 0 || age > 120) {
      errors.age = "Age must be between 1 and 120.";
    }

    // Height validation: between 50 and 250 cm
    if (isNaN(height) || height <= 50 || height > 250) {
      errors.height = "Height must be between 50 and 250 cm.";
    }

    // Weight validation: between 1 and 300 kg
    if (isNaN(weight) || weight <= 0 || weight > 300) {
      errors.weight = "Weight must be between 1 and 300 kg.";
    }

    // Family history validation: must be a non-negative integer
    if (isNaN(familyHistory) || familyHistory < 0) {
      errors.familyHistory = "Family History of Diabetes must be a non-negative number.";
    }
    // console.log(errors);
    // Update state with validation errors
    setValidationErrors(errors);

    // Return true if no validation errors exist
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop if form is invalid
    }

    setLoading(true);
    setError(null);

    const encodingArray = encodeUserData(formData);
    console.log("Encoded data:", encodingArray); // Log encoded data for debugging

    try {
      // const response = await axios.post("http://localhost:5000/api/predict/model1", { ...encodingArray, email, features: formData });
      const response = await axios.post("https://diabetes-webapp.onrender.com/api/predict/model1", { ...encodingArray, email, features: formData });

      // console.log('Response:', response);
      const outcome = response.data.outcome;
      setPrediction(outcome);

      navigate("/Suggestions1", { state: { formData, prediction: outcome } }); // use actual outcome
    } catch (err) {
      // console.error('Error in prediction:', err);
      setError("Error in prediction. Please try again.");
    } finally {
      setLoading(false); // Ensure loading state is reset after try/catch
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold mb-6'>Diabetes Risk Assessment</h1>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          {/* <div className="mb-4">
            <label className="font-bold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 p-2 border border-gray-300 w-full rounded-lg"
              value={formData.email}
              onChange={handleChange}
              // required
            />
          </div> */}

          {/* Age and Gender */}
          <div className='mb-4 grid grid-cols-2 gap-4'>
            <div>
              <label className='font-bold text-gray-700'>Age *</label>
              <input
                type='number'
                name='age'
                className={`mt-1 p-2 border w-full rounded-lg ${validationErrors.age ? "border-red-500" : "border-gray-300"}`}
                value={formData.age}
                onChange={handleChange}
                required
              />
              {validationErrors.age && <p className='text-red-500'>{validationErrors.age}</p>}
            </div>
            <div>
              <label className=' font-bold block text-gray-700'>Gender *</label>
              <select name='gender' className='mt-1 p-2 border border-gray-300 w-full rounded-lg' value={formData.gender} onChange={handleChange} required>
                <option value=''>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>
          </div>

          {/* Height and Weight */}
          <div className='mb-6 grid grid-cols-2 gap-4'>
            <div>
              <label className='font-bold text-gray-700'>Height (cm) *</label>
              <input
                type='number'
                name='height'
                className={`mt-1 p-2 border w-full rounded-lg ${validationErrors.height ? "border-red-500" : "border-gray-300"}`}
                value={formData.height}
                onChange={handleChange}
                required
              />
              {validationErrors.height && <p className='text-red-500'>{validationErrors.height}</p>}
            </div>
            <div>
              <label className='font-bold text-gray-700'>Weight (kg) *</label>
              <input
                type='number'
                name='weight'
                className={`mt-1 p-2 border w-full rounded-lg ${validationErrors.weight ? "border-red-500" : "border-gray-300"}`}
                value={formData.weight}
                onChange={handleChange}
                required
              />
              {validationErrors.weight && <p className='text-red-500'>{validationErrors.weight}</p>}
            </div>
          </div>

          {/* Work Intensity */}
          <div className='mb-6'>
            <label className='font-bold text-gray-700'>Physical Intensity of Professional Work *</label>
            <select
              name='workIntensity'
              className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
              value={formData.workIntensity}
              onChange={handleChange}
              required
            >
              <option value=''>Select Intensity</option>
              <option value='Very physically intensive'>Very physically intensive</option>
              <option value='Moderately physically intensive'>Moderately physically intensive</option>
              <option value='Lightly physically intensive'>Lightly physically intensive</option>
              <option value='Not physically intensive'>Not physically intensive</option>
            </select>
          </div>

          {/* Exercise Frequency */}
          <div className='mb-6'>
            <label className='font-bold text-gray-700'>Frequency of Physical Exercise *</label>
            <select
              name='exerciseFrequency'
              className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
              value={formData.exerciseFrequency}
              onChange={handleChange}
              required
            >
              <option value=''>Select Frequency</option>
              <option value='Daily'>Daily</option>
              <option value='Weekly'>Weekly</option>
              <option value='Monthly'>Monthly</option>
              <option value='Rarely'>Rarely</option>
              <option value='Never'>Never</option>
            </select>
          </div>

          {/* Physical Activity */}
          <div className='mb-6'>
            <label className='font-bold text-gray-700'>Type of Physical Activity *</label>
            <div className='mt-2'>
              {["Walking", "Sports", "Running", "Gym", "Other", "None"].map((activity) => (
                <label key={activity} className='inline-flex items-center ml-6'>
                  <input
                    type='checkbox'
                    name='physicalActivity'
                    value={activity}
                    checked={formData.physicalActivity.includes(activity)}
                    onChange={handleChange}
                    className='form-checkbox'
                  />
                  <span className='ml-2'>{activity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fast Food Frequency */}
          <div className='mb-6'>
            <label className='font-bold text-gray-700'>Frequency of Fast Food or Processed Food Consumption *</label>
            <select
              name='fastFoodFrequency'
              className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
              value={formData.fastFoodFrequency}
              onChange={handleChange}
              required
            >
              <option value=''>Select Frequency</option>
              <option value='Rarely'>Rarely</option>
              <option value='Occasionally'>Occasionally</option>
              <option value='Frequently'>Frequently</option>
              <option value='Daily'>Daily</option>
            </select>
          </div>

          <div>
            {/* Frequency of Sugary Food Consumption */}
            <div className=' mb-6'>
              <label className='block font-bold'>Frequency of Sugary Food Consumption *</label>
              <select
                name='sugaryFoodFrequency'
                value={formData.sugaryFoodFrequency}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-lg'
                required
              >
                <option value=''>Select Frequency</option>
                <option value='Rarely'>Rarely</option>
                <option value='Occasionally'>Occasionally</option>
                <option value='Frequently'>Frequently</option>
                <option value='Daily'>Daily</option>
              </select>
            </div>

            {/* Frequency of Sugary Drink Consumption */}
            <div className=' mb-6'>
              <label className='block font-bold'>Frequency of Sugary Drink Consumption *</label>
              <select
                name='sugaryDrinkFrequency'
                value={formData.sugaryDrinkFrequency}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-lg'
                required
              >
                <option value=''>Select Frequency</option>
                <option value='Rarely'>Rarely</option>
                <option value='Occasionally'>Occasionally</option>
                <option value='Frequently'>Frequently</option>
                <option value='Daily'>Daily</option>
              </select>
            </div>

            {/* Current Smoking Habits */}
            <div className='mb-6'>
              <label className='block font-bold'>Current Smoking Habits *</label>
              <select name='smoking' value={formData.smoking} onChange={handleChange} className='w-full px-3 py-2 border rounded-lg' required>
                <option value=''>Select</option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </select>
            </div>

            {/* Current Alcohol Consumption */}
            <div className='mb-6'>
              <label className='block font-bold'>Current Alcohol Consumption *</label>
              <select name='alcohol' value={formData.alcohol} onChange={handleChange} className='w-full px-3 py-2 border rounded-lg' required>
                <option value=''>Select Frequency</option>
                <option value='Never'>Never</option>
                <option value='Rarely'>Rarely</option>
                <option value='Occasionally'>Occasionally</option>
                <option value='Frequently'>Frequently</option>
                <option value='Daily'>Daily</option>
              </select>
            </div>

            {/* Average Sleep Duration */}
            <div className=' mb-6'>
              <label className='block font-bold'>Average Sleep Duration *</label>
              <select name='sleepDuration' value={formData.sleepDuration} onChange={handleChange} className='w-full px-3 py-2 border rounded-lg' required>
                <option value=''>Select Duration</option>
                <option value='Less than 4 hours'>Less than 4 hours</option>
                <option value='4-5 hours'>4-5 hours</option>
                <option value='6-7 hours'>6-7 hours</option>
                <option value='8-9 hours'>8-9 hours</option>
                <option value='More than 9 hours'>More than 9 hours</option>
              </select>
            </div>

            {/* Sleep Quality (Consistency) */}
            <div className=' mb-6'>
              <label className='block font-bold'>Sleep Quality (Consistency) *</label>
              <select name='sleepQuality' value={formData.sleepQuality} onChange={handleChange} className='w-full px-3 py-2 border rounded-lg' required>
                <option value='Very Poor (Very inconsistent)'>Very Poor (Very inconsistent)</option>
                <option value='Poor (Inconsistent)'>Poor (Inconsistent)</option>
                <option value='Good (Somewhat consistent)'>Good (Somewhat consistent)</option>
                <option value='Excellent (Very consistent)'>Excellent (Very consistent)</option>
              </select>
            </div>

            {/* Sleep Issues */}
            <div className='mb-6'>
              <label className=' mb-3 block font-bold '>Sleep Issues (Select all that apply) *</label>
              <div className='grid grid-cols-2 gap-4 ml-6 '>
                {" "}
                {/* grid with 2 columns and some gap between items */}
                {[
                  "Difficulty falling asleep",
                  "Frequent waking during the night",
                  "Early morning awakenings",
                  "Trouble staying asleep",
                  "Unrefreshing sleep",
                  "None",
                ].map((issue) => (
                  <label key={issue} className='flex items-center'>
                    <input
                      type='checkbox'
                      name='sleepIssues'
                      value={issue}
                      checked={formData.sleepIssues.includes(issue)}
                      onChange={handleChange}
                      className='mr-4'
                    />
                    <span className='ml-2'>{issue}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stress Levels */}
            <div className='mb-6'>
              <label className='font-bold text-gray-700'>Overall Stress Levels *</label>
              <select
                name='stressLevels'
                className='mt-1 p-2 border border-gray-300 w-full rounded-lg'
                value={formData.stressLevels}
                onChange={handleChange}
                required
              >
                <option value=''>Select Stress Level</option>
                <option value='Low'>Low</option>
                <option value='Medium'>Medium</option>
                <option value='High'>High</option>
              </select>
            </div>

            {/* Diagnosed with High Blood Pressure */}
            <div className=' mb-6'>
              <label className='block font-bold'>Diagnosed with High Blood Pressure? *</label>
              <select
                name='highBloodPressure'
                value={formData.highBloodPressure}
                onChange={handleChange}
                className='w-full px-3 py-2 border rounded-lg'
                required
              >
                <option value=''>Select</option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </select>
            </div>
          </div>

          {/* Symptoms */}
          <div className='mb-6'>
            <label className='font-bold text-gray-700'>Symptoms Assessment *</label>
            <div className='mt-2'>
              {[
                "Frequent urination",
                "Excessive thirst",
                "Unexplained weight loss",
                "Fatigue",
                "Blurred vision",
                "Slow-healing wounds",
                "Tingling or numbness",
                "None",
              ].map((symptom) => (
                <label key={symptom} className='inline-flex items-center ml-6'>
                  <input
                    type='checkbox'
                    name='symptoms'
                    value={symptom}
                    checked={formData.symptoms.includes(symptom)}
                    onChange={handleChange}
                    className='form-checkbox'
                  />
                  <span className='ml-2'>{symptom}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Family History of Diabetes */}
          <div className=' mb-6'>
            <label className='block font-bold'>Family History of Diabetes (How many family members have or had diabetes?) *</label>
            <input
              type='number'
              name='familyHistory'
              value={formData.familyHistory}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${validationErrors.familyHistory ? "border-red-500" : "border-gray-300"}`}
              required
              placeholder='Enter a number'
            />
            {validationErrors.familyHistory && <p className='text-red-500'>{validationErrors.familyHistory}</p>}
          </div>

          <div className='mb-6'>
            <label className='block font-bold'>Other Medical Conditions (Select all that apply) *</label>
            <div className='flex flex-wrap'>
              {["High cholesterol", "Cardiovascular diseases", "Thyroid disorders", "None"].map((condition) => (
                <label key={condition} className='finline-flex items-center ml-6'>
                  <input
                    type='checkbox'
                    name='otherMedicalConditions'
                    value={condition}
                    checked={formData.otherMedicalConditions?.includes(condition)}
                    onChange={handleChange}
                    className=' mr-8'
                  />
                  <span className='ml-2'>{condition}</span>
                </label>
              ))}
            </div>
          </div>
          <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-lg w-full'>
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Model1;
