import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Color extends Document {
  @Field(() => ID)
  @Prop({ auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  title: string;
}

export type ColorDocument = Color & Document;

export const ColorSchema = SchemaFactory.createForClass(Color);
