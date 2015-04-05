exports.create = function(req, res){
  var payment = ...
  paypal.payment.create(payment, function (error, payment) {
    if (error) {
      console.log(error);
    } else {
      ...
    }   
  });
}