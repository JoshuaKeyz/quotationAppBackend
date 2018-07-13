module.exports = function(req){
	return req.body.action == 'accept' || req.body.action == 'reject';
};