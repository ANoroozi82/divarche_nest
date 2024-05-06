import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [AppController, PostsController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
