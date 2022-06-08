const express = require('express');


const app = express();
const PORT = 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


require('./routes/api-Routes')(app);
require('./routes/html-Routes')(app);


app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
);