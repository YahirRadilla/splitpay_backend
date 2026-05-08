import { toUserResponseDTO } from "../dto/user.mapper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const registerUser = async (
    email: string,
    password: string,
    name: string,
    lastName: string
) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashedPassword,
        name,
        lastName,
    });

    return toUserResponseDTO(user);
};

export const loginUser = async (
    email: string,
    password: string
) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "7d",
        }
    );

    return {
        token,
        user: toUserResponseDTO(user)
    };
};