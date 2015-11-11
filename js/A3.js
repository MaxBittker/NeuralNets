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
//It originaly returned     om values, but this made it harder to compare learning methods  
function initweight() {
    return ((Math.random() * 2) - 1);
}

//each perceptron has a learning rate and a weight array, the last value of which is the threshold value
function perceptron(inputSize) {
    this.weights = [initweight(), initweight(), initweight(), initweight(), initweight(), initweight(), initweight(), initweight(), initweight()].slice(0, inputSize + 1);
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
    calc: function(inputs) {
        var sum = _.reduce(_.map(inputs.push(1), (input, key) => input * this.weights[key]), (sum, weightedinput) => sum + weightedinput)
        return sum
    },
    output: function(inputs) {
        return this.sigmoid(this.calc(inputs))
    },
    learn: function(inputs, d, sum) {
        var xi = inputs.concat(1)

        this.weights = _.map(this.weights, (weight, index) => {

            var d1 = this.sigPrime(this.calc(inputs))

            return (weight + (d1 * sum * xi[index] * this.lRate)) //xi * c
        })
    },
    learnOutput: function(inputs, d) {
        var xi = inputs.concat(1)
        this.weights = _.map(this.weights, (weight, index) => {
            var gamma = this.output(inputs) //
            var d1 = (d - gamma) * this.sigPrime(this.calc(inputs))

            return (weight + (d1 * xi[index] * this.lRate)) //xi * c
        })
    }

}

function network() {
    this.hiddenLayer = [new perceptron(2), new perceptron(2), new perceptron(2), new perceptron(2), new perceptron(2), new perceptron(2)]
    this.outputLayer = [new perceptron(6), new perceptron(6), new perceptron(6)]
}

network.prototype = { //a function to call update on every node in a layer
    calcHidden: function(input) {
        // console.log(this.hiddenLayer[0].output(input[0], input[1]))
        // console.log(input)

        return [
            this.hiddenLayer[0].output([input[0], input[1]]),
            this.hiddenLayer[1].output([input[0], input[2]]),
            this.hiddenLayer[2].output([input[0], input[3]]),
            this.hiddenLayer[3].output([input[1], input[2]]),
            this.hiddenLayer[4].output([input[1], input[3]]),
            this.hiddenLayer[5].output([input[2], input[3]])

            // this.hiddenLayer[3].output(input[1], input[0]),
            // this.hiddenLayer[6].output(input[2], input[0]),
            // this.hiddenLayer[7].output(input[2], input[1]),
            // this.hiddenLayer[9].output(input[3], input[0]),
            // this.hiddenLayer[10].output(input[3], input[1]),
            // this.hiddenLayer[11].output(input[3], input[2])
        ]
    },
    calc: function(input) {
        var hiddenLayerOutput = this.calcHidden(input)

        var output = _.map(this.outputLayer, (node) => node.output(hiddenLayerOutput))
            // console.log(output)
        return output
    },
    //train sets learning rate and then calls learn() for each point in the training dataset 
    train: function(data) {
        var desired = parseClass(data[4])
            // console.log(desired)

        var hiddenLayerOutput = this.calcHidden(data)

        var output = _.map(this.outputLayer, (node) => {
            return node.output(hiddenLayerOutput)
        })
        var error = _.map(desired, (value, i) => {
            return (value - output[i])
        })

        //modify output weights
        _.each(this.outputLayer, (node, i) => {
            node.learnOutput(hiddenLayerOutput, desired[i])
        })

        var sums = [0, 0, 0, 0, 0, 0]

        //modify hidden weights
        for (var o = 0; o < 3; o++) {
            for (var s = 0; s < 6; s++) {
                console.log(s,this.outputLayer[s])

                sums[s] += (desired[o] - output[o]) * this.outputLayer[s].sigPrime(this.outputLayer[s].calc([hiddenLayerOutput[s], hiddenLayerOutput[s]])) * this.outputLayer[o].weights[s]
            }
        }

        for (var o = 0; o < 3; o++) {

            this.hiddenLayer[0].learn([data[0], data[1]], desired[o], sum[0]),
                this.hiddenLayer[1].learn([data[2], data[3]], desired[o], sum[1]),
                this.hiddenLayer[0].learn([input[0], input[1]], desired[o], sum[2]),
                this.hiddenLayer[1].learn([input[0], input[2]], desired[o], sum[3]),
                this.hiddenLayer[2].learn([input[0], input[3]], desired[o], sum[4]),
                this.hiddenLayer[3].learn([input[1], input[2]], desired[o], sum[5]),
                this.hiddenLayer[4].learn([input[1], input[3]], desired[o], sum[6]),
                this.hiddenLayer[5].learn([input[2], input[3]], desired[o], sum[7])
        }

    },
    //test takes a datapoint, and returns true if the current network classifies it correctly
    test: function(data) {
        var outvector = parseClass(data[4])

        var output = this.calc(data.slice(0, 4))
            // console.log(_.map(output, (val) => val.toFixed(1)), outvector)

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
