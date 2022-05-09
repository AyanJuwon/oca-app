import { Question } from 'src/questions/entities/question.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
@Entity()
export class Section {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  sectionTitle: string;

  @OneToMany(() => Question, (question: Question) => question.section)
  public questions: Question[];

  @Column()
  passMark: number;

  @Column()
  reccomendation: string;

  @CreateDateColumn()
  createdAt: Date;
}
