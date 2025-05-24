const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getMovies = async (req, res) => {
    //#swagger.tags = ['Movies'];
    const result = await mongodb.getDatabase().db().collection('movies').find();
    result.toArray().then((movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies);
    });
};

const getMovie = async (req, res) => {
    //#swagger.tags = ['Movies'];
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('movies').find({ _id: id });
    result.toArray().then((movie) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movie[0]);
    });
};

const createMovie = async (req, res) => {
    //#swagger.tags = ['Movies'];
    const movie = {
        name: req.headers.name,
        description: req.header.description,
        year: req.headers.year,
        director: req.headers.director,
        rating: req.headers.rating,
        duration: req.headers.duration,
        imdbrating: req.headers.imdbrating
    };
    const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while saving the movie');
    }
};

const updateMovie = async (req, res) => {
    //#swagger.tags = ['Movies'];
    const id = new ObjectId(req.params.id);
    const movie = {
        name: req.headers.name,
        description: req.header.description,
        year: req.headers.year,
        director: req.headers.director,
        rating: req.headers.rating,
        duration: req.headers.duration,
        imdbrating: req.headers.imdbrating
    };
    const response = await mongodb.getDatabase().db().collection('movies').replaceOne({ _id: id }, movie);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the movie');
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags = ['Movies'];
    const id = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: id });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the movie');
    }
};

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
};