import jwt from "jsonwebtoken";
export const generateToken = (admin) => {
    return jwt.sign({email: admin.email, id: admin.id},process.env.JWT_KEY,{expiresIn:"10d"});
};
