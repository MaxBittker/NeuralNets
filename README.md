#Max Bittker CMPE 452 Assignment 3

This assignment was completed in javascript.
./js/A3.js is the annotated source code. 

To run this code, open A3.html in a modern web browser, or open
[maxbittker.github.io/NeuralNets/A3.html](http://maxbittker.github.io/NeuralNets/A3.html)

please keep in mind that the page may hang/be unresponsive for 1-10 seconds on opening, press "wait", let the script finish. If I had more time I would have made the training asynchonous so that the page didn't hang like this.

###Criteria to stop the training (error, # of iterations):
Training stops after all points are classified correctly, or 500 epochs.

###Initial weights and learning rate:
Initial weights are random values between -1 and 1. Learning rate starts at 1 and decays by .2% per epoch
M value for sigmoid function effects how our network deals with different ranges of input variables. If inputs are normalized, this is easier to decide on

###Number of layers and nodes,
the network has 4 input nodes, 6 hidden nodes (4 choose 2), and 3 output nodes

###Momentum
I did not experience my gradient descent getting stuck in local minima so I did not implement momentum 

###Regularization:
5% randomization is added to datapoints before training to avoid overfitting


###Splitting the given data into training and test data:
The entire dataset is used for training and testing.


##Output Table

i: 	   iteration
Lrate: learning rate (decays)
error: #of incrorectly classified datapoints
MSE:   Mean Squared Error 
ΔMSE:  delta MSE 

i: 0  Lrate: 1.00 error: 100 MSE: 3.372 ΔMSE: 0.76721
i: 10 Lrate: 0.98 error: 100 MSE: 3.359 ΔMSE: -0.00103
i: 20 Lrate: 0.96 error: 100 MSE: 3.327 ΔMSE: -0.00318
i: 30 Lrate: 0.94 error: 45 MSE: 3.185 ΔMSE: -0.02052
i: 40 Lrate: 0.92 error: 32 MSE: 3.122 ΔMSE: -0.00212
i: 50 Lrate: 0.90 error: 26 MSE: 3.108 ΔMSE: -0.00098
i: 60 Lrate: 0.89 error: 22 MSE: 3.100 ΔMSE: -0.00069
i: 70 Lrate: 0.87 error: 22 MSE: 3.094 ΔMSE: -0.00051
i: 80 Lrate: 0.85 error: 20 MSE: 3.090 ΔMSE: -0.00036
i: 90 Lrate: 0.83 error: 20 MSE: 3.087 ΔMSE: -0.00025
i: 100 Lrate: 0.82 error: 19 MSE: 3.085 ΔMSE: -0.00016
i: 110 Lrate: 0.80 error: 19 MSE: 3.084 ΔMSE: -0.00011
i: 120 Lrate: 0.78 error: 19 MSE: 3.083 ΔMSE: -0.00007
i: 130 Lrate: 0.77 error: 19 MSE: 3.083 ΔMSE: -0.00004
i: 140 Lrate: 0.75 error: 19 MSE: 3.082 ΔMSE: -0.00002
i: 150 Lrate: 0.74 error: 19 MSE: 3.082 ΔMSE: -0.00000
i: 160 Lrate: 0.72 error: 19 MSE: 3.082 ΔMSE: 0.00001
i: 170 Lrate: 0.71 error: 19 MSE: 3.082 ΔMSE: 0.00001
i: 180 Lrate: 0.70 error: 19 MSE: 3.083 ΔMSE: 0.00001
i: 190 Lrate: 0.68 error: 19 MSE: 3.083 ΔMSE: 0.00001
i: 200 Lrate: 0.67 error: 19 MSE: 3.083 ΔMSE: 0.00000
i: 210 Lrate: 0.66 error: 19 MSE: 3.083 ΔMSE: -0.00000
i: 220 Lrate: 0.64 error: 19 MSE: 3.083 ΔMSE: -0.00000
i: 230 Lrate: 0.63 error: 18 MSE: 3.083 ΔMSE: -0.00000
i: 240 Lrate: 0.62 error: 18 MSE: 3.083 ΔMSE: -0.00000
i: 250 Lrate: 0.61 error: 18 MSE: 3.083 ΔMSE: -0.00000
i: 260 Lrate: 0.59 error: 18 MSE: 3.083 ΔMSE: -0.00000
i: 270 Lrate: 0.58 error: 18 MSE: 3.083 ΔMSE: 0.00000
i: 280 Lrate: 0.57 error: 17 MSE: 3.083 ΔMSE: 0.00001
i: 290 Lrate: 0.56 error: 17 MSE: 3.083 ΔMSE: 0.00001
i: 300 Lrate: 0.55 error: 17 MSE: 3.083 ΔMSE: 0.00001
i: 310 Lrate: 0.54 error: 17 MSE: 3.083 ΔMSE: 0.00001
i: 320 Lrate: 0.53 error: 17 MSE: 3.083 ΔMSE: 0.00001
i: 330 Lrate: 0.52 error: 17 MSE: 3.083 ΔMSE: 0.00001
i: 340 Lrate: 0.51 error: 17 MSE: 3.083 ΔMSE: 0.00002
i: 350 Lrate: 0.50 error: 17 MSE: 3.083 ΔMSE: 0.00002
i: 360 Lrate: 0.49 error: 17 MSE: 3.084 ΔMSE: 0.00002
i: 370 Lrate: 0.48 error: 17 MSE: 3.084 ΔMSE: 0.00002
i: 380 Lrate: 0.47 error: 17 MSE: 3.084 ΔMSE: 0.00002
i: 390 Lrate: 0.46 error: 17 MSE: 3.084 ΔMSE: 0.00002
i: 400 Lrate: 0.45 error: 17 MSE: 3.084 ΔMSE: 0.00002
i: 410 Lrate: 0.44 error: 17 MSE: 3.085 ΔMSE: 0.00002
i: 420 Lrate: 0.43 error: 17 MSE: 3.085 ΔMSE: 0.00002
i: 430 Lrate: 0.42 error: 17 MSE: 3.085 ΔMSE: 0.00002
i: 440 Lrate: 0.41 error: 17 MSE: 3.085 ΔMSE: 0.00002
i: 450 Lrate: 0.41 error: 17 MSE: 3.085 ΔMSE: 0.00002
i: 460 Lrate: 0.40 error: 17 MSE: 3.086 ΔMSE: 0.00002
i: 470 Lrate: 0.39 error: 17 MSE: 3.086 ΔMSE: 0.00002
i: 480 Lrate: 0.38 error: 17 MSE: 3.086 ΔMSE: 0.00001
i: 490 Lrate: 0.37 error: 17 MSE: 3.086 ΔMSE: 0.00001
i: 500 Lrate: 0.37 error: 17 MSE: 3.086 ΔMSE: 0.00001
i: 510 Lrate: 0.36 error: 17 MSE: 3.086 ΔMSE: 0.00000
i: 520 Lrate: 0.35 error: 17 MSE: 3.086 ΔMSE: -0.00001
i: 530 Lrate: 0.35 error: 17 MSE: 3.086 ΔMSE: -0.00002
i: 540 Lrate: 0.34 error: 17 MSE: 3.086 ΔMSE: -0.00003
i: 550 Lrate: 0.33 error: 17 MSE: 3.085 ΔMSE: -0.00005
i: 560 Lrate: 0.33 error: 17 MSE: 3.085 ΔMSE: -0.00008
i: 570 Lrate: 0.32 error: 17 MSE: 3.084 ΔMSE: -0.00011
i: 580 Lrate: 0.31 error: 17 MSE: 3.082 ΔMSE: -0.00016
i: 590 Lrate: 0.31 error: 17 MSE: 3.080 ΔMSE: -0.00022
i: 600 Lrate: 0.30 error: 17 MSE: 3.078 ΔMSE: -0.00024
i: 610 Lrate: 0.29 error: 17 MSE: 3.076 ΔMSE: -0.00012
i: 620 Lrate: 0.29 error: 17 MSE: 3.075 ΔMSE: -0.00014
i: 630 Lrate: 0.28 error: 17 MSE: 3.074 ΔMSE: -0.00011
i: 640 Lrate: 0.28 error: 17 MSE: 3.073 ΔMSE: -0.00007
i: 650 Lrate: 0.27 error: 17 MSE: 3.072 ΔMSE: -0.00004
i: 660 Lrate: 0.27 error: 17 MSE: 3.072 ΔMSE: -0.00003
i: 670 Lrate: 0.26 error: 17 MSE: 3.072 ΔMSE: -0.00002
i: 680 Lrate: 0.26 error: 17 MSE: 3.071 ΔMSE: -0.00001
i: 690 Lrate: 0.25 error: 17 MSE: 3.071 ΔMSE: -0.00001
i: 700 Lrate: 0.25 error: 17 MSE: 3.071 ΔMSE: -0.00000
i: 710 Lrate: 0.24 error: 17 MSE: 3.071 ΔMSE: -0.00000
i: 720 Lrate: 0.24 error: 17 MSE: 3.071 ΔMSE: -0.00000
i: 730 Lrate: 0.23 error: 17 MSE: 3.071 ΔMSE: -0.00000
i: 740 Lrate: 0.23 error: 17 MSE: 3.071 ΔMSE: -0.00000
i: 750 Lrate: 0.22 error: 17 MSE: 3.071 ΔMSE: 0.00000
i: 760 Lrate: 0.22 error: 17 MSE: 3.071 ΔMSE: 0.00000
i: 770 Lrate: 0.21 error: 17 MSE: 3.071 ΔMSE: 0.00000
i: 780 Lrate: 0.21 error: 17 MSE: 3.071 ΔMSE: 0.00000
i: 790 Lrate: 0.21 error: 17 MSE: 3.071 ΔMSE: 0.00000
i: 800 Lrate: 0.20 error: 17 MSE: 3.071 ΔMSE: 0.00000
i: 810 Lrate: 0.20 error: 17 MSE: 3.071 ΔMSE: 0.00000
i: 820 Lrate: 0.19 error: 17 MSE: 3.071 ΔMSE: 0.00000
i: 830 Lrate: 0.19 error: 17 MSE: 3.071 ΔMSE: 0.00000
i: 840 Lrate: 0.19 error: 17 MSE: 3.071 ΔMSE: 0.00000
i: 850 Lrate: 0.18 error: 17 MSE: 3.071 ΔMSE: 0.00000
i: 860 Lrate: 0.18 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 870 Lrate: 0.17 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 880 Lrate: 0.17 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 890 Lrate: 0.17 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 900 Lrate: 0.16 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 910 Lrate: 0.16 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 920 Lrate: 0.16 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 930 Lrate: 0.16 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 940 Lrate: 0.15 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 950 Lrate: 0.15 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 960 Lrate: 0.15 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 970 Lrate: 0.14 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 980 Lrate: 0.14 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 990 Lrate: 0.14 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 1000 Lrate: 0.13 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 1010 Lrate: 0.13 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 1020 Lrate: 0.13 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 1030 Lrate: 0.13 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 1040 Lrate: 0.12 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 1050 Lrate: 0.12 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 1060 Lrate: 0.12 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 1070 Lrate: 0.12 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 1080 Lrate: 0.11 error: 17 MSE: 3.072 ΔMSE: 0.00000
i: 1090 Lrate: 0.11 error: 17 MSE: 3.073 ΔMSE: 0.00000
i: 1100 Lrate: 0.11 error: 17 MSE: 3.073 ΔMSE: 0.00000
i: 1110 Lrate: 0.11 error: 17 MSE: 3.073 ΔMSE: 0.00000
i: 1120 Lrate: 0.11 error: 16 MSE: 3.073 ΔMSE: 0.00000
i: 1130 Lrate: 0.10 error: 16 MSE: 3.073 ΔMSE: 0.00000
i: 1140 Lrate: 0.10 error: 16 MSE: 3.073 ΔMSE: 0.00000
i: 1150 Lrate: 0.10 error: 16 MSE: 3.073 ΔMSE: 0.00000
i: 1160 Lrate: 0.10 error: 16 MSE: 3.073 ΔMSE: 0.00000
i: 1170 Lrate: 0.10 error: 16 MSE: 3.073 ΔMSE: 0.00000
i: 1180 Lrate: 0.09 error: 16 MSE: 3.073 ΔMSE: 0.00000
i: 1190 Lrate: 0.09 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1200 Lrate: 0.09 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1210 Lrate: 0.09 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1220 Lrate: 0.09 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1230 Lrate: 0.09 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1240 Lrate: 0.08 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1250 Lrate: 0.08 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1260 Lrate: 0.08 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1270 Lrate: 0.08 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1280 Lrate: 0.08 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1290 Lrate: 0.08 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1300 Lrate: 0.07 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1310 Lrate: 0.07 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1320 Lrate: 0.07 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1330 Lrate: 0.07 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1340 Lrate: 0.07 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1350 Lrate: 0.07 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1360 Lrate: 0.07 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1370 Lrate: 0.06 error: 15 MSE: 3.073 ΔMSE: 0.00000
i: 1380 Lrate: 0.06 error: 15 MSE: 3.074 ΔMSE: 0.00000
i: 1390 Lrate: 0.06 error: 15 MSE: 3.074 ΔMSE: 0.00000
i: 1400 Lrate: 0.06 error: 15 MSE: 3.074 ΔMSE: 0.00000
i: 1410 Lrate: 0.06 error: 15 MSE: 3.074 ΔMSE: 0.00000
i: 1420 Lrate: 0.06 error: 15 MSE: 3.074 ΔMSE: 0.00000
i: 1430 Lrate: 0.06 error: 15 MSE: 3.074 ΔMSE: 0.00000
i: 1440 Lrate: 0.06 error: 15 MSE: 3.074 ΔMSE: 0.00000
i: 1450 Lrate: 0.05 error: 15 MSE: 3.074 ΔMSE: 0.00000
i: 1460 Lrate: 0.05 error: 15 MSE: 3.074 ΔMSE: 0.00000
i: 1470 Lrate: 0.05 error: 15 MSE: 3.074 ΔMSE: 0.00000
i: 1480 Lrate: 0.05 error: 15 MSE: 3.074 ΔMSE: 0.00000
i: 1490 Lrate: 0.05 error: 15 MSE: 3.074 ΔMSE: 0.00000

After 1500 iterations, we correctly classify 135 out of 150 datapoints

#Max Bittker CMPE 452 Assignment 2

This assignment was completed in javascript.
./js/A2.js is the annotated source code. 
To run this code, open A2.html in a modern web browser, or open
[maxbittker.github.io/NeuralNets/A2.html](http://maxbittker.github.io/NeuralNets/A2.html)
The black squares on the grid correspond to "11" output values, white squares are "00"

Initial Weights were arbitrarily -1 for both learning methods. For learning rate, a value plus decay of (1/current epoch) was used, for example: 1, .5, .3333, …

Simple feedback learning:
23 training epochs and 58 milliseconds were required to reach 0 error.
Final weights:
 25.31 ,14.55 ,-2.3
-26.73 ,16.20 ,-2.04 

Error Correction learning:
9 training epochs and 34 milliseconds were required to reach 0 error.
Final weights:
 51.01, 29.11 ,-3.66
-57.01, 34.98 ,-3.22

feel free to email me (netID: 11mb119) with questions if you have any questions or difficulty running this code. 

 What parameter can you use to model the learning for
the following two types of players? Why? Explain.
a) What if the player is impatient and restless?
	This would correspond to a higher learning rate and possible overcorrecting.
b) What if the player is very focused and attentive?
	This would correspond to a lower learning rate and possible longer training time.



#Max Bittker CMPE 452 Assignment 1

This assignment was completed in javascript.
nets.js is the annotated source code. 
To run this code, open index.html in a modern web browser, or open
[maxbittker.github.io/NeuralNets](http://maxbittker.github.io/NeuralNets)
The black squares on the grid correspond to "1" output values, white squares are "-1"

Input values for x and y and press enter for classification.

Behavior on edges is not well defined, so it works better if you
select a point that is within the shape e.g. (4,.9) as opposed to (4,1) 

Except for these literal edge cases, the program correctly classifies every part of the polygon as far as I can discern. 


feel free to email me (netID: 11mb119) with questions if you have any questions or difficulty running this code. 

equations of linear separators:

	input layer:
	x*0 + y*-1 + 4 = θ

	x*2 + y*1 + 8 = θ

	x*-2 + y*1 + 8 = θ

	x*3	 + y*1 - 13 = θ

	x*-3 + y*+1 + 11 = θ

	hidden layer 1:
	x*1 + y*1 - 1.5 = θ

	x*1 + y*1 - 1.5 = θ

	x*-1 + y*-1 + 1.9 = θ

	hidden layer 2:
	x*1 + y*1 - 1.5 = θ

	x*1 + y*1 - 1.5 = θ

	output layer :
	x*1 + y*1 - 1.5 = θ
