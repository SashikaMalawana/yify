const express = require('express');
const router = express();
const { Actor, joiValidateActorRequest } = require('./../models/actors');

router.get('/api/actors', async (req, res) => {
  const result = await Actor.find();
  res.send(result);
});

router.get('/api/actors/:id', async (req, res) => {
  try {
    const findActor = await Actor.findById(req.params.id);

    if (!findActor)
      return res.status(404).send('actor not found');
  
    res.send(findActor);
  }
  catch (ex) {
    res.send(ex.message);
  }
});

router.post('/api/actors', async (req, res) => {
  const result = joiValidateActorRequest(req);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const newActor = new Actor({
    name: req.body.name,
    born: req.body.born,
    nationality: req.body.nationality,
    awards: req.body.awards,
    movies: req.body.movies,
    date: new Date,
    isActive: req.body.isActive
  });

  try {
    const result = await newActor.save();
    res.send(result);
  }
  catch (ex) {
    for (field in ex.errors)
      res.send(ex.errors[field].message);
  }
});

router.put('/api/actors/:id', async(req, res) => {
  const result = joiValidateActorRequest(req);
  if (result.roor)
    return res.status(400).send(result.error.details[0].message);

  try {
    const findActor = await Actor.findById(req.params.id);

    if (!findActor)
      return res.status(404).send('actor not found');

    findActor.set({
      name: req.body.name,
      born: req.body.born,
      nationality: req.body.nationality,
      awards: req.body.awards,
      movies: req.body.movies,
      isActive: req.body.isActive
    })

    const result = await findActor.save();
    res.send(result);
  }
  catch (ex) {
    res.send(ex.message);
  }
});

router.delete('/api/actors/:id', async (req, res) => {
  try {
    const deletedActor = await Actor.findByIdAndRemove(req.params.id);

    if (!deletedActor)
      return res.status(404).send('actor not found');
  
    res.send(deletedActor);
  }
  catch (ex) {
    res.send(ex.message);
  }
});

module.exports.router = router;