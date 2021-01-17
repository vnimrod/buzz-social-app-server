const express = require('express');
const connectDB = require('./config/db');

const app = express();

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const buzzings = require('./routes/api/buzzings')

app.use(express.json())

app.use('/users', users);
app.use('/profile', profile);
app.use('/buzzings', buzzings);

connectDB();

const port = process.env.PORT || 5000

app.listen(port,() => {
  console.log(`Server started on port ${port}`)
})
