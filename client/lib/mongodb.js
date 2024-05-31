const mongoose = require('mongoose');
require('dotenv').config();
// veritabanı için bağlantı
const Database = mongoose.createConnection(process.env.MONGO_URI, {});

module.exports = { Database };