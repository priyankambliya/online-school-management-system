import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, adminSchema } from "src/schemas/Admin.schema";

@Module({
  imports:[
    MongooseModule.forFeature([{name:Admin.name,schema:adminSchema}])
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
