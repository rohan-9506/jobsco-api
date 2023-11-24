// jobController.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Application schema
const applicationSchema = new Schema({
  jobId: String,
  name: String,
  email: String,
  portfolio: String,
  resume: {
    data: Buffer,
    contentType: String,
  },
  coverLetter: String,
});

// Create the Application model
const Application = mongoose.model('Application', applicationSchema);

const applyJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const { name, email, portfolio, coverLetter } = req.body;

    const application = new Application({
      jobId,
      name,
      email,
      portfolio,
      resume: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      coverLetter,
    });

    await application.save();
    res.status(201).send({status:200});
  } catch (error) {
    console.error('Error submitting job application:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { applyJob };
