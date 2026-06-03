import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    stripeCustomerId: {
        type: String,
    },
    stripeConnectedAccountId: {
        type: String,
        default: null,
    },

    defaultPaymentMethodId: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
}, {
    timestamps: true
});



const profileSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },

        avatar: {
            type: String,
            default: "",
        },

        bio: {
            type: String,
            default: "",
        },

        phone: {
            type: String,
            default: "",
        },

        address: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        ownerId: {
            type: String,
            required: true,
        },

        members: [
            {
                type: String,
            },
        ],
        deletedAt: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

const splitSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },
    },
    {
        _id: false,
    }
);

const expenseSchema = new mongoose.Schema(
    {
        requestId: {
            type: String,
            required: true,
            unique: true,
        },
        groupId: {
            type: String,
            required: true,
        },

        paidBy: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        splits: [splitSchema],
        deletedAt: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

const settlementSchema = new mongoose.Schema(
    {
        requestId: {
            type: String,
            required: true,
            unique: true,
        },
        groupId: {
            type: String,
            required: true,
        },

        fromUserId: {
            type: String,
            required: true,
        },

        toUserId: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        deletedAt: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

const invitationSchema =
    new mongoose.Schema(
        {
            requestId: {
                type: String,
                required: true,
                unique: true,
            },
            groupId: {
                type: String,
                required: true,
            },

            invitedBy: {
                type: String,
                required: true,
            },

            invitedUserId: {
                type: String,
                required: true,
            },

            status: {
                type: String,

                enum: [
                    "pending",
                    "accepted",
                    "rejected",
                    "expired",
                ],

                default: "pending",
            },

            expiresAt: {
                type: Date,

                required: true,
            },
            deletedAt: {
                type: Date,
                default: null,
            }
        },
        {
            timestamps: true,
        }
    );


const activitySchema =
    new mongoose.Schema(
        {
            groupId: {
                type: String,
                required: true,
            },

            userId: {
                type: String,
                required: true,
            },

            type: {
                type: String,
                required: true,
            },

            message: {
                type: String,
                required: true,
            },

            metadata: {
                type: Object,
                default: {},
            },
            deletedAt: {
                type: Date,
                default: null,
            }
        },
        {
            timestamps: true,
        },

    );

const notificationSchema =
    new mongoose.Schema(
        {
            userId: {
                type: String,
                required: true,
            },

            type: {
                type: String,
                required: true,
            },

            title: {
                type: String,
                required: true,
            },

            message: {
                type: String,
                required: true,
            },

            read: {
                type: Boolean,
                default: false,
            },

            metadata: {
                type: Object,
                default: {},
            },
            deletedAt: {
                type: Date,
                default: null,
            }
        },
        {
            timestamps: true,
        }
    );

const User = mongoose.model("User", userSchema);
const Profile = mongoose.model("Profile", profileSchema);
const Group = mongoose.model("Group", groupSchema);
const Expense = mongoose.model("Expense", expenseSchema);
const Settlement = mongoose.model("Settlement", settlementSchema);
const Invitation = mongoose.model("Invitation", invitationSchema);
const Activity = mongoose.model("Activity", activitySchema);
const Notification = mongoose.model("Notification", notificationSchema);


dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI!
        );

        console.log("Mongo connected");

        await Promise.all([
            User.deleteMany({}),
            Profile.deleteMany({}),
            Group.deleteMany({}),
            Expense.deleteMany({}),
            Settlement.deleteMany({}),
            Invitation.deleteMany({}),
            Activity.deleteMany({}),
            Notification.deleteMany({}),
        ]);

        console.log("Collections cleaned");

        const users = [];

        for (let i = 0; i < 10; i++) {
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

                    name:
                        faker.person.firstName(),

                    lastName:
                        faker.person.lastName(),

                    role:
                        i === 0
                            ? "admin"
                            : "user",

                    stripeCustomerId:
                        `cus_${faker.string.alphanumeric(
                            24
                        )}`,

                    stripeConnectedAccountId:
                        i % 2 === 0
                            ? `acct_${faker.string.alphanumeric(
                                24
                            )}`
                            : null,

                    defaultPaymentMethodId:
                        `pm_${faker.string.alphanumeric(
                            24
                        )}`,
                });

            users.push(user);

            await Profile.create({
                userId: user.id,

                avatar:
                    faker.image.avatar(),

                bio:
                    faker.person.bio(),

                phone:
                    faker.phone.number(),

                address:
                    faker.location.streetAddress(),
            });
        }

        console.log("Users created");

        const groups = [];

        for (let i = 0; i < 3; i++) {
            const members =
                faker.helpers
                    .shuffle(users)
                    .slice(0, 5);

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

            await Activity.create({
                groupId: group.id,

                userId:
                    members[0]!.id,

                type:
                    "group-created",

                message:
                    "Grupo creado",

                metadata: {
                    groupName:
                        group.name,
                },
            });
        }

        console.log("Groups created");

        for (const group of groups) {
            for (
                let i = 0;
                i < 15;
                i++
            ) {
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
                    Number(
                        (
                            amount /
                            group.members.length
                        ).toFixed(2)
                    );

                const splits =
                    group.members.map(
                        (memberId) => ({
                            userId: memberId,
                            amount:
                                splitAmount,
                        })
                    );

                const expense =
                    await Expense.create({
                        requestId:
                            faker.string.uuid(),

                        groupId:
                            group.id,

                        paidBy,

                        description:
                            faker.commerce.productName(),

                        amount,

                        splits,
                    });

                await Activity.create({
                    groupId:
                        group.id,

                    userId: paidBy,

                    type:
                        "expense-created",

                    message:
                        "Gasto agregado",

                    metadata: {
                        expenseId:
                            expense.id,
                    },
                });
            }
        }

        console.log("Expenses created");

        for (const group of groups) {
            for (
                let i = 0;
                i < 5;
                i++
            ) {
                const fromUser =
                    faker.helpers.arrayElement(
                        group.members
                    );

                let toUser =
                    faker.helpers.arrayElement(
                        group.members
                    );

                while (
                    toUser ===
                    fromUser
                ) {
                    toUser =
                        faker.helpers.arrayElement(
                            group.members
                        );
                }

                await Settlement.create({
                    requestId:
                        faker.string.uuid(),

                    groupId:
                        group.id,

                    fromUserId:
                        fromUser,

                    toUserId:
                        toUser,

                    amount:
                        faker.number.int({
                            min: 100,
                            max: 1500,
                        }),
                });
            }
        }

        console.log(
            "Settlements created"
        );

        for (const group of groups) {
            for (
                let i = 0;
                i < 3;
                i++
            ) {
                const invitedBy =
                    faker.helpers.arrayElement(
                        group.members
                    );

                const invitedUser =
                    faker.helpers.arrayElement(
                        users
                    );

                await Invitation.create({
                    requestId:
                        faker.string.uuid(),

                    groupId:
                        group.id,

                    invitedBy,

                    invitedUserId:
                        invitedUser.id,

                    status:
                        faker.helpers.arrayElement(
                            [
                                "pending",
                                "accepted",
                                "rejected",
                            ]
                        ),

                    expiresAt:
                        faker.date.future(),
                });
            }
        }

        console.log(
            "Invitations created"
        );

        for (const user of users) {
            await Notification.create({
                userId:
                    user.id,

                type:
                    "welcome",

                title:
                    "Bienvenido",

                message:
                    "Gracias por usar SplitPay",

                read:
                    faker.datatype.boolean(),

                metadata: {},
            });
        }

        console.log(
            "Notifications created"
        );

        console.log(
            "Seed completed"
        );

        process.exit(0);
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

seed();