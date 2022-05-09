import { Answer } from 'src/answer/entities/answer.entity';

export class CreateSectionDto {
  id: number;

  sectionTitle: string;

  createdAt: Date;
}

export class submitAnswerDto {
  answers: [];
}
