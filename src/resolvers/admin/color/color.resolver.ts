import { Args, ID, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CreateColorInput } from '@src/admin/dto/color.dto';
import { Color } from '@src/admin/models/color.model';
import { ColorService } from '@src/admin/services';
import { PubSub } from 'graphql-subscriptions';
import { Schema as MongooseSchema } from 'mongoose';

@Resolver()
export class ColorResolver {
  private pubSub: PubSub;

  constructor(private colorService: ColorService) {
    this.pubSub = new PubSub();
  }

  @Query(() => Color)
  async color(
    @Args('_id', { type: () => ID })
    _id: MongooseSchema.Types.ObjectId,
  ): Promise<Color> {
    return await this.colorService.getById(_id);
  }

  @Query(() => [Color])
  async colors(): // @Args('filters', { nullable: true }) filters?: ListPersonInput,
  Promise<Color[]> {
    return await this.colorService.findAll();
  }

  @Mutation(() => Color)
  async createColor(@Args('input') input: CreateColorInput): Promise<Color> {
    const newColor: Color = await this.colorService.create(input);
    this.pubSub.publish('colorAdded', { colorAdded: newColor });
    return newColor
  }

  @Subscription(() => Color)
  colorAdded() {
    return this.pubSub.asyncIterator('colorAdded');
  }
}
