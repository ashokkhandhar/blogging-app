import { Token } from "../models/TokenModel.js";
import { User } from "../models/UserModel.js";

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const tokenDocument = await Token.findOne({ token });
        if(!tokenDocument) {
            return res.status(401).send("Invalid Token");
        }
        try {
            req.user = await User.findById(tokenDocument.userId);
        } catch(error) {
            return res.status(401).send(`User with given token's userId is not found ${error}`);
        }
        next();
    } catch(error) {
        return res.status(401).send(`Token verification error: ${error}`);
    }
}

export default verifyToken;