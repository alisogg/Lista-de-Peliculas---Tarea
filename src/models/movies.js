const {model , Schema} = require('mongoose');

const movieSchema = new Schema({
    name: { type: String, require: true },
    synopsis: { type: String, require: true },
    genre: { type: String, require: true},
    duration: { type: Number, require: true},
    director: { type: String, requiere: true},
    actors: [String]
});

module.exports = model('movies', movieSchema);
