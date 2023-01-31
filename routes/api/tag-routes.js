// require the express router and the Product, Tag and ProductTag extension of the Models for table design/join
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags and associated products via the relationship established in the index through pk and fk
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{model: Product, through: ProductTag, as: 'tag_products'}]
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one tag by its ID and associated products via relationship established in the index through pk and fk
router.get('/:id', async (req, res) => {
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as: 'tag_products'}]
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag and auto increment its primary key (id)
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag by id
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((updatedTag) => res.json(updatedTag))
  .catch((err) => {
    // console.log(err);
    res.status(400).json(err);
  });
});

// delete a tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
