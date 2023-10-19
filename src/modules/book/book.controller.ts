import { Body, Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from 'src/schemas/Book.schema';
import { successResponseHandler } from 'src/handlers/response.handlers';
import { BookDto } from '../../dto/book.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // CREATE BOOK //
  @Roles(['TEACHER','ADMIN'])
  @UseGuards(AuthGuard)
  @Post('create-book')
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:'public/img',
      filename:(req,file,cb) => {
        cb(null,new Date().getTime()+'_'+file.originalname)
      }
    })
  }))
  createBook(@Body() book: Book, @Res() response,@UploadedFile() file:Express.Multer.File) {
    const createdBook = this.bookService.creatBook(response, book,file.filename);
    if (createdBook) {
      const message = {
        success: true,
        message: 'book created',
      };
      successResponseHandler(response, message, 201);
    }
  }

  // FIND ALL BOOKS //
  @Roles(['STUDENT', 'TEACHER','ADMIN'])
  @UseGuards(AuthGuard)
  @Get('books')
  async findAllBook(@Res() response) {
    const books = await this.bookService.findAllBookDetails(response);
    const newBooks = books.map((book) => {
      const bookDto = new BookDto({
        _id: book._id,
        name: book.book_name,
        author: book.author,
      });
      return bookDto;
    });
    successResponseHandler(response, newBooks, 200);
  }
}
