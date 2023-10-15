import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, now } from "mongoose"

@Schema()
export class Book {
    @Prop()
    book_name: string;

    @Prop()
    author: string;

    @Prop()
    booksnumbers: number;

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: now() })
    updatedAt: Date;
}

export type BookDocument = Book & Document;

export const BookSchema = SchemaFactory.createForClass(Book)