const AppUser = require('../models/userModel');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await AppUser.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await AppUser.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// createUser
const createUser = async (req, res) => {
  const { username, password, name, age, email, role } = req.body;

  try {
    // Kiểm tra email
    const emailCount = await AppUser.count({ where: { email: email } });
    if (emailCount > 0) {
      return res.status(409).json({ error: 'Email đã tồn tại, vui lòng chọn cái khác!' });
    }

    // Kiểm tra username
    const usernameCount = await AppUser.count({ where: { username: username } });
    if (usernameCount > 0) {
      return res.status(409).json({ error: 'Username đã tồn tại, vui lòng chọn cái khác !' });
    }

    // Nếu không có trùng lặp, tạo mới người dùng
    const newUser = await AppUser.create({ username, password, name, age, email, role });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Update user by ID
const updateUserById = async (req, res) => {
  const { userId } = req.params;
  const { username, password, name, age, email, role,avt } = req.body;

  // Lọc ra các trường không rỗng
  const nonEmptyFields = {
    ...(username && { username }),
    ...(password && { password }),
    ...(name && { name }),
    ...(age && { age }),
    ...(email && { email }),
    ...(role && { role }),
    ...(avt && { avt }),
  };
  const checkEmail = await AppUser.findOne(
    {
      where:{
        email:email
      }
    }
  )
  if(checkEmail){
    return res.status(409).json({ error: 'Email was used' });
  }
  else
  try {
    const user = await AppUser.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Update chỉ các trường không rỗng
    await user.update(nonEmptyFields);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Delete user by ID
const deleteUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await AppUser.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get user by username
const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
      const user = await AppUser.findOne(
        { where: {
         username 
        }});
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername, // Thêm dòng này
    createUser,
    updateUserById,
    deleteUserById,
  };
  