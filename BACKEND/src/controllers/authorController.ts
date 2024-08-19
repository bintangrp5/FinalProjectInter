// import { PrismaClient } from "@prisma/client";
// import { Request, Response } from "express";

// const prisma = new PrismaClient();

// // Get All Authors
// export const getAllAuthors = async (req: Request, res: Response) => {
//     try {
//         const allAuthors = await prisma.author.findMany({
//             include: {
//                 books: {
//                     select: {
//                         title: true,
//                         deskripsi: true,
//                         TahunTerbit: true,
//                         imageUrl: true
//                     },
//                 },
//             },
//         });
//         res.status(200).send({
//             message: "Get all authors successfully",
//             data: allAuthors,
//         });
//     } catch (e) {
//         console.log(e);
//         res.status(500).send({
//             message: "Error retrieving authors",
//         });
//     }
// };

// // Get Author by ID
// export const getAuthorById = async (req: Request, res: Response) => {
//     try {
//         const authorId = req.params.id;
//         const author = await prisma.author.findUnique({
//             where: { id: authorId },
//             include: {
//                 books: {
//                     select: {
//                         title: true,
//                         deskripsi: true,
//                         TahunTerbit: true,
//                         imageUrl: true,
//                     },
//                 },
//             },
//         });
//         res.status(200).send({ data: author });
//     } catch (e) {
//         console.log(e);
//         res.status(500).send({ message: "Error retrieving author" });
//     }
// };

// // Create Author
// export const createAuthors = async (req: Request, res: Response) => {
//     try {
//         const authorData = req.body;
//         const author = await prisma.author.create({
//             data: authorData,
//         });
//         res.status(201).send({
//             message: "Author created",
//             data: author,
//         });
//     } catch (e) {
//         console.log(e);
//         res.status(500).send({ message: "Error creating author" });
//     }
// };

// // Update Author by ID
// export const updateAuthorById = async (req: Request, res: Response) => {
//     try {
//         const authorId = req.params.id;
//         const authorData = req.body;

//         const updatedAuthor = await prisma.author.update({
//             where: { id: authorId },
//             data: authorData,
//         });

//         res.status(200).send({
//             message: `Author with ID ${authorId} updated successfully`,
//             data: updatedAuthor,
//         });
//     } catch (e) {
//         console.log(e);
//         res.status(500).send({ message: "Error updating author" });
//     }
// };

// // Delete Author by ID
// export const deleteAuthorById = async (req: Request, res: Response) => {
//     try {
//         const authorId = req.params.id;

//         await prisma.author.delete({ where: { id: authorId } });

//         res.status(200).send({ message: `Author with ID ${authorId} deleted successfully` });
//     } catch (e) {
//         console.log(e);
//         res.status(500).send({ message: "Error deleting author" });
//     }
// };
