// const express = require('express');
// const router = express.Router()
const router = require('express').Router(); // más simplificado

router.get('/', (req, res) => {
  res.render('index')
})
router.get('/about', (req, res) => {
  res.render('about')
})
module.exports = router