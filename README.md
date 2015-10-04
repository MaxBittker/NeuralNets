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
