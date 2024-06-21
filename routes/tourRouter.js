const express = require('express');
const fs = require('fs')
const {getAllTours,createATour,getOneTour,updateTour,deleteTour,checkID, checkBody} = require('../controllers/toursController')
const router = express.Router();

// router.param('id',checkID);

router.route('/')
.get(getAllTours)
.post(createATour);

router.route('/:id')
.get(getOneTour)
.patch(updateTour)
.delete(deleteTour);

module.exports = router;