from flask import Flask, render_template, request, jsonify, send_file, url_for
import numpy as np
import json
import scipy.misc
import base64
from io import BytesIO
import time
import pandas as pd

from keras.models import load_model
from keras import backend as K

from random import randint

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")

@app.route('/GetVector', methods=['GET', 'POST'])
def GetVector():
    return jsonify(5)


@app.route('/TouchToArt', methods=['GET', 'POST'])
def TouchToArt():
    data_from_js = request.get_json()
    pred = [data_from_js['positive'],
    data_from_js['anxiety'],
    data_from_js['anger'],
    data_from_js['sad'],
    data_from_js['affiliation']
    ]

    print('main.py clicked getArt')

    features = np.load('static/data/affect.npy')  # feature vectors for each image
    liwc_csv = pd.read_csv('static/data/liwc.csv')  # text for each image
    csv_len = len(liwc_csv)



    chosen_index = min(range(csv_len), key=lambda i: np.linalg.norm(features[i] - pred)) # search for closest art
    #print("features of selected art are", features[chosen_index])
    chosen_js_list = json.dumps((features[chosen_index]).tolist())
    print("type of index is", type(chosen_js_list))

    #chosen_js_list = json.dumps(np.arange(features[chosen_index]))
    print("chosen js list is", chosen_js_list) # now it's a string

    K.clear_session()
    print('Result and the chosen_index C:',liwc_csv.iloc[chosen_index]['C'])
    print('Result and the chosen_index:B ',liwc_csv.iloc[chosen_index]['B'])
    return jsonify(liwc_csv.iloc[chosen_index]['B'] + ";" + chosen_js_list)


@app.route('/GradientArt', methods=['GET', 'POST'])
def GradientArt():

    data_from_js = request.get_json()
    pred = [data_from_js['positive'],
    data_from_js['anxiety'],
    data_from_js['anger'],
    data_from_js['sad'],
    data_from_js['affiliation']
    ]

    print('main.py clicked gradient')

    features = np.load('static/data/affect.npy')  # feature vectors for each image
    liwc_csv = pd.read_csv('static/data/liwc.csv')  # text for each image
    csv_len = len(liwc_csv)


    chosen_index = min(range(csv_len), key=lambda i: np.linalg.norm(features[i] - pred)) # search for closest art
    #print("features of selected art are", features[chosen_index])
    chosen_js_list = json.dumps((features[chosen_index]).tolist())
    print("type of index is", type(chosen_js_list))

    #chosen_js_list = json.dumps(np.arange(features[chosen_index]))
    print("chosen js list is", chosen_js_list) # now it's a string

    K.clear_session()
    print('Result and the chosen_index C:',liwc_csv.iloc[chosen_index]['C'])
    print('Result and the chosen_index:B ',liwc_csv.iloc[chosen_index]['B'])
    return jsonify(liwc_csv.iloc[chosen_index]['B'] + ";" + chosen_js_list)



if __name__=="__main__":
    app.run(host='127.0.0.1', port=5000)
