const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/db');

const { createTransportation, getTransportationsList } = require('../controllers/transportation');

const router = express.Router();

// Реєстрація користувача
router.post('/create',createTransportation);
router.get('/list',getTransportationsList);




module.exports = router;
