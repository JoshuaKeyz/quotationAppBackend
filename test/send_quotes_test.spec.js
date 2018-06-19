process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
let should = require("chai").should;
let expect = require("chai").expect;
let knex = require("../db/knex");
chai.use(chaiHttp);

describe("Sending quotes", ()=>{
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

	it("If the user is not loggedIn, return {error: 'not signedIn'}", (done)=>{
		chai.request(server)
			.post("/contractors/sendquotes")
			.send({
				contractor_id: 1, 
				consumer_id: 1, 
				labor: 700,
				expenses: 800,
				sales_task: 50, 
				miscellaneous: 30,
				total: 1580,
				status: "pending"
			})
			.end((err, res)=>{
				res.should.be.json;
				res.body.should.have.property("error");
				done();
			});
	});
	it("If the user is loggedIn, send quotes", (done)=>{
		let agent = chai.request.agent(server);
		agent.post("/contractors/signIn")
			.send({
				email:"jean.morgan@example.com", 
				password: "example", 
			})
			.then(function(res){
				expect(res).to.have.cookie("sessionid");
				res.body.should.have.property("status");
				res.body.status.should.equal("success");
				Cookies = res.headers["set-cookie"];//.pop().split(';')[0]
				return chai.request(server)
					.post("/contractors/sendquotes")
					.set("Cookie", Cookies)
					.send({
						contractor_id: 1, 
						consumer_id: 1, 
						labor: 700,
						expenses: 800,
						sales_task: 50, 
						miscellaneous: 30,
						total: 1580
					})
					.then(function(res){
						res.body.should.have.property("status");
						res.body.status.should.equal("success");
						res.body.should.have.property("model");
						res.body.model.labor.should.equal(700);
						res.body.model.expenses.should.equal(800);
						res.body.model.sales_task.should.equal(50);
						done();
					});
			});
	});

	it("If a quote is sent without all the required fields, return {error: 'invalid quotation'}", (done)=>{
		let agent = chai.request.agent(server);
		agent.post("/contractors/signIn")
			.send({
				email:"jean.morgan@example.com", 
				password: "example", 
			})
			.then(function(res){
				expect(res).to.have.cookie("sessionid");
				res.body.should.have.property("status");
				res.body.status.should.equal("success");
				Cookies = res.headers["set-cookie"];//.pop().split(';')[0]
				return chai.request(server)
					.post("/contractors/sendquotes")
					.set("Cookie", Cookies)
					.send({
						contractor_id: 1, 
						consumer_id: 1, 
						labor: 700,
						expenses: 800,
						sales_task: 50, 
						//Purposefully leaving out miscellaneous
						//miscellaneous: 30,
						total: 1580,
						
					})
				
					.then(function(res){
						res.body.should.have.property("error");
						res.body.error.should.equal('invalid quotation');
						done();
					});
			});
	})
});