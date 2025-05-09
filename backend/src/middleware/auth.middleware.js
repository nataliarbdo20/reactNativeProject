import jwt from "jsonwebtoken";
import User from "../models/User.js";





const protectRoute = async (req, res, next) => {

    try {
        //get the token from the header
        const token = req.headers.authorization.replace("Bearer ", "");
        if(!token) return res.status(401).json({ message: "Not authorized, access denied" });

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // find the user
        const user = await User.findById(decoded.UserId).select("-password");
        if(!user) return res.status(401).json({ message: "Not authorized, token invalid" });

        req.user = user;
        next();
        

    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).json({ message: "Not authorized, token failed" });
        
    }
};

export default protectRoute;