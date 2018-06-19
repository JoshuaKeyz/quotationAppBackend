/*var pg = require('knex')({
    client: 'pg',
    connection: {
      host: "127.0.0.1", 
      user: "joshua",
      password: "jobtest",
      database: "mydb"
  }
});*/
let pg;
var knexfile = require("./knexfile");
if(process.env.NODE_ENV == "test"){
	pg = require("knex")({client: "pg", connection: knexfile["test"].connection});
}else{
	pg = require("knex")({client: "pg", connection: knexfile["development"].connection});
}


const bookshelf = require("bookshelf")(pg);
bookshelf.plugin('registry');

module.exports = bookshelf