const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Songs API',
        description: 'W03&04 Project: Songs - Gabriel Feippe'
    },
    host: 'songs-5tbl.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);