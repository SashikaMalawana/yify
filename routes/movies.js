const express = require('express');
const router = express.Router();
const { Movie, joiValidateMovieRequest } = require('./../models/movies');

router.get('/api/movies', async (req, res) => {
  const result = await Movie.find();
  res.send(result);
});

router.get('/api/movies/:id', async (req, res) => {
  try {
    const findMovie = await Movie.findById(req.params.id);

    if (!findMovie)
      return res.status(404).send('movie not found');
  
    res.send(findMovie);
  }
  catch (ex) {
    res.send(ex.message);
  }
});

router.post('/api/movies', async (req, res) => {
  const result = joiValidateMovieRequest(req);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const newMovie = new Movie({
    name: req.body.name,
    year: req.body.year,
    genres: req.body.genres,
    imdb: req.body.imdb,
    length: req.body.length,
    boxOffice: req.body.boxOffice,
    actors: req.body.actors,
    date: new Date,
    isReleased: req.body.isReleased
  });

  try {
    const result = await newMovie.save();
    res.send(result);
  }
  catch (ex) {
    for (field in ex.errors)
      res.send(ex.errors[field].message);
  }
});

router.put('/api/movies/:id', async (req, res) => {
  const result = joiValidateMovieRequest(req);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  try {
    const findMovie = await Movie.findById(req.params.id);

    if (!findMovie)
      return res.status(404).send('movie not found');
  
    findMovie.set({
      name: req.body.name,
      year: req.body.year,
      genres: req.body.genres,
      imdb: req.body.imdb,
      length: req.body.length,
      boxOffice: req.body.boxOffice,
      actors: req.body.actors,
      isReleased: req.body.isReleased
    });
  
    const result = await findMovie.save();
    res.send(result);
  }
  catch (ex) {
    res.send(ex.message);
  }
});

router.delete('/api/movies/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndRemove(req.params.id);

    if (!deletedMovie)
      return res.status(404).send('movie not found');
  
    res.send(deletedMovie);
  }
  catch (ex) {
    res.send(ex.message);
  }
});

module.exports.router = router;