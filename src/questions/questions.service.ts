import { Injectable } from '@nestjs/common';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}
  create(createQuestionDto: Question) {
    return this.questionRepository.save(createQuestionDto);
  }

  findAll() {
    return this.questionRepository.find({ relations: ['answers', 'section'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return updateQuestionDto;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
