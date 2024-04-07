require('dotenv').config();

import express from 'express';
const app = express();
const port = process.env.PORT;

app.use('/users', require('./routes/users'));

app.get('/', function (req, res) {
    res.send('Welcome');
});

app.listen(port, function () {
    console.log(`Briefcase app listening on port ${port}!`);
});
