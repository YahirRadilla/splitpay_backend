import mongoose from "mongoose";

import dotenv from "dotenv";

import bcrypt from "bcrypt";

import { faker } from "@faker-js/faker";

dotenv.config();

const MONGO_URI =
    process.env.MONGO_URI!;

const userSchema = new mongoose.Schema(
    {
        email: String,

        password: String,

        role: String,

        stripeCustomerId: String,

        defaultPaymentMethodId:
            String,
    },
    {
        timestamps: true,
    }
);

const profileSchema =
    new mongoose.Schema(
        {
            userId: String,
            name: String,
            lastName: String,
        },
        {
            timestamps: true,
        }
    );

const groupSchema =
    new mongoose.Schema(
        {
            name: String,
            ownerId: String,
            members: [String],
        },
        {
            timestamps: true,
        }
    );

const expenseSchema =
    new mongoose.Schema(
        {
            groupId: String,
            paidBy: String,
            description: String,
            amount: Number,

            splits: [
                {
                    userId: String,
                    amount: Number,
                },
            ],
        },
        {
            timestamps: true,
        }
    );

const settlementSchema =
    new mongoose.Schema(
        {
            groupId: String,
            fromUserId: String,
            toUserId: String,
            amount: Number,
        },
        {
            timestamps: true,
        }
    );

const User = mongoose.model(
    "User",
    userSchema
);

const Profile = mongoose.model(
    "Profile",
    profileSchema
);

const Group = mongoose.model(
    "Group",
    groupSchema
);

const Expense = mongoose.model(
    "Expense",
    expenseSchema
);

const Settlement = mongoose.model(
    "Settlement",
    settlementSchema
);

const seed = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("Mongo connected");

        await User.deleteMany({});
        await Profile.deleteMany({});
        await Group.deleteMany({});
        await Expense.deleteMany({});
        await Settlement.deleteMany({});

        console.log("Collections cleaned");

        const users = [];

        for (let i = 0; i < 8; i++) {
            const password =
                await bcrypt.hash(
                    "123456",
                    10
                );

            const user =
                await User.create({
                    email:
                        faker.internet.email(),

                    password,

                    role:
                        i === 0
                            ? "admin"
                            : "user",

                    stripeCustomerId:
                        `cus_${faker.string.alphanumeric(24)}`,

                    defaultPaymentMethodId:
                        `pm_${faker.string.alphanumeric(24)}`,
                });

            users.push(user);

            await Profile.create({
                userId: user.id,

                name:
                    faker.person.firstName(),

                lastName:
                    faker.person.lastName(),
            });
        }

        console.log("Users created");

        const groups = [];

        for (let i = 0; i < 3; i++) {
            const shuffled =
                faker.helpers.shuffle(users);

            const members =
                shuffled.slice(0, 4);

            const group =
                await Group.create({
                    name:
                        faker.company.name(),

                    ownerId:
                        members[0]!.id,

                    members:
                        members.map(
                            (m) => m.id
                        ),
                });

            groups.push(group);
        }

        console.log("Groups created");

        for (const group of groups) {
            for (let i = 0; i < 20; i++) {
                const paidBy =
                    faker.helpers.arrayElement(
                        group.members
                    );

                const amount =
                    faker.number.int({
                        min: 100,
                        max: 5000,
                    });

                const splitAmount =
                    amount /
                    group.members.length;

                const splits =
                    group.members.map(
                        (memberId: string) => ({
                            userId: memberId,
                            amount: splitAmount,
                        })
                    );

                await Expense.create({
                    groupId: group.id,

                    paidBy,

                    description:
                        faker.commerce.productName(),

                    amount,

                    splits,
                });
            }
        }

        console.log("Expenses created");

        for (const group of groups) {
            for (let i = 0; i < 8; i++) {
                const fromUser =
                    faker.helpers.arrayElement(
                        group.members
                    );

                let toUser =
                    faker.helpers.arrayElement(
                        group.members
                    );

                while (
                    toUser === fromUser
                ) {
                    toUser =
                        faker.helpers.arrayElement(
                            group.members
                        );
                }

                await Settlement.create({
                    groupId: group.id,

                    fromUserId: fromUser,

                    toUserId: toUser,

                    amount:
                        faker.number.int({
                            min: 50,
                            max: 1000,
                        }),
                });
            }
        }

        console.log("Settlements created");

        console.log("Seed completed");

        process.exit(0);
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

seed();