import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SectionService } from './section.service';

import { Section } from './entities/section.entity';

@Controller('section')
export class SectionController {
  constructor(private sectionService: SectionService) {}

  @Post('create-section')
  async create(@Body() createSectionDto: Section) {
    const response = await this.sectionService.create(createSectionDto);
    // if (response.)
    return { status: 204, data: response, message: 'created' };
  }

  // use this to get all quiz questions and answers
  // return an array of answers only
  @Get('all')
  async findAll() {
    const response = await this.sectionService.findAll();
    const finalResponse = [];
    if (response.length != 0) {
      for (const section of response) {
        const ds = {
          outputSection: section.sectionTitle,
          questions: section.questions,
        };
        // section.s
        finalResponse.push(ds);
      }
      // for (const i in response) {
      //   finalResponse.push(response[i].questions);
      // }

      return { status: 204, data: finalResponse, message: 'success' };
    } else {
      return {
        status: 204,
        data: finalResponse,
        message: 'No sections found, contact admin to create sections',
      };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sectionService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateSectionDto: Section) {
    return this.sectionService.update(id, updateSectionDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.sectionService.remove(+id);
  }
}
