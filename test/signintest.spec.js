process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
let should = require("chai").should;
let knex = require("../db/knex");
chai.use(chaiHttp);

describe("Contractor sign in", ()=>{
	beforeEach((done)=>{
		knex.migrate.rollback()
			.then(function(){
				knex.migrate.latest()
					.then(function(){
						return knex.seed.run()
							.then(function(){
								done();
							});
					});
			});
	});

	afterEach((done)=>{
		knex.migrate.rollback()
			.then(function(){
				done();
			});
	});
    
	it("If the email is not valid throw {error: 'invalid email'}", (done)=>{
		chai.request(server)
			.post("/contractors/signin")
			.send({
				email: "", 
				password: "", 
			})
			.end(function(err, res){
				res.should.be.json;
				res.should.have.property("error");
				done();
			});
	});

	it("If the email and password does not match any record, throw {error: 'incorrect username/password'", (done)=>{
		chai.request(server)
			.post("/contractors/signin")
			.send({
				email: "not_matching@outlook.com",
				password: "not_matching"
			})
			.end(function(err, res){
				res.should.be.json;
				res.body.should.have.property("error");
				res.body.error.should.equal("incorrect username/password");
				done();
			});
	});
	it("If the email and password does match, sign in the user by setting up session varaiable", (done)=>{
		chai.request(server)
			.post("/contractors/signin")
			.send({
				email:"jean.morgan@example.com", 
				password: "example", 
			})
			.end(function(err, res){
				res.should.be.json;
				res.body.should.have.property("status");
				res.body.status.should.equal("success");
				res.body.signIn.should.equal(true);
				done();
			});
	});
});
describe("Consumer sign in", ()=>{
	beforeEach((done)=>{
		knex.migrate.rollback()
			.then(function(){
				knex.migrate.latest()
					.then(function(){
						return knex.seed.run()
							.then(function(){
								done();
							});
					});
			});
	});

	afterEach((done)=>{
		knex.migrate.rollback()
			.then(function(){
				done();
			});
	});
    
	it("If the email is not valid throw {error: 'invalid email'}", (done)=>{
		chai.request(server)
			.post("/consumers/signin")
			.send({
				email: "", 
				password: "", 
			})
			.end(function(err, res){
				res.should.be.json;
				res.should.have.property("error");
				done();
			});
	});

	it("If the email and password does not match any record, throw {error: 'incorrect username/password'", (done)=>{
		chai.request(server)
			.post("/consumers/signin")
			.send({
				email: "not_matching@outlook.com",
				password: "not_matching"
			})
			.end(function(err, res){
				res.should.be.json;
				res.body.should.have.property("error");
				res.body.error.should.equal("incorrect username/password");
				done();
			});
	});
	it("If the email and password does match, sign in the user by setting up session varaiable", (done)=>{
		chai.request(server)
			.post("/consumers/signin")
			.send({
				email: "jeorge.richardson@example.com", 
				password: "example",
			})
			.end(function(err, res){
				res.should.be.json;
				res.body.should.have.property("status");
				res.body.status.should.equal("success");
				done();
			});
	});
});