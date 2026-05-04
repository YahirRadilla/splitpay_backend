import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const registerUser = async (
    email: string,
    password: string,
    name: string,
    lastName: string
) => {
    const hashed = await bcrypt.hash(password, 10);

    return User.create({
        email,
        password: hashed,
        name,
        lastName
    });
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
    );

    return token;
};