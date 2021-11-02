import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateColorInput } from '@src/admin/dto/color.dto';
import { Color, ColorDocument } from '@src/admin/models/color.model';
import { Model, Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class ColorService {
  constructor(
    @InjectModel(Color.name) private readonly colorModel: Model<ColorDocument>,
  ) {}

  async create(input: CreateColorInput): Promise<Color> {
    const createdColor = new this.colorModel(input);
    return createdColor.save();
  }

  async getById(_id: MongooseSchema.Types.ObjectId): Promise<Color> {
    const cat = await this.colorModel.findById(_id).exec();

    if (!cat) {
      throw new HttpException('Color does not existe', HttpStatus.NO_CONTENT);
    }

    return cat;
  }

  async findAll(): Promise<Color[]> {
    return await this.colorModel.find().exec();
  }
}
