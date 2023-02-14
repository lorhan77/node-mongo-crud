var express = require('express');
var router = express.Router();

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

// GET novo cliente
router.get('/novo', (req, res, next) => {
//  res.render('novo', { title: 'Novo Cadastro' });
res.render('novo', { title: 'Novo Cadastro', doc: {"nome":"","idade":""}, action: '/novo' });

});


// POST novo cliente
router.post('/novo', async (req, res, next) => {
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
 
  try {
    const result = await db.insert({ nome, idade });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

// GET editar cliente
router.get('/editar/:id', async (req, res, next) => {
  const id = req.params.id;
 
  try {
    const doc = await db.findOne(id);
    res.render('novo', { title: 'Edição de Cliente', doc, action: '/editar/' + doc._id });
  } catch (err) {
    next(err);
  }
})

// POST editar cliente
router.post('/editar/:id', async (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
 
  try {
    const result = await db.update(id, { nome, idade });
    console.log(result);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

module.exports = router;
