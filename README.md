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
