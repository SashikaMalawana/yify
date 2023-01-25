const Joi = require('joi');
const mongoose = require('mongoose');

const actors = [
  {id: 1, name: 'tom cruise', born: 1972, nationality: 'american', awards: 6, movies: ['mission imposible', 'jack reacher', 'oblivion', 'edge of tomorrow', 'mummy', 'american made']},
  {id: 2, name: 'brad pitt', born: 1968, nationality: 'russian', awards: 4, movies: ['fight club', 'seven', 'inglorious basterds', 'world war z', 'once upon a time in america', 'ad astra']},
  {id: 3, name: 'tom hardy', born: 1984, nationality: 'england', awards: 2, movies: ['lawless', 'warrior', 'child 44', 'legend', 'revenant', 'venom']},
  {id: 4, name: 'leanardo decaprio', born: 1976, nationality: 'american', awards: 8, movies: ['titanic', 'catch me if you can', 'shutter island', 'wolf of wall street', 'revenant']},
  {id: 5, name: 'jason stathem', born: 1974, nationality: 'spain', awards: 3, movies: ['transporter', 'the mechanic', 'parker', 'home front', 'fast and furious', 'the meg', 'wrath of man']},
  {id: 6, name: 'denzel washington', born: 1964, nationality: 'maxican', awards: 7, movies: ['flight', 'equalizer', 'magnaficent seven', 'fences', 'little things']}
];

const mongooseActorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50
  },
  born: {
    type: Number,
    required: true,
    min: 1900,
    max: 2100
  },
  nationality: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 10
  },
  awards: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  movies: {
    type: Array,
    validate: {
      validator: function(value) { 
        return value && value.length>0;
      },
      message: 'should have at least one movie'
    }
  },
  date: {
    type: Date,
    required: true,
    dafault: Date.now
  },
  isActive: {
    type: Boolean,
    required: true
  }
});

const Actor = mongoose.model('Actor', mongooseActorSchema);

function joiValidateActorRequest(req) {
  const joiActorSchema = {
    name: Joi.string().min(4).max(50).required(),
    born: Joi.number().min(1900).max(2100).required(),
    nationality: Joi.string().min(4).max(10).required(),
    awards: Joi.number().min(0).max(10).required(),
    movies: Joi.array().required(),
    isActive: Joi.boolean().required()
  };

  const result = Joi.validate(req.body, joiActorSchema);
  return result;
}

module.exports.Actor = Actor;
module.exports.joiValidateActorRequest = joiValidateActorRequest;