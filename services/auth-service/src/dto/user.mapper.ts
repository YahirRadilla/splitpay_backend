import type { UserResponseDTO } from "../dto/user-response.dto.js";

export const toUserResponseDTO = (
    user: any
): UserResponseDTO => {
    return {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
    };
};