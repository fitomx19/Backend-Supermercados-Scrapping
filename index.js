const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require("./db");

const app = express();
const port = process.env.PORT || 4000;


//permitir cors
app.use(cors());
app.use(express.json()); 
app.use(                
  express.urlencoded({
    extended: true,
  })
); 

var indexRouter = require("./routes/routes");

app.use("/", indexRouter);

app.listen(port, () =>
  console.log('Example app listening on port '+ port +'!'),
);