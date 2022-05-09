import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Ip,
  Res,
  Req,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './entities/quiz.entity';
import { getRepository } from 'typeorm';
import { Answer } from 'src/answer/entities/answer.entity';
import { Section } from 'src/section/entities/section.entity';
import { RealIP } from 'nestjs-real-ip';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // @Post('submit')
  // create(@Body() answers: number[]) {
  //   // return this.quizService.create();
  //   return 'created';
  // }
  @Post('submit')
  async submit(@Body() data, @Req() req, @RealIP() ip) {
    console.log(`request info ${req}`);
    console.log(`request ip ${ip}`);
    console.log(data);
    // const quizRepository = getRepository(Quiz);
    const answerRepository = getRepository(Answer);
    const sectionRepository = getRepository(Section);
    const sectionMap = new Map<string, number>();
    const section = await sectionRepository.find();
    console.log(`sectiion ${section}`);
    for (const singleSection of section) {
      sectionMap[singleSection.sectionTitle] = 0;
    }
    for (const answer of data['answers']) {
      const answerDs = await answerRepository.findOne(answer, {
        relations: ['question'],
      });
      for (const key of Object.keys(sectionMap)) {
        if (answerDs.question.section.sectionTitle == key) {
          sectionMap[answerDs.question.section.sectionTitle] += answerDs.score;
        }
      }
    }

    // create output response

    for (const entry of Object.entries(sectionMap)) {
      console.log(`section entry ${entry[1]}`);
      if (entry[1] / 15 < 0.6) {
        console.log(`${entry[0]} failed`);

        const testSection = await sectionRepository.find({
          where: { sectionTitle: entry[0] },
        });
        console.log(testSection);
      }
    }
    // Encryption section
    const iv = randomBytes(16);
    const password = 'Olive COnference Assesment';
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const textToEncrypt = 'Nest';
    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);
    console.log(encryptedText.BYTES_PER_ELEMENT, decryptedText);
    // cross reference answer with section and map to a section score variable,
    //check if percentage total score  of section beats the pass mark
    // reccomend book if score below passmark
    const output = {
      sectionmap: sectionMap,
      encryptedText: encryptedText,
      decryptedText: decryptedText,
    };

    return output;
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.quizService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() quiz: Quiz) {
    return this.quizService.update(+id, quiz);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.quizService.remove(+id);
  }
}
