const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Songs API',
        description: 'W03&04 Project: Songs - Gabriel Feippe'
    },
    host: 'cse341-songs-2dnx.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);