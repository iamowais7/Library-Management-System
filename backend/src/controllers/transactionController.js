import {Book} from "../models/bookModels.js"
import {Transaction} from "../models/transactionModels.js"

exports.checkBookAvailability = async (req, res) => {
    const { bookId } = req.params;
    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json({ isAvailable: book.isAvailable });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.issueBook = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        const book = await Book.findById(bookId);
        if (!book || !book.isAvailable) return res.status(400).json({ message: "Book not available" });

        book.isAvailable = false;
        await book.save();

        const transaction = new Transaction({
            userId,
            bookId,
            issueDate: new Date(),
            returnDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // Default 15 days ahead
        });

        await transaction.save();
        res.json({ message: "Book issued successfully", transaction });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.returnBook = async (req, res) => {
    const { transactionId, actualReturnDate, finePaid } = req.body;
    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });

        transaction.actualReturnDate = actualReturnDate;
        transaction.finePaid = finePaid;
        transaction.isReturned = true;

        await transaction.save();

        const book = await Book.findById(transaction.bookId);
        if (book) {
            book.isAvailable = true;
            await book.save();
        }

        res.json({ message: "Book returned successfully", transaction });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.payFine = async (req, res) => {
    const { transactionId, finePaid } = req.body;
    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });

        transaction.finePaid = finePaid;
        await transaction.save();

        res.json({ message: "Fine paid successfully", transaction });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
