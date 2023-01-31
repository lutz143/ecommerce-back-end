// require the schema models
const { Category } = require('../models');

// seed category data with category name
const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];

// create the seeds
const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
