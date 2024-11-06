import mongoose, { Schema } from "mongoose";

const transactionSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    issueDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value >= new Date();
            },
            message: 'Issue date cannot be earlier than today.',
        },
    },
    returnDate: {
        type: Date,
        required: true,
        default: function() {
            const returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + 15);
            return returnDate;
        }
    },
    actualReturnDate: Date,
    remarks: String,
    fine: {
        type: Number,
        default: 0,
    },
    finePaid: {
        type: Boolean,
        default: false,
    } 
});





export const Transaction = mongoose.model("Transaction",transactionSchema)