import * as Jwt  from 'jsonwebtoken'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import {SECRET_KEY} from '../security/config.json'
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {errorNames} from '../handlers/allErrors.names'
import { Admin, AdminDocument } from "src/schemas/Admin.schema"

@Injectable()
export class JwtAdminMiddleware implements NestMiddleware {

  constructor(
    @InjectModel(Admin.name) private readonly adminModel:Model<AdminDocument>
  ){}

  async use(request: Request, response: Response, next: NextFunction) {
   
    const authorizationToken = request.headers.authorization
    if(!authorizationToken) throw {error:errorNames.TOKEN_NOT_FOUND}
    const token = authorizationToken.split(' ')[1]

    const decodedToken:any = await Jwt.verify(token,SECRET_KEY)
    const admin = await this.adminModel.findOne({email:decodedToken.email})
    if(!admin) throw {error:errorNames.ADMIN_NOT_FOUND}
    request.app.locals.admin = admin
    next();
  }
}