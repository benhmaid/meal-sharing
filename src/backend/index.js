const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

const mealsRouter = require('./api/meals');
const reservationsRouter = require('./api/reservations');
const reviewsRouter = require('./api/reviews');

const port = process.env.PORT || 5000;

const buildPath = path.join(__dirname, './../frontend');
app.use(express.static(buildPath));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.use('/meals', mealsRouter);
router.use('/reservations', reservationsRouter);
router.use('/reviews', reviewsRouter);

app.use(express.json());
app.use('/api', router);

app.get('/*', function(req, res) {
   res.sendFile(path.join(__dirname, './../frontend/index.html'), function(
      err
   ) {
      if (err) {
         res.status(500).send(err);
      }
   });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
