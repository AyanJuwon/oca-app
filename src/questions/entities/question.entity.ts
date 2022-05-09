import { Answer } from 'src/answer/entities/answer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Section } from '../../section/entities/section.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  question: string;

  @OneToMany(() => Answer, (answer: Answer) => answer.question)
  public answers: Answer[];

  @ManyToOne(() => Section, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  section: Section;

  @CreateDateColumn()
  createdAt: Date;
}
