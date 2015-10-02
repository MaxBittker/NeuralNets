/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"underscore\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
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


/***/ }
/******/ ]);