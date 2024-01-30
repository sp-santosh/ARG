import jwt from "jsonwebtoken";
import { environment } from "../environment.js";
import { UserRepository } from "../database/repositories/user.repo.js";
export const authenticate = async (req, res, next) => {
    try{

        if (req.headers.authorization) {
    // Bearer <token>
           const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                res.status(401).json({ message: "Unauthorized" });
                return ;
            }
            const payload = jwt.verify(token, environment.jwtSecret);
            console.log({ payload });
            const user = await new UserRepository().getUser(payload.email);
            if(!user){
                res.status(401).json({ message: "Unauthorized" });
                return ;

            }
            req.user = user;
            next();
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }

    }catch(err){
        res.status(401).json({ message: "Unauthorized" });
    }
}