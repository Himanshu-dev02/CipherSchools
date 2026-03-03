 const express = require('express');
const router = express.Router();
const { getHint } = require('../controllers/hintController');   
/*POST /api/execute*/
router.post('/', getHint);
module.exports = router;
