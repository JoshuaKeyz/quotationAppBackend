module.exports = function(req){
	return 'consumer_id' in req.query;
};