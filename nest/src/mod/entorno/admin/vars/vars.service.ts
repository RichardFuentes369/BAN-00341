import { Injectable } from '@nestjs/common';
import { CreateVarDto } from './dto/create-var.dto';
import { UpdateVarDto } from './dto/update-var.dto';

@Injectable()
export class VarsService {
  create(createVarDto: CreateVarDto) {
    return 'This action adds a new var';
  }

  findAll() {
    return `This action returns all vars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} var`;
  }

  update(id: number, updateVarDto: UpdateVarDto) {
    return `This action updates a #${id} var`;
  }

  remove(id: number) {
    return `This action removes a #${id} var`;
  }
}
