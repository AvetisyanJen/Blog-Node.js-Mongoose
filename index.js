const express = require('express');
const app = express();
const config = require('./config');
const PORT=config.port
app.use(express.json());






app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });