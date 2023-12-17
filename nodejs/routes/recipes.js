var recipes = require('../recipes.json');
var router = require('express').Router();
router.get('/shopping-list', (req, res) => {
  if (req.query.ids === undefined)
    return res.status(400).send();
  const ids = req.query.ids.split(',').map(id => parseInt(id));
  if (ids.some(id => isNaN(id)))
    return res.status(404).send('NOT_FOUND');
  const result = recipes.reduce((acc, item) => {
    if (ids.includes(item.id)) {
      acc.push(...item.ingredients);
    }
    return acc;
  }, []);
  return res.status(200).send(result);
})

module.exports = router;

