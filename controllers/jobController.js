// controllers/jobController.js
const mongoose = require('mongoose');

const Job = mongoose.model('Job', new mongoose.Schema({
  title: String,
  companyName: String,
  companyId: String,
  location: String,
  type: String,
  experience: String,
  salaryRange: String,
  educationLevel: String,
  category: String,
  description: String,
}));

const getJobListings = async (req, res) => {
  try {
    const filters = {
      location: req.query.location,
      type: req.query.type,
      experience: req.query.experience,
      salaryRange: req.query.salaryRange,
      educationLevel: req.query.educationLevel,
      category: req.query.category,
      jobTitle: req.query.jobTitle,
      companyName: req.query.companyName,
    };

    const filterObject = {};
    for (const key in filters) {
      if (filters[key]) {
        if (key === 'jobTitle' || key === 'companyName') {
          filterObject[key] = { $regex: new RegExp(filters[key], 'i') };
        } else {
          filterObject[key] = filters[key];
        }
      }
    }

    const jobListings = await Job.find(filterObject);

    res.json(jobListings);
  } catch (error) {
    console.error('Error fetching job listings:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getJobListings };
