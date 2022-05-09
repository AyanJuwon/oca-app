import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    public answerRepository: Repository<Answer>,
  ) {}
  create(createAnswerDto: Answer) {
    return this.answerRepository.save(createAnswerDto);
  }

  findAll() {
    // get the answers, separate them into questions, separate questions into sections

    return this.answerRepository.find({ relations: ['question'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
