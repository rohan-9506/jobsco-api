// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const userRoutes = require('./routes/userRoutes'); 
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const port = 3000;
const databaseUri = 'mongodb+srv://rohanrai40679:Shivani8826@cluster0.qhakv4a.mongodb.net/job_board';



app.use(bodyParser.json());
app.use(cors({
  origin: "*"
}));

mongoose.connect(databaseUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/user', userRoutes); // Mount the user routes under '/api/user'
app.use('/api/job', jobRoutes);
app.use('/', applicationRoutes);
app.use(profileRoutes); 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
