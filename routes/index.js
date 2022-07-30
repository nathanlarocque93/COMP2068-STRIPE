var express = require('express');
var router = express.Router();
var fs = require('fs');

// If not in production, run .env dependencies
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: '.env'});
}

// STRIPE KEYS
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

console.log(stripePublicKey)

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  fs.readFile('products.json', (error, data) => {
    if (error) {
      res.status(500).end();
    } else {
      res.render('index.ejs', {
        stripePublicKey: stripePublicKey,
        products: JSON.parse(data)
      });
    }
  });
});

/* GET success page. */
router.get('/success', function(req, res, next) {
  res.render('success', { title: 'Success' });
});

module.exports = router;
