import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new ';
  }

  findAll() {
    return `This action returns all `;
  }

  findOne(id: number) {
    return `This action returns a #${id} `;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} `;
  }

  remove(id: number) {
    return `This action removes a #${id} `;
  }
}
