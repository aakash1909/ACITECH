const Organization = require('../models/organization');
const User =  require('../models/user');

// Create a new organization
exports.createOrganization = async (req, res) => {
  try {
    const organization = new Organization(req.body);
    const savedOrganization = await organization.save();
    res.status(201).json(savedOrganization);
  } catch (error) {
    res.status(500).json({ error: 'Could not create organization' });
  }
};

// Get all organizations
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve organizations' });
  }
};

// Get an organization by ID
exports.getOrganizationById = async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await Organization.findById(id);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve organization' });
  }
};

// Update an organization by ID
exports.updateOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedOrganization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.status(200).json(updatedOrganization);
  } catch (error) {
    res.status(500).json({ error: 'Could not update organization' });
  }
};

// Delete an organization by ID
exports.deleteOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrganization = await Organization.findByIdAndDelete(id);
    if (!deletedOrganization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Could not delete organization' });
  }
};



// Aggregate API to fetch all data for the admin
exports.getAllDataForAdmin = async (req, res) => {
  const isAdmin = req.user.role === 'admin'; 

  if (!isAdmin) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const result = await User.aggregate([
      {
        $match: {} 
      },
      {
        $lookup: {
          from: 'organizations', 
          localField: 'organization',
          foreignField: '_id',
          as: 'organizationData'
        }
      },
      {
        $unwind: {
          path: '$organizations', 
          preserveNullAndEmptyArrays: true, 
        },
      },
      {
        $project: {
          _id: 0,
          username: 1,
          role: 1,
          organizationData: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve data' });
  }
};