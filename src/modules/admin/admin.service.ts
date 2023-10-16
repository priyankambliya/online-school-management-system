import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/schemas/Admin.schema';
import * as bcrypt from 'bcrypt';
import { errorNames } from 'src/handlers/allErrors.names';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
  ) {}

  // ADMIN CREATED //
  async createAdmin( user: Admin) {
    try {
        const { name, email, password } = user;
        const isAdmin = await this.adminModel.find();
        if (isAdmin.length > 0) throw errorNames.ADMIN_ALREADY_EXIST
        const hasedPassword = await bcrypt.hash(password, 16);
    
        const admin = await this.adminModel.create({
          name,
          email,
          password: hasedPassword,
        });
    
        if (!admin) throw { error: errorNames.ADMIN_NOT_CREATED };
        return admin;
    } catch (error) {
        return {error}
    }
  }

  // ADMIN LOGIN //
  async loginAdmin( user: Admin) {
    try {
        const { email, password } = user;
        
        const admin = await this.adminModel.findOne({
          email
        });

        const convertedPassword = await bcrypt.compare(password,admin.password)
        if(!convertedPassword) throw { error: errorNames.PASSWORD_MISS_MATCH };
        if (!admin) throw { error: errorNames.ADMIN_NOT_CREATED };
        return admin;
    } catch (error) {
        return {error}
    }
  }
}
