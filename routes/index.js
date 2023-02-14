var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

module.exports = router;


const db = require("../db");
 
/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await db.findAll();
    res.render('index', { title: 'Lista de Clientes', docs });
  } catch (err) {
    next(err);
  }
})
