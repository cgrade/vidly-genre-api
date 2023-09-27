const express = require('express');
const Joi = require('joi');

const app = express();


app.use(express.json());

// Data
const genres = [
    {id: 1, name: "Action"},
    {id: 2, name: "Horror"},
    {id: 3, name: "Crime"},
    {id: 4, name: "Sci-Fi"},
    {id: 5, name: "Anime"}
];


// User Input Validation
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(genre, schema);
}


// HTTP Requests Route for the APIs

// homepage
app.get('/', (req, res) => {
  res.send('This is the Hompage for the Vidly API service\n');
});


// GET requests to List all genres
app.get('/api/genres', (req, res) => {
  res.send(genres);
});


// Get requests to list a specific genre
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('Genre Not Found');
  res.send(genre);
});


// POST requests to add a genre
app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  }
  genres.push(genre);
  res.send(genre);
});


// PUT Requests to update a genre
app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('Genre Not Found');
  
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error);

  genre.name = req.body.name;
  res.send(genre);
});

// Delete Request to delete a genre
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id))
  if (!genre) return res.status(404).send('Genre Not Found');
  
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
})

// SERVER LISTENING ON PORT
const port = 3000;
app.listen(port, () => console.log('Server listening on port'));