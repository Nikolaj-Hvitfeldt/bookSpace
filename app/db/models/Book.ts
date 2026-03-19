import { Schema, model, Types, type InferSchemaType} from "mongoose";

const coverImageSchema = new Schema({
    url: { 
        type: String, 
        required: true 
    },
    width: { 
        type: Number, 
        required: true 

    },
    height: { 
        type: Number, 
        required: true 
    },
},
{ _id: false }
);

const bookSchema = new Schema({
    title: { 
        type: String, 
        trim: true,
        required: [true, "Title is required"] 
    },
    author: { 
        type: [String], 
        trim: true,
        required: [true, "Author(s) is required"] 
    },
    description: { 
        type: String, 
        trim: true,
        default: "No description available"
    },
    releaseYear: { 
        type: Number, 
        default: 0,
        min: 0,
        max: new Date().getFullYear()
    },
    slug: { 
        type: String,
        required: [true, "Slug is required"],
        lowercase: true,
        trim: true,
        unique: true, 
    },
    pageCount: { 
        type: Number, 
        default: 0,
        min: 0 },
    rating: { 
        type: Number,
        default: 0,
        min: 0,
        max: 5,
     },
     ratingsCount: {
        type: Number,
        default: 0,
        min: 0,
     },
     //Maybe change to enums down the line?
    tags: {
        type: [String], 
        default: [] 
    },
    //Same as above
    moods: {
        type: [String], 
        default: [] 
    },
    //same as above above
    genres: { 
        type: [String], 
        default: [] 
    },
    coverImage: { 
        type: coverImageSchema, 
        required: true
    },
}, 
{ timestamps: true }
);

export type BookType = InferSchemaType<typeof bookSchema> & { _id: Types.ObjectId };
export default model<BookType>("Book", bookSchema);

