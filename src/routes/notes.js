const router = require('express').Router();

const Note = require('../models/Note')
const { isAuthenticated } = require('../helpers/auth')

router.get('/notes/add', isAuthenticated, (req, res) => {
  res.render('notes/new-note')
})

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
  const { title, description } = req.body
  let errors = []
  if (!title) {
    errors.push({ text: 'Please Write a Title' })
    // req.flash('error_msg', 'Please Write a Title')
  }
  if (!description) {
    errors.push({ text: 'Please Write a Description' })
    // req.flash('error_msg', 'Please Write a Description')
  }
  if (errors.length > 0) {
    res.render('notes/new-note', {
      errors,
      title,
      description
    })
  } else {
    const newNote = new Note({ title, description })
    newNote.user = req.user.id
    await newNote.save()
    req.flash('success_msg', 'Note added Successfully')
    res.redirect('/notes')
  }
})

router.get('/notes', isAuthenticated, async (req, res) => {
  await Note.find({ user: req.user.id }).sort({ date: 'desc' })
    .then(docs => {
      const context = {
        notes: docs.map(doc => {
          return {
            title: doc.title,
            description: doc.description,
            id: doc._id
          }
        })
      }
      res.render('notes/all-notes', { notes: context.notes })
    })
    .catch(err => {
      console.log('No se pudo obtener la info: ', err)
    })
})

router.get('/note/edit/:id', isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id)
    .then(data => {
      return {
        title: data.title,
        description: data.description,
        id: data.id
      }
    })
  res.render('notes/edit-note', { note })
})

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
  const { title, description } = req.body
  await Note.findByIdAndUpdate(req.params.id, { title, description })
  req.flash('success_msg', 'Nota update Successfully')
  res.redirect('/notes')
})

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  req.flash('success_msg', 'Note deleted Successfully')
  res.redirect('/notes')
})

module.exports = router