import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}
  create(quiz: Quiz) {
    return this.quizRepository.save(quiz);
  }

  findAll() {
    return this.quizRepository.find();
  }

  findOne(id: number) {
    return this.quizRepository.findOne(id);
  }

  update(id: number, quiz: Quiz) {
    return this.quizRepository.update(id, quiz);
  }

  remove(id: number) {
    return this.quizRepository.delete(id);
  }
}
