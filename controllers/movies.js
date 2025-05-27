const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getMovies = async (req, res) => {
    //#swagger.tags = ['Movies'];
    try {
        const result = await mongodb.getDatabase().db().collection('movies').find();
        result.toArray().then((movies) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(movies);
        });
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error });
    }
};

const getMovie = async (req, res) => {
    //#swagger.tags = ['Movies'];
    try {
        const id = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('movies').find({ _id: id });
        result.toArray().then((movie) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(movie[0]);
        });
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error });
    }
};

const createMovie = async (req, res) => {
    //#swagger.tags = ['Movies'];
    try {
        const movie = {
            name: req.headers.name,
            review: req.headers.review,
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
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error });
    }
};

const updateMovie = async (req, res) => {
    //#swagger.tags = ['Movies'];
    try {
        const id = new ObjectId(req.params.id);
        const movie = {
            name: req.headers.name,
            review: req.header.review,
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
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error });
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags = ['Movies'];
    try {
        const id = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: id });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the movie');
        }
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error });
    }
};

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
};