import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCatInput } from "@src/admin/dto/cat.dto";
import { Cat, CatDocument } from "@src/admin/models/cat.model";
import { Model, Schema as MongooseSchema } from "mongoose";

@Injectable()
export class CatService {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<CatDocument>
  ) {}

  async create(input: CreateCatInput): Promise<Cat> {
    const createdCat = new this.catModel(input);
    return createdCat.save();
  }

  async getById(_id: MongooseSchema.Types.ObjectId): Promise<Cat> {
    const cat = await this.catModel
      .findById(_id)
      .populate(['color', 'colors'])
      .exec();

    if (!cat) {
      throw new HttpException('Cat does not existe', HttpStatus.NO_CONTENT);
    }

    return cat;
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel
      .find()
      .populate(['color', 'colors'])
      .exec();
  }
}
