const express = require('express');
const connectDB = require('./config/db');
const path = require('path')
const app = express();

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const buzzings = require('./routes/api/buzzings')

app.use(express.json())


app.use('/users', users);
app.use('/profile', profile);
app.use('/buzzings', buzzings);

connectDB();

// if(process.env.NODE_ENV === "production") {
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })
// }

const port = process.env.PORT || 5000

app.listen(port,() => {
  console.log(`Server started on port ${port}`)
})
