var _ = require('underscore')
    // document.write("It works.")
    // _.each([1, 2, 3], alert)



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
            // console.log(this.output)
        return this.output
    }
}

function network() {
    this.inputs = [0, 0]
    this.layers = []
    this.layer0 = [
        new perceptron(this.inputs, [0, -1], -4),
        new perceptron(this.inputs, [2, 1], 8),
        new perceptron(this.inputs, [-2, 1], -8),
        new perceptron(this.inputs, [3, 1], 13),
        new perceptron(this.inputs, [-3, 1], -13)
    ]
    this.layer1 = [new perceptron([this.layer[0][1].output, this.layers[0][2].output], [1, 1], 2)]
    this.output = -1

}

network.prototype = {
    update: function() {
        _.each(this.layers, (layer) => {
            _.each(layer, (node) => {
                node.update()
            })
        })
    },
    calculate: function(x, y) {
        this.inputs = [x, y]
        this.update()

    }
}
var n1 = new network()


console.log(
    n1.calculate(4, 3)
)

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
