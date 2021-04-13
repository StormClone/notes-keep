require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true} );

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//Router for notes
const notesRoutes = require('./routes/notes.route');
app.use('/notes', notesRoutes);

//Serve static assests if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../notes-app/build'));
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});