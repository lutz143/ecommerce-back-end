const router = require('express').Router();
const sequelize = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// update category by id
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((updatedCategory) => res.json(updatedCategory))
  .catch((err) => {
    // console.log(err);
    res.status(400).json(err);
  });
});


// router.delete('/:id', async (req, res) => {
//   try {
//     const readerData = await Category.destroy({
//       include: [{ model: Product}],
//       attributes: {
//         include: [
//           [
//             // Use plain SQL to get a count of all short books
//             sequelize.literal(
//               'ALTER TABLE product DROP FOREIGN KEY category_id'
//             ),
//             sequelize.literal(
//               'ALTER TABLE product ADD CONSTRAINT category_id FOREIGN KEY (category_id) references category (id) ON DELETE CASCADE'
//             ),
//             sequelize.literal(
//               "DELETE FROM `category` WHERE `id` = '1'"
//             )
//             // 'shortBooks',
//           ],
//         ],
//       },
//     });
//     res.status(200).json(readerData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



// router.delete('/:id', (req, res) => {
//   // update product data
//   Category.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((category) => {
//       // find all associated tags from ProductTag
//       return Category.findAll({ where: { id: req.params.id } });
//     })
//     .then((productTags) => {
//       // get list of current tag_ids
//       const productTagIds = productTags.map(({ category_id }) => category_id);
//       // create filtered list of new tag_ids
//       const newProductTags = req.body.id
//         .filter((category_id) => !productTagIds.includes(category_id))
//         .map((category_id) => {
//           return {
//             category_id            
//           };
//         });
//       // figure out which ones to remove
//       const productTagsToRemove = productTags
//         .destroy(({ category_id }) => !req.body.id.includes(category_id))
//         .map(({ id }) => id);

//       // run both actions
//       return Promise.all([
//         Category.destroy({ where: { id: productTagsToRemove } }),
//         // ProductTag.bulkCreate(newProductTags),
//       ]);
//     })
//     .then((updatedProductTags) => res.json(updatedProductTags))
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });


// router.delete('/:id', async (req, res) => {
//   try {
//     const productTagIds = productTags.map(({ tag_id }) => tag_id);
//     const productData = await Product.destroy({
//       where: {
        
//       }
//     })
//     const categoryData = await Category.destroy({
//       where: {
//         id: req.params.id
//       }
//     });
//     if (!categoryData) {
//       res.status(404).json({ message: 'No product found with this id!' });
//       return;
//     }
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.delete('/', async (req, res) => {
//   try {
//     const categoryData = await Category.destroy({

//       attributes: {
//         include: [
//           [
//             // Use plain SQL to get a count of all short books
//             sequelize.literal(
//               '(SELECT COUNT(*) FROM book WHERE pages BETWEEN 100 AND 300 AND book.reader_id = reader.id)'
//             ),
//             'shortBooks',
//           ],
//         ],
//       },
//     });
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No trip with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
