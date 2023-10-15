import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { BookService } from './book.service'
import { Book } from 'src/schemas/Book.schema'
import { successResponseHandler } from "src/handlers/response.handlers"
import {BookDto} from '../../dto/book.dto'
import { AuthGuard } from "src/guards/auth.guard"
import { Roles } from "src/decorators/roles.decorator"

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

    // CREATE BOOK //
    @Roles(['STUDENT'])
    @UseGuards(AuthGuard)
    @Post('create-book')
    createBook(
    @Body() book: Book,
    @Res() response
    ){
        const createdBook = this.bookService.creatBook(response,book)
        const message = {
            success:true,
            message:"book created"
        }
        successResponseHandler(response,message,201)
    }   

    // FIND ALL BOOKS //
    @Roles(['STUDENT'])
    @UseGuards(AuthGuard)
    @Get('books')
    async findAllBook(
    @Res() response
    ){
        const books = await this.bookService.findAllBookDetails(response)
        const newBooks = books.map(book => {
            const bookDto = new BookDto({
                _id:book._id,
                name:book.book_name,
                author:book.author
            })
            return bookDto
        })
        successResponseHandler(response,newBooks,200)
    }
}
