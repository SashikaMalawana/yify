const Joi = require('joi');
const mongoose = require('mongoose');

const movies = [
  {id: 1, name: 'mission impossible', year: 2011, imdb: 7.2, length: '134 minutes', boxoffice: '$ 776M'},
  {id: 2, name: 'jack reacher', year: 2012, imdb: 6.8, length: '118 minutes', boxoffice: '$ 466M'},
  {id: 3, name: 'oblivion', year: 2013, imdb: 7.4, length: '113 minutes', boxoffice: '$ 524M'},
  {id: 4, name: 'edge of tomorrow', year: 2014, imdb: 7.6, length: '121 minutes', boxoffice: '$ 686M'},
  {id: 5, name: 'mummy', year: 2015, imdb: 6.6, length: '107 minutes', boxoffice: '$ 726M'},
  {id: 6, name: 'american made', year: 2016, imdb: 7.8, length: '143 minutes', boxoffice: '$ 962M'},
];

const mongooseMovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2100
  },
  genres: {
    type: [String],
    required: true
  },
  imdb: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  length: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20
  },
  boxOffice: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 10
  },
  actors: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    required: true,
    dafault: Date.now
  },
  isReleased: {
    type: Boolean,
    required: true
  }
});

const Movie = mongoose.model('Movie', mongooseMovieSchema);

function joiValidateMovieRequest(req) {
  const joiMovieSchema = {
    name: Joi.string().min(4).max(50).required(),
    year: Joi.number().min(1900).max(2100).required(),
    genres: Joi.array().required(),
    imdb: Joi.number().min(0).max(10).required(),
    length: Joi.string().min(4).max(20).required(),
    boxOffice: Joi.string().min(4).max(10).required(),
    actors: Joi.array().required(),
    isReleased: Joi.boolean().required()
  };

  const result = Joi.validate(req.body, joiMovieSchema);
  return result;
}

module.exports.Movie = Movie;
module.exports.joiValidateMovieRequest = joiValidateMovieRequest;