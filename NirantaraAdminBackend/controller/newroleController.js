const NewRole = require("../modal/newroleModel");

exports.getNewRole = async (req, res) => {
  try {
    let query = {};
    
    // Check if query role is provided
    if (req.query.role) {
      query.role = req.query.role;
    }

    const newRoleData = await NewRole.find(query);
    res.json(newRoleData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addNewRole = async (req, res) => {
  const { roleName, roleAccessName} = req.body;

  try {
    if (!roleName || !roleAccessName) {
      res.json({
        error: "Role Name and RoleAccessName is Required",
      });
    }
    const newroleData = new NewRole({
        roleName,
        roleAccessName
    });

    await newroleData.save();
    res.status(201).json(newroleData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

