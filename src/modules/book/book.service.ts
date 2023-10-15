import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { errorResponseHandler } from "src/handlers/response.handlers"
import {errorNames} from '../../handlers/allErrors.names'
import { Book, BookDocument } from "src/schemas/Book.schema"

@Injectable()
export class BookService {

    constructor(
        @InjectModel(Book.name) private readonly bookModel:Model<BookDocument>
    ){}
    
    // CREATE BOOK //
    async creatBook(response,book:Book){
        const {
            book_name,
            author,
            booksnumbers
        } = book

        try {
            const createdBook = await this.bookModel.create({
                book_name,
                booksnumbers,
                author
            })
    
            if(!createdBook) throw errorResponseHandler(response,{error:errorNames.BOOK_NOT_CREATED},400)
            return createdBook
        } catch (error) {
            errorResponseHandler(response,error,401)
        }
    }

    // FIND ALL BOOKS //
    async findAllBookDetails(response){
        try {
            const books = await this.bookModel.find()
            if(books.length == 0) throw errorResponseHandler(response,{error:errorNames.BOOKS_NOT_FOUND},401)
            return books
        } catch (error) {
        }
    }
}
