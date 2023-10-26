const express = require('express');
const app = express();

app.get('', (req, res) => { //request and response
    res.send('api works!');
});

app.listen(3000, () => {
    console.log('appi is running');
});