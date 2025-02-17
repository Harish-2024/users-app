import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
    {
        topic: {
            type: String,
            required: true
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Topic = mongoose.model("Topic", topicSchema)

export default Topic;