var paypal = require('paypal-rest-sdk');
var config = {};
 
/*
 * GET home page.
 */
 
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
 
/*
 * SDK configuration
 */
 
exports.init = function(c){
  config = c;
  paypal.configure(c.api);
}

exports.create = function(req, res){
  var payment = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": "http://yoururl.com/execute",
    "cancel_url": "http://yoururl.com/cancel"
  },
  "transactions": [{
    "amount": {
      "total": "5.00",
      "currency": "USD"
    },
    "description": "My awesome payment"
  }]
};
  paypal.payment.create(payment, function (error, payment) {
    if (error) {
      console.log(error);
    } else {
      console.log(payment);
    }   
  });
}