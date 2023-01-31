// require the router package through express and set up/use api endpoint
const router = require('express').Router();
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

// for wrong routes, display a message to the user
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;