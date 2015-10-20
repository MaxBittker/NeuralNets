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

	'use strict';

	var _ = __webpack_require__(1); //underscore is a functional toolkit.e.g. _.exampleUnderscoreFunction
	var trainingData = __webpack_require__(2); //trainingdata.js holds an array of training data

	/*
	    This program calls simulates a neural network by with two linear classifier nodes.
	    The networks is trained untill it classifies all training points correctly,
	    and writes then writes output to html.   
	*/

	//initweight is called for initial weight values when instantiationg perceptrons
	//It originaly returned random values, but this made it harder to compare learning methods 
	function initweight() {
	    return -1;
	    // return ((Math.random() * 2) - 1);
	}

	//each perceptron has a learning rate and a weight array, the last value of which is the threshold value
	function perceptron() {
	    this.weights = [initweight(), initweight(), initweight()];
	    this.lRate = .1;
	}

	perceptron.prototype = { //methods attached to perceptrons:
	    //calculate returns -1 or 1 for a given input co-ordinate
	    calc: function calc(x, y) {
	        var _this = this;

	        var sum = _.reduce(_.map([x, y, 1], function (input, key) {
	            //update multiplies each input by its weight
	            return input * _this.weights[key];
	        }, this), function (sum, weightedinput) {
	            //sums these weighted input values
	            return sum + weightedinput;
	        });

	        //checks the value against it's threshhold,
	        //and sets the output to 1 or -1
	        return sum > 0 ? 1 : -1;
	    },
	    //given a learning method, a point, and its correct classification,
	    //learn adjusts the weight values of the perceptron
	    learn: function learn(method, x, y, d) {
	        if (method == "Simple Feedback") {
	            this.learnSimpleFeedback(x, y, d);
	        } else {
	            this.learnErrorCorrection(x, y, d);
	        }
	    },
	    //simple feedback learning algorithm implementation
	    //_.map() takes an array (ARG1) and returns an array with the results of calling a function (ARG2)
	    //for each respective element  eg _.map([1,2,3],(x)=>{return(x*2)}) yields [2,4,6]
	    learnSimpleFeedback: function learnSimpleFeedback(x, y, d) {
	        var _this2 = this;

	        var xi = [x, y, 1];
	        if (d === this.calc(x, y)) {
	            //do nothing
	        } else if (d < this.calc(x, y)) {
	                this.weights = _.map(this.weights, function (weight, index) {
	                    return weight - xi[index] * _this2.lRate;
	                });
	            } else {
	                this.weights = _.map(this.weights, function (weight, index) {
	                    return weight + xi[index] * _this2.lRate;
	                });
	            }
	    },
	    //simple feedback learning algorithm implementation
	    learnErrorCorrection: function learnErrorCorrection(x, y, d) {
	        var _this3 = this;

	        var xi = [x, y, 1];
	        this.weights = _.map(this.weights, function (weight, index) {
	            return weight + (d - _this3.calc(x, y)) * (xi[index] * _this3.lRate);
	        });
	    }
	};

	//test takes a datapoint, and returns true if the current network classifies it correctly
	function test(data) {
	    var dvector = parseD(data[2]);

	    var output = [0, 0];

	    for (var i = 0; i < 2; i++) {
	        output[i] = network[i].calc(data[0], data[1]);
	    };

	    if (output[0] + output[1] === -2) {
	        //this deals with the edge case where both nodes return -1
	        if (data[0] >= -.1) output[0] = 1;else output[1] = 1;
	    }

	    if (output[0] === dvector[0] && output[1] === dvector[1]) {
	        return true;
	    }
	    return false;
	}

	//parses the result element of the supplied training data into the expected results from the individual perceptrons
	function parseD(d) {
	    switch (d) {
	        case "-1":
	            return [-1, 1];
	        case "0":
	            return [1, 1];
	        case "1":
	            return [1, -1];
	        default:
	            console.log("hit default");
	    }
	}

	//train sets learning rate and then calls learn() for each point in the training dataset
	function train(learningRate, method) {

	    network[0].lRate = learningRate;
	    network[1].lRate = learningRate;

	    _.each(trainingData, function (data) {
	        var dvector = parseD(data[2]);
	        //this logic avoids calling perceptron.train on datapoints that don't help apply to it  
	        switch (data[2]) {
	            case "-1":
	                network[0].learn(method, data[0], data[1], dvector[0]);
	                break;
	            case "0":
	                network[0].learn(method, data[0], data[1], dvector[0]);
	                network[1].learn(method, data[0], data[1], dvector[1]);
	                break;
	            case "1":
	                network[1].learn(method, data[0], data[1], dvector[1]);
	                break;
	            default:
	                console.log("hit default");
	        }
	    });
	}
	//a global structure to keep track of current active perceptrons
	var network = [new perceptron(), new perceptron()];

	//experiment trains and tests networks iterativly with a given training method. once error is 0, it records some information out to the html
	function experiment(method) {
	    document.write('<h4>' + method + ':</h4>');
	    var ErrorProgress = "";
	    network = [new perceptron(), new perceptron()];

	    var start = new Date();
	    for (var i = 1; i < 100; i++) {
	        train(1 / i, method);
	        ErrorProgress += "iteration: " + i + " error:" + (trainingData.length - _.filter(trainingData, test).length) + "<br> ";
	        if (_.filter(trainingData, test).length == trainingData.length) break;
	    }
	    var finish = new Date();
	    var difference = new Date();
	    difference.setTime(finish.getTime() - start.getTime());

	    render(network);
	    document.write(ErrorProgress);
	    document.write('<h4> Final Score: ' + (_.filter(trainingData, test).length + '/' + trainingData.length) + '</h4>');
	    document.write('<h4> Final weights: ' + network[0].weights + '<br>' + network[1].weights + '</h4>');
	    document.write('Took ' + difference.getMilliseconds() + "ms");
	}

	experiment("Simple Feedback");
	experiment("Error Correction");

	//render writes out a grid of values with different unicode values correspoding to different output values
	function render(network) {
	    document.write('<p class="display">');

	    for (var y = 20; y > -20; y -= 1) {
	        //range of y values to display
	        for (var x = -20; x < 20; x += 1) {
	            //range of x values to display
	            if (network[0].calc(x, y) === 1 && network[1].calc(x, y) === 1) var chr = "&#9632;"; //unicode for black square
	            else if (network[0].calc(x, y) === 1) var chr = "1";else if (network[1].calc(x, y) === 1) var chr = "0";else var chr = "&#9633;"; //unicode for white square
	            document.write(chr);
	        }
	        document.write("<br>");
	    }
	    document.write("</p>");
	    document.write("<br>");
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	module.exports = [["20", "0", "1"], ["19.9969539", "0.349048128", "1"], ["19.98781654", "0.697989933", "1"], ["19.9725907", "1.046719124", "1"], ["19.95128101", "1.395129473", "1"], ["19.92389396", "1.743114853", "1"], ["19.89043791", "2.090569263", "1"], ["19.85092303", "2.437386865", "1"], ["19.80536138", "2.783462016", "1"], ["19.75376681", "3.128689297", "1"], ["19.69615506", "3.472963549", "1"], ["19.63254367", "3.816179903", "1"], ["19.56295202", "4.158233812", "1"], ["19.4874013", "4.499021082", "1"], ["19.40591453", "4.838437907", "1"], ["19.31851653", "5.176380896", "1"], ["19.22523392", "5.51274711", "1"], ["19.12609512", "5.847434088", "1"], ["19.02113033", "6.180339881", "1"], ["18.91037151", "6.511363082", "1"], ["18.79385242", "6.840402859", "1"], ["18.67160853", "7.167358983", "1"], ["18.54367709", "7.49213186", "1"], ["18.41009707", "7.814622561", "1"], ["18.27090916", "8.134732853", "1"], ["18.12615574", "8.452365226", "1"], ["17.97588093", "8.767422926", "1"], ["17.82013049", "9.079809985", "1"], ["17.65895186", "9.389431246", "1"], ["17.49239415", "9.696192395", "1"], ["17.32050808", "9.99999999", "1"], ["17.14334602", "10.30076149", "1"], ["16.96096193", "10.59838527", "1"], ["16.77341137", "10.89278069", "1"], ["16.58075146", "11.18385806", "1"], ["16.38304089", "11.47152872", "1"], ["16.1803399", "11.75570503", "1"], ["15.97271021", "12.03630045", "1"], ["15.76021508", "12.31322949", "1"], ["15.54291924", "12.58640781", "1"], ["15.32088887", "12.85575218", "1"], ["15.09419162", "13.12118057", "1"], ["14.86289652", "13.38261211", "1"], ["14.62707404", "13.63996719", "1"], ["14.38679602", "13.8931674", "1"], ["14.14213564", "14.14213561", "1"], ["13.89316742", "14.38679599", "1"], ["13.63996721", "14.62707402", "1"], ["13.38261214", "14.8628965", "1"], ["13.12118059", "15.09419159", "1"], ["12.85575221", "15.32088885", "1"], ["12.58640784", "15.54291922", "1"], ["12.31322952", "15.76021506", "1"], ["12.03630048", "15.97271019", "1"], ["11.75570506", "16.18033987", "1"], ["11.47152874", "16.38304087", "1"], ["11.18385809", "16.58075144", "1"], ["10.89278072", "16.77341135", "1"], ["10.5983853", "16.96096191", "1"], ["10.30076152", "17.143346", "0"], ["10.00000002", "17.32050806", "0"], ["9.696192426", "17.49239413", "0"], ["9.389431278", "17.65895185", "0"], ["9.079810017", "17.82013047", "0"], ["8.767422959", "17.97588091", "0"], ["8.452365258", "18.12615573", "0"], ["8.134732886", "18.27090914", "0"], ["7.814622594", "18.41009706", "0"], ["7.492131893", "18.54367708", "0"], ["7.167359017", "18.67160852", "0"], ["6.840402893", "18.79385241", "0"], ["6.511363116", "18.9103715", "0"], ["6.180339915", "19.02113032", "0"], ["5.847434122", "19.12609511", "0"], ["5.512747145", "19.22523391", "0"], ["5.176380931", "19.31851652", "0"], ["4.838437941", "19.40591452", "0"], ["4.499021117", "19.48740129", "0"], ["4.158233847", "19.56295201", "0"], ["3.816179938", "19.63254366", "0"], ["3.472963585", "19.69615505", "0"], ["3.128689333", "19.75376681", "0"], ["2.783462052", "19.80536137", "0"], ["2.437386901", "19.85092303", "0"], ["2.090569299", "19.8904379", "0"], ["1.743114889", "19.92389396", "0"], ["1.395129509", "19.951281", "0"], ["1.04671916", "19.97259069", "0"], ["0.697989969", "19.98781654", "0"], ["0.349048164", "19.9969539", "0"], ["3.59E-08", "20", "0"], ["-0.349048092", "19.9969539", "0"], ["-0.697989897", "19.98781654", "0"], ["-1.046719088", "19.9725907", "0"], ["-1.395129437", "19.95128101", "0"], ["-1.743114817", "19.92389397", "0"], ["-2.090569227", "19.89043791", "0"], ["-2.43738683", "19.85092304", "0"], ["-2.78346198", "19.80536138", "0"], ["-3.128689262", "19.75376682", "0"], ["-3.472963514", "19.69615507", "0"], ["-3.816179868", "19.63254368", "0"], ["-4.158233777", "19.56295202", "0"], ["-4.499021047", "19.4874013", "0"], ["-4.838437872", "19.40591454", "0"], ["-5.176380862", "19.31851654", "0"], ["-5.512747076", "19.22523393", "0"], ["-5.847434054", "19.12609513", "0"], ["-6.180339847", "19.02113034", "0"], ["-6.511363048", "18.91037153", "0"], ["-6.840402825", "18.79385243", "0"], ["-7.16735895", "18.67160855", "0"], ["-7.492131827", "18.54367711", "0"], ["-7.814622528", "18.41009709", "0"], ["-8.13473282", "18.27090917", "0"], ["-8.452365193", "18.12615576", "0"], ["-8.767422894", "17.97588095", "0"], ["-9.079809953", "17.8201305", "0"], ["-9.389431214", "17.65895188", "0"], ["-9.696192363", "17.49239417", "0"], ["-9.999999959", "17.3205081", "-1"], ["-10.30076146", "17.14334604", "-1"], ["-10.59838524", "16.96096195", "-1"], ["-10.89278066", "16.77341139", "-1"], ["-11.18385803", "16.58075148", "-1"], ["-11.47152869", "16.38304091", "-1"], ["-11.75570501", "16.18033992", "-1"], ["-12.03630042", "15.97271023", "-1"], ["-12.31322947", "15.7602151", "-1"], ["-12.58640778", "15.54291926", "-1"], ["-12.85575215", "15.3208889", "-1"], ["-13.12118054", "15.09419164", "-1"], ["-13.38261209", "14.86289654", "-1"], ["-13.63996716", "14.62707407", "-1"], ["-13.89316737", "14.38679604", "-1"], ["-14.14213559", "14.14213566", "-1"], ["-14.38679597", "13.89316745", "-1"], ["-14.627074", "13.63996724", "-1"], ["-14.86289647", "13.38261217", "-1"], ["-15.09419157", "13.12118062", "-1"], ["-15.32088883", "12.85575224", "-1"], ["-15.54291919", "12.58640786", "-1"], ["-15.76021504", "12.31322955", "-1"], ["-15.97271017", "12.03630051", "-1"], ["-16.18033985", "11.75570509", "-1"], ["-16.38304085", "11.47152877", "-1"], ["-16.58075142", "11.18385812", "-1"], ["-16.77341133", "10.89278075", "-1"], ["-16.96096189", "10.59838533", "-1"], ["-17.14334598", "10.30076155", "-1"], ["-17.32050805", "10.00000005", "-1"], ["-17.49239411", "9.696192458", "-1"], ["-17.65895183", "9.389431309", "-1"], ["-17.82013046", "9.079810049", "-1"], ["-17.9758809", "8.767422991", "-1"], ["-18.12615571", "8.452365291", "-1"], ["-18.27090913", "8.134732918", "-1"], ["-18.41009704", "7.814622627", "-1"], ["-18.54367707", "7.492131927", "-1"], ["-18.67160851", "7.16735905", "-1"], ["-18.79385239", "6.840402926", "-1"], ["-18.91037149", "6.51136315", "-1"], ["-19.02113031", "6.180339949", "-1"], ["-19.1260951", "5.847434157", "-1"], ["-19.2252339", "5.512747179", "-1"], ["-19.31851651", "5.176380966", "-1"], ["-19.40591451", "4.838437976", "-1"], ["-19.48740128", "4.499021152", "-1"], ["-19.562952", "4.158233882", "-1"], ["-19.63254366", "3.816179974", "-1"], ["-19.69615505", "3.47296362", "-1"], ["-19.7537668", "3.128689368", "-1"], ["-19.80536137", "2.783462087", "-1"], ["-19.85092302", "2.437386937", "-1"], ["-19.8904379", "2.090569334", "-1"], ["-19.92389396", "1.743114924", "-1"], ["-19.951281", "1.395129545", "-1"], ["-19.97259069", "1.046719195", "-1"], ["-19.98781654", "0.697990005", "-1"], ["-19.9969539", "0.3490482", "-1"], ["-20", "7.18E-08", "-1"], ["-19.9969539", "-0.349048057", "-1"], ["-19.98781654", "-0.697989862", "-1"], ["-19.9725907", "-1.046719052", "-1"], ["-19.95128101", "-1.395129402", "-1"], ["-19.92389397", "-1.743114781", "-1"], ["-19.89043792", "-2.090569192", "-1"], ["-19.85092304", "-2.437386794", "-1"], ["-19.80536139", "-2.783461945", "-1"], ["-19.75376682", "-3.128689226", "-1"], ["-19.69615507", "-3.472963479", "-1"], ["-19.63254368", "-3.816179833", "-1"], ["-19.56295203", "-4.158233741", "-1"], ["-19.48740131", "-4.499021012", "-1"], ["-19.40591454", "-4.838437837", "-1"], ["-19.31851655", "-5.176380827", "-1"], ["-19.22523394", "-5.512747041", "-1"], ["-19.12609514", "-5.847434019", "-1"], ["-19.02113035", "-6.180339812", "-1"], ["-18.91037154", "-6.511363014", "-1"], ["-18.79385244", "-6.840402792", "-1"], ["-18.67160856", "-7.167358916", "-1"], ["-18.54367712", "-7.492131794", "-1"], ["-18.4100971", "-7.814622495", "-1"], ["-18.27090919", "-8.134732787", "-1"], ["-18.12615578", "-8.452365161", "-1"], ["-17.97588096", "-8.767422862", "-1"], ["-17.82013052", "-9.079809921", "-1"], ["-17.6589519", "-9.389431182", "-1"], ["-17.49239418", "-9.696192332", "-1"], ["-17.32050812", "-9.999999927", "-1"], ["-17.14334606", "-10.30076143", "-1"], ["-16.96096197", "-10.59838521", "-1"], ["-16.77341141", "-10.89278063", "-1"], ["-16.5807515", "-11.183858", "-1"], ["-16.38304093", "-11.47152866", "-1"], ["-16.18033994", "-11.75570498", "-1"], ["-15.97271025", "-12.03630039", "-1"], ["-15.76021513", "-12.31322944", "-1"], ["-15.54291928", "-12.58640775", "-1"], ["-15.32088892", "-12.85575213", "-1"], ["-15.09419166", "-13.12118051", "-1"], ["-14.86289657", "-13.38261206", "-1"], ["-14.62707409", "-13.63996714", "-1"], ["-14.38679607", "-13.89316734", "-1"], ["-14.14213569", "-14.14213556", "-1"], ["-13.89316747", "-14.38679594", "-1"], ["-13.63996727", "-14.62707397", "-1"], ["-13.38261219", "-14.86289645", "-1"], ["-13.12118065", "-15.09419154", "-1"], ["-12.85575226", "-15.3208888", "-1"], ["-12.58640789", "-15.54291917", "-1"], ["-12.31322958", "-15.76021502", "-1"], ["-12.03630054", "-15.97271015", "-1"], ["-11.75570512", "-16.18033983", "-1"], ["-11.4715288", "-16.38304083", "-1"], ["-11.18385815", "-16.5807514", "-1"], ["-10.89278078", "-16.77341131", "-1"], ["-10.59838537", "-16.96096187", "-1"], ["-10.30076158", "-17.14334596", "-1"], ["-10.00000008", "-17.32050803", "-1"], ["-9.696192489", "-17.4923941", "-1"], ["-9.389431341", "-17.65895181", "-1"], ["-9.079810081", "-17.82013044", "-1"], ["-8.767423023", "-17.97588088", "-1"], ["-8.452365323", "-18.1261557", "-1"], ["-8.134732951", "-18.27090911", "-1"], ["-7.81462266", "-18.41009703", "-1"], ["-7.49213196", "-18.54367705", "-1"], ["-7.167359084", "-18.67160849", "-1"], ["-6.84040296", "-18.79385238", "-1"], ["-6.511363184", "-18.91037148", "-1"], ["-6.180339983", "-19.02113029", "-1"], ["-5.847434191", "-19.12609509", "-1"], ["-5.512747214", "-19.22523389", "-1"], ["-5.176381", "-19.3185165", "-1"], ["-4.838438011", "-19.4059145", "-1"], ["-4.499021187", "-19.48740127", "-1"], ["-4.158233917", "-19.56295199", "-1"], ["-3.816180009", "-19.63254365", "-1"], ["-3.472963655", "-19.69615504", "-1"], ["-3.128689404", "-19.7537668", "-1"], ["-2.783462123", "-19.80536136", "-1"], ["-2.437386972", "-19.85092302", "-1"], ["-2.09056937", "-19.8904379", "-1"], ["-1.74311496", "-19.92389395", "-1"], ["-1.395129581", "-19.951281", "-1"], ["-1.046719231", "-19.97259069", "-1"], ["-0.697990041", "-19.98781654", "-1"], ["-0.349048236", "-19.9969539", "-1"], ["-1.08E-07", "-20", "1"], ["0.349048021", "-19.99695391", "1"], ["0.697989826", "-19.98781654", "1"], ["1.046719016", "-19.9725907", "1"], ["1.395129366", "-19.95128101", "1"], ["1.743114746", "-19.92389397", "1"], ["2.090569156", "-19.89043792", "1"], ["2.437386758", "-19.85092305", "1"], ["2.783461909", "-19.80536139", "1"], ["3.128689191", "-19.75376683", "1"], ["3.472963443", "-19.69615508", "1"], ["3.816179798", "-19.63254369", "1"], ["4.158233706", "-19.56295204", "1"], ["4.499020977", "-19.48740132", "1"], ["4.838437802", "-19.40591455", "1"], ["5.176380792", "-19.31851656", "1"], ["5.512747007", "-19.22523395", "1"], ["5.847433985", "-19.12609515", "1"], ["6.180339778", "-19.02113036", "1"], ["6.51136298", "-18.91037155", "1"], ["6.840402758", "-18.79385246", "1"], ["7.167358883", "-18.67160857", "1"], ["7.49213176", "-18.54367713", "1"], ["7.814622462", "-18.41009711", "1"], ["8.134732754", "-18.2709092", "1"], ["8.452365128", "-18.12615579", "1"], ["8.76742283", "-17.97588098", "1"], ["9.079809889", "-17.82013054", "1"], ["9.389431151", "-17.65895191", "1"], ["9.696192301", "-17.4923942", "1"], ["9.999999896", "-17.32050814", "1"], ["10.3007614", "-17.14334608", "1"], ["10.59838518", "-16.96096199", "1"], ["10.8927806", "-16.77341142", "1"], ["11.18385797", "-16.58075152", "1"], ["11.47152863", "-16.38304096", "1"], ["11.75570495", "-16.18033996", "1"], ["12.03630037", "-15.97271027", "1"], ["12.31322941", "-15.76021515", "1"], ["12.58640773", "-15.54291931", "1"], ["12.8557521", "-15.32088894", "1"], ["13.12118049", "-15.09419169", "1"], ["13.38261203", "-14.86289659", "1"], ["13.63996711", "-14.62707412", "1"], ["13.89316732", "-14.38679609", "1"], ["14.14213553", "-14.14213571", "1"], ["14.38679592", "-13.8931675", "1"], ["14.62707395", "-13.63996729", "1"], ["14.86289642", "-13.38261222", "1"], ["15.09419152", "-13.12118068", "1"], ["15.32088878", "-12.85575229", "1"], ["15.54291915", "-12.58640792", "1"], ["15.76021499", "-12.31322961", "1"], ["15.97271012", "-12.03630057", "1"], ["16.18033981", "-11.75570515", "1"], ["16.38304081", "-11.47152883", "1"], ["16.58075138", "-11.18385818", "1"], ["16.77341129", "-10.89278081", "1"], ["16.96096185", "-10.5983854", "1"], ["17.14334595", "-10.30076161", "1"], ["17.32050801", "-10.00000011", "1"], ["17.49239408", "-9.69619252", "1"], ["17.6589518", "-9.389431373", "1"], ["17.82013042", "-9.079810113", "1"], ["17.97588087", "-8.767423056", "1"], ["18.12615568", "-8.452365356", "1"], ["18.2709091", "-8.134732984", "1"], ["18.41009702", "-7.814622694", "1"], ["18.54367704", "-7.492131993", "1"], ["18.67160848", "-7.167359117", "1"], ["18.79385237", "-6.840402994", "1"], ["18.91037147", "-6.511363218", "1"], ["19.02113028", "-6.180340017", "1"], ["19.12609508", "-5.847434225", "1"], ["19.22523388", "-5.512747248", "1"], ["19.31851649", "-5.176381035", "1"], ["19.40591449", "-4.838438046", "1"], ["19.48740126", "-4.499021222", "1"], ["19.56295199", "-4.158233952", "1"], ["19.63254364", "-3.816180044", "1"], ["19.69615504", "-3.472963691", "1"], ["19.75376679", "-3.128689439", "1"], ["19.80536136", "-2.783462158", "1"], ["19.85092302", "-2.437387008", "1"], ["19.89043789", "-2.090569406", "1"], ["19.92389395", "-1.743114996", "1"], ["19.951281", "-1.395129617", "1"], ["19.97259069", "-1.046719267", "1"], ["19.98781654", "-0.697990077", "1"], ["19.9969539", "-0.349048272", "1"], ["20", "-1.44E-07", "1"]];

/***/ }
/******/ ]);