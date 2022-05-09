import { Question } from 'src/questions/entities/question.entity';
import { Section } from 'src/section/entities/section.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  answer: string;

  @Column()
  score: number;

  @ManyToOne(() => Question, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  question: Question;

  @CreateDateColumn()
  createdAt: Date;
}
