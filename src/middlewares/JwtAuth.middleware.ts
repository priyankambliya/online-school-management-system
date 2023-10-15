import * as Jwt  from 'jsonwebtoken'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import {SECRET_KEY} from '../security/config.json'
import { InjectModel } from "@nestjs/mongoose"
import { User, UserDocument } from "src/schemas/User.schema"
import { Model } from "mongoose"
import {errorNames} from '../handlers/allErrors.names'

@Injectable()
export class JwtMiddleware implements NestMiddleware {

  constructor(
    @InjectModel(User.name) private readonly userModel:Model<UserDocument>
  ){}

  async use(request: Request, response: Response, next: NextFunction) {
   
    const authorizationToken = request.headers.authorization
    if(!authorizationToken) throw {error:errorNames.TOKEN_NOT_FOUND}
    const token = authorizationToken.split(' ')[1]

    const decodedToken:any = await Jwt.verify(token,SECRET_KEY)
    const user = await this.userModel.findOne({email:decodedToken.email})
    if(!user) throw {error:errorNames.USER_NOT_FOUND}
    request.app.locals.user = user
    next();
  }
}
