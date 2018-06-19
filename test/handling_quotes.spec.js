const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
let should = require("chai").should;
let expect = require("chai").expect;
let knex = require("../db/knex");
chai.use(chaiHttp);

describe("Consumer Handling of quotes", ()=>{
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
        .put("/consumers/handlequotes")
        .end(function(err, res){
            res.body.should.have.property("error");
            res.body.error.should.equal("not signedIn")
            done();
        })
    })
    it("The user should be able to reject a quote", (done)=>{
		let agent = chai.request.agent(server)
		
		agent.post("/consumers/signin")
		.send({
            email: "meg.oliver@example.com", 
			password: "example",
		})
		.then(function(res){
			expect(res).to.have.cookie("sessionid");
			let Cookies = res.headers['set-cookie']

			return agent.put("/consumers/handlequotes?consumer_id=1")
			.set("Cookie", Cookies)
			.send({
				quote_id: 1, 
				action: 'reject'
			})
			.then(function(res){
				res.should.be.json;
				done();
			})
			
		})
		
	})
	it("The user should be able to accept a quote", (done)=>{
		let agent = chai.request.agent(server)
		agent.post("/consumers/signin")
		.send({
            email: "meg.oliver@example.com", 
			password: "example",
		})
		.then(function(res){
			expect(res).to.have.cookie("sessionid");
			let Cookies = res.headers['set-cookie']

			return agent.put("/consumers/handlequotes?consumer_id=1")
			.set("Cookie", Cookies)
			.send({
				quote_id: 1, 
				action: 'accept'
			})
			.then(function(res){
				res.should.be.json;
				done();
			})
		})
	})
})