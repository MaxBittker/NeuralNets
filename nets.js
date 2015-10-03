var _ = require('underscore')
    // document.write("It works.")
    // _.each([1, 2, 3], alert)
function getJsonFromUrl() {
    var query = location.search.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}


function perceptron(inputs, weights, threshold) {
    this.inputs = inputs
    this.weights = weights
    this.threshold = threshold;
    this.output = -1
}

perceptron.prototype = {
    update: function() {
        var sum =
            _.reduce(_.map(this.inputs, (num, key) => {
                return num * this.weights[key]
            }, this), (sum, input) => {
                return sum + input
            })

        this.output = (sum >= this.threshold) ? 1 : -1
        return this.output
    }
}

function network(x, y) {
    this.inputs = [x, y]
    this.layers = []
    this.layer0 = [
        new perceptron(this.inputs, [0, -1], -4),
        new perceptron(this.inputs, [2, 1], 8),
        new perceptron(this.inputs, [-2, 1], -8),
        new perceptron(this.inputs, [3, 1], 13),
        new perceptron(this.inputs, [-3, 1], -11)
    ]
    this.runLayer(this.layer0)
    this.layers.push(this.layer0);
    this.layer1 = [
        new perceptron([this.layers[0][0].output, this.layers[0][0].output], [1, 1], 1.5), //if 0
        new perceptron([this.layers[0][1].output, this.layers[0][2].output], [1, 1], 1.5), //if 1 & 2
        new perceptron([this.layers[0][3].output, this.layers[0][4].output], [-1, -1], -1.9) //if NOT 1&2
    ]
    this.runLayer(this.layer1)
    this.layers.push(this.layer1);
    this.layer2 = [
        new perceptron([this.layers[1][0].output, this.layers[1][1].output], [1, 1], 1.5), //if 0 & 1
        new perceptron([this.layers[1][2].output, this.layers[1][2].output], [1, 1], 1.5) //if 2
    ]
    this.runLayer(this.layer2)
    this.layers.push(this.layer2);
    this.layer3 = [
        new perceptron([this.layers[2][0].output, this.layers[2][1].output], [1, 1], 1.5) //if 0 & 1
    ]
    this.runLayer(this.layer3)
    this.layers.push(this.layer3);


    this.output = this.layer3[0].output

}

network.prototype = {
    // update: function(x,y) {

    //     _.each(this.layers, (layer) => {
    //         _.each(layer, (node) => {
    //             node.update()
    //         })
    //     })
    // },
    runLayer: function(layer) {
            _.each(layer, (node) => {
                node.update()
            })
        }
        // calculate: function(x, y) {
        //     this.inputs = [x, y]
        //     this.update()

    // }
}

for (var y = 4.5; y > -.1; y -= .075) {
    document.write(y.toFixed(1));
    for (var x = 0; x < 8; x += .075) {
        var n0 = new network(x, y)
        if (n0.output === 1)
            var chr = "&#9632;"
        else
            var chr = "&#9633;"
        document.write(chr);
    }
    document.write("<br>");
}


var ntest = new network(
    getJsonFromUrl().x,
    getJsonFromUrl().y)
document.write('<h1>Output at Point(' +
    getJsonFromUrl().x + ',' +
    getJsonFromUrl().y + ') is:' +
    ntest.output + '</h1>')



// document.write("---");
// for (var x = 0; x < 8; x += .1) {
//     document.write(x.toFixed(0));
// }


// var p0 = new perceptron([0, -1], -4)
// for (var i = -4; i < 6; i++) {
//     p0.inputs = [0, i]
//     console.log(i + ":" + p0.update())
// };

// var p1 = new perceptron([2, 1], 8)
// for (var i = -4; i < 10; i++) {
//     p1.inputs = [4, i]
//     console.log(i + ":" + p1.update())
// };

// var p2 = new perceptron([-2, 1], -8)
// for (var i = -4; i < 10; i++) {
//     p2.inputs = [i, 4]
//     console.log(i + ":" + p2.update())
// };
// var p3 = new perceptron([-3, 1], -13)
// for (var i = -4; i < 10; i++) {
//     p3.inputs = [i, 4]
//     console.log(i + ":" + p3.update())
// };
