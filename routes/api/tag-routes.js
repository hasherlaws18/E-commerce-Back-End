const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const TagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        }
      ]
    });
    res.status(200).json(TagData);
  }catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const TagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        }
      ]
    });

    if (!TagData) {
      res.status(200).json({ message: `No tag found with id ${req.params.id}` });
    } else {
      res.json(TagData);
    }
  } catch (err) {
    res.status(500).json(err);
  }

  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try{
    const TagData = await Tag.create(req.body);
    rest.status(200).json(TagData);
  }catch (err) {
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:id',async (req, res) => {
  try{
    const TagData = await Tag.update(req.body);

    if(!TagData){
      res.status.json(TagData);
    }
  } catch(err){
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const TagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!TagData) {
      res.status(404).json({ message: 'No Tag Found with this ID'});
      return;
    }
    res.status(200).json({message: 'Tag Deleted'});
  }catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
