import { User } from "../models/UserModel.js";
import { Post } from "../models/PostModel.js";
import bcrypt from 'bcrypt';
import { Token } from "../models/TokenModel.js";

const saltRound = parseInt(process.env.SALTROUND);

export const profile = async (req, res) => {
    const reqUsername = req.params.username;
    try {
        const user = await User.findOne({ username: reqUsername });
        if(user) {
            return res.status(200).send(user);
        }
        else {
            return res.status(401).send("Username not found");
        }
    } catch(error) {
        return res.status(500).send(error);
    }
}

export const updateProfile = async (req, res) => {
    const user = req.user;
    let { fullName, username, email, oldPassword, newPassword } = req.body;

    const isValidPassword = bcrypt.compareSync(oldPassword, user.password);
    if (!isValidPassword) {
        return res.status(401).send("Old Password is Wrong");
    }

    if(newPassword) newPassword = bcrypt.hashSync(newPassword, saltRound);

    try {
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            fullName: fullName || user.fullName,
            username: username || user.username,
            email: email || user.email,
            password: newPassword || user.password
        });
        console.log({updatedUser});
        return res.status(200).send("Profile Updated Successfully");
    } catch(error) {
        return res.status(500).send(error);
    }
}

export const deleteProfile = async (req, res) => {
 
    const user = req.user;

    // delete user
    try {
        const response = await User.deleteOne({ _id: user._id });
        console.log(response);
    } catch(error) {
        return res.status(500).send(error);
    }
    
    // delete posts
    try {
        const response = await Post.deleteMany({ username: user.username });
        console.log(response);
    } catch(error) {
        return res.status(500).send(error);
    }
    
    // distroy token
    const token = req.headers.authorization;
    try {
        const response = await Token.deleteOne({ token });
        console.log(response);
    }
    catch(error) {
        return res.status(500).send(error);
    }
    
    return res.status(200).send("Profile Deleted Successfully");
}