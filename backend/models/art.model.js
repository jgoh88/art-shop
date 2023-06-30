const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    img: {
        type: String,
        required: true,
    },
    deleted: Boolean,
    createdBy: {
        user: {
            type: mongoose.ObjectId,
            ref: 'User',
        },
        username: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        }
    }
}, {timestamps: true})

const Art = mongoose.model('Art', artSchema)

module.exports = Art