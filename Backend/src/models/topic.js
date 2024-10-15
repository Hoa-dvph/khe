import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    is_hidden: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})

export const Topic = mongoose.model("Topic", TopicSchema);