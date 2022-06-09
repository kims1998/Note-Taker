const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

//Middleware for parsing JSON and URLencoded form data
app.use(express.urlencoded({ extended: true }) );
app.use(express.json());
app.use(express.static('public'));

//Routing
require('./routes/apiRoutes.js')(app);
require('./routes/htmlRoutes.js')(app);

//Once the PORT is online, it will begin listening for requests
app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
);