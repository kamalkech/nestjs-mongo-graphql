import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateCatInput } from "@src/admin/dto/cat.dto";
import { Cat } from "@src/admin/models/cat.model";
import { CatService } from "@src/admin/services";
import { Schema as MongooseSchema } from 'mongoose';

@Resolver()
export class CatResolver {
  constructor(private catService: CatService) { }

  @Query(() => Cat)
  async cat(
    @Args('_id', { type: () => ID })
    _id: MongooseSchema.Types.ObjectId,
  ): Promise<Cat> {
    return await this.catService.getById(_id);
  }

  @Query(() => [Cat])
  async cats(
    // @Args('filters', { nullable: true }) filters?: ListPersonInput,
  ): Promise<Cat[]> {
    return await this.catService.findAll();
  }

  @Mutation(() => Cat)
  async createCat(@Args('input') input: CreateCatInput): Promise<Cat> {
    return await this.catService.create(input);
  }
}
