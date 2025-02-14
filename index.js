const express = require('express');
const app = express();
const Port = process.env.PORT || 3000
const cors = require('cors')

app.use(cors())



app.get('/', (req, res)=> {
  res.send("Welcome to my server")
})


app.listen(Port, ()=> {
  console.log('Server is running on port: ', Port)
})