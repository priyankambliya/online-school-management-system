import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schemas/User.schema'
import { MONGO_DB } from '../security/config.json'
import { BookModule } from './modules/book/book.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_DB.LOCAL_MONGO_DB_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BookModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
