import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
import numpy as np

import json
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


important_features = [
    'winner',
    
    #red stats
    'r_wins_total',
    'r_losses_total',
    'r_age',
    'r_height',
    'r_reach',
    'r_stance',
    'r_SLpM_total',
    'r_SApM_total',
    'r_sig_str_acc_total',
    'r_td_acc_total',
    'r_str_def_total',
    'r_td_def_total',
    'r_sub_avg',
    'r_td_avg',
    
    
    #blue state
    'b_wins_total',
    'b_losses_total',
    'b_age',
    'b_height',
    'b_reach',
    'b_stance',
    'b_SLpM_total',
    'b_SApM_total',
    'b_sig_str_acc_total',
    'b_td_acc_total',
    'b_str_def_total',
    'b_td_def_total',
    'b_sub_avg',
    'b_td_avg'
]

individual_fighter_features = [
    'wins',
    'losses',
    'age',
    'height',
    'reach',
    'stance',
    'SLpM',
    'SApM',
    'sig_str_acc',
    'td_acc',
    'str_def',
    'td_def',
    'sub_avg',
    'td_avg'
]

feature_rename = [
    '_wins',
    '_losses',
    '_SLpM',
    '_SApM',
    '_sig_str_acc',
    '_td_acc',
    '_str_def',
    '_td_def'
]

def preprocessing(df):

    df['winner'] = df['winner'].map({'Red': 1, 'Blue': 0})
    df['r_stance'] = (df['r_stance'] == 'Orthodox').astype(int)
    df['b_stance'] = (df['b_stance'] == 'Orthodox').astype(int)
    df[important_features] = df[important_features].fillna(0)

    return df[important_features]


def train_model(df):
    X = df.drop(["winner"], axis=1)
    y = df["winner"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)


    model = Sequential()

    model.add(Dense(units=128, activation='relu', input_dim=len(X_train.columns)))
    model.add(Dropout(0.3))
    model.add(BatchNormalization())

    model.add(Dense(units=64, activation='relu'))
    model.add(Dropout(0.2))
    model.add(BatchNormalization())

    model.add(Dense(units=32, activation='relu'))
    model.add(Dropout(0.2))

    model.add(Dense(units=16, activation='relu'))

    model.add(Dense(units=1, activation='sigmoid'))

    model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    model.fit(X_train_scaled, y_train, epochs=50, batch_size=32)

    y_hat = model.predict(X_test_scaled)
    y_hat = [0 if val < 0.5 else 1 for val in y_hat]
    print(accuracy_score(y_test, y_hat))
    return model


def get_fighter(data, fighter_name):
    
    data = data.copy()
    data = data[data['name'] == fighter_name]
    data['stance'] = (data['stance'] == 'Orthodox').astype(int)
    data = data[individual_fighter_features]
    data = data.add_prefix('_')
    suffix_dict = {col: f'{col}_total' for col in feature_rename if col in data.columns}
    data = data.rename(columns=suffix_dict)
    return data


@app.route('/winner', methods=['POST'])
def predict_fight():
    request_data = json.loads(request.data)
    red_name = request_data['red']
    blue_name = request_data['blue']
    
    red_fighter = get_fighter(fighters, red_name)
    blue_fighter = get_fighter(fighters, blue_name)
    
    red_fighter = red_fighter.add_prefix('r_').reset_index(drop=True)
    blue_fighter = blue_fighter.add_prefix('b_').reset_index(drop=True)

    fight_data = pd.concat([red_fighter, blue_fighter], axis=1)
    
    prediction_probability = model.predict(fight_data)
    
    prediction = red_name if prediction_probability > 0.5 else blue_name
    
    print(prediction_probability)
    print(prediction)
    return {'winner': prediction}



fights = pd.read_csv("datasets/large_dataset.csv", encoding="latin-1")
fighters = pd.read_csv("datasets/fighter_stats.csv", encoding="latin-1")
fights = preprocessing(fights)
model = train_model(fights)


#blue = get_fighter(fighters, "Jack Hermansson")
#red = get_fighter(fighters, "Khabib Nurmagomedov")

#predict_fight(red, blue, model)