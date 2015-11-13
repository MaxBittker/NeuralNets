var fs = require("fs");
var _ = require("underscore")

var data = fs.readFileSync('sound.csv').toString();

function parseCSV(str) {
    return _.reduce(str.split("\n"), function(table, row) {
        table.push(_.map(row.split(","), function(c) {
            return c.trim()
        }));
        return table;
    }, []);
};


fs.writeFileSync("js/trainingData4.js", 'module.exports =' + JSON.stringify(parseCSV(data)));
console.log("wrote to trainingData.js")
