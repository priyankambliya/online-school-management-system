import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from "./schemas/User.schema"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {
  SALT_OR_ROUND
} from './security/config.json'
import { errorResponseHandler } from "./handlers/response.handlers"

@Injectable()
export class AppService {

  constructor(
    @InjectModel(User.name) private readonly userModel:Model<UserDocument>
  ){}
  
  // REGISTER USER //
  async createUser(response,user:User){
    const {
      username,
      email,
      password
    } = user
    try {
      const hasedPassword = await bcrypt.hash(password,SALT_OR_ROUND)
      const registeredUser = await this.userModel.create({
        username,
        email,
        password:hasedPassword
      })
      if(!registeredUser) throw "user not created"
      return registeredUser
    } catch (error) {
      errorResponseHandler(response,error,401)
    }
  }

  // LOGIN USER //
  async loginUser(response,user:User){
    const {
      email,
      password
    } = user
    try {
      const loginUser = await this.userModel.findOne({email})
      const convertedPassword = await bcrypt.compare(password,loginUser.password)
      if(!convertedPassword) throw "password miss match"
      if(!loginUser) throw "user not login"
      return loginUser
    } catch (error) {
      errorResponseHandler(response,error,401)
    }
  }

}
