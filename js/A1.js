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
function perceptron(inputs, weights, threshold) {
    this.inputs = inputs
    this.weights = weights
    this.threshold = threshold;
    this.output = 0
}

perceptron.prototype = {

    update: function() {
        var sum =
            _.reduce(_.map(this.inputs, (input, key) => {
                //update multiplies each input by its weight
                return input * this.weights[key]
            }, this), (sum, weightedinput) => {
                //sums these weighted input values
                return sum + weightedinput
            })

        //checks the value against it's threshhold,
        //and sets the output to 1 or -1 
        this.output = (sum >= this.threshold) ? 1 : -1
        return this.output
    }
}

//building a new network initializes each layer one by one,
// calculates it's outputs, then initializes the next layer
function network(x, y) {
    this.inputs = [x, y]

    this.layers = []

    this.layer0 = [ //initialize the 5 input nodes
        //each of these check for one side of one of the polygon's sides  
        new perceptron(this.inputs, [0, -1], -4), //this one checks that the point's y value is below 4
        new perceptron(this.inputs, [2, 1], 8),
        new perceptron(this.inputs, [-2, 1], -8),
        new perceptron(this.inputs, [3, 1], 13),
        new perceptron(this.inputs, [-3, 1], -11)
    ]
    this.runLayer(this.layer0) //simulate these 5 nodes
    this.layers.push(this.layer0); //add layer to layers array

    this.layer1 = [ //initialize the first hidden node layer
        new perceptron([this.layers[0][0].output, this.layers[0][0].output], [1, 1], 1.5), //if 0
        new perceptron([this.layers[0][1].output, this.layers[0][2].output], [1, 1], 1.5), //if 1 & 2
        new perceptron([this.layers[0][3].output, this.layers[0][4].output], [-1, -1], -1.9) //if NOT 1&2
    ]
    this.runLayer(this.layer1)
    this.layers.push(this.layer1);

    this.layer2 = [ //initialize the second hidden node layer
        new perceptron([this.layers[1][0].output, this.layers[1][1].output], [1, 1], 1.5), //if 0 & 1
        new perceptron([this.layers[1][2].output, this.layers[1][2].output], [1, 1], 1.5) //if 2
    ]
    this.runLayer(this.layer2)
    this.layers.push(this.layer2);

    this.layer3 = [ //initialize the output node layer
        new perceptron([this.layers[2][0].output, this.layers[2][1].output], [1, 1], 1.5) //if 0 & 1
    ]
    this.runLayer(this.layer3)
    this.layers.push(this.layer3);

    // set output to the final layer's only node's output 
    this.output = this.layer3[0].output

}

network.prototype = { //a function to call update on every node in a layer
    runLayer: function(layer) {
        _.each(layer, (node) => {
            node.update()
        })
    }
}

for (var y = 4.5; y > -.1; y -= .075) { //range of y values to display 
    document.write(y.toFixed(1)); //draws y axis
    for (var x = 0; x < 8; x += .075) { //range of x values to display
        var n0 = new network(x, y) //build a new neural network with inputs x and y
        if (n0.output === 1)
            var chr = "&#9632;" //unicode for black square
        else
            var chr = "&#9633;" //unicode for white square
        document.write(chr);
    }
    document.write("<br>");
}

//this network is used one to check the input node from the form
var ntest = new network(
        getJsonFromUrl().x,
        getJsonFromUrl().y
    )
    //code to write output to html
document.write('<h1>Output at Point(' +
    getJsonFromUrl().x + ',' +
    getJsonFromUrl().y + ') is:' +
    ntest.output + '</h1>')

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
