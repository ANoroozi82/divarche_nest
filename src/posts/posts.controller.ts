import { Controller, Get, Post, Delete } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get('data')
  getData() {
    return {
      data: 'Success'
    };
  }
}
