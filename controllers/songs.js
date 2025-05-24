const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getSongs = async (req, res) => {
    //#swagger.tags = ['Songs'];
    const result = await mongodb.getDatabase().db().collection('songs').find();
    result.toArray().then((songs) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(songs);
    });
};

const getSong = async (req, res) => {
    //#swagger.tags = ['Songs'];
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('songs').find({ _id: id });
    result.toArray().then((song) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(song[0]);
    });
};

const createSong = async (req, res) => {
    //#swagger.tags = ['Songs'];
    const song = {
        name: req.headers.name,
        singer: req.headers.singer,
        year: req.headers.year
    };
    const response = await mongodb.getDatabase().db().collection('songs').insertOne(song);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while saving the song');
    }
};

const updateSong = async (req, res) => {
    //#swagger.tags = ['Songs'];
    const id = new ObjectId(req.params.id);
    const song = {
        name: req.headers.name,
        singer: req.headers.singer,
        year: req.headers.year
    };
    const response = await mongodb.getDatabase().db().collection('songs').replaceOne({ _id: id }, song);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the song');
    }
};

const deleteSong = async (req, res) => {
    //#swagger.tags = ['Songs'];
    const id = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('songs').deleteOne({ _id: id });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the song');
    }
};

module.exports = {
    getSongs,
    getSong,
    createSong,
    updateSong,
    deleteSong
};