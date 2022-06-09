const Item = require('../models/item');

exports.getIndex = (req, res) => {
  Item.find()
    .then((items) => {
      res.render('index', {
        items: items,
        pageTitle: 'Index',
        path: '/',
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddItem = (req, res) => {
  res.render('edit-item', {
    pageTitle: 'Add Item',
    path: '/add-item',
    editing: false,
  });
};

exports.postAddItem = (req, res) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const category = req.body.category;
  const costPerItem = req.body.costPerItem;
  const quantity = req.body.quantity;

  const item = new Item({
    name: name,
    imageUrl: imageUrl,
    description: description,
    category: category,
    costPerItem: costPerItem,
    quantity: quantity,
  });

  item
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

exports.getEditItem = (req, res) => {
  const itemId = req.params.itemId;

  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.redirect('/');
      }
      res.render('edit-item', {
        pageTitle: 'Edit Item',
        path: '/edit-item',
        item: item,
        editing: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditItem = (req, res) => {
  const itemId = req.body.itemId;
  const updatedName = req.body.name;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedCategory = req.body.category;
  const updatedCostPerItem = req.body.costPerItem;
  const updatedQuantity = req.body.quantity;

  Item.findById(itemId)
    .then((item) => {
      (item.name = updatedName),
        (item.imageUrl = updatedImageUrl),
        (item.description = updatedDescription),
        (item.category = updatedCategory),
        (item.costPerItem = updatedCostPerItem),
        (item.quantity = updatedQuantity);

      return item.save();
    })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
};

exports.postDeleteItem = (req, res) => {
  const itemId = req.body.itemId;

  Item.findByIdAndRemove(itemId)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
};
