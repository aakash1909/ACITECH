// models/organization.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: String,
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
