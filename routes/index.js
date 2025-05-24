const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello world!'];
    res.send('Hello world');
});
router.use('/songs', require('./songs'));

module.exports = router;