const express = require('express');
const app = express();
const router = express.Router();
const pool = require('./../database');

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', (req, res) => {
   let sql = 'SELECT * FROM meal ;';
   pool.query(sql, (error, results) => {
      if (error) {
         console.log('Error in the query');
      } else {
         console.log('Successful query');
         res.send(results);
      }
   });
});

router.get('/:id', (req, res) => {
   const mealId = req.params.id;
   pool.query(
      'select * from meal where id = ?;',
      mealId,
      (err, result, query) => {
         if (err) {
            console.error(err);
         } else {
            res.send(result);
         }
      }
   );
});

// ? Post new meal
router.post('/', (req, res) => {
   const meal = req.body;
   pool.query('insert into meal set ?;', meal, (err, result, query) => {
      if (err) {
         console.error('this is the error', err);
         throw err;
      } else {
         res.send('Meal added');
      }
   });
});

// ? Update meal by id
router.put('/:id', (req, res) => {
   const mealId = req.params.id;

   const sql =
      'update meal set title = ?, description = ?, max_reservations = ?,location = ?, price = ? where id = ?;';
   pool.query(
      sql,
      [
         req.body.title,
         req.body.description,
         req.body.max_reservations,
         req.body.location,
         req.body.when,
         req.body.price,
         mealId
      ],

      (err, result, query) => {
         if (err) {
            console.error(err);
         } else {
            res.send('Meal has been updated.');
         }
      }
   );
});
/*
// ? Get meals that has smaller price than maxPrice
//  router.get('/', (req, res) => {
//     console.log(req.query);

//     const maxPrice = req.query.maxPrice;
//     pool.query(
//        'select * from meal where price < ?;',
//        maxPrice,
//        (err, results, query) => {
//           if (err) {
//              console.error(err);
//           } else {
//              res.send(results);
//           }
//        }
//     );
//  });


// ? Update meal by id
router.put('/:id', (req, res) => {
   const mealId = req.params.id;
   pool.query(
      'update meal set title = ?, description = ?, location = ?, when = ?, max_reservations = ?, price = ?, created_date = ? where id = ? ',
      [
         req.body.title,
         req.body.description,
         req.body.location,
         req.body.when,
         req.body.max_reservations,
         req.body.price,
         req.body.created_date,
         mealId
      ],
      (err, result, query) => {
         if (err) {
            console.error(err);
            throw err;
         } else {
            res.send('Meal has been updated.');
         }
      }
   );
});
// ? Delete meals by id
router.delete('/:id', (req, res) => {
   const mealId = req.params.id;
   pool.query(
      'delete from meal where id = ?;',
      mealId,
      (err, results, query) => {
         if (err) {
            console.error(err);
         } else {
            res.send('Meal has been deleted.');
         }
      }
   );
});

*/

// router.get('/', (req, res) => {
//    const title = req.query.title && `%${req.query.title}%`;
//    const maxPrice = Number(req.query.maxPrice);
//    const date =
//       req.query.createdAfter && new Date(req.query.createdAfter + 'Z');
//    const limit = req.query.limit && Number(req.query.limit);

//    function getQuery() {
//       const conditions = [];
//       let query = `select * from meal `;
//       if (maxPrice) {
//          const maxPriceQuery = ` price < ${maxPrice}`;
//          conditions.push(maxPriceQuery);
//       }
//       if (title) {
//          const titleQuery = ` title like '${title}'`;
//          conditions.push(titleQuery);
//       }
//       if (date) {
//          const dateQuery = `created_date > ${date}`;
//          conditions.push(dateQuery);
//       }
//       //*  Modify queries according to array length
//       if (conditions.length === 1) {
//          query += ' where' + conditions[0];
//       }
//       if (conditions.length > 1) {
//          query += 'where' + conditions.join(' and ');
//       }
//       if (limit) {
//          const limitQuery = ` limit ${limit}`;
//          query += limitQuery;
//       }
//       return `${query};`;
//    }
//    pool.query(getQuery(), '', (err, results, fields) => {
//       if (err) {
//          console.error(err);
//       } else {
//          res.send(results);
//       }
//    });
// });
module.exports = router;
