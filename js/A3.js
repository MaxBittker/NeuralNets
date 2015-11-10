// CISC/CMPE452/COGS400
// Assignment 3
// Backpropagation

// Criteria to stop the training (error, # of iterations),

// Initial weights and learning rate,

// Number of layers and nodes,

// Momentum,

// Regularization,

// Splitting the given data into training and test data.

// Print a performance table containing sum of squared error (for all data),
// weights, classification results (how many and correct/incorrect for each
// class) and explain your results.
// at the start
// at the middle of the training period and end of an epoch (at least one)
// At the end after training and testing is done

var _ = require('underscore') //underscore is a functional toolkit.e.g. _.exampleUnderscoreFunction
var trainingData = require('./trainingDataA3.js') //trainingdata.js holds an array of training data

/*
    This program calls simulates a neural network by with two linear classifier nodes.
    The networks is trained untill it classifies all training points correctly,
    and writes then writes output to html.   
*/

//initweight is called for initial weight values when instantiationg perceptrons
//It originaly returned 	om values, but this made it harder to compare learning methods  
function initweight() {
    return ((Math.random() * 2) - 1);
}

//each perceptron has a learning rate and a weight array, the last value of which is the threshold value
function perceptron() {
    this.weights = [initweight(), initweight(), initweight()];
    this.lRate = .1
}

perceptron.prototype = { //methods attached to perceptrons:
    //calculate returns -1 or 1 for a given input co-ordinate
    sigmoid: function(a) {
        var m = 1 // slope of sigmoid
        var result = (1 / (1 + Math.exp(a * m * -1)))
        return result
    },
    sigPrime: function(a) {
        return this.sigmoid(a) * (1 - this.sigmoid(a))
    },
    calc: function(x, y) {
        var sum = _.reduce(_.map([x, y, 1], (input, key) => input * this.weights[key]), (sum, weightedinput) => sum + weightedinput)
        return this.sigmoid(sum)
    },
    learn: function(x, y, d, w) {
        if (typeof w === "undefined") {
            w = 1;
        }

        var xi = [x, y, 1];

        this.weights = _.map(this.weights, (weight, index) => {
            var gamma = this.calc(x, y) //
            var d1 = (d - gamma) * gamma * (1 - gamma)

            return (weight + (d1 * w * xi[index] * this.lRate)) //xi * c
        })
    }
}

function network() {
    this.hiddenLayer = [new perceptron(), new perceptron]
    this.outputLayer = [new perceptron(), new perceptron(), new perceptron()]
}

network.prototype = { //a function to call update on every node in a layer
    calcHidden: function(input) {
        return [
            this.hiddenLayer[0].calc(input[0], input[1]),
            this.hiddenLayer[1].calc(input[2], input[3])
        ]
    },
    calc: function(input) {
        var hiddenLayerOutput = this.calcHidden(input)

        var output = _.map(this.outputLayer, (node) => node.calc(hiddenLayerOutput[0], hiddenLayerOutput[1]))
            // console.log(output)
        return output
    },
    //train sets learning rate and then calls learn() for each point in the training dataset 
    train: function(data) {
        var desired = parseClass(data[4])
            // console.log(desired)
        var hiddenLayerOutput = this.calc(data)

        var output = _.map(this.outputLayer, (node) => {
            return node.calc(hiddenLayerOutput[0], hiddenLayerOutput[1])
        })
        var error = _.map(desired, (value, i) => {
            return (value - output[i])
        })

        //modify output weights
        _.each(this.outputLayer, (node, i) => {
            node.learn(hiddenLayerOutput[0], hiddenLayerOutput[1], desired[i])
        })

        //modify hidden weights

        for (var o = 0; o < 3; o++) {
            var w0 = this.outputLayer[o].weights[0]
            var w1 = this.outputLayer[o].weights[1]

            this.hiddenLayer[0].learn(data[0], data[1], desired[o], w0)
            this.hiddenLayer[1].learn(data[2], data[3], desired[o], w1)
        }
        // _.each(trainingData, function(data) {
        // network[0].learn(method, data[0], data[1], dvector[0])
        // })

    },
    //test takes a datapoint, and returns true if the current network classifies it correctly
    test: function(data) {
        var outvector = parseClass(data[4])

        var output = this.calc(data.slice(0, 4))
        console.log(_.map(output, (val) => val.toFixed(1)), outvector)

        output = _.map(output, (o) => {
            if (_.max(output) == o)
                return 1
            else
                return 0
        })

        if (_.every(outvector, (value, i) => value == output[i]))
            return true
        else
            return false

    },
    totalCost: function(data) {
        var outvector = parseClass(data[4])

        var output = this.calc(data.slice(0, 4))

        return _.reduce(_.map(outvector, (val, i) => Math.exp(val - output[i], 2)), (v, sum) => v + sum)

        // if (_.every(outvector, (value, i) => value == output[i]))
        // return true
        // else
        // return false

    }


}


function parseClass(classString) {
    var output = [0, 0, 0]

    switch (classString) {
        case 'Iris-setosa':
            output[0] = 1
            break
        case 'Iris-versicolor':
            output[1] = 1
            break
        case 'Iris-virginica':
            output[2] = 1
            break
        default:
            alert(classString)
    }
    return output
}

//a global structure to keep track of current active perceptrons

//experiment trains and tests networks iterativly with a given training method. once error is 0, it records some information out to the html
function experiment() {
    // document.write('<h4>' + method + ':</h4>');
    var ErrorProgress = ""
    var net = new network();
    // var start = new Date();
    for (var i = 0; i < 15; i++) {

        _.each(trainingData, (datapoint) => net.train(datapoint))
            // console.log(i)
            // console.log(trainingData.length, i)
        var numCorrect = _.filter(trainingData, (datapoint) => net.test(datapoint)).length

        var totalCost = _.reduce(_.map(trainingData, datapoint => net.totalCost(datapoint)), (v, sum) => v + sum)

        ErrorProgress += ("iteration: " + i + " error: " + (trainingData.length - numCorrect) + "  errorVal: " + totalCost.toFixed(3) + "<br> ")
        if (numCorrect == trainingData.length)
            break

    }
    // var finish = new Date();
    // var difference = new Date();
    // difference.setTime(finish.getTime() - start.getTime());


    // render(network)
    document.write(ErrorProgress);
    // document.write('<h4> Final Score: ' + (_.filter(trainingData, test).length + '/' + trainingData.length) + '</h4>')
    // document.write('<h4> Final weights: ' + network[0].weights + '<br>' + network[1].weights + '</h4>')
    // document.write('Took ' + difference.getMilliseconds() + "ms")
}

experiment()

//render writes out a grid of values with different unicode values correspoding to different output values
// function render(network) {
// document.write('<p class="display">');

// for (var y = 20; y > -20; y -= 1) { //range of y values to display 
// for (var x = -20; x < 20; x += 1) { //range of x values to display
// if ((network[0].calc(x, y) === 1) && (network[1].calc(x, y) === 1))
// var chr = "&#9632;" //unicode for black square
// else if (network[0].calc(x, y) === 1)
// var chr = "1"
// else if (network[1].calc(x, y) === 1)
// var chr = "0"
// else var chr = "&#9633;" //unicode for white square
// document.write(chr);
// }
// document.write("<br>");
// }
// document.write("</p>");
// document.write("<br>");
// }
