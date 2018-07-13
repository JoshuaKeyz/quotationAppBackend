const bookshelf = require('../bookshelf');

var Quote = bookshelf.Model.extend({
	tableName: 'quotes',
	consumer_id: function(){
		return this.belongsTo(require('./Consumer'));
	},
	contractor_id: function(){
		return this.belongsTo(require('./Contractor'));
	}
}
);

module.exports = Quote;