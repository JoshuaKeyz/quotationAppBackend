const bookshelf = require("../bookshelf");
var Quotes = require("./Quotes");

var Consumer = bookshelf.Model.extend({
	tableName: "consumers",
	quotes: function(){
		return this.hasMany(Quotes);
	}
});

module.exports = Consumer;