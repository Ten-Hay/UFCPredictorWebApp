# UFC Predictor Web App

## What does the app do?

Have you ever wanted to know who would win in a UFC fight? 
With prdct you
can. It leverages machine learning powered by TensorFlow to help predict who will most
 likely win in a matchup between two fighters

## How was the ML trained

The Machine Learning model was trained using TensorFlow. It takes in a bunch
of data points for each fighter including, wins, losses, age, height, reach, significant
strike accuracy, submission and takedown averages and many more. This data is
preprocessed and then given to the model which I have tuned and based upon the test
data it correctly predicts matches around 73-78% of the time. This is statistically
significant compared to just guessing and getting 50% correct.

## Setup

Make sure to have node js and python installed

Frontend Setup
```
cd UFCPredictorFrontend
npm install
npm run dev
```

Backend Setup
```
cd ..
cd UFCPredictorBackend
pip install flask flask_cors numpy tensorflow scikit-learn pandas
flask run
```
