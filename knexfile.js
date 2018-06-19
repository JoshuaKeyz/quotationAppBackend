// Update with your config settings.

module.exports = {

	development: {
		client: "pg",
		connection: {
			user: "rest_api", 
			password: "example", 
			database: "rest_api", 
			host: "db", 
			port: 5432
		},
		migrations: {
			directory: __dirname + "/db/migrations"
		},
		seeds: {
			directory: __dirname + "/db/seeds"
		}
	},

	test: {
		client: "pg",
		connection: {
			database: "rest_api_test",
			user:     "rest_api_test",
			password: "example",
			host: "127.0.0.1", 
			port: 5434
		},
		migrations: {
			directory: __dirname + "/db/migrations"
		},
		seeds: {
			directory: __dirname + "/db/seeds"
		}
	}
};
