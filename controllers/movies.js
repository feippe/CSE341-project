const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getMovies = async (req, res) => {
    //#swagger.tags = ['Movies'];
    //#swagger.description = 'You can get all movies from the database';
    //#swagger.responses[200] = { description: 'Movies retrieved successfully' };
    //#swagger.responses[500] = { description: 'Internal server error' };
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
    /*
    #swagger.tags = ['Movies'];
    #swagger.description = 'You can get a movie by its ID from the database';
    #swagger.responses[200] = { description: 'Movie retrieved successfully' };
    #swagger.responses[500] = { description: 'Internal server error' };
    #swagger.parameters['id'] = { 
        description: 'ID of the movie to retrieve',
        type: 'string',
        required: true,
        in: 'path',
        example: '60c72b2f9b1e8b001c8e4d3a'
    };
    */
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
    /*
    #swagger.tags = ['Movies'];
    #swagger.description = 'You can create a new movie in the database';
    #swagger.responses[204] = { description: 'Movie created successfully' };
    #swagger.responses[500] = { description: 'Internal server error' };
    #swagger.parameters['name'] = { 
        description: 'Name of the movie',
        type: 'string',
        required: true,
        in: 'header',
        example: 'Inception'
    };
    #swagger.parameters['review'] = { 
        description: 'Review of the movie',
        type: 'string',
        required: true,
        in: 'header',
        example: 'A mind-bending thriller that blurs the lines between reality and dreams.'
    };
    #swagger.parameters['year'] = { 
        description: 'Release year of the movie',
        type: 'string',
        required: true,
        in: 'header',
        example: '2010'
    };
    #swagger.parameters['director'] = { 
        description: 'Director of the movie',
        type: 'string',
        required: true,
        in: 'header',
        example: 'Christopher Nolan'
    };
    #swagger.parameters['rating'] = { 
        description: 'Rating of the movie',
        type: 'string',
        required: true,
        in: 'header',
        example: 'PG-13'
    };
    #swagger.parameters['duration'] = { 
        description: 'Duration of the movie in minutes',
        type: 'string',
        required: true,
        in: 'header',
        example: '148'
    };
    #swagger.parameters['imdbrating'] = { 
        description: 'IMDb rating of the movie',
        type: 'string',
        required: false,
        in: 'header',
        example: '8.8'
    };
    */
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
    /*
    #swagger.tags = ['Movies'];
    #swagger.description = 'You can update an existing movie in the database';
    #swagger.responses[204] = { description: 'Movie updated successfully' };
    #swagger.responses[500] = { description: 'Internal server error' };
    #swagger.parameters['id'] = { 
        description: 'ID of the movie to update',
        type: 'string',
        required: true,
        in: 'path',
        example: '60c72b2f9b1e8b001c8e4d3a'
    };
    #swagger.parameters['name'] = { 
        description: 'Name of the movie',
        type: 'string',
        required: true,
        in: 'header',
        example: 'Inception'
    };
    #swagger.parameters['review'] = { 
        description: 'Review of the movie',
        type: 'string',
        required: true,
        in: 'header',
        example: 'A mind-bending thriller that blurs the lines between reality and dreams.'
    };
    #swagger.parameters['year'] = { 
        description: 'Release year of the movie',
        type: 'string',
        required: true,
        in: 'header',
        example: '2010'
    };
    #swagger.parameters['director'] = { 
        description: 'Director of the movie',
        type: 'string',
        required: true,
        in: 'header',
        example: 'Christopher Nolan'
    };
    #swagger.parameters['rating'] = { 
        description: 'Rating of the movie',
        type: 'string',
        required: true,
        in: 'header',
        example: 'PG-13'
    };
    #swagger.parameters['duration'] = { 
        description: 'Duration of the movie in minutes',
        type: 'string',
        required: true,
        in: 'header',
        example: '148'
    };
    #swagger.parameters['imdbrating'] = { 
        description: 'IMDb rating of the movie',
        type: 'string',
        required: false,
        in: 'header',
        example: '8.8'
    };
    */
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
    /*
    #swagger.tags = ['Movies'];
    #swagger.description = 'You can delete a movie by its ID from the database';
    #swagger.responses[204] = { description: 'Movie deleted successfully' };
    #swagger.responses[500] = { description: 'Internal server error' };
    #swagger.parameters['id'] = { 
        description: 'ID of the movie to delete',
        type: 'string',
        required: true,
        in: 'path',
        example: '60c72b2f9b1e8b001c8e4d3a'
    };
    */
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