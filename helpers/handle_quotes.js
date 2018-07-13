let handleStatus = require('./handle_status');
module.exports = function handleQuotes(model, req, res, Quotes){
	if(!model){
		res.jsonp({error: 'invalid quotation'});
		return;
	}

	if(req.body.action == 'accept'){	//checks if the action to be made is "accept"
		handleStatus(model, req, res, Quotes, 'accepted');
			

	}else{	
		handleStatus(model,req,  res, Quotes, 'rejected');
	}
};
