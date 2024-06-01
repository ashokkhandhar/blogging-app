import { User } from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Token } from '../models/TokenModel.js'

const saltRound = parseInt(process.env.SALTROUND);

export const register = async (req, res) => {

    const { fullName, username, email, password } = req.body;

    // check if user already exiest
    try {
        const existingUser = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });
        if(existingUser) {
            if(existingUser.email === email) {
                return res.status(409).send("User with this email already exists");
            }
            if(existingUser.username === username) {
                return res.status(409).send("Username already exists");
            }
        }
    } catch (error) {
        return res.status(500).send(error);
    }

    // save new user
    const hashedPassword = bcrypt.hashSync(password, saltRound);
    const newUser = new User({
        fullName,
        username,
        email,
        password: hashedPassword,
    });
    try {
        const user = await newUser.save();
        console.log("New User: ", user);

        // creating token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
        const newToken = new Token({ token, userId: user._id });
        newToken.save()
        .then(() => {
            return res.status(200).send({ token, id: user._id, username: user.username, email: user.email });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send(`Token saving error: ${error}`);
        });
    } catch (error) {
        return res.status(500).send("Error while saving new user to database: " + error.message);
    }
}

export const login = async (req, res) => {
    const { usernameORemail, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [
                { username: usernameORemail },
                { email: usernameORemail }
            ]
        });
        if(!user) {
            return res.status(401).send("User not found");
        }
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).send("Incorrect Password");
        }
        // creating token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
        const newToken = new Token({ token, userId: user._id });
        newToken.save()
        .then(() => {
            return res.status(200).send({token, id: user._id, fullName: user.fullName, username: user.username, email: user.email });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send( `Token saving error: ${error}`);
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}

export const logout = async (req, res) => {
    // distroy token
    const token = req.headers.authorization;
    try {
        const user = await Token.findOneAndDelete({ token });
        console.log("Logout User:", user);
        return res.status(200).send('Logout successfully');
    }
    catch(error) {
        return res.status(500).send(`Error while logout: ${error}`);
    }
}