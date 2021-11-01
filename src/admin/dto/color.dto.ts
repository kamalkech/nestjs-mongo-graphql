import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateColorInput {
  @Field(() => String)
  title: string;
}
