import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  totalScore: number;

  @Column()
  userMetaData: string;

  //   @Column('text', { array: true })
  //   reccomendations: string[];

  @CreateDateColumn()
  createdAt: Date;
}
