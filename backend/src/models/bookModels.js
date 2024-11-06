import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt, { compare } from "bcrypt"


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    type: {
        type: String,
        enum: ['Book', 'Movie'],
        default: 'Book',
    },
    addedDate: {
        type: Date,
        default: Date.now,
    }
});







export const Book = mongoose.model("Book",bookSchema)