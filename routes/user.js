const express = require('express');
const router = express.Router();

const {
  create_user,
  get_users,
  get_user,
  update_user,
  delete_user
} = require('../controllers/userController');

module.exports = () => {
  // Create a new User
  router.post('/users', create_user);

  // Retrieve all Users
  router.get('/users', get_users);

  // Retrieve a single User with userId
  router.get("/users/:userId", get_user);

  // Update a User with userId
  router.patch("/users/:userId", update_user);
  
  // Delete a User with userId
  router.delete("/users/:userId", delete_user);
  return router;
};
