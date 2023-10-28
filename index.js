const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Passport configuration
const passport = require('./config/passport');
app.use(passport.initialize());

// Router connections
const user = require('./routes/userRoutes');
const organization = require('./routes/organizationRoutes');

app.use("/user", user);
app.use("/organization", organization);

// Database connection
require('./db'); 

// Define routes and start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
