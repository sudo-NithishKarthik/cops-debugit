var express =require('express');
const { isAuthenticated, isSignedIn } = require('../controllers/auth');
const { createEvent, deleteEvent, getEventById, updateEvent } = require('../controllers/event');
const { getUserById } = require('../controllers/user');
var router = express.Router();


//router params
router.param('userId',getUserById);
router.param('eventId',getEventById);


router.post('/create/:userId',isSignedIn,isAuthenticated,createEvent)
router.delete('/delete/:userId/:eventId',isSignedIn,isAuthenticated,deleteEvent)
router.put('/update/:userId/:eventId',isSignedIn,isAuthenticated,updateEvent)



module.exports = router;
