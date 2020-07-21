# Performance system for touch to text

import numpy as np
import pandas as pd
from keras.models import load_model

touch_data = []
print('Loading Models')
#embedded_model = load_model('stage1.h5')  # load embedded model from TEI - SF
#perform_model = load_model('stage2.h5')   # second stage model from TEI - SF

embedded_model = load_model('stage_1_model.h5')  # load embedded model
perform_model = load_model('stage_2_model.h5')   # second stage model
print('Loading affect vectors')
features = np.load('affect.npy')  # features for all the lyrics
print('Loading lyrics')
liwc_csv = pd.read_csv('liwc.csv')  # text of the lyrics

csv_len = len(liwc_csv) # added by SF

with open('touch.txt', 'r') as f:
	for line in f:
		touch_data.append(line.split()[2].split(','))  # working the format of the touch data file, edited to remove date and time by SF


print('Predicting')
touch_data = np.expand_dims(touch_data[-250:], axis=0) # expands one data point to batch of one data point for Keras

#print(touch_data) # SF
#print(touch_data.shape) # SF
#embedded_model.summary() # SF

pred_embedding = embedded_model.predict(touch_data)  # run first stage
pred = perform_model.predict(pred_embedding)[0]      # run second stage, but pick first member

print("pred.shape", pred.shape) # SF
print("features[0][4:].shape", features[0][4:].shape) # SF
#print("features.shape", features.shape) # SF


#chosen_index = sorted(list(range(csv_len), key=lambda i: np.linalg.norm(features[i][9:] - pred)))[:5] # search for the 5 closest lyrics, SF added [9:],ascending=False
chosen_index = min(range(csv_len), key=lambda i: np.linalg.norm(features[i][4:] - pred)) # search for closest lyric, SF added [9:]
#chosen_index = min(range(csv_len), key=lambda i: np.linalg.norm(features[i] - pred)) # search for closest lyric, SF added [9:]


print()
print('Result and the chosen_index:', chosen_index)
print(liwc_csv.iloc[chosen_index]['B'])


# at 292255:As long as the night is colored  Blue and black  Oh yeah yeah yeah  As long as you're on your knees  And she's not on her back  Oh yeah yeah yeah
#My mama ma ma ma ma ma  a

