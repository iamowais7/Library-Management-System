import mongoose,{Schema} from "mongoose";


const membershipSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        enum: [6, 12, 24],
        default: 6,
    },
    active: {
        type: Boolean,
        default: true,
    }
});

membershipSchema.pre('save', function(next) {
    const endDate = new Date(this.startDate);
    endDate.setMonth(endDate.getMonth() + this.duration);
    this.endDate = endDate;
    next();
});

export const Membership = mongoose.model("Membership",membershipSchema)