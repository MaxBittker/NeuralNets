// CISC/CMPE452/COGS400
// Assignment 3
// Backpropagation
var _ = require('underscore') //underscore is a functional toolkit.e.g. _.exampleUnderscoreFunction
var trainingData = require('./trainingDataA3.js') //trainingdata.js holds an array of training data

/*
    This program calls simulates a 6,3 backpropogation neural network 
    The networks is trained untill it classifies all training points correctly, or it reaches a certain number of iterations 
    and writes then writes progress to html.   
*/

//initweight is called for initial weight values when instantiationg perceptrons. Each value starts between -1 and 1
function initweight() {
    return ((Math.random() * 2) - 1);
}

//each perceptron has a learning rate and a weight array, the last value of which is the threshold value
function perceptron(inputSize) {
    this.weights = [initweight(), initweight(), initweight(), initweight(), initweight(), initweight(), initweight(), initweight(), initweight()].slice(0, inputSize + 1);
    this.lRate = .1 //learning rate is set by experiment, this is a placeholder
}

perceptron.prototype = { //methods attached to perceptrons:
    //sigmoid function
    sigmoid: function(a) {
        var m = 1 // slope of sigmoid
        var result = (1 / (1 + Math.exp(a * m * -1)))
        return result
    },
    //derivitave of sigmoid fn
    sigPrime: function(a) {
        return this.sigmoid(a) * (1 - this.sigmoid(a))
    },
    //calculate returns the activation of a given node (weights times inputs summed)
    calc: function(inputs) {
        var sum = _.reduce(_.map(inputs.concat(1), (input, key) => input * this.weights[key]), (sum, weightedinput) => sum + weightedinput)
        return sum
    },
    //output is just the activation (calc) put through the sigmoid function 
    output: function(inputs) {
        return this.sigmoid(this.calc(inputs))
    },
    //update weights, used for hidden nodes
    learn: function(inputs, d, sum) {
        var xi = inputs.concat(1)

        var d1 = this.sigPrime(this.calc(inputs))
        this.weights = _.map(this.weights, (weight, index) => {
            return (weight + (d1 * sum * xi[index] * this.lRate)) //xi * c
        })
    },
    //update weights, used for output nodes
    learnOutput: function(inputs, d) {
        var xi = inputs.concat(1)
        var d1 = (d - this.output(inputs)) * this.sigPrime(this.calc(inputs))
        this.weights = _.map(this.weights, (weight, index) => {
            return (weight + (d1 * xi[index] * this.lRate)) //xi * c
        })
    }

}

//initialize 6,2 network
function network() {
    this.hiddenLayer = [new perceptron(2), new perceptron(2), new perceptron(2), new perceptron(2), new perceptron(2), new perceptron(2)]
    this.outputLayer = [new perceptron(6), new perceptron(6), new perceptron(6)]
}

network.prototype = {
        //calculates outputs of hidden layer nodes 
        calcHidden: function(input) {
            return [
                this.hiddenLayer[0].output([input[0], input[1]]),
                this.hiddenLayer[1].output([input[0], input[2]]),
                this.hiddenLayer[2].output([input[0], input[3]]),
                this.hiddenLayer[3].output([input[1], input[2]]),
                this.hiddenLayer[4].output([input[1], input[3]]),
                this.hiddenLayer[5].output([input[2], input[3]])
            ]
        },
        //calculate ouput of entire network
        calc: function(input) {
            var hiddenLayerOutput = this.calcHidden(input)

            var output = _.map(this.outputLayer, (node) => node.output(hiddenLayerOutput))
                // console.log(output)
            return output
        },
        //set learning rate for every node
        setLR: function(newLR) {
            _.each(this.hiddenLayer.concat(this.outputLayer), (node) => this.lRate = newLR)
        },
        //train sets learning rate and then calls learn() for each point in the training dataset 
        train: function(data) {
            var desired = parseClass(data[4])

            //5% noise added to prevent overfitting
            var DPwNoise = _.map(data, (val, i) => {
                    if (i === 4) return val
                    return (val * (.975 + (Math.random() / 20)))
                })
                //calculate hidden layer outputs
            var hiddenLayerOutput = this.calcHidden(DPwNoise)

            //feed forward
            var output = _.map(this.outputLayer, (node) => {
                return node.output(hiddenLayerOutput)
            })

            var error = _.map(desired, (value, i) => {
                return (value - output[i])
            })

            // modify output weightights
            _.each(this.outputLayer, (node, i) => {
                node.learnOutput(hiddenLayerOutput, desired[i])
            })

            var sums = [0, 0, 0, 0, 0, 0]

            // modify hidden weights
            for (var o = 0; o < 3; o++) {
                for (var s = 0; s < 6; s++) {
                    sums[s] += (desired[o] - output[o]) * this.outputLayer[o].sigPrime(this.outputLayer[o].calc([hiddenLayerOutput[s], hiddenLayerOutput[s]])) * this.outputLayer[o].weights[s]
                }
            }

            for (var o = 0; o < 3; o++) {
                this.hiddenLayer[2].learn([data[0], data[1]], desired[o], sums[0])
                this.hiddenLayer[1].learn([data[0], data[2]], desired[o], sums[1])
                this.hiddenLayer[2].learn([data[0], data[3]], desired[o], sums[2])
                this.hiddenLayer[3].learn([data[1], data[2]], desired[o], sums[3])
                this.hiddenLayer[4].learn([data[1], data[3]], desired[o], sums[4])
                this.hiddenLayer[5].learn([data[2], data[3]], desired[o], sums[5])
            }

        },
        //test takes a datapoint, and returns true if the current network classifies it correctly
        test: function(data) {
            var outvector = parseClass(data[4])

            var output = this.calc(data.slice(0, 4)) //independent datapoints

            output = _.map(output, (o) => { //sets highest output activation to 1, and others to 0 for the purposes of the output vector
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
        //calculates mean square error 
        totalCost: function(data) {
            var outvector = parseClass(data[4])

            var output = this.calc(data.slice(0, 4))

            return _.reduce(_.map(outvector, (val, i) => Math.exp(val - output[i], 2)), (v, sum) => v + sum)

        }

    }
    //converts class to a 1-hot encoded vector
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

// function experiment() {
document.write('<h4> i: iteration<br>Lrate: learning rate(decays) <br> error: # of incorrectly classified datapoints <br>MSE: Mean Squared Error <br> ΔMSE: delta MSE </h4>');
var net = new network();
var start = new Date();
var lr = 1
var lastMSE = _.reduce(_.map(trainingData, datapoint => net.totalCost(datapoint)), (v, sum) => v + sum) / trainingData.length
var maxi = 1000
epoch(maxi)

function epoch(i) {
    var ErrorProgress = ""


    lr = lr * .998
    net.setLR(lr)

    _.each(trainingData, (datapoint) => net.train(datapoint))

    var numCorrect = _.filter(trainingData, (datapoint) => net.test(datapoint)).length

    var totalCost = _.reduce(_.map(trainingData, datapoint => net.totalCost(datapoint)), (v, sum) => v + sum) / trainingData.length
    var deltaMSE = totalCost - lastMSE
    lastMSE = totalCost


    if (i % 10 === 0) {
        ErrorProgress += ("i: " + (maxi - i
) + "\t\tLrate: " + lr.toFixed(2) + "\t\terror: " + (trainingData.length - numCorrect) + "\t\tMSE: " + totalCost.toFixed(3) + "\t\tΔMSE: " + deltaMSE.toFixed(5) + "<br> ")
        var fragment = create(ErrorProgress);
        document.body.insertBefore(fragment, document.body.childNodes[0]);
    }


    if (i < 2 || ((numCorrect == trainingData.length))) {
        complete()
        return
    } else
        setTimeout(() => epoch(i - 1), 0);

}

function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}


function complete() {
    var finish = new Date();
    var difference = new Date();
    difference.setTime(finish.getTime() - start.getTime());

    console.log(difference.getMilliseconds())
    var fragment = create('<h3>Took ' + difference.getMilliseconds() + "ms</h3><br>");
    document.body.insertBefore(fragment, document.body.childNodes[0]);

}
