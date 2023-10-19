import { Body, Controller, Post, Res } from '@nestjs/common'
import * as Jwt from 'jsonwebtoken'
import { AppService } from './app.service'
import { User } from "./schemas/User.schema"
import { successResponseHandler } from "./handlers/response.handlers"
import {
  SECRET_KEY
} from '../security/config.json'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // USER REGISTER POST REQUEST:
  @Post('signup')
  signupUser(
    @Body() user:User,
    @Res() response
  ){
    const registeredUser = this.appService.createUser(response,user)
    const message = {
      message:"user created"
    }
    successResponseHandler(response,message,201)
  }

  // USER LOGIN POST REQUEST:
  @Post('signin')
  async signinUser(
    @Body() user:User,
    @Res() response
  ){
    const loginUserData = await this.appService.loginUser(response,user)
    const payload = {
      email:loginUserData.email,
      role:loginUserData.role
    }
    const token = await Jwt.sign(payload,SECRET_KEY)
    const message = {
      message:"user login done",
      token
    }
    successResponseHandler(response,message,201)
  }
}
