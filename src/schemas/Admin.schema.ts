import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from "mongoose"
import { Roles } from "src/enums/roles.enum"

@Schema()
export class Admin {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: Roles.ADMIN })
    role: Roles;
}

export type AdminDocument = Admin & Document;

export const adminSchema = SchemaFactory.createForClass(Admin)