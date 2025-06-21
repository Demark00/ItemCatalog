import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        coverImage: {
            type: String,
            required: true,
        },
        additionalImages: {
            type: [String],
            default: []
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    }
)

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default Item;