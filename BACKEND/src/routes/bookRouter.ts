import { Router } from "express";

import { createBook, deleteBookById, getAllBooks, updateBookById, getBookById } from "../controllers/bookController";
// import { updateAuthorById } from "controllers/authorController";


const booksRouter = Router()

booksRouter.get('/', getAllBooks)
booksRouter.get('/:id', getBookById)
booksRouter.post('/', createBook)
booksRouter.put('/:id', updateBookById)
booksRouter.delete('/:id', deleteBookById)

export default booksRouter;