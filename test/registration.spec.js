process.env.NODE_ENV = 'test';

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();
const knex = require("../db/knex");

chai.use(chaiHttp);

describe("Registration of contractors", ()=>{

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
    
	it("If any of first_name, last_name, email, password, location, return error", (done)=>{
		chai.request(server)
			.post("/contractors/register")
			.send({
				first_name: "Joshua", 
				last_name: "Oguma", 
				password: "password-with-no-email-or-location"
			})
			.end(function(err, res){
				res.should.be.json;
				res.body.should.have.property("error");
				res.body.error.should.equal("insufficient values provided");
				done();
			});
	});
	it("If an invalid email is provided, return {error: 'invalid email provided'}", (done)=>{
		chai.request(server)
			.post("/contractors/register")
			.send({
				first_name: "Joshua", 
				last_name: "Oguma", 
				email: "wrong_email", 
				password: "mypass",
				location: "(0, 0)"
			})
			.end((err, res)=>{
				res.should.be.json;
				res.body.should.have.property("error");
				res.body.error.should.equal("invalid email provided");
				done();
			});
	});
	it("if email is already registered, return {error: 'email already registered'", (done)=>{
		chai.request(server)
			.post("/contractors/register")
			.send({
				first_name: "liverr", 
				last_name: "johnson",
				email:"liver.johnson@example.com", 
				password: "example", 
				location: "(0.10, 50)"
			})
			.end(function(err, res){
				res.should.be.json;
				res.body.should.have.property("error");
				res.body.error.should.equal("email already registered");
				done();
			});
	});

	it("if email is not already registed, return the registered initials", (done)=>{
		chai.request(server)
			.post("/contractors/register")
			.send({
				id: 50,
				first_name: "Joshua", 
				last_name: "Oguma",
				email: "joshua.oguma@outlook.com",
				password:"mypassword", 
				location: "(6.66, 70.98)"
			})
			.end(function(err, res){
				res.should.be.json;
				res.body.should.have.property("first_name");
				res.body.should.have.property("last_name");
				res.body.should.have.property("email");
				res.body.should.have.property("password");
				res.body.should.have.property("location");
				done();
			});
	});
});


describe("Registration of consumers", ()=>{

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
    
	it("If any of first_name, last_name, email, password, location, return error", (done)=>{
		chai.request(server)
			.post("/consumers/register")
			.send({
				first_name: "Joshua", 
				last_name: "Oguma", 
				password: "password-with-no-email-or-location"
			})
			.end(function(err, res){
				res.should.be.json;
				res.body.should.have.property("error");
				res.body.error.should.equal("insufficient values provided");
				done();
			});
	});
	it("If an invalid email is provided, return {error: 'invalid email provided'}", (done)=>{
		chai.request(server)
			.post("/consumers/register")
			.send({
				first_name: "Joshua", 
				last_name: "Oguma", 
				email: "wrong_email", 
				password: "mypass",
				location: "(0, 0)"
			})
			.end((err, res)=>{
				res.should.be.json;
				res.body.should.have.property("error");
				res.body.error.should.equal("invalid email provided");
				done();
			});
	});
	it("if email is already registered, return {error: 'email already registered'", (done)=>{
		chai.request(server)
			.post("/consumers/register")
			.send({
				first_name: "Meg", 
				last_name: "Oliver", 
				email: "meg.oliver@example.com", 
				password: "example",
				location: "(0.11, 98)"
			})
			.end(function(err, res){
				res.should.be.json;
				res.body.should.have.property("error");
				res.body.error.should.equal("email already registered");
				done();
			});
	});

	it("if email is not already registed, return the registered initials", (done)=>{
		chai.request(server)
			.post("/consumers/register")
			.send({
				id: 3,
				first_name: "Joshua", 
				last_name: "Oguma",
				email: "joshua.oguma@outlook.com",
				password:"mypassword", 
				location: "(6.66, 70.98)"
			})
			.end(function(err, res){
				res.should.be.json;
				res.body.should.have.property("first_name");
				res.body.should.have.property("last_name");
				res.body.should.have.property("email");
				res.body.should.have.property("password");
				res.body.should.have.property("location");
				done();
			});
	});
});