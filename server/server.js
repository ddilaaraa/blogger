const express = require('express');
const app = express();
require('dotenv').config();
var cors = require('cors');
const cookieParser = require('cookie-parser');
const {Database} = require('./Database/databaseConnection');
const userRoute= require('./Routes/userRoute');
const blogRoute=require('./Routes/blogRoute');
// CORS ve Cookie Parser ayarları


const corsOptions = {
  origin: function (origin, callback) {
    if (['http://localhost:3000','https://alibugatekin-iiiv63ndd-alibugatekinns-projects.vercel.app','https://www.alibugatekin.com'].indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

////middlewares
app.use(express.json());
app.use(cookieParser());

// Anasayfa route'u
app.get('/', (req, res) => {
  res.send('Merhaba Dünya!');
});

app.use('/api/users',userRoute);
app.use('/api/blogs',blogRoute);

// Bağlantı başarılı olduğunda konsola bilgi yazdırma
Database.once('open', () => {
  console.log('Kullanıcı veritabanına bağlanıldı');
});

// Bağlantı hatalarını yakalama
Database.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));

// Sunucuyu Başlatma
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı.`);
  });


module.exports = app;
