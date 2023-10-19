import { Body, Controller, Post, Res } from '@nestjs/common';
import { Admin } from 'src/schemas/Admin.schema';
import { AdminService } from './admin.service';
import * as Jwt from 'jsonwebtoken'
import {
  errorResponseHandler,
  successResponseHandler,
} from 'src/handlers/response.handlers';
import { SECRET_KEY } from '../../../security/config.json'

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // USER REGISTER POST REQUEST:
  @Post('signup')
  async signupUser(@Body() user: Admin, @Res() response) {
    const registeredUser: any = await this.adminService.createAdmin(
      user,
    );
    if (!registeredUser.error) {
      const message = {
        message: 'admin created'
      };
      successResponseHandler(response, message, 201);
    }
    errorResponseHandler(response, registeredUser, 400);
  }


  @Post('signin')
  async signinUser(@Body() user: Admin, @Res() response) {
    const loginUser: any = await this.adminService.loginAdmin(
      user
    )
    const payload={
        email:loginUser.email,
        role:loginUser.role
    }
    if (!loginUser.error) {
        const token = await Jwt.sign(payload,SECRET_KEY)
      const message = {
        message: 'admin loged in',
        token
      };
      successResponseHandler(response, message, 201);
    }else{
        errorResponseHandler(response, loginUser, 400);
    }
  }
}
