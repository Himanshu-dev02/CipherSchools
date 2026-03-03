const express = require('express');
const router = express.Router();
const { getAll, getById } = require('../controllers/executeController');
/* GET /api/execute*/
router.get('/', getAll);    
/* GET /api/execute/:id */
router.get('/:id', getById); 
module.exports = router;;
