import { Body, Controller, Post, Res } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from 'src/schemas/Book.schema';
import { response } from "express";
import { successResponseHandler } from "src/handlers/response.handlers";

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
    @Post('create-book')
    createBook(
    @Body() book: Book,
    @Res() response
    ){
        const createdBook = this.bookService.creatBook(book)
        const message = {
            success:true,
            message:"book created"
        }
        successResponseHandler(response,message,201)
    }   
}
