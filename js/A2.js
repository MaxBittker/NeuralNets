var _ = require('underscore') //underscore is a functional toolkit.e.g. _.exampleUnderscoreFunction
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

//each perceptron has an input array, a weight array, and a threshold value
function initweight() {
    return ((Math.random() * 2) - 1);
}

function perceptron(lRate) {

    this.weights = [initweight(), initweight(), initweight()];

    // console.log(this.weights)

    // this.threshold = threshold;
    this.lRate = lRate
    this.output = 0
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
        this.output = (sum >= 0) ? 1 : -1
        return this.output
    },
    learn: function(x, y, d) {
        var xi = [x, y, 1];
        // console.log(this.calc(x,y))
        if (d > this.calc(x, y)) {

            this.weights = _.map(this.weights, (weight, index) => {
                return weight - (xi[index] * this.lRate)
            })
        } else {
            this.weights = _.map(this.weights, (weight, index) => {
                return weight + (xi[index] * this.lRate)
            })
        }

    }
}

var p0 = new perceptron(.1);

for (var i = 0; i <= 10; i++) {
    document.write(p0.weights);
    console.log(p0.weights)
    p0.learn(1, 1, 1)
};



//this network is used one to check the input node from the form

//code to write output to html


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
