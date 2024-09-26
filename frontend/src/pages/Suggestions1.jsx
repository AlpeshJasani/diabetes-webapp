import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Suggestions1 = () => {
  const location = useLocation();
  const { formData, prediction } = location.state || {}; // Fallback if no state is passed

  if (!formData) {
    return <p>No form data available. Please submit the form again.</p>;
  }

  const generateSuggestions = (formData) => {
    let suggestions = [];
    
    // Add suggestion logic based on formData here...
    // Example suggestion logic:
    if (formData.age >= 60) {
      suggestions.push("Regular diabetes screening is essential at your age. Maintain a healthy diet and monitor your blood sugar levels.");
    } else if (formData.age >= 41 && formData.age <= 60) {
      suggestions.push("Focus on weight management, balanced nutrition, and regular health check-ups.");
    } else {
      suggestions.push("Maintain a healthy lifestyle through balanced nutrition and regular exercise.");
    }

    // Gender-based suggestion
    if (formData.gender === 'Male') {
      suggestions.push("Focus on weight control, heart health, and routine screenings.");
    } else if (formData.gender === 'Female') {
      suggestions.push("Consider monitoring hormone levels and maintaining heart health, especially post-menopause.");
    }

    // BMI calculation and suggestion
    const bmi = (formData.weight / ((formData.height / 100) ** 2)).toFixed(1);
    if (bmi < 18.5) {
      suggestions.push("You are underweight. Consider a balanced diet rich in nutrients and consult a nutritionist.");
    } else if (bmi >= 18.5 && bmi < 24.9) {
      suggestions.push("Your weight is in the normal range. Keep up with your current healthy habits.");
    } else if (bmi >= 25 && bmi < 29.9) {
      suggestions.push("You are overweight. Consider moderate exercise and healthier eating habits.");
    } else {
      suggestions.push("You are obese. A more intensive lifestyle change and regular medical consultation is advised.");
    }

    // Physical Intensity of Work
    if (formData.workIntensity === 'Very physically intensive') {
      suggestions.push("Ensure adequate hydration and a balanced diet to support physical activity.");
    } else if (formData.workIntensity === 'Not physically intensive') {
      suggestions.push("Add regular physical activity to your routine to counter sedentary habits.");
    }

    // Exercise Frequency
    if (formData.exerciseFrequency === 'Daily') {
      suggestions.push("Great job maintaining daily exercise! Consider varying your workouts to avoid burnout.");
    } else if (formData.exerciseFrequency === 'Rarely' || formData.exerciseFrequency === 'Never') {
      suggestions.push("Consider starting a light exercise routine, such as walking, to improve your overall health.");
    }

    // Type of Physical Activity
    if (formData.physicalActivity === 'None') {
      suggestions.push("Engage in some form of physical activity to improve cardiovascular health.");
    }

    // Fast Food Consumption
    if (formData.fastFoodFrequency === 'Daily') {
      suggestions.push("Reduce fast food consumption and opt for home-cooked meals to improve health.");
    }

    // Sugary Food Consumption
    if (formData.sugaryFoodFrequency === 'Daily' || formData.sugaryFoodFrequency === 'Frequently') {
      suggestions.push("Reduce your intake of sugary foods to prevent weight gain and control blood sugar.");
    }

    // Sugary Drink Consumption
    if (formData.sugaryDrinkFrequency === 'Daily' || formData.sugaryDrinkFrequency === 'Frequently') {
      suggestions.push("Replace sugary drinks with water or sugar-free beverages to maintain healthy blood sugar levels.");
    }

    // Smoking Habits
    if (formData.smoking === 'Yes') {
      suggestions.push("Consider quitting smoking as it increases the risk of various diseases, including diabetes.");
    }

    // Alcohol Consumption
    if (formData.alcohol === 'Frequently' || formData.alcohol === 'Daily') {
      suggestions.push("Reduce alcohol consumption to improve liver function and prevent blood sugar spikes.");
    }

    // Sleep Duration
    // Sleep Duration
    if (formData.sleepDuration === "Less than 4 hours" || formData.sleepDuration === "4-5 hours") {
      suggestions.push("Aim for 7-8 hours of sleep to promote better physical and mental health.");
    } else if (formData.sleepDuration === "6-7 hours" || formData.sleepDuration === "8-9 hours") {
      suggestions.push("Your sleep duration is ideal. Keep maintaining this balanced sleep schedule.");
    } else if (formData.sleepDuration === "More than 9 hours") {
      suggestions.push("Excessive sleep can indicate underlying health issues. Try maintaining a balanced sleep schedule.");
    }


    // Sleep Quality
    if (formData.sleepQuality === 'Very Poor' || formData.sleepQuality === 'Poor') {
      suggestions.push("Consider improving your sleep hygiene by reducing screen time before bed and setting a regular sleep schedule.");
    }

    // Stress Levels
    if (formData.stressLevels === 'High') {
      suggestions.push("Incorporate stress-reduction techniques like meditation, yoga, or deep breathing into your daily routine.");
    }

    // Family History of Diabetes
    if (formData.familyHistory === 1) {
      suggestions.push("You have a moderate risk of developing diabetes. Regular screening is recommended.");
    } else if (formData.familyHistory > 1) {
      suggestions.push("Your family history increases your risk of diabetes. Strict lifestyle management is recommended.");
    }

    // Other Medical Conditions
    if (formData.otherMedicalConditions.includes('High cholesterol')) {
      suggestions.push("Monitor your cholesterol levels and adopt a heart-healthy diet.");
    }
    if (formData.otherMedicalConditions.includes('Cardiovascular diseases')) {
      suggestions.push("Monitor your heart health regularly and avoid smoking and excess alcohol.");
    }
    if (formData.otherMedicalConditions.includes('Thyroid disorders')) {
      suggestions.push("Regularly monitor your thyroid levels and follow your doctor's advice on medication.");
    }

    // Symptoms Assessment
    if (formData.symptoms.includes('Frequent urination') || formData.symptoms.includes('Excessive thirst')) {
      suggestions.push("You are showing potential signs of diabetes. Consider seeing a doctor for further evaluation.");
    }
    return suggestions;
  };

  const userSuggestions = generateSuggestions(formData);
  const [showAll, setShowAll] = useState(false);
  const displayedSuggestions = showAll ? userSuggestions : userSuggestions.slice(0, 4);

  const handleToggleSuggestions = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      
      {prediction !== null && (
        <div
          className={`w-full max-w-3xl mt-4 p-6 border-4 rounded-lg shadow-lg ${
            prediction > 50
              ? 'border-red-500 bg-red-100'
              : 'border-green-500 bg-green-100'
          }`}
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Prediction Result
          </h2>
          <p
            className={`text-5xl font-bold text-center ${
              prediction > 50 ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {prediction}
          </p>
          <p className="text-lg text-center mt-4 text-gray-700">
            {prediction > 50
              ? 'High risk detected. Take immediate action to manage your health.'
              : 'You are in a safer range, but continuous care is important.'}
          </p>
        </div>
      )}
  
      <div className="max-w-4xl w-full mt-6 p-8 bg-white rounded-lg shadow-lg">
        {/* Highlight Box */}
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6">
          <p className="font-semibold text-blue-700 text-lg text-center">
            Suggestions to Improve Diabetes Health
          </p>
        </div>
  
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
          Your Personalized Suggestions
        </h1>
  
        <ul className="list-disc list-inside space-y-4">
          {displayedSuggestions.length === 0 ? (
            <li className="text-lg text-gray-700 italic">No suggestions available at this time.</li>
          ) : (
            displayedSuggestions.map((suggestion, index) => (
              <li key={index} className="text-lg text-gray-700">
                <span className="font-bold text-gray-900">Suggestion {index + 1}:</span> {suggestion}
              </li>
            ))
          )}
        </ul>
  
        {/* Toggle Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleToggleSuggestions}
            className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {showAll ? 'Show Less Suggestions' : 'Show More Suggestions'}
          </button>
        </div>
      </div>
  
      <div className="w-full max-w-4xl mt-6">
        <div className="bg-blue-50 border-t-4 border-blue-500 p-6 rounded-lg shadow-lg flex items-center">
          <div className="text-blue-500 text-4xl mr-4">
            <i className="fas fa-stethoscope"></i>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Next Steps</h3>
            <p className="text-lg text-gray-600 mt-2">
              It's recommended to consult your healthcare provider and schedule a health check-up. Keep monitoring
              your health to stay proactive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Suggestions1;

// Old return block
// return (
//   <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">

//     {prediction !== null && (
//       <div
//         className={` w-full mt-4 p-6 border-4 rounded-lg ${
//           prediction > 50
//             ? 'border-red-500 bg-red-100'
//             : 'border-green-500 bg-green-100'
//         }`}
//       >
//         <h2 className="text-xl font-bold underline text-center">Prediction Result:</h2>
//         <p
//           className={`text-3xl font-bold text-center ${
//             prediction > 50 ? 'text-red-600' : 'text-green-600'
//           }`}
//         >
//           {prediction}
//         </p>
//       </div>
//     )}

//     <div className="items-center max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg mt-4">
//       {/* Highlight Box */}
//       <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6">
//         <p className="font-semibold text-blue-700 text-lg text-center">
//           Suggestions to Improve Diabetes Health
//         </p>
//       </div>

//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Your Personalized Suggestions</h1>

//       <ul className="list-disc list-inside space-y-4">
//         {displayedSuggestions.length === 0 ? (
//           <li className="text-lg text-gray-700 italic">No suggestions available at this time.</li>
//         ) : (
//           displayedSuggestions.map((suggestion, index) => (
//             <li key={index} className="text-lg text-gray-700">
//               <span className="font-bold text-gray-900">Suggestion {index + 1}:</span> {suggestion}
//             </li>
//           ))
//         )}
//       </ul>

//       {/* Toggle Button */}
//       <br />
//       <div className="mt-6 text-center">
//         <button
//           onClick={handleToggleSuggestions}
//           className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
//         >
//           {showAll ? 'Show Less' : 'Show More Suggestions'}
//         </button>
//       </div>
//     </div>
//   </div>
// );