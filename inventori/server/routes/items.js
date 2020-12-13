var express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Item = require('../models/Item');
var router = express.Router();

var router = express.Router();

router.get('/', (req, res, next) => {
  Item.find()
    .then(items => {
        console.log(items);
      res.status(200).json({
          message: 'Items fetched successfully!',
          items: items
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});


router.post('/', (req, res, next) => {
    const maxItemId = sequenceGenerator.nextId("items");
  
    //TODO fix this to be correct
    const item = new Item({
      id: maxItemId,
      name: req.body.name,
      description: req.body.description,
      status: req.body.status
    });
  
    item.save()
      .then(createdItem => {
        res.status(201).json({
          message: 'Item added successfully',
          item: createdItem
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
});


router.put('/:id', (req, res, next) => {
    Item.findOne({ id: req.params.id })
      .then(item => {
        item.name = req.body.name;
        item.description = req.body.description;
        item.status = req.body.status;
  
        Item.updateOne({ id: req.params.id }, item)
          .then(result => {
            res.status(204).json({
              message: 'Item updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Item not found.',
          error: { message: 'Item not found'}
        });
      });
});

router.delete("/:id", (req, res, next) => {
    Item.findOne({ id: req.params.id })
      .then(item => {
        Item.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Item deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Item not found.',
          error: { message: 'Item not found'}
        });
      });
});

module.exports = router; 