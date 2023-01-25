const express = require('express');
const router = express.Router();
const { User, joiValidateUserRequest } = require('./../models/users');

router.get('/api/users', async (req, res) => {
  const result = await User.find();
  res.send(result);
});

router.get('/api/users/:id', async (req, res) => {
  try{
    const findUser = await User.findById(req.params.id);

    if (!findUser)
      return res.status(404).send('user not found');

    res.send(findUser);
  }
  catch (ex) {
    res.send(ex.message);
  }
});

router.post('/api/users', async (req, res) => {
  const result = joiValidateUserRequest(req);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const newUser = new User({
    name: req.body.name,
    country: req.body.country,
    email: req.body.email,
    phone: req.body.phone,
    accountType: req.body.accountType,
    downloads: 0,
    requests: 0,
    comments: 0,
    joined: new Date
  });

  try {
    const result = await newUser.save();
    res.send(result);
  }
  catch (ex) {
    for (field in ex.errors)
      res.send(ex.errors[field].message);
  }
});

router.put('/api/users/:id', async (req, res) => {
  const result = joiValidateUserRequest(req);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  try {
    const findUser = await User.findById(req.params.id);
    if (!findUser)
      return res.status(404).send('user not found');
  
    findUser.set({
      name: req.body.name,
      country: req.body.country,
      email: req.body.email,
      phone: req.body.phone,
      accountType: req.body.accountType
    });
    
    const result = await findUser.save();
    res.send(result);
  }
  catch (ex) {
    for (field in ex.errors)
      res.send(ex.errors[field].message);
  }
});

router.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
  
    if (!deletedUser)
      return res.status(404).send('user not found');
  
    res.send(deletedUser);
  }
  catch (ex) {
    res.send(ex.message);
  }
});

module.exports.router = router;