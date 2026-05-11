export const services = {
    auth: process.env.AUTH_SERVICE || "http://localhost:3001",
    profile: process.env.PROFILE_SERVICE || "http://localhost:3002",
    expense: process.env.EXPENSE_SERVICE || "http://localhost:3003",
};