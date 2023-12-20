var recipes = require('../recipes.json');
var express = require('express');
var router = express.Router();

router.get('/shopping-list', (req, res) => {
  try {
    if (req.query.ids === undefined)
      return res.status(400).send();
    const ids = req.query.ids.split(',').map(id => id * 1);
    if (ids.some(id => isNaN(id)))
      return res.status(404).send('NOT_FOUND');
    const idList = recipes.filter(item => ids.includes(item.id));
    // const result = idList.flatMap((item) => item.ingredients);
    const result = idList.reduce((acc, item) => {
      acc.push(...item.ingredients);
      return acc;
    }, []);
    // const result = recipes.reduce((acc, item) => {
    //       if (ids.includes(item.id)) {
    //         acc.push(...item.ingredients);
    //       }
    //       return acc;
    //     }, []);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send('Internal Error');
  }

})

module.exports = router;