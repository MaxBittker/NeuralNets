var _ = require('underscore')
    // document.write("It works.")
    // _.each([1, 2, 3], alert)



function perceptron() {
    this.inputs = [1, 1]
    this.weights = [.4, 5]
    this.output = 0
}

perceptron.prototype = {
    update: function() {
        this.output =
            _.reduce(_.map(this.inputs, (num, key) => {
                return num * this.weights[key]
            }, this), (sum, input) => {
                return sum + input
            })
        console.log(this.output)
        return this.output
    }
}

function network(inputs) {
    this.inputs = []
    this.layers = [
        [new perceptron(), new perceptron()]
    ]
    this.outputs = []

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


var n1 = new network(0)

n1.calculate(1, 1)

console.log()
