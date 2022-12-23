const { Router } = require('express');
const CircularJSON = require('circular-json');
const { writeFileSync } = require('fs');
const order = require('../data/tradeOrder.json');
const orderMiddleware = require('../middleware/order');
const orderDto = require('../dto/orderDto');

const router = Router();

router.post('/update', orderMiddleware.single('update'), (req, res) => {
  try {
    if (req.body) {
      const answer = {
        ...order.answer,
        ...orderDto(req.body),
      };
      const result = res.json({ answer });
      try {
        writeFileSync('data/tradeOrder.json', JSON.stringify(CircularJSON.stringify({ answer })), { encoding:'utf8',flag:'w' });
        console.log('Data successfully saved to disk');
      } catch (error) {
        console.log('An error has occurred ', error);
      }
      result;
    }
  } catch (error) {
    console.error('SERVER:', error);
  } finally {
    res.json({ answer: 'fail' });
  }
});

module.exports = router;