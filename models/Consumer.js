const bookshelf = require("../bookshelf");
const Quotes = require("./Quotes");

var Consumer = bookshelf.Model.extend({
	tableName: "consumers",
	quotes: function(){
		return this.hasMany(Quotes);
	}
});

module.exports = Consumer;
