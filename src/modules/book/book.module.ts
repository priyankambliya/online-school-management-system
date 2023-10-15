import { MiddlewareConsumer, Module,NestModule, RequestMethod } from '@nestjs/common'
import { BookController } from './book.controller'
import { BookService } from './book.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Book, BookSchema } from "src/schemas/Book.schema";
import { JwtMiddleware } from "src/middlewares/JwtAuth.middleware";
import { User, UserSchema } from "src/schemas/User.schema";

@Module({
    imports:[
        MongooseModule.forFeature([{name:Book.name,schema:BookSchema}]),
        MongooseModule.forFeature([{name:User.name,schema:UserSchema}])
    ],
    controllers: [BookController],
    providers: [BookService]
})
export class BookModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(JwtMiddleware)
          .forRoutes(BookController)
      }
}
