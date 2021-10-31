import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Color } from './color.model';

@ObjectType()
@Schema()
export class Cat extends Document {
  @Field(() => ID)
  @Prop({ auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => Int)
  @Prop()
  age: number;

  @Field(() => String)
  @Prop()
  breed: string;

  @Field(() => Color, { nullable: true })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Color.name
  })
  color: Color

  @Field(() => [Color], { nullable: true })
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: Color.name
  })
  colors:  Color[]
}

export type CatDocument = Cat & Document;

export const CatSchema = SchemaFactory.createForClass(Cat);
