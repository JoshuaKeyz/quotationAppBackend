const bookshelf = require("../bookshelf");
var Quotes = require("./Quotes");

var Contractor = bookshelf.Model.extend({
	tableName: "contractors",
	idAttribute: 4,
	quotes: function(){
		return this.hasMany(Quotes);
	}
});

module.exports = Contractor;