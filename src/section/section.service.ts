import { Section } from './entities/section.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
  ) {}
  create(section: Section): Promise<Section> {
    return this.sectionRepository.save(section);
  }

  // createQuiz(quiz: Quiz): Promise<Quiz> {
  //   return this.quizRepository.save(quiz);
  // }

  findAll(): Promise<Section[]> {
    return this.sectionRepository.find({
      relations: ['questions', 'questions.answers'],
    });
  }

  // findAllQuizzes(): Promise<Quiz[]> {
  //   return this.quizRepository.find();
  // }

  findOne(id: number): Promise<Section> {
    return this.sectionRepository.findOne(id);
  }

  // findOneQuiz(id: number): Promise<Quiz> {
  //   return this.quizRepository.findOne(id);
  // }

  update(id: number, section: Section) {
    return this.sectionRepository.update(id, section);
  }

  remove(id: number) {
    return this.sectionRepository.delete(id);
  }
}
