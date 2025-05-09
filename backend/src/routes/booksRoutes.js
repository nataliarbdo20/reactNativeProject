import express from "express";
import cloudinary from "../lib/cloudinary"; 
import Book from "../models/Book.js";
import protectRoute from "../middleware/auth.middleware.js"; 


const router = express.Router();
router.post("/", protectRoute, async (req, res) => {
try {
    const { title, caption, image, rating } = req.body;
    if(!image || !title || !caption || !rating){
        return res.status(400).json({message: "Please fill all the fields"});
    }

    //upload the images to cloudinary
   const uploadResponse = await cloudinary.uploader.upload(image);
   const imageUrl = uploadResponse.secure_url;


    //save to the database
    const newBook = new Book({
        title,
        caption,
        image: imageUrl,
        rating,
        user: req.user._id,
    });
    
    await newBook.save();

    res.status(201).json({message: "Book created successfully", book: newBook});

} catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({message: "Internal server error", error: error.message});
    
}
});

export default router;  