const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const { checkAdminRole } = require('../middleware/auth');
const passport = require('passport');

// Passport middleware for user authentication
const requireAuth = passport.authenticate('local', { session: false });

// Authenticate user for the following routes
router.use(requireAuth);



// Create a new organization
router.post('/createOrganization',checkAdminRole, organizationController.createOrganization);

// Get all organizations
router.get('/getAllOrganizations',checkAdminRole, organizationController.getAllOrganizations);

// Get an organization by ID
router.get('/getOrganizationById/:id',checkAdminRole, organizationController.getOrganizationById);

// Update an organization by ID
router.put('/updateOrganization/:id',checkAdminRole, organizationController.updateOrganization);

// Delete an organization by ID
router.delete('/deleteOrganization/:id',checkAdminRole, organizationController.deleteOrganization);

// Aggregate API to get all data for the admin
router.get('/all-data', organizationController.getAllDataForAdmin);

module.exports = router;
