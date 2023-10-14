import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Book, BookDocument } from "src/schemas/Book.schema";

@Injectable()
export class BookService {

    constructor(
        @InjectModel(Book.name) private readonly bookModel:Model<BookDocument>
    ){}

    
}
