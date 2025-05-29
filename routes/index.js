const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello world!'];
    // #swagger.ignore = true
    res.send('Hello world');
});
router.use('/songs', require('./songs'));
router.use('/movies', require('./movies'));

module.exports = router;