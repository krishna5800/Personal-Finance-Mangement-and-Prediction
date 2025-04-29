import numpy as np
import pandas as pd
from keras.models import Sequential
from keras.layers import LSTM, Dense

def load_data():
    # Load your expenses data from JSON
    data = pd.read_json('users_expenses.json')
    return data

def build_rnn():
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(30, 1)))  # Assuming 30 days of data
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

def train_rnn():
    data = load_data()
    X_train, y_train = ...  # Prepare your training data
    model = build_rnn()
    model.fit(X_train, y_train, epochs=100, batch_size=32)
    model.save('expense_predictor.h5')

def predict_expense():
    model = build_rnn()
    model.load_weights('expense_predictor.h5')
    prediction = model.predict(...)  # Your test data
    return prediction

if __name__ == '__main__':
    train_rnn()
