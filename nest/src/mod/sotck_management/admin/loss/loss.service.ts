import { Injectable } from '@nestjs/common';
import { CreateLossDto } from './dto/create-loss.dto';
import { UpdateLossDto } from './dto/update-loss.dto';

@Injectable()
export class LossService {
  create(createLossDto: CreateLossDto) {
    return 'This action adds a new loss';
  }

  findAll() {
    return `This action returns all loss`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loss`;
  }

  update(id: number, updateLossDto: UpdateLossDto) {
    return `This action updates a #${id} loss`;
  }

  remove(id: number) {
    return `This action removes a #${id} loss`;
  }
}
