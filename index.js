const express = require('express')
const  cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors')
const UserRoutes = require('./routes/UserRoutes')
const CarlistRoutes = require('./routes/CarlistRoutes')
const ContactRoutes = require('./routes/ContactRoutes')
const BookingRoutes = require('./routes/BookingRoutes')

const app = express()
const port = 3000
app.use(cors({
  // origin:["http://localhost:5173"],
  origin: '*',
  methods:["GET", "POST", "PATCH", "DELETE"],
  credentials: true 
}))
app.use(cookieParser())
app.use(express.json())


app.use('/api/apiusers/signup', UserRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/carlist', CarlistRoutes)
app.use('/api/carlist/:carlistId',CarlistRoutes)
app.use('/api/contact', ContactRoutes)
app.use('/api/bookings',BookingRoutes)
app.use('/api/bookings/:bookingsId',BookingRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

main().then(() => console.log('DB connect')).catch(err => console.log(err));

async function main() {
  const url = process.env.DB_URL
  const password = process.env.DB_PASSWORD
  const urlWithPassword = url.replace('<password>', password)
  await mongoose.connect(urlWithPassword);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
