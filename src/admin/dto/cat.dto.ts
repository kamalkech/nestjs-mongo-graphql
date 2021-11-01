import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCatInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  breed: string;
}
