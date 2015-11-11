






















































                return 0
                return 1
            // console.log(desired)
            // console.log(i)
            // console.log(output)
            // console.log(trainingData.length, i)
            alert(classString)
            break
            break
            break
            break
            else
            if (_.max(output) == o)
            node.learn(hiddenLayerOutput[0], hiddenLayerOutput[1], desired[i])
            output[0] = 1
            output[1] = 1
            output[2] = 1
            return (value - output[i])
            return (weight + (d1 * sum * xi[index] * this.lRate)) //xi * c
            return (weight + (d1 * xi[index] * this.lRate)) //xi * c
            return false
            return node.output(hiddenLayerOutput[0], hiddenLayerOutput[1])
            return true
            sum1 += (desired - output) * sigPrime(calc) * this.outputLayer[o].weights[1]
            sum2 += (desired - output) * sigPrime(calc) * this.outputLayer[o].weights[2]
            this.hiddenLayer[0].learn(data[0], data[1], desired[o], sum1)
            this.hiddenLayer[0].output(input[0], input[1]),
            this.hiddenLayer[1].learn(data[2], data[3], desired[o], sum2)
            this.hiddenLayer[1].output(input[2], input[3])
            var d1 = (d - gamma) * this.sigPrime(this.calc(x, y))
            var d1 = this.sigPrime(this.calc(x, y))
            var gamma = this.output(x, y) //
            w = 1;
            w = 1;
        // _.each(trainingData, function(data) {
        // else
        // if (_.every(outvector, (value, i) => value == output[i]))
        // network[0].learn(method, data[0], data[1], dvector[0])
        // return false
        // return true
        // })
        //modify hidden weights
        //modify output weights
        ]
        _.each(this.outputLayer, (node, i) => {
        _.each(trainingData, (datapoint) => net.train(datapoint))
        case 'Iris-setosa':
        case 'Iris-versicolor':
        case 'Iris-virginica':
        console.log(_.map(output, (val) => val.toFixed(1)), outvector)
        default:
        else
        ErrorProgress += ("iteration: " + i + " error: " + (trainingData.length - numCorrect) + "  errorVal: " + totalCost.toFixed(3) + "<br> ")
        for (var o = 0; o < 3; o++) {
        for (var o = 0; o < 3; o++) {
        if (_.every(outvector, (value, i) => value == output[i]))
        if (numCorrect == trainingData.length)
        if (typeof w === "undefined") {
        if (typeof w === "undefined") {
        output = _.map(output, (o) => {
        return [
        return _.reduce(_.map(outvector, (val, i) => Math.exp(val - output[i], 2)), (v, sum) => v + sum)
        re77turn result
        return sum
        return this.sigmoid(a) * (1 - this.sigmoid(a))
        return this.sigmoid(this.calc(x, y))
        this.weights = _.map(this.weights, (weight, index) => {
        this.weights = _.map(this.weights, (weight, index) => {
        var desired = parseClass(data[4])
        var error = _.map(desired, (value, i) => {
        var hiddenLayerOutput = this.calcHidden(input)
        var hiddenLayerOutput = this.output(data)
        var m = 1 // slope of sigmoid
        var numCorrect = _.filter(trainingData, (datapoint) => net.test(datapoint)).length
        var output = _.map(this.outputLayer, (node) => node.output(hiddenLayerOutput[0], hiddenLayerOutput[1]))
        var output = _.map(this.outputLayer, (node) => {
        var output = this.output(data.slice(0, 4))
        var output = this.output(data.slice(0, 4))
        var outvector = parseClass(data[4])
        var outvector = parseClass(data[4])
        var result = (1 / (1 + Math.exp(a * m * -1)))
        var sum = _.reduce(_.map([x, y, 1], (input, key) => input * this.weights[key]), (sum, weightedinput) => sum + weightedinput)
        var sum1 = 0
        var sum2 = 0
        var totalCost = _.reduce(_.map(trainingData, datapoint => net.totalCost(datapoint)), (v, sum) => v + sum)
        var xi = [x, y, 1];
        var xi = [x, y, 1];
        }
        }
        }
        }
        })
        })
        })
        })
        })
        })
      8798  return output
    // difference.setTime(finish.getTime() - start.getTime());
    // document.write('<h4> Final Score: ' + (_.filter(trainingData, test).length + '/' + trainingData.length) + '</h4>')
    // document.write('<h4> Final weights: ' + network[0].weights + '<br>' + network[1].weights + '</h4>')
    // document.write('<h4>' + method + ':</h4>');
    // document.write('Took ' + difference.getMilliseconds() + "ms")
    // render(network)
    // var difference = new Date();
    // var finish = new Date();
    // var start = new Date();
    //calculate returns -1 or 1 for a given input co-ordinate
    //test takes a datapoint, and returns true if the current network classifies it correctly
    //train sets learning rate and then calls learn() for each point in the training dataset 
    and writes then writes output to html.   
    calc: function(input) {
    calc: function(x, y) {
    calcHidden: function(input) {
    document.write(ErrorProgress);
    for (var i = 0; i < 15; i++) {
    learn: function(x, y, d, sum) {
    learnOutput: function(x, y, d) {
    output: function(x, y) {
    return ((Math.random() * 2) - 1);
    return output
    sigmoid: function(a) {
    sigPrime: function(a) {
    switch (classString) {
    test: function(data) {
    The networks is trained untill it classifies all training points correctly,
    This program calls simulates a neural network by with two linear classifier nodes.
    this.hiddenLayer = [new perceptron(), new perceptron]
    this.lRate = .1
    this.outputLayer = [new perceptron(), new perceptron(), new perceptron()]
    this.weights = [initweight(), initweight(), initweight()];
    totalCost: function(data) {
    train: function(data) {
    var ErrorProgress = ""
    var net = new network();
    var output = [0, 0, 0]
    }
    }
    }
    }
    },
    },
    },
    },
    },
    },
    },
    },
    },
*/
/*
// Assignment 3
// At the end after training and testing is done
// at the middle of the training period and end of an epoch (at least one)
// at the start
// Backpropagation
// CISC/CMPE452/COGS400
// class) and explain your results.
// Criteria to stop the training (error, # of iterations),
// document.write("</p>");
// document.write("<br>");
// document.write("<br>");
// document.write('<p class="display">');
// document.write(chr);
// else if (network[0].calc(x, y) === 1)
// else if (network[1].calc(x, y) === 1)
// else var chr = "&#9633;" //unicode for white square
// for (var x = -20; x < 20; x += 1) { //range of x values to display
// for (var y = 20; y > -20; y -= 1) { //range of y values to display 
// function render(network) {
// if ((network[0].calc(x, y) === 1) && (network[1].calc(x, y) === 1))
// Initial weights and learning rate,
// Momentum,
// Number of layers and nodes,
// Print a performance table containing sum of squared error (for all data),
// Regularization,
// Splitting the given data into training and test data.
// var chr = "&#9632;" //unicode for black square
// var chr = "0"
// var chr = "1"
// weights, classification results (how many and correct/incorrect for each
// }
// }
// }
//a global structure to keep track of current active perceptrons
//each perceptron has a learning rate and a weight array, the last value of which is the threshold value
//experiment trains and tests networks iterativly with a given training method. once error is 0, it records some information out to the html
//initweight is called for initial weight values when instantiationg perceptrons
//It originaly returned 	om values, but this made it harder to compare learning methods  
//render writes out a grid of values with different unicode values correspoding to different output values
experiment()
function experiment() {
function initweight() {
function network() {
function parseClass(classString) {
function perceptron() {
network.prototype = { //a function to call update on every node in a layer
perceptron.prototype = { //methods attached to perceptrons:
var _ = require('underscore') //underscore is a functional toolkit.e.g. _.exampleUnderscoreFunction
var trainingData = require('./trainingDataA3.js') //trainingdata.js holds an array of training data
}
}
}
}
}
}
}