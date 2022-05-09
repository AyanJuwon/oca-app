import { QuizModule } from './quiz/quiz.module';
import { Module } from '@nestjs/common';
import { SectionModule } from './section/section.module';
import { AnswerModule } from './answer/answer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { Question } from './questions/entities/question.entity';
import { Section } from './section/entities/section.entity';
import { Answer } from './answer/entities/answer.entity';
import { Quiz } from './quiz/entities/quiz.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      database: 'tutorial',
      port: 3306,
      username: 'root',
      password: 'Password123#',
      entities: [Question, Section, Answer, Quiz],
      synchronize: true,
      // logging: true,
      migrationsRun: true,
      migrations: ['./migrations/*.js'],
    }),
    QuestionsModule,
    SectionModule,
    AnswerModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

// import {createDatabase} from "typeorm-extension";

// (async () => {
//     await createDatabase({ifNotExist: true});

//     await dropDatabase({ifExist: true});

//     process.exit(0);
// })();
export class AppModule {}
