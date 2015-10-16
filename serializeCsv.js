var fs = require("fs");
var _ = require("underscore")

var data = fs.readFileSync('data.csv').toString();

function parseCSV(str) {
    return _.reduce(str.split("\r\n"), function(table, row) {
        table.push(_.map(row.split(","), function(c) {
            return c.trim()
        }));
        return table;
    }, []);
};


fs.writeFileSync("js/trainingData.js", 'module.exports =' + JSON.stringify(parseCSV(data)));
console.log("wrote to trainingData.js")
