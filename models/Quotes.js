const bookshelf = require("../bookshelf");
const Contractor = require("./Contractor");
const Consumer = require("./Consumer");
var Quote = bookshelf.Model.extend({
	tableName: "quotes",
	contractor_id: function(){
		return this.belongsTo(Contractor);
	},
	consumer_id: function(){
		return this.belongsTo(Consumer);
	}
}
);

module.exports = Quote;