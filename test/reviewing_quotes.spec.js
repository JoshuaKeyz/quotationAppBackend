process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
let should = require("chai").should;
let expect = require("chai").expect;
let knex = require("../db/knex");
let agent = chai.request.agent(server);
chai.use(chaiHttp);

describe("Contractor reviewing of quotes", ()=>{
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
    
	it("if contractor is not signedin return {error: 'not signedin'}", (done)=>{
		agent.put("/contractors/quotes?contractor_id=1")
			.send({
				quote_id: 1,
				labor: 500,
				expenses: 500,
				sales_task: 300,
				miscellaneous: 300,
				total: 1600
			})
			.then((res)=>{
				res.should.be.json;
				res.body.should.have.property("error");
				res.body.error.should.equal("not signedin");
				done();
			});

	});

	it("if contractor is signed in return {status: 'success'}", (done)=>{
		agent.post("/contractors/signin")
			.send({
				email:"jean.morgan@example.com", 
				password: "example"
			})
			.then(function(res){
				expect(res).to.have.cookie("sessionid");
				let Cookies = res.headers["set-cookie"];
            
				agent.put("/contractors/quotes?contractor_id=1")
					.set("Cookie", Cookies)
					.send({
						quote_id: 1,
						labor: 500,
						expenses: 500,
						sales_task: 300,
						miscellaneous: 300,
						total: 1600 
					})
					.then(function(res){
						res.should.be.json;
						res.body.should.have.property("status");
						res.body.status.should.equal("success");
						done();
					});
			});
	});
});