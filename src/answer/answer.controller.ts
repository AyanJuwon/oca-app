import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post('create')
  async create(@Body() createAnswerDto: Answer) {
    const response = await this.answerService.create(createAnswerDto);
    // if (response.)
    return { status: 204, data: response, message: 'created' };
  }

  @Get('all')
  async findAll() {
    const response = await this.answerService.findAll();
    formatQuiz(response);
    return { status: 204, data: response, message: 'success' };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}

function formatQuiz(quizObject: Answer[]) {
  // let quiz  = quizObject;
  for (const i in quizObject) {
    console.log(quizObject[i]);
  }
  console.log(`formatted`);
}
