import {Book} from "../models/bookModels.js"

exports.addBook = async (req, res) => {
    const { title, author, category, type } = req.body;
    try {
        const newBook = new Book({ title, author, category, type });
        await newBook.save();
        res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const book = await Book.findByIdAndUpdate(id, updates, { new: true });
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json({ message: "Book updated successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAvailableBooks = async (req, res) => {
    try {
        const availableBooks = await Book.find({ isAvailable: true });
        res.json(availableBooks);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
