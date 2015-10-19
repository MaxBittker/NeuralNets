var _ = require('underscore') //underscore is a functional toolkit.e.g. _.exampleUnderscoreFunction
var trainingData = require('./trainingData.js')


/*
    This program calls simulates a neural network by building and simulating
    perceptrons layer by layer. It uses 5 input nodes, two hidden layers 
    and one output node to arive at a conclusion: -1 for outside the polygon,
    1 for inside the polygon. Each node has individually chosen weights and 
    threshhold values.

    It runs this simulation once for each square of the grid and prints a 
    unicode character corresponding to the binary output.

    It also runs the simulation in response to the html button and input fields.
*/
//initweight is called for initial weight values when instantiationg perceptrons
//It originaly returned random values, but this made it harder to compare learning methods  
function initweight() {
    return -1
        // return ((Math.random() * 2) - 1);
}

//each perceptron has a learning rate and a weight array, the last value of which is the threshold value
function perceptron() {
    this.weights = [initweight(), initweight(), initweight()];
    this.lRate = .1
}

perceptron.prototype = { //methods attached to perceptrons:
    //calculate returns -1 or 1 for a given input co-ordinate
    calc: function(x, y) {
        var sum =
            _.reduce(_.map([x, y, 1], (input, key) => {
                //update multiplies each input by its weight
                return input * this.weights[key]
            }, this), (sum, weightedinput) => {
                //sums these weighted input values
                return sum + weightedinput
            })

        //checks the value against it's threshhold,
        //and sets the output to 1 or -1 
        return (sum > 0) ? 1 : -1
    },
    //given a learning method, a point, and its correct classification,
    //learn adjusts the weight values of the perceptron
    learn: function(method, x, y, d) {
        if (method == "Simple Feedback") {
            this.learnSimpleFeedback(x, y, d)
        } else {
            this.learnErrorCorrection(x, y, d)
        }
    },
    //simple feedback learning algorithm implementation
    //_.map() takes an array (ARG1) and returns an array with the results of calling a function (ARG2)
    //for each respective element  eg _.map([1,2,3],(x)=>{return(x*2)}) yields [2,4,6]
    learnSimpleFeedback: function(x, y, d) {
        var xi = [x, y, 1];
        if (d === this.calc(x, y)) {
            //do nothing
        } else if (d < this.calc(x, y)) {
            this.weights = _.map(this.weights, (weight, index) => {
                return weight - (xi[index] * this.lRate)
            })
        } else {
            this.weights = _.map(this.weights, (weight, index) => {
                return weight + (xi[index] * this.lRate)
            })
        }
    },
    //simple feedback learning algorithm implementation
    learnErrorCorrection: function(x, y, d) {
        var xi = [x, y, 1];
        this.weights = _.map(this.weights, (weight, index) => {
            return weight + ((d - this.calc(x, y)) * (xi[index] * this.lRate))
        })


    }
}

//test takes a datapoint, and returns true if the current network classifies it correctly
function test(data) {
    var dvector = parseD(data[2])

    var output = [0, 0]

    for (var i = 0; i < 2; i++) {
        output[i] = network[i].calc(data[0], data[1])
    };

    if (output[0] + output[1] === -2) { //this deals with the edge case where both nodes return -1
        if (data[0] >= -.1)
            output[0] = 1
        else
            output[1] = 1
    }

    if (output[0] === dvector[0] && output[1] === dvector[1]) {
        return true
    }
    return false
}

//parses the result element of the supplied training data into the expected results from the individual perceptrons
function parseD(d) {
    switch (d) {
        case "-1":
            return [-1, 1]
        case "0":
            return [1, 1]
        case "1":
            return [1, -1]
        default:
            console.log("hit default")
    }
}

//train sets learning rate and then calls learn() for each point in the training dataset 
function train(learningRate, method) {

    network[0].lRate = learningRate
    network[1].lRate = learningRate

    _.each(trainingData, function(data) {
        var dvector = parseD(data[2])
            //this logic avoids calling perceptron.train on datapoints that don't help apply to it   
        switch (data[2]) {
            case "-1":
                network[0].learn(method, data[0], data[1], dvector[0])
                break;
            case "0":
                network[0].learn(method, data[0], data[1], dvector[0])
                network[1].learn(method, data[0], data[1], dvector[1])
                break;
            case "1":
                network[1].learn(method, data[0], data[1], dvector[1])
                break;
            default:
                console.log("hit default")
        }
    })

}
//a global structure to keep track of current active perceptrons
var network = [new perceptron(), new perceptron()];

//experiment trains and tests networks iterativly with a given training method. once error is 0, it records some information out to the html
function experiment(method) {
    document.write('<h4>' + method + ':</h4>');
    var ErrorProgress = ""
    network = [new perceptron(), new perceptron()];

    var start = new Date();
    for (var i = 1; i < 100; i++) {
        train(1 / i, method)
        ErrorProgress += ("iteration: " + i + " error:" + (trainingData.length - _.filter(trainingData, test).length) + "<br> ")
        if (_.filter(trainingData, test).length == trainingData.length)
            break
    }
    var finish = new Date();
    var difference = new Date();
    difference.setTime(finish.getTime() - start.getTime());


    render(network)
    document.write(ErrorProgress);
    document.write('<h4> Final Score: ' + (_.filter(trainingData, test).length + '/' + trainingData.length) + '</h4>')
    document.write('<h4> Final weights: ' + network[0].weights + '<br>' + network[1].weights + '</h4>')
    document.write('Took ' + difference.getMilliseconds() + "ms")
}

experiment("Simple Feedback")
experiment("Error Correction")

//render writes out a grid of values with different unicode values correspoding to different output values
function render(network) {
    document.write('<p class="display">');

    for (var y = 20; y > -20; y -= 1) { //range of y values to display 
        for (var x = -20; x < 20; x += 1) { //range of x values to display
            if ((network[0].calc(x, y) === 1) && (network[1].calc(x, y) === 1))
                var chr = "&#9632;" //unicode for black square
            else if (network[0].calc(x, y) === 1)
                var chr = "1"
            else if (network[1].calc(x, y) === 1)
                var chr = "0"
            else var chr = "&#9633;" //unicode for white square
            document.write(chr);
        }
        document.write("<br>");
    }
    document.write("</p>");
    document.write("<br>");
}
