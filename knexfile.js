// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      user: "rest_api", 
      password: "rest_api", 
      database: "rest_api", 
      host: '127.0.0.1', 
      port: 5433
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  },

  test: {
    client: 'pg',
    connection: {
      database: 'rest_api_test',
      user:     'rest_api_test',
      password: 'rest_api_test',
      host: '127.0.0.1', 
      port: 5433
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  }
};
