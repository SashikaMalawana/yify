const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const home = require('./routes/home');
const movies = require('./routes/movies');
const actors = require('./routes/actors');
const users = require('./routes/users');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/', home.router);
app.use('/', movies.router);
app.use('/', actors.router);
app.use('/', users.router);

app.use(helmet());
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('morgan enabled on developmet...')
}

mongoose.connect('mongodb://localhost/yify')
  .then(() => console.log('connected to mongodb'))
  .catch(error => console.log('could not connect to mongodb', error));

async function createMovie() {
  const movie = new Movie({
    name: 'top gunman',
    year: 2022,
    imdb: 7.2,
    length: '123 minutes',
    boxoffice: '$ 826M',
    date: new Date,
    isReleased: true
  });

  try {
    const result = await movie.save();
    console.log(result);
  }
  catch (ex) {
    for (field in ex.errors)
      console.log(ex.errors[field].message);
  }
}

async function getMovie() {
  const result = await Movie
    .find({ name: 'top gunman', isReleased: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, year: 1, imdb: 1 });
  console.log(result);
}

async function updateMovie(id) {
  const movie = await Movie.findById(id);
  if (!movie)
    return console.log('movie not found');

  movie.set({
    year: 2021,
    isReleased: false
  });

  const result = await movie.save();
  console.log(result);
}

async function deleteMovie(id) {
  const result = await Movie.deleteOne({_id: id});
  console.log(result);
}

// getMovie();
// createMovie();
// updateMovie('60b0b7d9d0b34906dd703e1a');
// deleteMovie('60b0b7d9d0b34906dd703e1a');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server listening on port ${port}...`));