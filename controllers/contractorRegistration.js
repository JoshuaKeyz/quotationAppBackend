let emailValidator = require("../helpers/email_validator")
module.exports = (req, res)=>{
    if(emailValidator(req.body.email)){
        
    }else{
        res.jsonp({error: "insufficient values provided"})
    }
    
}