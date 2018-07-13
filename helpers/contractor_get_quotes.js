module.exports = function contractorGetQuotes(model, res, coordist){
	let retObj = [];
	model.toJSON().forEach(obj=>{
		let contractor_location = obj.contractor_id.location;
		let consumer_location = obj.consumer_id.location;
		let distance = coordist.distance(contractor_location, consumer_location, true);

		retObj.push({
			id: obj.id,
			quote_name: obj.title,
			quote_id: obj.id,
			quote_for: `${obj.consumer_id.first_name} ${obj.consumer_id.last_name}`,
			contractor_email: obj.contractor_id.email,
			distance_from_consumer: distance,
			labor: obj.labor,
			expenses: obj.expenses,
			sales_task: obj.sales_task,
			miscellaneous: obj.miscellaneous,
			total: obj.total,
			status: obj.status
		});
	});
	res.jsonp(retObj);
};