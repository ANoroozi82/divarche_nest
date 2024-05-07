import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import  { ValidationMiddleware} from './validation/validation.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user/user.service';
import { ResponseService } from './services/response/response.service';
import { PostsService } from './services/posts/posts.service';

@Module({
  imports: [],
  controllers: [AppController, PostsController, UserController],
  providers: [AppService, UserService, ResponseService, PostsService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidationMiddleware).forRoutes(
      { path: '/posts/add', method: RequestMethod.POST},

      { path: '/posts/update', method: RequestMethod.POST},

      { path: '/posts/data', method: RequestMethod.GET},

      { path: '/posts/selectdata', method: RequestMethod.GET},

      { path: '/posts/delete', method: RequestMethod.DELETE},

      { path: '/user/signup', method: RequestMethod.POST},

      { path: '/user/login', method: RequestMethod.PUT},

      { path: '/user/logout', method: RequestMethod.PUT},

      { path: '/user/getInfo', method: RequestMethod.GET},

      { path: '/user/updateInfo', method: RequestMethod.POST},

      { path: '/user/delete', method: RequestMethod.DELETE}
    );
  }
}
