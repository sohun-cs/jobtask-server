const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('JobTask Server is running.');
});

app.listen(port, () => {
    console.log(`JobTask server is running on ${port}`);
});