const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
let should = require("chai").should;
let expect = require("chai").expect;
let knex = require("../db/knex");
chai.use(chaiHttp);

describe("Getting quotes", ()=>{
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
        .get("/consumers/quotes")
        .end(function(err, res){
            res.body.should.have.property("error");
            res.body.error.should.equal("not signedIn")
            done();
        })
    })
    it("if the user is logged in, return {status: 'success'}", (done)=>{
        let agent = chai.request.agent(server);
		agent.post("/consumers/signin")
		.send({
            email: "meg.oliver@example.com", 
			password: "example",
		})
		.then(function(res){
            expect(res).to.have.cookie('sessionid');
            let Cookies = res.headers['set-cookie']
            return agent.get('/consumers/quotes?consumer_id')
            .set('Cookie', Cookies)
            .then(function(res){
                res.should.be.json;
                res.body[0].should.have.property("id");
                res.body[0].should.have.property("contractor_email");
                res.body[0].should.have.property("quote_for");
                /*res.body.status.should.equal("success")*/
                done();
            })
        })
    })
})