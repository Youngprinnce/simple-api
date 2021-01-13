const User = require('../models/User');
const { sendSuccess, sendError } = require("../utils/responseHandler")
const { publishMessage } = require("../config/emailQueue")
const template = require("../utils/template")

// Create and Save a new User
const create_user = async (req, res) => {
    const {firstname, lastname, email, mobile} = req.body

    // Create a Note
    const user = new User({
        firstname,
        lastname,
        email,
        mobile
    });

    // Save Note in the database
    await user.save( async (err, data) => {
        if (err) {
            return sendError(res,err.message,"Error occurred while creating user!", 500)
        }

        const emailOptions = {
            email,
            subject: "Appreciation",
            message: template(`Dear ${firstname}`, "Thank you for registering with us. We hope you have a good experience")
        }

        //Sends email in queue
        publishMessage(emailOptions);
        return sendSuccess(res, data, "User created successfully", 201)
    })
}

// Retrieve and return all users from the database.
const get_users = async (req, res) => {
    await User.find((err, user) => {
        if (err) {
            return sendError(res, err, "Error occurred while retrieving users!", 500)
        }
        return sendSuccess(res, user)
    })
}

// Find a single user with a userId
const get_user = async(req,res) => {
    await User.findById(req.params.userId, ((err, user) => {
        if (!user) {
            return sendError(res, [], "User not found with id " + req.params.userId, 404)
        } else if(err){
            return sendError(res, err, "Error retrieving user with id " + req.params.userId, 500)
        }
       return sendSuccess(res, user)
    }))
}

// Find note and update it with the request body
const update_user = async (req, res) => {
    await User.findByIdAndUpdate(req.params.userId, req.body, { new: true }, (err, user) => {
        if (!user) {
            return sendError(res, [], "User not found with id " + req.params.userId, 404)
        } else if (err) {
            return sendError(res, [], "Error updating user with id " + req.params.userId, 500)
        }
        return sendSuccess(res, user,"User updated",201)
    })
}

// Delete a user with the specified userId in the request
const delete_user = async (req, res) => {
    await User.findByIdAndRemove(req.params.userId, async(err, user) => {
        if (!user) {
            return sendError(res, [], "User not found with id " + req.params.userId, 404)
        } else if (err) {
            return sendError(res, [], "Could not delete user with id " + req.params.userId, 500)
        }

        const emailOptions = {
            email:user.email,
            subject: "GoodBye",
            message: template(`Dear ${user.firstname}`, "It's sad to see you leave us, We hope to see you next time")
        }

        //Sends email in queue
        publishMessage(emailOptions);
        return sendSuccess(res, {},  "User successfully deleted")
    })
}


module.exports = {
    create_user,
    get_users,
    get_user,
    update_user,
    delete_user
};
