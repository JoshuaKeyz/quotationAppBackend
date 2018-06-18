const chai = require('chai');
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();

chai.use(chaiHttp);

describe("Registration of contractors", ()=>{
    it("If any of first_name, last_name, email, password, location, return error", (done)=>{
        chai.request(server)
        .post("/contractors/register")
        .send({
            first_name: "Joshua", 
            last_name: "Oguma", 
            password: "password-with-no-email-or-location"
        })
        .then(function(err, res){
            res.body.should.be.json;
            done();
        })
    })
})