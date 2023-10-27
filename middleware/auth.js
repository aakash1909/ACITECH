// Middleware to check if the user is an admin
function checkAdminRole(req, res, next) {
    const currentUser = req.user; 
  

    console.log(currentUser)

    if (currentUser.role === 'admin') {
      return next(); // Allow access for admins
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }
  }
  
  module.exports = { checkAdminRole };
  