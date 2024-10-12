import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Suggestions2 = () => {
    const location = useLocation();
    const { formData, prediction } = location.state || {}; // Fallback if no state is passed

    console.log(prediction); // This will log in the console

    if (!formData) {
        return <p>No form data available. Please submit the form again.</p>;
    }

    const generateSuggestions = (formData) => {
        const suggestions = [];

        // Pregnancies
        if (formData.Pregnancies > 5) {
            suggestions.push(
                "Multiple pregnancies increase the risk of gestational diabetes. Regular screening is recommended."
            );
        }

        // Glucose Levels
        if (formData.Glucose < 70) {
            suggestions.push(
                "Your glucose levels are low, which may lead to hypoglycemia. Consider consulting a healthcare professional."
            );
        } else if (formData.Glucose >= 70 && formData.Glucose < 100) {
            suggestions.push(
                "Your glucose levels are in the normal range. Maintain a balanced diet to support healthy glucose levels."
            );
        } else if (formData.Glucose >= 100 && formData.Glucose < 126) {
            suggestions.push(
                "You have borderline high glucose levels. Regular physical activity and a low-sugar diet may help."
            );
        } else if (formData.Glucose >= 126) {
            suggestions.push(
                "High glucose levels could indicate diabetes. Consult with a healthcare provider for further evaluation."
            );
        }

        // Blood Pressure
        if (formData.BloodPressure < 90) {
            suggestions.push("Your blood pressure is quite low. Consider increasing salt intake and staying hydrated.");
        } else if (formData.BloodPressure >= 90 && formData.BloodPressure <= 120) {
            suggestions.push(
                "Your blood pressure is in the healthy range. Keep up the good work with regular physical activity."
            );
        } else if (formData.BloodPressure > 120 && formData.BloodPressure <= 140) {
            suggestions.push(
                "Your blood pressure is slightly elevated. Reducing sodium intake and managing stress may help."
            );
        } else if (formData.BloodPressure > 140) {
            suggestions.push(
                "Your blood pressure is high. It's advisable to consult a doctor and consider lifestyle changes."
            );
        }

        // Skin Thickness
        if (formData.SkinThickness < 10) {
            suggestions.push(
                "Low skin thickness measurement could indicate a lack of subcutaneous fat. Consider improving your diet."
            );
        } else if (formData.SkinThickness >= 10 && formData.SkinThickness < 40) {
            suggestions.push("Skin thickness is within a normal range.");
        } else if (formData.SkinThickness >= 40) {
            suggestions.push(
                "High skin thickness may suggest increased body fat. Monitoring your diet and exercise could help."
            );
        }

        // Insulin Levels
        if (formData.Insulin < 16) {
            suggestions.push(
                "Low insulin levels could suggest an issue with insulin production. Consult with a healthcare provider."
            );
        } else if (formData.Insulin >= 16 && formData.Insulin < 166) {
            suggestions.push(
                "Insulin levels are within a healthy range. Maintain a balanced diet to support healthy insulin function."
            );
        } else if (formData.Insulin >= 166) {
            suggestions.push(
                "High insulin levels could indicate insulin resistance or diabetes. Consider further medical evaluation."
            );
        }

        // BMI (Body Mass Index)
        if (formData.BMI < 18.5) {
            suggestions.push(
                "Your BMI indicates you are underweight. A balanced diet rich in nutrients is recommended."
            );
        } else if (formData.BMI >= 18.5 && formData.BMI <= 24.9) {
            suggestions.push(
                "Your BMI is within the normal range. Keep up with regular physical activity and a balanced diet."
            );
        } else if (formData.BMI >= 25 && formData.BMI <= 29.9) {
            suggestions.push(
                "You are in the overweight range. Consider increasing physical activity and watching your caloric intake."
            );
        } else if (formData.BMI >= 30) {
            suggestions.push(
                "Your BMI is in the obese range. A healthcare provider can help create a weight management plan."
            );
        }

        // Diabetes Pedigree Function
        if (formData.DiabetesPedigreeFunction < 0.5) {
            suggestions.push(
                "Your family history indicates a lower risk of diabetes. Continue maintaining a healthy lifestyle."
            );
        } else if (formData.DiabetesPedigreeFunction >= 0.5) {
            suggestions.push(
                "Your family history suggests a higher risk of diabetes. Regular monitoring and a healthy lifestyle are essential."
            );
        }

        // Age
        if (formData.Age < 35) {
            suggestions.push(
                "At your age, focusing on preventive measures like regular exercise and a balanced diet can significantly reduce health risks."
            );
        } else if (formData.Age >= 35 && formData.Age <= 50) {
            suggestions.push(
                "This is a critical time to monitor health markers. Regular checkups and a healthy lifestyle can help prevent long-term health issues."
            );
        } else if (formData.Age > 50) {
            suggestions.push(
                "As you age, regular health screenings, a balanced diet, and maintaining an active lifestyle are crucial."
            );
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
        <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4'>
            {/* Display the prediction result if available */}
            {prediction !== null && (
                <div
                    className={`w-full max-w-3xl mt-4 p-6 border-4 rounded-lg shadow-lg ${
                        prediction ? "border-red-500 bg-red-100" : "border-green-500 bg-green-100"
                    }`}
                >
                    <h2 className='text-2xl font-bold text-center text-gray-800 mb-4'>Prediction Result</h2>
                    <p className={`text-5xl font-bold text-center ${prediction ? "text-red-600" : "text-green-600"}`}>
                        {prediction ? "Positive for Diabetes" : "Negative for Diabetes"}
                    </p>
                    <p className='text-lg text-center mt-4 text-gray-700'>
                        {prediction
                            ? "Diabetes risk detected. Please follow the suggestions below for better health management."
                            : "No significant risk detected, but it’s important to maintain a healthy lifestyle."}
                    </p>
                </div>
            )}

            <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
                <div className='max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg'>
                    {/* Highlight Box */}
                    <div className='bg-blue-100 border-l-4 border-blue-500 p-4 mb-6'>
                        <p className='font-semibold text-blue-700 text-lg text-center'>
                            Suggestions to Improve Diabetes Health
                        </p>
                    </div>

                    <h1 className='text-4xl font-bold mb-6 text-center text-blue-600'>Your Personalized Suggestions</h1>

                    <ul className='list-disc list-inside space-y-4'>
                        {displayedSuggestions.length === 0 ? (
                            <li className='text-lg text-gray-700 italic'>No suggestions available at this time.</li>
                        ) : (
                            displayedSuggestions.map((suggestion, index) => (
                                <li key={index} className='text-lg text-gray-700'>
                                    <span className='font-bold text-gray-900'>Suggestion {index + 1}:</span>{" "}
                                    {suggestion}
                                </li>
                            ))
                        )}
                    </ul>

                    {/* Toggle Button */}
                    <div className='mt-8 text-center'>
                        <button
                            onClick={handleToggleSuggestions}
                            className='bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200'
                        >
                            {showAll ? "Show Less Suggestions" : "Show More Suggestions"}
                        </button>
                    </div>
                </div>

                {/* <div className="w-full max-w-4xl mt-6">
          <div className="bg-blue-50 border-t-4 border-blue-500 p-6 rounded-lg shadow-lg flex items-center">
            <div className="text-blue-500 text-4xl mr-4">
              <i className="fas fa-heartbeat"></i>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">Next Steps</h3>
              <p className="text-lg text-gray-600 mt-2">
                Follow up with your healthcare provider to further assess your health. Regular monitoring and preventive care are essential.
              </p>
            </div>
          </div>
        </div> */}
            </div>
        </div>
    );
};

export default Suggestions2;

// Old return block
// return (
//   <>
//     {/* Display the prediction result if available */}
//     {prediction !== null && (
//   <div
//     className={`mt-4 p-6 border-4 rounded-lg ${
//       prediction
//         ? 'border-red-500 bg-red-100'
//         : 'border-green-500 bg-green-100'
//     }`}
//   >
//     <h2 className="text-xl font-bold underline text-center">Prediction Result:</h2>
//     <p
//       className={`text-3xl font-bold text-center ${
//         prediction ? 'text-red-600' : 'text-green-600'
//       }`}
//     >
//       {prediction ? 'Positive for Diabetes' : 'Negative for Diabetes'}
//     </p>
//   </div>
// )}

//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg">
//         <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6">
//           <p className="font-semibold text-blue-700 text-lg text-center">
//             Suggestions to Improve Diabetes Health
//           </p>
//         </div>

//         <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Your Personalized Suggestions</h1>

//         <ul className="list-disc list-inside space-y-4">
//           {displayedSuggestions.length === 0 ? (
//             <li className="text-lg text-gray-700 italic">No suggestions available at this time.</li>
//           ) : (
//             displayedSuggestions.map((suggestion, index) => (
//               <li key={index} className="text-lg text-gray-700">
//                 <span className="font-bold text-gray-900">Suggestion {index + 1}:</span> {suggestion}
//               </li>
//             ))
//           )}
//         </ul>

//         <div className="mt-6 text-center">
//           <button
//             onClick={handleToggleSuggestions}
//             className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
//           >
//             {showAll ? 'Show Less' : 'Show More Suggestions'}
//           </button>
//         </div>
//       </div>
//     </div>
//   </>
//   );
