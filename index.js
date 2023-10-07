const express = require('express');
const cors = require('cors');
const studentDB = require('./database/studentDB');
const connectToDB = require("./config/connectToDB");
const courseRoutes = require("./routes/courseRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const studentSessionRoutes = require("./routes/studentSessionRoutes");
const app = express();
const port = process.env.PORT || 80;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '20mb', extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// DSK => Connect to LM_DB
connectToDB();

// Student Routes
app.use('/students', require('./routes/studentRoutes'));

// DSK

// course routes
app.use("/course", courseRoutes);

// session routes
app.use("/session", sessionRoutes);

// scs routes
app.use("/studentSession", studentSessionRoutes);

// MongoDb connection
studentDB();

// listening the server
app.listen(port, () => console.log(`Server is running at ${port}`));
