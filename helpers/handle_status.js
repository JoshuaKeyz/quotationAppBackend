module.exports = function handleStatus(model, req, res, Quotes, status){
	if(model.toJSON().status == 'pending'){	//If the quote received is "pending" accept it.
		new Quotes({id: req.body.quote_id, consumer_id: req.query.consumer_id})
			.save('status', status, {method: 'update'})
			.then(function sendResponse(model){
				res.jsonp(model.toJSON());
			});
	}else if(model.toJSON().status == 'accepted'){ // if the quote was already accepted, return error
		res.jsonp({error: 'quote already accepted'});
	}else{
		res.jsonp({error: 'quote already rejected'}); // if the quote was already rejected, return error also
	}
};
