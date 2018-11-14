const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./config/passport")(passport);

const getSecret = require("./config/keys");
const db = getSecret("mongoURI");
const port = getSecret("port");

mongoose
    .connect(db)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

const users = require("./routes/api/users");
// const events = require("./routes/api/events");

const app = express();

// MIDDLEWARE
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
// app.use("/api/events", events);

app.listen(port, () => console.log(`Server is running on port ${port}`));

// ------

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const passport = require("passport");
// require("./config/passport")(passport);

// const db = require("./config/keys").mongoURI;
// const port = require("./config/keys").port;
// const users = require("./routes/api/users");
// // const events = require("./routes/api/events");

// const app = express();

// mongoose
//     .connect(db)
//     .then(() => console.log("Connected to MongoDB successfully"))
//     .catch(err => console.log(err));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use("/api/users", users);

// app.get("/", (req, res) => res.send("Hello World"));

// // app.use("/api/events", events);

// app.listen(port, () => console.log(`Server is running on port ${port}`));