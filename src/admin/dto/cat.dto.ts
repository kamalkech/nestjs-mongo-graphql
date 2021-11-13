import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateCatInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  breed: string;

  @Field(() => [ID])
  colors: MongooseSchema.Types.ObjectId;
}
