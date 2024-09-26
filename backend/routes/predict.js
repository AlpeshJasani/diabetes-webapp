const express = require('express');
const axios = require('axios');
const Prediction = require('../models/Prediction');  // Import the Prediction model
const router = express.Router();

// POST /api/predict/model2 - Endpoint for model 2 predictions
router.post('/model2', async (req, res) => {
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
    Age
  };

  try {
    // Send data to the model prediction API
    const response = await axios.post('http://127.0.0.1:5000/predict2', dataToPredict);

    // Get the diabetes prediction result from the model's response
    const outcome = response.data.diabetes;

    // Only save to database if the email exists (user is logged in)
    if (email) {
      const newPrediction = new Prediction({
        email,
        model: 'model2',  // Save it as Model 2 prediction
        outcome,  // The diabetes prediction outcome (0 or 1)
        features: {
          Pregnancies,
          Glucose,
          BloodPressure,
          SkinThickness,
          Insulin,
          BMI,
          DiabetesPedigreeFunction,
          Age
        }
      });

      // Save to the database
      await newPrediction.save();
      console.log('Prediction saved to the database');
    } else {
      console.log('User not logged in, prediction not saved');
    }

    // Return the prediction outcome to the frontend
    res.json({ outcome });
    // res.json(response.data);
  } catch (error) {
    console.error('Error in model 2 prediction:', error);
    res.status(500).json({ error: 'Something went wrong with the prediction or database save.' });
  }
});

// POST /api/predict/model1 - Endpoint for model 1 predictions
// router.post('/model1', async (req, res) => {
//   // const { 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 } = req.body;
//   const { data0,data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15,data16,data17,data18,data19,data20,data21,data22,email } = req.body;

//   // Prepare the data to send to the prediction model
//   const dataToPredict = {
//     data0,data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15,data16,data17,data18,data19,data20,data21,data22
//   };

//   try {
//     // Send data to the model prediction API
//     const response = await axios.post('http://127.0.0.1:5000/predict_percentage', dataToPredict);

//     // Get the diabetes prediction result from the model's response
//     const outcome = response.data.predict_percentage;

//     // Only save to database if the email exists (user is logged in)
//     // if (email) {
//     //   const newPrediction = new Prediction({
//     //     email,
//     //     model: 'model2',  // Save it as Model 2 prediction
//     //     outcome,  // The diabetes prediction outcome (0 or 1)
//     //     features: {
//     //       Pregnancies,
//     //       Glucose,
//     //       BloodPressure,
//     //       SkinThickness,
//     //       Insulin,
//     //       BMI,
//     //       DiabetesPedigreeFunction,
//     //       Age
//     //     }
//     //   });

//     //   // Save to the database
//     //   await newPrediction.save();
//     //   console.log('Prediction saved to the database');
//     // } else {
//     //   console.log('User not logged in, prediction not saved');
//     // }

//     // Return the prediction outcome to the frontend
//     res.json({ outcome });
//     // res.json(response.data);
//   } catch (error) {
//     console.error('Error in model 2 prediction:', error);
//     res.status(500).json({ error: 'Something went wrong with the prediction or database save.' });
//   }
// });
// POST /api/predict/model1 - Endpoint for model 1 predictions
router.post('/model1', async (req, res) => {
  try {
    const { email, ...data } = req.body;
    console.log('Received Request:', req.body); // Log incoming request

    const dataToPredict = Object.keys(data)
      .sort((a, b) => a - b)  // Sort keys to ensure correct order
      .map(key => data[key]);  // Convert to array of values

    console.log('Data to Predict:', dataToPredict); // Log the data sent for prediction

    const response = await axios.post('http://127.0.0.1:5000/predict_percentage', { data: dataToPredict });
    console.log('Response from prediction API:', response.data); // Log the API response

    const outcome = response.data.diabetes_percentage;
    console.log('Outcome:', outcome); // Log the outcome

    res.json({ outcome });
  } catch (error) {
    console.error('Error in model 1 prediction:', error); // Log the error details
    res.status(500).json({ error: error.message }); // Send the error message in response
  }
});



module.exports = router;





// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// // POST /api/predict - Call the Flask API for prediction
// router.post('/', async (req, res) => {
//   try {
//     // console.log('Body', req.body);
//     // Forward the data to Flask API (localhost:5000/predict)
//     const response = await axios.post('http://127.0.0.1:5000/predict', req.body);
//     console.log('Response:', response);
    
//     // Return the Flask API's response (the prediction result) to the frontend
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error in /api/predict:', error.message);
//     res.status(500).json({ message: 'Error making prediction' });
//   }
// });

// module.exports = router;
