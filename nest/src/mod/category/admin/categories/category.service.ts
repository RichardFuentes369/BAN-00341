import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new ';
  }

  findAll() {
    return `This action returns all `;
  }

  findOne(id: number) {
    return `This action returns a #${id} `;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} `;
  }

  remove(id: number) {
    return `This action removes a #${id} `;
  }
}
