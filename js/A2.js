var _ = require('underscore') //underscore is a functional toolkit.e.g. _.exampleUnderscoreFunction
var trainingData = require('./trainingData.js')

//each perceptron has an input array, a weight array, and a threshold value
function initweight() {
    // return .5
    return ((Math.random() * 2) - 1);
}

function perceptron() {
    this.weights = [initweight(), initweight(), initweight()];
    this.lRate = .1
}

perceptron.prototype = {

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
    learn: function(method, x, y, d) {
        if (method === "Simple Feedback")
            this.learnSimpleFeedback(x, y, d)
        else
            this.learnErrorCorrection(x, y, d)
    },
    learnSimpleFeedback: function(x, y, d) {
        var xi = [x, y, 1];
        if (d === this.calc(x, y)) {

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
    learnErrorCorrection: function(x, y, d) {
        var xi = [x, y, 1];
        this.weights = _.map(this.weights, (weight, index) => {
            return weight + ((d - this.calc(x, y)) * (xi[index] * this.lRate))
        })


    }
}


function test(data) {
    var dvector = parseD(data[2])

    var output = [0, 0]

    for (var i = 0; i < 2; i++) {
        output[i] = network[i].calc(data[0], data[1])
    };

    if (output[0] + output[1] === -2) {
        if (data[0] > 0)
            output[0] = 1
        else
            output[1] = 1
    }

    if (output[0] === dvector[0] && output[1] === dvector[1]) {
        return true
    }

    // console.log(output + "|" + dvector)
    return false

}

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

function train(learningRate, method) {

    network[0].lRate = learningRate
    network[1].lRate = learningRate

    _.each(trainingData, function(data) {
        var dvector = parseD(data[2])
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

var network = [new perceptron(), new perceptron()];

function experiment(method) {
    document.write('<h4>' + method + ':</h4>');
    var ErrorProgress = ""
    network = [new perceptron(), new perceptron()];

    for (var i = 1; i < 15; i++) {
        train(.2 / i, method)
        ErrorProgress += ("iteration: " + i + " error:" + (trainingData.length - _.filter(trainingData, test).length) + "<br> ")
    }

    render(network)
    document.write(ErrorProgress);
    document.write('<h4> Final Score: ' + (_.filter(trainingData, test).length + '/' + trainingData.length) + '</h4>')
}
experiment("Simple Feedback")
experiment("Error Correction")


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


//this a helper function to parse url parameters
function getJsonFromUrl() {
    var query = location.search.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}
