const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: {
      model: Product,
      attributes: ['product_name', 'stock', 'price', 'category_id']
    }
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {id: req.params.id},
    include: {
      model: Product,
      attributes: ['product_name', 'stock', 'price', 'category_id']
    }
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  tag.create({
    tag_name: req.body.tag_name
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // create a new tag
});

router.put('/:id', (req, res) => {
  tag.update(req.body, {
    where: {id: req.params.id}
  })
  .then(tagData => {
    if(!tagData[0]) {
      res.status(404).json({message: 'No Id matches this tag'});
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  tag.destroy({
    where: {id: req.params.id}
  })
  .then(tagData => {
    if(tagData) {
      res.status(404).json({message: 'No ID matches that tag'});
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
