const express = require('express');

const db = require('../db/connection');

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM favorite_books', function (err, results) {
    if (err) {
      res.json({error: 'Error getting books'});
    }
    res.json(results);
  });
})

router.post('/', (req, res) => {
  const book = req.body;
  if (book.book_name) {
    var q = db.query('INSERT INTO favorite_books (book_name) VALUES (?)', book.book_name, function (err, results) {
      if (err) {
        res.json({error: 'Error adding book'});
      }
      res.json(results);
    });
    console.log(q.sql);
  } else {
    res.json({error: 'No book sent'});
  }
})
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const book = req.body;
  if (book.book_name) {
    var q = db.query('UPDATE favorite_books SET ? WHERE id = ?', [book, id], function (err, results) {
      if (err) {
        res.json({error: 'Error updating book'});
      }
      res.json(results);
    });
    console.log(q.sql);
  } else {
    res.json({error: 'Could not update book'});
  }
})
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  var q = db.query('DELETE FROM favorite_books WHERE id = ?', id, function (err, results) {
    if (err) {
      res.json({error: 'Error deleting book'});
    }
    res.json(results);
  });
})

module.exports = router;