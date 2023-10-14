import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, now } from "mongoose"
import { Roles } from "src/enums/roles.enum"

@Schema()
export class User {
    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: Roles.STUDENT })
    role: Roles;

    @Prop({ default: now() })
    createdAt: Date;

    @Prop({ default: now() })
    updatedAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User)