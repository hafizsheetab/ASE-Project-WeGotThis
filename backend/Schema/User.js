const dynamoose = require("dynamoose");

const UserSchema = new dynamoose.Schema(
    {
        id: String,
        firstName: String,
        lastName: String,
        email: {
            type: String,
            index: {
                global: true, // GSI
                name: "emailIndex", // GSI name
            },
        },
        phoneNumber: String,
        location: String,
        passwordHash: String,
        expire: {
            type: Boolean,
            default: true,
        },
        categoryIds: {
            type: Array,
            schema: [Number],
        },
        imageUrl: String,
        ratings: {
            type: Array,
            schema: [
                {
                    type: Object,
                    schema: {
                        userId: String,
                        rating: Number,
                        text: String,
                        time: Date
                    },
                },
            ],
        },
        servicesOffered: {
            type: Number,
            default: 0
        },
        servicesSeeked: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

const User = dynamoose.model("User", UserSchema, {
    initialize: true,
    update: true,
});
module.exports = User;
