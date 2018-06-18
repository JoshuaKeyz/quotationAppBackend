
exports.seed = function(knex, Promise) {
  // contractors seeding process
  return knex('contractors').del()
    .then(function () {
      // Inserts seed entries
      return knex('contractors').insert(
        {
          id: 1,
          first_name: "jean", 
          last_name: "morgan",
          email:"jean.morgan@example.com", 
          password: "example", 
          location: "(0.10, 50)"
        }
      );
    })
    .then(function(){
      return knex('contractors').insert(
        {
          id: 2,
          first_name: "liverr", 
          last_name: "johnson",
          email:"liver.johnson@example.com", 
          password: "example", 
          location: "(0.10, 50)"
        }
      );
    })
    //consumers seeding process
    .then(function(){
      console.log()
      return knex("consumers").del();
    })
    .then(function(){
      return knex("consumers").insert({
        id: 1,
        first_name: "Meg", 
        last_name: 'Oliver', 
        email: 'meg.oliver@example.com', 
        password: "example",
        location: "(0.11, 98)"
      })
    })
    .then(function(){
      return knex("consumers").insert({
        id: 2,
        first_name: "Jeorge", 
        last_name:"Richarson", 
        email: "jeorge.richardson@example.com", 
        password: "example",
        location: "(60.78, 98.88)"
      })
    })
    //quotes seeding process
    .then(function(){
      return knex("quotes").del();
    })
    .then(function () {
			return knex("quotes").insert({
				contractor_id: 1,
				consumer_id: 1,
				labor: 500,
				expenses: 600,
				sales_task: 50,
				miscellaneous: 20,
				total: 1170,
				status: "pending",
			});
		})
		.then(function(){
			return knex("quotes").insert({
				contractor_id: 1, 
				consumer_id: 1, 
				labor: 700,
				expenses: 800,
				sales_task: 50, 
				miscellaneous: 30,
				total: 1580,
				status: "pending"
			});
		})
		.then(function(){
			return knex("quotes").insert({

				contractor_id: 1, 
				consumer_id: 1, 
				labor: 500, 
				expenses: 500,
				sales_task: 500, 
				miscellaneous: 500, 
				total: 2500, 
				status: "rejected"
			});
		});
};
