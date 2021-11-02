import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class CreateColorInput {
  @Field(() => String)
  @IsNotEmpty({ message: "First name can't be blank." })
  @IsEmail({}, { message: 'Invalid email format' })
  title: string;
}
