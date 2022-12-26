const { Router } = require('express');
const CircularJSON = require('circular-json');
const { writeFileSync } = require('fs');
const roomMiddleware = require('../middleware/room');
const participantsDto = require('../dto/participantsDto');

const router = Router();

router.post('/update', roomMiddleware.single('update'), (req, res) => {
  try {
    const { body: { roomId, participants } } = req;
    if (req.body) {
      const answer = {
        roomId,
        participants: [
          ...require(`../rooms/${roomId}.json`).answer.participants,
          ...[participantsDto(participants)].flat(),
        ],
      };
      const result = res.json({ answer });
      try {
        writeFileSync(`rooms/${roomId}.json`, JSON.stringify(CircularJSON.stringify({ answer })), { encoding:'utf8',flag:'w' });
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