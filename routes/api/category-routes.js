const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const CategoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    res.status(200).json(CategoryData);
  }catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
      ]
    });

    if(!CategoryData) {
      res.status(400).json({message: 'No Category found with this id!'});
      return;
    }
    res.status(200).json(CategoryData);
  }catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try{
    const CategoryData = await Category.create(req.body);
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try{
    const CategoryData = await Category.Update(req.body);

    if(!CategoryData) {
      res.status.json(CategoryData);
   }

  } catch (err) {
    res.status(500).json(err);
  }

  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const CategoryData = await Category.destroy({
      where:{id: req.params.id}
    });
    
    if(!CategoryData){
      res.status.json(CategoryData);
    } 
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
