import { Injectable } from '@nestjs/common';
import { CreateMermaDto } from './dto/create-merma.dto';
import { UpdateMermaDto } from './dto/update-merma.dto';

@Injectable()
export class MermasService {
  create(createMermaDto: CreateMermaDto) {
    return 'This action adds a new merma';
  }

  findAll() {
    return `This action returns all mermas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} merma`;
  }

  update(id: number, updateMermaDto: UpdateMermaDto) {
    return `This action updates a #${id} merma`;
  }

  remove(id: number) {
    return `This action removes a #${id} merma`;
  }
}
