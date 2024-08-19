import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Get All Books
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const allBooks = await prisma.book.findMany(
            );
        res.status(200).send({
            message: "Get all books successfully",
            data: allBooks,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Error retrieving books",
        });
    }
};

// Get Book by ID
export const getBookById = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.id;
        const book = await prisma.book.findUnique({
            where: { id: bookId },
        });
        if (!book) {
            return res.status(404).send({ message: "Book not found" });
        }
        res.status(200).send({ data: book });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "Error retrieving book" });
    }
};

// Create Book
export const createBook = async (req: Request, res: Response) => {
    try {
        const bookData = req.body;
        const book = await prisma.book.create({
            data: bookData,
        });
        res.status(201).send({
            message: "Book created",
            data: book,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "Error creating book" });
    }
};

// Update Book by ID
export const updateBookById = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.id;
        const bookData = req.body;

        const updatedBook = await prisma.book.update({
            where: { id: bookId },
            data: bookData,
        });

        res.status(200).send({
            message: `Book with ID ${bookId} updated successfully`,
            data: updatedBook,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "Error updating book" });
    }
};

// Delete Book by ID
export const deleteBookById = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.id;

        await prisma.book.delete({ where: { id: bookId } });

        res.status(200).send({ message: `Book with ID ${bookId} deleted successfully` });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "Error deleting book" });
    }
};
