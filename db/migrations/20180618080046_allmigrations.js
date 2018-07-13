exports.up = function(knex) {
	return knex.schema.createTable('consumers', function(table){
		table.increments('id').unsigned().primary();
		table.string('first_name').notNullable();
		table.string('last_name').notNullable();
		table.string('email').notNullable();
		table.string('password').notNullable();
		table.specificType('location', 'point');
	})
		.then(function(){
			return knex.schema.createTable('contractors', function(table){
				table.increments('id').unsigned().primary();
				table.string('first_name').notNullable();
				table.string('last_name').notNullable();
				table.string('email').notNullable();
				table.string('password').notNullable();
				table.specificType('location', 'point');
			});
		})
		.then(function(){
			return knex.schema.createTable('quotes', function(table){
				table.increments('id').unsigned().primary();
				table.string('title');
				table.integer('consumer_id');
				table.integer('contractor_id');
				table.integer('labor').notNullable();
				table.integer('expenses').notNullable();
				table.integer('sales_task');
				table.integer('miscellaneous');
				table.integer('total');
				table.enu('status', ['pending', 'accepted', 'rejected']);
				table.timestamp('created_at').defaultTo(knex.fn.now());
  
				table.foreign('contractor_id').references('id').inTable('contractors') 
					.onDelete('cascade')
					.onUpdate('cascade');
          
				table.foreign('consumer_id').references('id').inTable('consumers')
					.onDelete('cascade')
					.onUpdate('cascade');
			});
		});
};
  
exports.down = function(knex) {
	return knex.schema.dropTable('quotes')
		.then(function(){
			return knex.schema.dropTable('contractors');
		})
		.then(function(){
			return knex.schema.dropTable('consumers');
		});
};
  